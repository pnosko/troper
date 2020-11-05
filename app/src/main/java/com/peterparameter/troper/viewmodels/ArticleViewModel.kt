package com.peterparameter.troper.viewmodels

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.peterparameter.troper.api.PersistentRetrievalApi
import com.peterparameter.troper.api.RetrievalApi
import com.peterparameter.troper.domain.Article
import com.peterparameter.troper.domain.ArticleLoadedEvent
import com.peterparameter.troper.domain.ArticleSource
import com.peterparameter.troper.domain.ArticleUri
import com.peterparameter.troper.persistence.ArticleRepository
import com.peterparameter.troper.persistence.ArticlesDatabase
import com.peterparameter.troper.persistence.RoomArticleRepository
import com.peterparameter.troper.utils.DummyTropesApi
import com.peterparameter.troper.utils.EventBus
import kotlinx.coroutines.*
import org.http4k.core.Uri

class ArticleViewModel(private val articleSource: ArticleUri) : ViewModel() {
    private val repository: ArticleRepository = RoomArticleRepository(ArticlesDatabase.invoke())
    // TODO: Inject
    private val tropesAPI: RetrievalApi = PersistentRetrievalApi(DummyTropesApi(), repository)

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

        val res = viewModelScope.async(Dispatchers.IO) { tropesAPI.retrieveArticle(Uri.of(articleSource.uri)).attempt().suspended() }
        viewModelScope.launch { res.await().fold(::onError, ::onSuccess) }
    }

    private fun onError(error: Throwable) {
        errorSettable.value = error.message
        isLoadingSettable.value = false
    }

    private fun onSuccess(article: Article) {
        articleMutable.value = article
        isLoadingSettable.value = false
        notifyArticleLoaded(article)
    }

    private fun notifyArticleLoaded(article: Article) {
        EventBus.post(ArticleLoadedEvent(articleSource, article))
    }
}