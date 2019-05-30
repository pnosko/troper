package com.peterparameter.troper.view

import android.content.Context
import android.view.View
import com.peterparameter.troper.domain.ArticleInfo
import com.peterparameter.troper.utils.webView
import splitties.experimental.InternalSplittiesApi
import splitties.views.dsl.core.Ui
import splitties.views.dsl.core.*
import splitties.views.gravityCenter
import kotlin.contracts.ExperimentalContracts

@ExperimentalContracts
@InternalSplittiesApi
class ArticleView(override val ctx: Context) : Ui {
    fun setup(articleInfo: ArticleInfo) {
        articleContentView.loadData(articleInfo.content, "text/html", "ISO-8859-1")
        title.text = articleInfo.title
    }

    override val root: View
        get() = content

    private val content = verticalLayout {
        add(articleContentView, lParams { gravityCenter })
    }

    private val articleContentView = webView {  }
    private val title = textView (theme = R.style.TextAppearance_Compat_Notification_Title)
}