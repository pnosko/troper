package com.peterparameter.troper.domain

import arrow.core.Either
import com.peterparameter.troper.utils.Attempt
import com.overzealous.remark.*
import org.jsoup.safety.Safelist


object Html2MarkdownConverter {
    fun convert(htmlContent: String): Attempt<String> {
        val opt = Options.markdownExtra()
        opt.inlineLinks = true

        val safelist = Safelist.basicWithImages()
            .addTags("div",
                "h1", "h2", "h3", "h4", "h5", "h6",
                "table", "tbody", "td", "tfoot", "th", "thead", "tr",
                "hr",
                "span", "font", "folder", "spoiler")
            .addAttributes("th", "colspan", "align", "style")
            .addAttributes("td", "colspan", "align", "style")
            .addAttributes(":all", "title", "style")

        val remark = Remark(opt, safelist)
        remark.converter?.addBlockNode(Folder(), "folder")
        remark.converter?.addInlineNode(Spoiler(), "spoiler")

        return Either.catch {
            remark.convertFragment(htmlContent)
        }
    }
}