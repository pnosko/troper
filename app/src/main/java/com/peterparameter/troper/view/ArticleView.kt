package com.peterparameter.troper.view

import android.content.Context
import android.view.View
import androidx.compose.runtime.Composable
import androidx.core.view.isVisible
import com.peterparameter.troper.domain.Article
import com.peterparameter.troper.utils.TropesWebClient
import com.peterparameter.troper.utils.webView
import splitties.experimental.InternalSplittiesApi
import splitties.views.dsl.core.*
import splitties.views.dsl.core.styles.AndroidStyles
import splitties.views.gravityCenter
import kotlin.contracts.ExperimentalContracts

@Composable
fun ArticleView(state: ArticleState) {

}

class ArticleState {

}
//@ExperimentalContracts
//@InternalSplittiesApi
//class ArticleView(override val ctx: Context) : Ui {
//    private val s = AndroidStyles(ctx)
//
//    var isBusy: Boolean
//        get() = busyIndicator.isVisible
//        set(value) {
//            busyIndicator.isVisible = value
//        }
//
//    fun setup(article: Article) {
//        articleContentView.loadData(article.content!!, "text/html", "UTF-8")
//        title.text = article.title
//    }
//
//    override val root by lazy { content }
//
//    private val content by lazy {
//        verticalLayout {
//            add(articleContentView, lParams(matchParent, matchParent) { })
//            add(busyIndicator, lParams(matchParent, matchParent) { gravityCenter })
//        }
//    }
//
//    private val title by lazy { textView {} }
//
//    private val articleContentView by lazy { webView(View.generateViewId()) {
//        webViewClient = TropesWebClient()
//    } }
//
//    private val busyIndicator by lazy { s.progressBar.default { isVisible = false } }
//}
