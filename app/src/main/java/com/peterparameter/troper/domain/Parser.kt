package com.peterparameter.troper.domain

import arrow.core.*
import arrow.instances.option.monad.binding
import arrow.instances.option.monad.flatMap
import arrow.syntax.collections.flatten
import com.fcannizzaro.ksoup.Ksoup
import kotlinx.html.body
import kotlinx.html.dom.createHTMLDocument
import kotlinx.html.dom.serialize
import kotlinx.html.*
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.jsoup.nodes.Element
import org.jsoup.nodes.Entities
import org.jsoup.safety.Whitelist

object Parser {
    fun parse(rawArticle: String, rawScript: String): Option<ArticleInfo> {
        val ks = Ksoup(stripRaw(rawArticle))
        return binding {
            val parsed = Try { ks.from<ArticleWrapper>(ArticleWrapper()) }.toOption().bind()
            val title = parsed.title.toOption().bind()
            val element = parsed.article.element.toOption().bind()
            val stripped = stripEmpty(element)
            val htmlContent = stripped.html().toOption().bind()

            val cleaned = cleanup(htmlContent)
//            val content = wrap(title, cleaned, rawScript)
            val subpages = parsed.subpages.map(::createLinks).flatten()
            ArticleInfo(title, cleaned, subpages)
        }
    }

    private fun stripEmpty(element: Element): Element {
        element.select("*")
            .filter { it.isBlock && !it.hasText()}
            .forEach { it.remove() }
        return element
    }

    private fun cleanup(htmlContent: String): String {
        val urlBase = "https://tvtropes.org"
        val outputSettings = Document.OutputSettings().syntax(Document.OutputSettings.Syntax.html).prettyPrint(true).escapeMode(Entities.EscapeMode.base)
        val whitelist = Whitelist.basicWithImages()
        val cleaned = Jsoup.clean(htmlContent, urlBase, whitelist, outputSettings)
        return cleaned!!
    }

    private fun stripRaw(article: String): String {
        return article.replace("<hr>", "")
    }

    private fun createLinks(subpage: ArticleWrapper.Subpage): Option<ArticleLink> {
        return subpage.title.toOption()
            .flatMap { t ->
                subpage.url.toOption()
                    .map{ u -> ArticleLink(t, u) }
            }
    }

//    private fun removeNBSP(text: String): String {
//        return text.replace("&nbsp;", "")
//    }

    private fun wrap(title: String, article: String, rawScript: String?): String {
        return createHTMLDocument().html {
            head {
                title(title)
            }
            body {
                header { h1 { +title }}
                unsafe { raw(article) }
//                script(ScriptType.textJavaScript) {
//                    unsafe { raw(rawScript.orEmpty()) }
//                }
            }
        }.serialize()
    }
}