package com.overzealous.remark

import com.overzealous.remark.convert.AbstractNodeHandler
import com.overzealous.remark.convert.DocumentConverter
import com.overzealous.remark.convert.NodeHandler
import org.jsoup.nodes.Element

class Folder : AbstractNodeHandler() {
    override fun handleNode(parent: NodeHandler?, node: Element?, converter: DocumentConverter?) {
        val title = node?.attr("title")

        converter?.output?.let {
            it.startBlock()
            it.write("<details>")
            it.println()
            it.write("<summary>")
            it.write(title.orEmpty())
            it.write("</summary>")
            it.println()
            it.println()
            prependAndRecurse("", node, converter, converter.blockNodes)
            it.println()
            it.write("</details>")
            it.endBlock()
        }
    }
}