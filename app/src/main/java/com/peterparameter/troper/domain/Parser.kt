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
import org.jsoup.nodes.Element

object Parser {
    fun parse(rawArticle: String): Option<ArticleInfo> {
        val ks = Ksoup(rawArticle)
        val article = binding {
            val parsed = Try { ks.from<ArticleWrapper>(ArticleWrapper()) }.toOption().bind()
            val element = parsed.element.toOption().bind()
            val htmlContent = element.html().toOption().bind()
            val title = parsed.title.toOption().bind()
            removeBadElems(element)
            val content = wrap(title, htmlContent)
            val subpages = parsed.subpages.map(::createLinks).flatten()
            ArticleInfo(title, content, subpages)
        }
        return article
    }

    private fun createLinks(subpage: ArticleWrapper.Subpage): Option<ArticleLink> {
        return subpage.title.toOption()
            .flatMap { t ->
                subpage.url.toOption()
                    .map{ u -> ArticleLink(t, u) }
            }
    }

    private fun removeBadElems(elem: Element) {
        val tags = listOf("hr", "meta", "input")
        val classes = listOf("proper-ad-unit")
        tags.forEach{elem.getElementsByTag(it)?.remove()}
        classes.forEach{elem.getElementsByClass(it)?.remove()}
    }

    private fun removeNBSP(text: String): String {
        return text.replace("&nbsp;", "")
    }

    private fun wrap(title: String, article: String): String {
        return createHTMLDocument().html {
            head {
                title(title)
            }
            body {
                header { h1 { +title }}
                unsafe { raw(removeNBSP(article)) }
            }
        }.serialize()
    }
}