package com.overzealous.remark

import com.overzealous.remark.convert.AbstractNodeHandler
import com.overzealous.remark.convert.DocumentConverter
import com.overzealous.remark.convert.NodeHandler
import org.jsoup.nodes.Element

class Spoiler : AbstractNodeHandler() {
    override fun handleNode(parent: NodeHandler?, node: Element?, converter: DocumentConverter?) {
        prependAndRecurse("||", node, converter, converter?.inlineNodes)
        converter?.output?.write("||")
    }
}