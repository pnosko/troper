package com.peterparameter.troper.api

import arrow.fx.IO
import com.peterparameter.troper.domain.Article
import com.peterparameter.troper.domain.ArticleSource
import com.peterparameter.troper.utils.DummyTropesApi
import com.peterparameter.troper.utils.TropesApi
import org.http4k.core.Uri

interface RetrievalApi {
    fun retrieveArticle(uri: Uri): IO<Article>
    fun retrieveRandomArticle(): IO<Article>
}

class DummyApi: RetrievalApi {
    private val api: TropesApi = DummyTropesApi()

    override fun retrieveArticle(uri: Uri): IO<Article> = api.getRandomArticle()

    override fun retrieveRandomArticle(): IO<Article> = api.getRandomArticle()
}