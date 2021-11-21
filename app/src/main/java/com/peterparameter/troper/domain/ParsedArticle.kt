package com.peterparameter.troper.domain

import com.kevin.ksoup.Attrs
import com.kevin.ksoup.annontation.Pick

@Pick("#main-content")
class ParsedArticle {
    class Subpage {
        @Pick("span.wrapper")
        var title: String? = null

        @Pick("a.subpage-link", Attrs.HREF)
        val url: String? = null
    }

    class FolderLabel {
        @Pick("")
        var title: String? = null
    }

    class Folder {
        @Pick("", Attrs.HTML)
        var content: String? = null
    }

    @Pick("div.article-content div.indent", Attrs.HTML)
    var quote: String? = null

    @Pick("div.quoteright div img.embeddedimage", Attrs.SRC)
    var imageUrl: String? = null

    @Pick("div.acaptionright", Attrs.HTML)
    var imageCaption: String? = null

    @Pick("input#groupname-hidden", "value")
    var category: String? = null

    @Pick("p#current_url")
    var currentUrl: String? = null

    @Pick("div#main-article", Attrs.HTML)
    var content: String? = null

    @Pick(".entry-title")
    var title: String? = null

    @Pick("a.subpage-link")
    var subpages: List<Subpage>? = null

    @Pick("div.folderlabel")
    var folderlabels: List<FolderLabel>? = null

    @Pick("div.folder")
    var folders: List<Folder>? = null
}