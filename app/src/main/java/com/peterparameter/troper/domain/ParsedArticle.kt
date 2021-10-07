package com.peterparameter.troper.domain

import com.kevin.ksoup.annontation.Pick

@Pick("#main-content")
class ParsedArticle {
    class Subpage {
        @Pick("span.wrapper")
        var title: String? = null

        @Pick("a.subpage-link")
        val url: String? = null
    }

    @Pick("#main-article")
    var content: String? = null

    @Pick(".entry-title")
    var title: String? = null

    @Pick("a.subpage-link")
    var subpages: List<Subpage>? = null

}