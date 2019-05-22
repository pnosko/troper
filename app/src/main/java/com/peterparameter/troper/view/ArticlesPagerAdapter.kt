package com.peterparameter.troper.view

import androidx.fragment.app.*
import arrow.core.toOption
import com.peterparameter.troper.domain.ArticleInfo
import com.peterparameter.troper.utils.*

class ArticlesPagerAdapter(private val fm: FragmentManager,
                           private val articles: List<ArticleInfo>,
                           private val parentViewId: Int) : FragmentStatePagerAdapter(fm) {

    init {
        val fragments = articles.map {
            instanceOf<ArticleContentFragment>("content" to it.content)
        }
        fragments.zipWithIndex().forEach { fm.beginTransaction().add(parentViewId ,it.first, it.second.toString()).commit() }
    }

    override fun getItem(index: Int): Fragment = fm.findFragmentByTag(index.toString()).toOption().getOrThrow()

    override fun getCount(): Int = articles.size

    override fun getPageTitle(position: Int): CharSequence? = articles[position].title
}