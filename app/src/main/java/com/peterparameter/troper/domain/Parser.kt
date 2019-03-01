package com.peterparameter.troper.domain

import arrow.core.*
import arrow.instances.option.monad.binding
import com.fcannizzaro.ksoup.Ksoup
import kotlinx.html.body
import kotlinx.html.dom.createHTMLDocument
import kotlinx.html.dom.serialize
import kotlinx.html.*
import org.http4k.core.Uri
import org.jsoup.nodes.Element

object Parser {
    fun parse(rawArticle: String): ArticleInfo {
        val ks = Ksoup(rawArticle)
        val parsed = ks.from<ArticleWrapper>(ArticleWrapper())
        parsed.element.toOption().map{removeBadElems(it)}
        val content = wrap(parsed.article.element?.html().orEmpty())
        val subpages = parsed.subpages.map{ArticleLink(it.title!!, Uri.of(it.url!!))}
        return ArticleInfo(parsed.title.orEmpty(), content, subpages)
    }

    private fun createLinks(subpage: ArticleWrapper.Subpage): Option<ArticleLink> = binding {
        val title = subpage.title.toOption().bind()
        val url = subpage.url.toOption().bind()
        ArticleLink(title, Uri.of(url))
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

    fun wrap(article: String): String {
        return createHTMLDocument().html {
            body {
                unsafe { raw(removeNBSP(article)) }
            }
        }.serialize()
    }
}