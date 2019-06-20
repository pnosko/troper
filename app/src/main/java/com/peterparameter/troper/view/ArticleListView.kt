package com.peterparameter.troper.view

import android.content.Context
import android.view.View
import splitties.views.dsl.core.Ui
import splitties.views.*

class ArticleListView(override val ctx: Context) : Ui {
    override val root by lazy { articlePager }

    val articlePager = viewPager()
}