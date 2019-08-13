package com.peterparameter.troper.view

import android.annotation.SuppressLint
import android.net.Uri
import androidx.fragment.app.*
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.LifecycleRegistry
import androidx.viewpager2.adapter.FragmentStateAdapter
import arrow.core.None
import arrow.core.Option
import arrow.core.getOrElse
import arrow.core.toOption
import com.peterparameter.troper.domain.ArticleSource
import com.peterparameter.troper.domain.ArticleUri
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
    articleSources: List<ArticleSource> = emptyList(),
    fm: FragmentManager,
    lc: Lifecycle
) : FragmentStateAdapter(fm, lc) {

    private val fragments: MutableList<ArticleFragment> = articleSources.map(::createNewFragment).toMutableList()

    override fun createFragment(position: Int): Fragment = fragments.getOrNull(position).toOption().getOrThrow()

    override fun getItemCount(): Int = fragments.size

    fun add(article: ArticleSource) {
        val fragment = createNewFragment(article)
        fragments.add(fragment)
    }

    @SuppressLint("NewApi")
    fun remove(article: ArticleSource) {
        //ugh
        fragments.removeIf { it.articleSource === article }
    }

    fun titleForIndex(position: Int): Option<String> {
        return fragments.getOrNull(position).toOption().flatMap { titleFromSource(it.articleSource) }
    }

    private fun titleFromSource(articleSource: ArticleSource): Option<String> {
        return when(articleSource) {
            is ArticleUri   -> Uri.parse(articleSource.uri).lastPathSegment.toOption().map { it.replace("(.)([A-Z])", "$1 $2") }
            else            -> None
        }
    }

    private fun createNewFragment(articleSource: ArticleSource) = ArticleFragment.create(articleSource)
}