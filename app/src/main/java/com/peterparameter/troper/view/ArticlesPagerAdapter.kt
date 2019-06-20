package com.peterparameter.troper.view

import androidx.fragment.app.*
import arrow.core.toOption
import com.peterparameter.troper.domain.ArticleSource
import com.peterparameter.troper.utils.*
import splitties.experimental.InternalSplittiesApi
import kotlin.contracts.ExperimentalContracts


@ExperimentalContracts
@InternalSplittiesApi
class ArticlesPagerAdapter(private val fm: FragmentManager,
                           private val articleSources: List<ArticleSource>,
                           private val parentViewId: Int) : FragmentStatePagerAdapter(fm) {

    override fun getItem(index: Int): Fragment = articleSources.getOrNull(index).toOption().map(ArticleFragment.Companion::create).getOrThrow()

    override fun getCount(): Int = articleSources.size

    override fun getPageTitle(position: Int): CharSequence? = ""
}