package com.peterparameter.troper.viewmodels

import androidx.lifecycle.ViewModel
import arrow.effects.rx2.ObservableK
import arrow.effects.rx2.k
import com.peterparameter.troper.domain.*
import io.reactivex.subjects.ReplaySubject

// TODO: Is this useless??
class ArticleListViewModel(initialSources: List<ArticleSource> = emptyList()): ViewModel() {
    private val sources = initialSources.toMutableList()
    private val collectionChangeSubject =
        ReplaySubject.create<ArticleListEvent>()

    val articleSources: List<ArticleSource> = sources

    val collectionChangeEventStream: ObservableK<ArticleListEvent> = collectionChangeSubject.k()

    fun addItem(item: ArticleSource) {
        sources.add(item)
        collectionChangeSubject.onNext(ArticleAddedEvent(item))
    }

    fun removeItem(item: ArticleSource) {
        sources.remove(item)
        collectionChangeSubject.onNext(ArticleRemovedEvent(item))
    }
}