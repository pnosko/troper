package com.peterparameter.troper.view

import android.annotation.SuppressLint
import androidx.fragment.app.*
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.LifecycleRegistry
import androidx.viewpager2.adapter.FragmentStateAdapter
import arrow.core.Option
import arrow.core.getOrElse
import arrow.core.toOption
import com.peterparameter.troper.domain.ArticleSource
import com.peterparameter.troper.utils.*
import splitties.arch.lifecycle.ObsoleteSplittiesLifecycleApi
import splitties.arch.lifecycle.map
import splitties.arch.lifecycle.mapNotNull
import splitties.experimental.InternalSplittiesApi
import kotlin.contracts.ExperimentalContracts


@ObsoleteSplittiesLifecycleApi
@ExperimentalContracts
@InternalSplittiesApi
class ArticlesPagerAdapter(
    fm: FragmentManager,
    lc: Lifecycle
) : FragmentStateAdapter(fm, lc) {

    private val fragments: MutableList<ArticleFragment> = mutableListOf()

    override fun createFragment(position: Int): Fragment = fragments.getOrNull(position).toOption().getOrThrow()

    override fun getItemCount(): Int = fragments.size

    fun add(article: ArticleSource) {
        val fragment = ArticleFragment.create(article)
        fragments.add(fragment)
    }

    @SuppressLint("NewApi")
    fun remove(article: ArticleSource) {
        //ugh
        fragments.removeIf { it.articleSource === article }
    }

    fun titleForIndex(position: Int): Option<String> {
        return fragments.getOrNull(position).toOption()
            .filter { it.isInitialized }
            .flatMap {
                it.articleVM.article.mapNotNull { it.title }.value.toOption()
            }
    }
}