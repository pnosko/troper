package com.peterparameter.troper.domain

import com.fcannizzaro.ksoup.*
import com.fcannizzaro.ksoup.delegates.*

//data class ArticleWrapper(val title: String, val url: String, val content: String? = null)

class ArticleWrapper : IKsoup("#main-content") {
    class Subpage : IKsoup("a.subpage-link") {
        val title by bindText("span.wrapper")
        val url by bindLink("a.subpage-link")
    }

    class Article : IKsoup("#main-articleSource")

    val article: Article by bindClass(Article(), this)

//    val content by bindText("#main-content")
    val title by bindText(".entry-title")
    val subpages: List<Subpage> by bindList(Subpage())

}