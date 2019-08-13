package com.peterparameter.troper.view

import android.annotation.SuppressLint
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import androidx.fragment.app.FragmentStatePagerAdapter
import arrow.core.Option
import arrow.core.getOrElse
import arrow.core.toOption
import com.peterparameter.troper.domain.ArticleSource
import com.peterparameter.troper.utils.getOrThrow
import splitties.arch.lifecycle.ObsoleteSplittiesLifecycleApi
import splitties.arch.lifecycle.mapNotNull
import splitties.experimental.InternalSplittiesApi
import kotlin.contracts.ExperimentalContracts

@ObsoleteSplittiesLifecycleApi
@ExperimentalContracts
@InternalSplittiesApi
class LegacyArticlesPagerAdapter(
    fm: FragmentManager
    ) : FragmentStatePagerAdapter(fm) {

    private val fragments: MutableList<ArticleFragment> = mutableListOf()

    override fun getCount(): Int = fragments.size

    override fun getItem(position: Int): Fragment = fragments.getOrNull(position).toOption().getOrThrow()

    override fun getPageTitle(position: Int): CharSequence? = titleForIndex(position).getOrElse { "LOADING" }

    fun add(article: ArticleSource) {
        val fragment = ArticleFragment.create(article)
        fragments.add(fragment)
        notifyDataSetChanged()
    }

    @SuppressLint("NewApi")
    fun remove(article: ArticleSource) {
        //ugh
        fragments.removeIf { it.articleSource === article }
        notifyDataSetChanged()
    }

    fun titleForIndex(position: Int): Option<String> {
        return Option("")
    }
}