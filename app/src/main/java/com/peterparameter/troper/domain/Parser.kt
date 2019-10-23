package com.peterparameter.troper.domain

import arrow.core.*
import arrow.core.extensions.option.monad.monad
import arrow.syntax.collections.flatten
import com.fcannizzaro.ksoup.Ksoup
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.jsoup.nodes.Entities
import org.jsoup.safety.Whitelist

object Parser {
    fun parse(url: String, rawArticle: String, rawScript: String): Option<Article> {
        val ks = Ksoup(stripRaw(rawArticle))
        return Option.monad().fx.monad {
            val parsed = Try { ks.from<ArticleWrapper>(ArticleWrapper()) }.toOption().bind()
            val title = parsed.title.toOption().bind()
            val element = parsed.article.element.toOption().bind()
            val htmlContent = element.html().toOption().bind()

            val cleaned = cleanup(htmlContent)
            val content = wrap(title, cleaned, rawScript)
            val subPages: List<ArticleDescriptor> = parsed.subpages.map(::createLinks).flatten()
            Article(url, title, content, subPages)
        }.fix()
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
                    .map{ u -> ArticleDescriptor(u, t) }
            }
    }

    private fun wrap(title: String, article: String, rawScript: String?): String {      // TODO: Oh god, this is ugly
        return "<!DOCTYPE html><html><head lang=\"en\"><title>$title</title></head><body><div>$article</div><script type=\"application/javascript\">$rawScript</script></body></html>"
    }
}