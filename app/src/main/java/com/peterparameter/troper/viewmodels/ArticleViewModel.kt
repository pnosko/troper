package com.peterparameter.troper.viewmodels

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.peterparameter.troper.api.DummyApi
import com.peterparameter.troper.api.RetrievalApi
import com.peterparameter.troper.domain.Article
import com.peterparameter.troper.domain.ArticleLoadedEvent
import com.peterparameter.troper.domain.ArticleSource
import com.peterparameter.troper.persistence.ArticleRepository
import com.peterparameter.troper.persistence.ArticlesDatabase
import com.peterparameter.troper.persistence.RoomArticleRepository
import com.peterparameter.troper.utils.EventBus
import kotlinx.coroutines.*

class ArticleViewModel(private val articleSource: ArticleSource) : ViewModel() {
    // TODO: Inject
    private val tropesAPI: RetrievalApi = DummyApi()
    private val repository: ArticleRepository = RoomArticleRepository(ArticlesDatabase.invoke())

    private val articleMutable = MutableLiveData<Article>()
    val article: LiveData<Article> = articleMutable

    private val isLoadingSettable = MutableLiveData(false)
    val isLoading: LiveData<Boolean> = isLoadingSettable

    private val errorSettable = MutableLiveData<String>()
    val error: LiveData<String> = errorSettable

    init {
        loadArticle()
    }

    private fun loadArticle() {
        this.isLoadingSettable.value = true
        errorSettable.value = null

        val res = viewModelScope.async(Dispatchers.IO) { tropesAPI.retrieve(articleSource).attempt().suspended() }
        viewModelScope.launch { res.await().fold(::onError, ::onSuccess) }
    }

    private fun onError(error: Throwable) {
        errorSettable.value = error.message
        isLoadingSettable.value = false
    }

    private fun onSuccess(article: Article) {
        articleMutable.value = article
        isLoadingSettable.value = false
        persistArticle(article)
        notifyArticleLoaded(article)
    }

    private fun persistArticle(article: Article) {
        // TODO: Error handling, effect mgmt
        viewModelScope.launch { repository.saveArticle(article) }
    }

    private fun notifyArticleLoaded(article: Article) {
        EventBus.post(ArticleLoadedEvent(articleSource, article))
    }
}