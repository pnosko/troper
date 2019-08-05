package com.peterparameter.troper.viewmodels

import androidx.fragment.app.FragmentManager
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.peterparameter.troper.domain.*
import com.peterparameter.troper.utils.EventBus
import com.peterparameter.troper.utils.remove
import com.peterparameter.troper.utils.add
import com.peterparameter.troper.view.ArticlesPagerAdapter
import splitties.arch.lifecycle.ObsoleteSplittiesLifecycleApi
import splitties.arch.lifecycle.mapNotNull
import splitties.experimental.InternalSplittiesApi
import kotlin.contracts.ExperimentalContracts

@InternalSplittiesApi
@ExperimentalContracts
@ObsoleteSplittiesLifecycleApi
class ArticleListViewModel(initialSources: List<ArticleSource> = emptyList(), fragmentManager: FragmentManager, lifecycle: Lifecycle): ViewModel() {
    private val sources = MutableLiveData(initialSources.toMutableList())

    private val articlesModifiable = MutableLiveData<MutableList<Article>>(mutableListOf())

    private var subscription = EventBus.filter<ArticleLoaded>().subscribe(::onArticleLoaded)

    val articleSources: LiveData<List<ArticleSource>> = sources.mapNotNull { it }

    val articles: LiveData<List<Article>> = articlesModifiable.mapNotNull { it }

    val pagerAdapter by lazy {
        ArticlesPagerAdapter(initialSources, fragmentManager, lifecycle)
    }

    fun addItem(item: ArticleSource) {
        sources.add(item)
    }

    fun removeItem(item: ArticleSource) {
        sources.remove(item)
    }

    private fun onArticleLoaded(evt: ArticleLoaded) {
        val article = evt.article
        articlesModifiable.add(article)
    }

    override fun onCleared() {
        super.onCleared()
        subscription.dispose()
    }
}