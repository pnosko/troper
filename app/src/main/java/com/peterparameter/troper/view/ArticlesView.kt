package com.peterparameter.troper.view

import android.support.v4.app.FragmentActivity
import com.peterparameter.troper.activities.ArticlesActivity
import com.peterparameter.troper.domain.ArticleInfo
import org.jetbrains.anko.*
import org.jetbrains.anko.design.tabItem
import org.jetbrains.anko.design.tabLayout
import org.jetbrains.anko.support.v4.viewPager

class ArticlesView(private val articles: List<ArticleInfo>) : AnkoComponent<ArticlesActivity> {
    override fun createView(ui: AnkoContext<ArticlesActivity>) = ui.apply {
        viewPager {
            adapter = ArticlesPagerAdapter((context as FragmentActivity).supportFragmentManager, articles)

            tabLayout {
                articles.map{_ -> tabItem()}
            }
        }
    }.view
}
