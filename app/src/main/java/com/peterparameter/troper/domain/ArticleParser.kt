package com.peterparameter.troper.domain

import arrow.core.Either
import arrow.core.computations.either
import arrow.core.computations.nullable
import arrow.core.flatMap
import com.kevin.ksoup.Ksoup
import com.peterparameter.troper.utils.Attempt
import com.peterparameter.troper.utils.flatten
import com.peterparameter.troper.utils.orElse
import daggerok.extensions.html.dom.*
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.jsoup.nodes.Element
import org.jsoup.nodes.Entities
import org.jsoup.parser.Tag
import org.jsoup.safety.Safelist
import org.jsoup.select.Elements

object ArticleParser {
    suspend fun parse(url: String, rawArticle: String): Attempt<Article> {
        val ks = Ksoup()
        val parsed = Either.catch { ks.parse<ParsedArticle>(rawArticle, Constants.WINDOWS_CHARSET_NAME) }
        val cleanedArticle = parsed.map(::cleanArticleContent)
        return cleanedArticle.flatMap{ createArticle(it, url) }
    }

    private fun cleanArticleContent(parsedArticle: ParsedArticle): ParsedArticle {
        // remove "collapse all"
        parsedArticle.contentElement?.select("div.folderlabel.toggle-all-folders-button")?.remove()
        parsedArticle.contentElement?.select("img[src=https://static.tvtropes.org/pmwiki/pub/external_link.gif]")?.remove()

        parsedArticle.contentElement?.select("div.proper-ad-unit")?.remove()
        parsedArticle.contentElement?.select(".ad")?.remove()
        parsedArticle.contentElement?.select("span.ad-caption")?.remove()

        // fix indented quotes
        parsedArticle.contentElement?.select("div.indent")?.forEach {
            it.replaceWith(Element(Tag.valueOf("blockquote"), "").html(it.html()))
        }

        // fix folders
        val labels = parsedArticle.labels.orElse(Elements())
        val folders = parsedArticle.folders.orElse(Elements())
        labels.zip(folders).forEach { (l, f) ->
            f.replaceWith(Element("folder").attr("title", l.text()).html(f.html()))
        }
        labels.remove()

        // fix spoilers
        parsedArticle.contentElement?.select("span.spoiler")?.forEach {
            it.replaceWith(Element("spoiler").html(it.html()))
        }

        return parsedArticle
    }

    private suspend fun createArticle(
        parsed: ParsedArticle,
        url: String
    ): Attempt<Article> = either {
        val cleanedContent = parsed.contentElement?.html()
        val subpages = parsed.subpages?.map(::createLinks)?.flatten().orEmpty()
        nullable {
            val content = cleanedContent.bind()
            val title = parsed.title.bind()
            val converted = Html2MarkdownConverter.convert(content)
            converted.map { Article(url, title, parsed.category!!, it, subpages) }
        }?.bind()!!     // TODO: refactor
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