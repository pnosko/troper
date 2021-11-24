package com.peterparameter.troper.domain

import arrow.core.Either
import arrow.core.computations.either
import arrow.core.computations.nullable
import arrow.core.flatMap
import com.kevin.ksoup.Ksoup
import com.peterparameter.troper.utils.Attempt
import com.peterparameter.troper.utils.flatten
import daggerok.extensions.html.dom.*
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.jsoup.nodes.Element
import org.jsoup.nodes.Entities
import org.jsoup.parser.Tag
import org.jsoup.safety.Safelist

object ArticleParser {
    suspend fun parse(url: String, rawArticle: String): Attempt<Article> {
        val ks = Ksoup()
        val parsed = Either.catch { ks.parse<ParsedArticle>(rawArticle, Constants.WINDOWS_CHARSET_NAME) }
        val cleanedArticle = parsed.map(::cleanArticleContent)
        return cleanedArticle.flatMap{ createArticle(it, url) }
    }

    private fun cleanArticleContent(parsedArticle: ParsedArticle): ParsedArticle {
        // remove folders and labels from mail article
//        parsedArticle.contentElement?.select(".folderlabel, .folder")?.remove()
        // fix indented quotes
        parsedArticle.contentElement?.let(::fixQuotes)
        parsedArticle.contentElement?.select(".ad")?.remove()
        parsedArticle.contentElement?.select("span :contains(Advertisement)")?.remove()
//        parsedArticle.folders?.forEach { it?.let(::fixQuotes) }

        return parsedArticle
    }

    private fun fixQuotes(element: Element) = element.select("div.indent").forEach { it.replaceWith(Element(Tag.valueOf("blockquote"), "").html(it.html())) }

    private suspend fun createArticle(
        parsed: ParsedArticle,
        url: String
    ): Attempt<Article> = either {
        val cleanedContent = parsed.content
        val subpages = parsed.subpages?.map(::createLinks)?.flatten().orEmpty()
        //val folders = parsed.folderlabels?.zip(parsed.folders).forEach { (label, folder) ->  }
        nullable {
            val content = cleanedContent.bind()
            val title = parsed.title.bind()
            val converted = Html2MarkdownConverter.convert(content)
            converted.map { Article(url, title, it, parsed.category!!, subpages) }
        }?.bind()!!     // TODO: refactor
    }

    private fun cleanup(htmlContent: String): String {
        val advertisementSpan = "<span>Advertisement:</span>"
        val urlBase = TropesConstants.tvTropesBaseUrl
        val outputSettings = Document.OutputSettings()
            .syntax(Document.OutputSettings.Syntax.html)
            .escapeMode(Entities.EscapeMode.extended)
        val whitelist = Safelist.relaxed().addAttributes("div", "id", "class")
        return Jsoup.clean(htmlContent, urlBase, whitelist, outputSettings)
            .replace(advertisementSpan, "")
    }

    private fun createLinks(subpage: ParsedArticle.Subpage): ArticleReference? {
        return subpage.title?.let { t ->
                subpage.url?.let{ u -> ArticleReference(t, u) }
            }
    }

    private fun wrap(title: String, article: String): String {
        return html {
            head {
                meta("charset" to "UTF-8")
                title {
                    text(title)
                }
            }
            body {
                div {
                    innerHTML += article
                }
            }
        }
    }
}