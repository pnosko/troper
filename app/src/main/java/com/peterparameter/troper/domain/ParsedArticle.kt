package com.peterparameter.troper.domain

import org.jsoup.nodes.Element
import com.kevin.ksoup.Attrs
import com.kevin.ksoup.annontation.Pick

@Pick("#main-content")
class ParsedArticle {
    class Subpage {
        @Pick("span.wrapper")
        var title: String? = null

        @Pick("a.subpage-link", attr = Attrs.HREF)
        val url: String? = null
    }

    @Pick("#main-article", Attrs.HTML)
    var content: String? = null

    @Pick(".entry-title")
    var title: String? = null

    @Pick("a.subpage-link")
    var subpages: List<Subpage>? = null

}