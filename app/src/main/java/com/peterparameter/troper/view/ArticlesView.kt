package com.peterparameter.troper.view

import android.app.Activity
import android.content.Context
import android.support.v4.app.Fragment
import android.support.v4.app.FragmentActivity
import android.support.v4.app.FragmentManager
import android.support.v4.app.FragmentPagerAdapter
import android.widget.ArrayAdapter
import com.peterparameter.troper.activities.ArticleListActivity
import com.peterparameter.troper.domain.ArticleInfo
import com.peterparameter.troper.utils.instanceOf
import org.jetbrains.anko.*
import org.jetbrains.anko.design.tabItem
import org.jetbrains.anko.design.tabLayout
import org.jetbrains.anko.support.v4.viewPager

class ArticlesView(private val articles: List<ArticleInfo>) : AnkoComponent<ArticleListActivity> {
    override fun createView(ui: AnkoContext<ArticleListActivity>) = ui.apply {
        viewPager {
            adapter = ArticlesPagerAdapter((context as FragmentActivity).supportFragmentManager, articles)

            tabLayout {
                articles.map{_ -> tabItem()}
            }
        }
    }.view
}

class ArticlesPagerAdapter(fm: FragmentManager, articles: List<ArticleInfo>) : FragmentPagerAdapter(fm) {
    private var pages: List<Pair<ArticleInfo, Fragment>>

    init {
        val fragments = articles.map { instanceOf<ArticleContentFragment>(it.content to "content") }
        pages = articles.zip(fragments)
    }

    override fun getItem(index: Int): Fragment {
        return pages[index].second
    }

    override fun getCount(): Int {
        return pages.size
    }

}