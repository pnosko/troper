package com.peterparameter.troper.api

import arrow.fx.IO
import com.peterparameter.troper.domain.Article
import com.peterparameter.troper.domain.ArticleSource
import com.peterparameter.troper.utils.DummyTropesApi
import com.peterparameter.troper.utils.TropesApi

interface RetrievalApi {
    fun retrieve(articleSource: ArticleSource): IO<Article>
}

class DummyApi: RetrievalApi {
    private val api: TropesApi = DummyTropesApi()

    override fun retrieve(articleSource: ArticleSource): IO<Article> = api.getRandomArticle()
}