package com.peterparameter.troper.activities

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import arrow.core.Try
import com.peterparameter.troper.domain.ArticleInfo
import com.peterparameter.troper.domain.ArticleWrapper
import com.peterparameter.troper.utils.createApi
import com.peterparameter.troper.view.ArticleFragment
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.runBlocking
import splitties.experimental.InternalSplittiesApi
import splitties.toast.toast
import kotlin.coroutines.CoroutineContext
import kotlin.contracts.ExperimentalContracts

@ExperimentalContracts
@InternalSplittiesApi
class LoadRandomArticleActivity: AppCompatActivity(), CoroutineScope {
    override val coroutineContext: CoroutineContext
        get() = Dispatchers.IO

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val articleInfo = runBlocking { loadArticle() }
        articleInfo.fold(::showError, ::showArticle)
    }

    private fun showArticle(articleInfo: ArticleInfo) {
        val ui = ArticleFragment.create(articleInfo)
        setContentView(ui.view)
    }

    private fun showError(err: Throwable) {
        toast("${err.message}")
    }

    private suspend fun loadArticle(): Try<ArticleInfo> {
        val api = createApi()
        return api.getRandomArticle().await()
    }
}