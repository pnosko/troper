package com.peterparameter.troper.viewmodels

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.peterparameter.troper.api.TropesApi
import com.peterparameter.troper.domain.Article
import com.peterparameter.troper.persistence.ArticleRepository
import kotlinx.coroutines.*
import org.http4k.core.Uri

class ArticleViewModel() : ViewModel() {  // private val articleSource: ArticleUri
    private val repository: ArticleRepository? = null
    // TODO: Inject
    private val tropesAPI: TropesApi = throw NotImplementedError()

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

//        val res = viewModelScope.async(Dispatchers.IO) { tropesAPI.retrieveArticle(articleSource.uri) }
//        viewModelScope.launch { res.await().fold(::onError, ::onSuccess) }
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
//        EventBus.post(ArticleLoadedEvent(articleSource, article))
    }
}