package com.peterparameter.troper.view

import androidx.fragment.app.*
import arrow.core.toOption
import com.peterparameter.troper.domain.ArticleSource
import com.peterparameter.troper.utils.*
import splitties.experimental.InternalSplittiesApi
import kotlin.contracts.ExperimentalContracts


@ExperimentalContracts
@InternalSplittiesApi
class ArticlesPagerAdapter(
    fm: FragmentManager,
    private val articleSources: MutableList<ArticleSource> = emptyList<ArticleSource>() as MutableList<ArticleSource>
) : FragmentStatePagerAdapter(fm) {

    override fun getItem(index: Int): Fragment = articleSources.getOrNull(index).toOption().map(ArticleFragment.Companion::create).getOrThrow()

    override fun getCount(): Int = articleSources.size

    override fun getPageTitle(position: Int): CharSequence? = ""

    fun add(article: ArticleSource) {
        articleSources.add(article)
        notifyDataSetChanged()
    }

    fun remove(article: ArticleSource) {
        articleSources.remove(article)
        notifyDataSetChanged()
    }
}