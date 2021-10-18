package com.peterparameter.troper.domain

import arrow.core.*
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.jsoup.nodes.Entities
import org.jsoup.safety.Safelist
import com.kevin.ksoup.Ksoup
import com.peterparameter.troper.utils.*
import daggerok.extensions.html.dom.*

object TropesConstants {
    const val tvTropesBaseUrl = "https://tvtropes.org"
}

object Parser {
    suspend fun parse(url: String, rawArticle: String): Attempt<Article> {
        val ks = Ksoup()
        val parsed = Either.catch { ks.parse<ParsedArticle>(rawArticle) }
        return parsed.flatMap {
            val cleanedContent = it.content?.nullIfEmpty()?.let(::cleanup)
            val subpages = it.subpages?.map(::createLinks)?.flatten().orEmpty()
            mapNotNull(it.title, cleanedContent) {t, c -> Article(url, t, wrap(t, c), subpages)}
                .rightIfNotNull { NullPointerException("title or content is null") }
        }
    }

    private fun cleanup(htmlContent: String): String {
        val advertisementSpan = "<span>Advertisement:</span>"
        val urlBase = TropesConstants.tvTropesBaseUrl
        val outputSettings = Document.OutputSettings()
            .syntax(Document.OutputSettings.Syntax.html)
            .escapeMode(Entities.EscapeMode.extended)
            .prettyPrint(true)
        val whitelist = Safelist.basicWithImages()//.addAttributes("*", "id", "class")
        return Jsoup.clean(htmlContent, urlBase, whitelist, outputSettings)
            .replace(advertisementSpan, "")
    }

    private fun createLinks(subpage: ParsedArticle.Subpage): ArticleDescriptor? {
        return subpage.title?.let { t ->
                subpage.url?.let{ u -> ArticleDescriptor(u, t) }
            }
    }

    private fun wrap(title: String, article: String): String {      // TODO: Oh god, this is ugly
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