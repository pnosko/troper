package com.peterparameter.troper.view

import androidx.fragment.app.*
import arrow.core.toOption
import com.peterparameter.troper.domain.ArticleSource
import com.peterparameter.troper.utils.*
import splitties.arch.lifecycle.ObsoleteSplittiesLifecycleApi
import splitties.experimental.InternalSplittiesApi
import kotlin.contracts.ExperimentalContracts


@ObsoleteSplittiesLifecycleApi
@ExperimentalContracts
@InternalSplittiesApi
class ArticlesPagerAdapter(
    fm: FragmentManager
) : FragmentStatePagerAdapter(fm) {

    private val fragments: MutableList<ArticleFragment> = mutableListOf()

    override fun getItem(index: Int): Fragment = fragments.getOrNull(index).toOption().getOrThrow()

    override fun getCount(): Int = fragments.size

    override fun getPageTitle(position: Int): CharSequence? = "" //fragments[position].articleVM.

    fun add(article: ArticleSource) {
        fragments.add(ArticleFragment.create(article))
        notifyDataSetChanged()
    }

    fun remove(article: ArticleSource) {
        fragments.remove(ArticleFragment.create(article))
        notifyDataSetChanged()
    }
}