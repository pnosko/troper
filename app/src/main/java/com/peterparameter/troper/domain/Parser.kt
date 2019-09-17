package com.peterparameter.troper.domain

import arrow.core.*
import arrow.core.extensions.option.monad.binding
import arrow.syntax.collections.flatten
import com.fcannizzaro.ksoup.Ksoup
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.jsoup.nodes.Entities
import org.jsoup.safety.Whitelist

object Parser {
    fun parse(rawArticle: String, rawScript: String): Option<Article> {
        val ks = Ksoup(stripRaw(rawArticle))
        return binding {
            val parsed = Try { ks.from<ArticleWrapper>(ArticleWrapper()) }.toOption().bind()
            val title = parsed.title.toOption().bind()
            val element = parsed.article.element.toOption().bind()
            val htmlContent = element.html().toOption().bind()

            val cleaned = cleanup(htmlContent)
            val content = wrap(title, cleaned, rawScript)
            val subpages: List<ArticleDescriptor> = parsed.subpages.map(::createLinks).flatten()
            Article(title, content, subpages)
        }
    }

    private fun cleanup(htmlContent: String): String {
        val urlBase = "https://tvtropes.org"
        val outputSettings = Document.OutputSettings()
            .syntax(Document.OutputSettings.Syntax.html)
            .escapeMode(Entities.EscapeMode.extended)
            .prettyPrint(true)
        val whitelist = Whitelist.basicWithImages().addAttributes("*", "id", "class")
        val cleaned = Jsoup.clean(htmlContent, urlBase, whitelist, outputSettings)
        return cleaned!!
    }

    private fun stripRaw(article: String): String {
        return article.replace("<hr>", "")
    }

    private fun createLinks(subpage: ArticleWrapper.Subpage): Option<ArticleDescriptor> {
        return subpage.title.toOption()
            .flatMap { t ->
                subpage.url.toOption()
                    .map{ u -> ArticleDescriptor(t, u) }
            }
    }

//    private fun removeNBSP(text: String): String {
//        return text.replace("&nbsp;", "")
//    }

    private fun wrap(title: String, article: String, rawScript: String?): String {
        return "<!DOCTYPE html><html><head lang=\"en\"><title>$title</title></head><body><div>$article</div><script type=\"application/javascript\">$rawScript</script></body></html>"
    }
}