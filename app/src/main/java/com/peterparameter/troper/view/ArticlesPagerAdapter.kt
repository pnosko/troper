package com.peterparameter.troper.view

import android.support.v4.app.Fragment
import android.support.v4.app.FragmentManager
import android.support.v4.app.FragmentPagerAdapter
import com.peterparameter.troper.domain.ArticleInfo
import com.peterparameter.troper.utils.instanceOf

class ArticlesPagerAdapter(fm: FragmentManager, articles: List<ArticleInfo>) : FragmentPagerAdapter(fm) {
    private var pages: List<Pair<ArticleInfo, Fragment>>

    init {
        val fragments = articles.map {
            instanceOf<ArticleContentFragment>(
                "content" to it.content
            )
        }
        pages = articles.zip(fragments)
    }

    override fun getItem(index: Int): Fragment = pages[index].second

    override fun getCount(): Int = pages.size

    override fun getPageTitle(position: Int): CharSequence? = pages[position].first.title
}