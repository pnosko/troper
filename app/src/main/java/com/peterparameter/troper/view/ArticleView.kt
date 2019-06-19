package com.peterparameter.troper.view

import android.content.Context
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
//        HtmlRecycler.Builder(ctx)
//            .setSource(StringSource(articleInfo.content))
//            .setAdapter(LoggingAdapter(ctx))
//            .setRecyclerView(articleContentView)
//            .build()
        articleContentView.loadData(articleInfo.content, "text/html", "UTF-8")
//        articleContentView.
        title.text = articleInfo.title
    }

    override val root by lazy { content }

    private val content by lazy {
        verticalLayout {
//            add(title, lParams { gravityTopCenter })
            add(articleContentView, lParams(matchParent, matchParent) {
            })
        }
    }

    private val articleContentView by lazy { webView(View.generateViewId()) { } }
    private val title by lazy { textView {} }
}

const val tag = "VIEW"
fun logElem(element: Element, sth: Int, view: View) {
    val message = "Element clicked - $element ${element.javaClass.simpleName}"
    println(message)
}

//class LoggingAdapter(context: Context) : ElementsAdapter() {
//    private val underlying = DefaultElementsAdapter(context, ::logElem)
//
//    override fun onCreateElement(parent: ViewGroup, elementType: ElementType): RecyclerView.ViewHolder {
//        println("CREATE: $elementType")
//        return underlying.onCreateElement(parent, elementType)
//    }
//
//    override fun onBindElement(holder: RecyclerView.ViewHolder, position: Int) {
//        println("BIND: $holder @ POS: $position")
//        return underlying.onBindElement(holder, position)
//    }
//
//}