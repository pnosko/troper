package com.peterparameter.troper.view

import com.peterparameter.troper.activities.ArticleCollectionActivity
import org.jetbrains.anko.*

class ArticleCollectionView : AnkoComponent<ArticleCollectionActivity> {
    override fun createView(ui: AnkoContext<ArticleCollectionActivity>) = ui.apply {
        verticalLayout {}
    }.view
}