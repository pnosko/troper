package com.peterparameter.troper.view

import android.content.Context
import android.view.View
import com.peterparameter.troper.utils.webView
import splitties.experimental.InternalSplittiesApi
import splitties.views.dsl.core.Ui
import splitties.views.dsl.core.*
import splitties.views.gravityCenter
import kotlin.contracts.ExperimentalContracts

@ExperimentalContracts
@InternalSplittiesApi
class ArticleView(override val ctx: Context) : Ui {
    override val root: View
        get() = content

    private val content = verticalLayout {
        add(articleContentView, lParams { gravityCenter })
    }

    private val articleContentView = webView {  }
}