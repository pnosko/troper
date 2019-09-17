package com.peterparameter.troper.viewmodels

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.peterparameter.troper.domain.*
import com.peterparameter.troper.utils.*
import io.reactivex.Observable
import io.reactivex.subjects.*
import splitties.arch.lifecycle.ObsoleteSplittiesLifecycleApi
import splitties.arch.lifecycle.mapNotNull
import splitties.experimental.InternalSplittiesApi
import kotlin.contracts.ExperimentalContracts

@InternalSplittiesApi
@ExperimentalContracts
@ObsoleteSplittiesLifecycleApi
class ArticleListViewModel(initialSources: List<ArticleSource>): ViewModel() {
    private val articleSourceChangedSubject = ReplaySubject.create<CollectionChangedEvent<ArticleSource>>()
    private val sources = MutableLiveData(initialSources.toMutableList())

    init {
        initialSources.forEach(::addItem)
    }

    val articleSources: LiveData<List<ArticleSource>> = sources.mapNotNull { it }

    val articleSourcesChanged: Observable<CollectionChangedEvent<ArticleSource>> = articleSourceChangedSubject

    fun addItem(item: ArticleSource) {
        sources.add(item)
        articleSourceChangedSubject.onNext(ElementAdded(item))
    }

    fun removeItem(item: ArticleSource) {
        sources.remove(item)
        articleSourceChangedSubject.onNext(ElementRemoved(item))
    }
}