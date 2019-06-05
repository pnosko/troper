package com.peterparameter.troper.view

import android.content.Context
import android.util.Log
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.peterparameter.troper.domain.ArticleInfo
import com.peterparameter.troper.utils.setupWith
import com.peterparameter.troper.utils.webView
import m7mdra.com.htmlrecycler.HtmlRecycler
import m7mdra.com.htmlrecycler.adapter.DefaultElementsAdapter
import m7mdra.com.htmlrecycler.adapter.ElementsAdapter
import m7mdra.com.htmlrecycler.elements.Element
import m7mdra.com.htmlrecycler.elements.ElementType
import m7mdra.com.htmlrecycler.source.StringSource
import splitties.experimental.InternalSplittiesApi
import splitties.views.dsl.core.Ui
import splitties.views.dsl.core.*
import splitties.views.dsl.recyclerview.recyclerView
import splitties.views.gravityCenter
import splitties.views.gravityTopCenter
import kotlin.contracts.ExperimentalContracts

@ExperimentalContracts
@InternalSplittiesApi
class ArticleView(override val ctx: Context) : Ui {
    fun setup(articleInfo: ArticleInfo) {
        HtmlRecycler.Builder(ctx)
            .setSource(StringSource(articleInfo.content))
            .setAdapter(LoggingAdapter(ctx))
            .setRecyclerView(articleContentView)
            .build()
//        articleContentView.loadData(articleInfoString.content, "text/html", "ISO-8859-1")
        title.text = articleInfo.title
    }

    override val root by lazy { content }

    private val content by lazy {
        verticalLayout {
            add(title, lParams { gravityTopCenter })
            add(articleContentView, lParams { gravityCenter })
        }
    }

    private val articleContentView by lazy {recyclerView {  } }
    private val title by lazy { textView {} }
}

const val tag = "VIEW"
fun logElem(element: Element, sth: Int, view: View) {
    val message = "Element clicked - $element ${element.javaClass.simpleName}"
    println(message)
    Log.i(tag, message)
}

class LoggingAdapter(context: Context) : ElementsAdapter() {
    private val underlying = DefaultElementsAdapter(context, ::logElem)

    override fun onCreateElement(parent: ViewGroup, elementType: ElementType): RecyclerView.ViewHolder = underlying.onCreateElement(parent, elementType).setupWith{ println("CREATE: $elementType")}

    override fun onBindElement(holder: RecyclerView.ViewHolder, position: Int) = underlying.onBindElement(holder, position).setupWith{ println("BIND: $holder @ POS: $position")}

}