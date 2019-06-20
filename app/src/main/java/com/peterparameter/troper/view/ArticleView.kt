package com.peterparameter.troper.view

import android.content.Context
import android.view.View
import com.peterparameter.troper.domain.ArticleInfo
import com.peterparameter.troper.utils.webView
import splitties.experimental.InternalSplittiesApi
import splitties.views.dsl.core.*
import kotlin.contracts.ExperimentalContracts

@ExperimentalContracts
@InternalSplittiesApi
class ArticleView(override val ctx: Context) : Ui {
    fun setup(articleInfo: ArticleInfo) {
        articleContentView.loadData(articleInfo.content, "text/html", "UTF-8")
        title.text = articleInfo.title
    }

    override val root by lazy { content }

    private val content by lazy {
        verticalLayout {
            add(articleContentView, lParams(matchParent, matchParent) { })
        }
    }

    private val articleContentView by lazy { webView(View.generateViewId()) { } }
    private val title by lazy { textView {} }
}
