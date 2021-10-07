package com.peterparameter.troper.domain

import arrow.core.*
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.jsoup.nodes.Entities
import org.jsoup.safety.Safelist
import com.kevin.ksoup.Ksoup
import com.peterparameter.troper.utils.Attempt
import com.peterparameter.troper.utils.flatten
import com.peterparameter.troper.utils.mapNotNull

object TropesConstants {
    const val tvTropesBaseUrl = "https://tvtropes.org"
}

object Parser {
    suspend fun parse(url: String, rawArticle: String): Attempt<Article> {
        val ks = Ksoup()
        val parsed = Either.catch { ks.parse<ParsedArticle>(rawArticle, ParsedArticle::class.java) }
        return parsed.flatMap {
            val cleanedContent = it.content?.let(::cleanup)
            val subpages = it.subpages?.map(::createLinks)?.flatten().orEmpty()
            mapNotNull(it.title, cleanedContent) {t, c -> Article(url, t, c, subpages)}.rightIfNotNull { NullPointerException("title or content is null") }
        }
    }

    private fun cleanup(htmlContent: String): String {
        val urlBase = TropesConstants.tvTropesBaseUrl
        val outputSettings = Document.OutputSettings()
            .syntax(Document.OutputSettings.Syntax.html)
            .escapeMode(Entities.EscapeMode.extended)
            .prettyPrint(true)
        val whitelist = Safelist.basicWithImages().addAttributes("*", "id", "class")
        return Jsoup.clean(htmlContent, urlBase, whitelist, outputSettings)
    }

    private fun createLinks(subpage: ParsedArticle.Subpage): ArticleDescriptor? {
        return subpage.title?.let { t ->
                subpage.url?.let{ u -> ArticleDescriptor(u, t) }
            }
    }

    private fun wrap(title: String, article: String, rawScript: String?): String {      // TODO: Oh god, this is ugly
        return "<!DOCTYPE html><html><head lang=\"en\"><title>$title</title></head><body><div>$article</div><script type=\"application/javascript\">$rawScript</script></body></html>"
    }
}