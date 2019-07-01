package com.peterparameter.troper.view

import android.content.Context
import android.view.View
import androidx.core.view.isVisible
import com.peterparameter.troper.domain.ArticleInfo
import com.peterparameter.troper.utils.TropesWebClient
import com.peterparameter.troper.utils.webView
import splitties.experimental.InternalSplittiesApi
import splitties.views.dsl.core.*
import splitties.views.dsl.core.styles.AndroidStyles
import kotlin.contracts.ExperimentalContracts

@ExperimentalContracts
@InternalSplittiesApi
class ArticleView(override val ctx: Context) : Ui {
    private val s = AndroidStyles(ctx)

    var isBusy: Boolean
        get() = busyIndicator.isVisible
        set(value) {
            busyIndicator.isVisible = value
        }

    fun setup(articleInfo: ArticleInfo) {
        articleContentView.loadData(articleInfo.content, "text/html", "UTF-8")
        title.text = articleInfo.title
    }

    override val root by lazy { content }

    private val content by lazy {
        verticalLayout {
            add(articleContentView, lParams(matchParent, matchParent) { })
            add(busyIndicator, lParams(matchParent, matchParent) { })
        }
    }

    private val busyIndicator by lazy { s.progressBar.default { isVisible = false } }

    private val articleContentView by lazy { webView(View.generateViewId()) {
        webViewClient = TropesWebClient()
    } }
    private val title by lazy { textView {} }
}
