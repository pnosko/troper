package com.peterparameter.troper.view

import android.net.Uri
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import androidx.lifecycle.Lifecycle
import androidx.viewpager2.adapter.FragmentStateAdapter
import arrow.core.None
import arrow.core.Option
import arrow.core.toOption
import com.peterparameter.troper.domain.ArticleSource
import com.peterparameter.troper.domain.ArticleUri
import com.peterparameter.troper.utils.ElementAdded
import com.peterparameter.troper.utils.ElementRemoved
import com.peterparameter.troper.utils.getOrThrow
import com.peterparameter.troper.viewmodels.ArticleListViewModel
import io.reactivex.disposables.Disposable
import splitties.arch.lifecycle.ObsoleteSplittiesLifecycleApi
import splitties.experimental.InternalSplittiesApi
import kotlin.contracts.ExperimentalContracts


@ObsoleteSplittiesLifecycleApi
@ExperimentalContracts
@InternalSplittiesApi
class ArticlesPagerAdapter(
    fm: FragmentManager,
    lc: Lifecycle,
    private val articleListVM: ArticleListViewModel     // TODO: remove reference?
) : FragmentStateAdapter(fm, lc) {

    private var subscription: Disposable
    private val fragments: MutableList<ArticleFragment> = mutableListOf()

    override fun createFragment(position: Int): Fragment = fragments.getOrNull(position).toOption().getOrThrow()

    override fun getItemCount(): Int = fragments.size

    init {
        subscription = articleListVM.articleSourcesChanged.subscribe {
            when(it) {
                is ElementAdded -> add(it.added)
                is ElementRemoved -> remove(it.removed)
            }
        }
    }

    private fun add(article: ArticleSource) {
        val fragment = ArticleFragment.create(article)
        fragments.add(fragment)
        this.notifyDataSetChanged()
    }

    private fun remove(article: ArticleSource) {
        fragments.removeIf { it.articleSource === article }
        this.notifyDataSetChanged()
    }

    fun titleForIndex(position: Int): Option<String> {
        return articleListVM.articleSources.value.toOption().flatMap { titleFromSource(it[position]) }
    }

    // TODO: consider removing articlesource abstraction altogether
    private fun titleFromSource(articleSource: ArticleSource): Option<String> {
        return when(articleSource) {
            is ArticleUri   -> Uri.parse(articleSource.uri).lastPathSegment.toOption().map { it.replace("(.)([A-Z])", "$1 $2") }
            else            -> None
        }
    }
}