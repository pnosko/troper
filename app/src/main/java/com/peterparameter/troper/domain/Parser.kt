package com.peterparameter.troper.domain

import android.net.Uri
import arrow.core.*
import arrow.instances.option.monad.binding
import com.fcannizzaro.ksoup.Ksoup
import kotlinx.html.body
import kotlinx.html.dom.createHTMLDocument
import kotlinx.html.dom.serialize
import kotlinx.html.*
import org.jsoup.nodes.Element

object Parser {
    fun parse(rawArticle: String): ArticleInfo {
        val ks = Ksoup(rawArticle)
        val parsed = ks.from<ArticleWrapper>(ArticleWrapper())
        parsed.element.toOption().map{removeBadElems(it)}
        val content = wrap(parsed.article.element?.html().orEmpty())
//        parsed.subpages.forEach{println("${it.title}, ${it.url}")}
//        val subPagePrep = parsed.subpages.map { (it.title.orEmpty() to it.url.orEmpty())}
//        subPagePrep.forEach{ println(it.first)}
//        val subpages = subPagePrep.map { ArticleLink(it.first, parseUrl(it.second)) }
//        subpages.forEach{println(it.toString())}
        return ArticleInfo(parsed.title.orEmpty(), content, emptyList())
    }

    private fun parseUrl(url: String?): Uri { return Uri.parse(url.orEmpty())}

    private fun createLinks(subpage: ArticleWrapper.Subpage): Option<ArticleLink> = binding {
        val title = subpage.title.toOption().bind()
        val url = subpage.url.toOption().filter { it.isNotBlank() }.bind()
        ArticleLink(title, Uri.parse(url))
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