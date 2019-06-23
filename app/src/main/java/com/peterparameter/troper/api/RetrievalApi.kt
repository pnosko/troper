package com.peterparameter.troper.api

import arrow.effects.IO
import com.peterparameter.troper.domain.ArticleInfo
import com.peterparameter.troper.domain.ArticleSource
import com.peterparameter.troper.utils.DummyTropesApi
import com.peterparameter.troper.utils.TropesApi

interface RetrievalApi {
    fun retrieve(articleSource: ArticleSource): IO<ArticleInfo>
}

class DummyApi: RetrievalApi {
    private val api: TropesApi = DummyTropesApi()

    override fun retrieve(articleSource: ArticleSource): IO<ArticleInfo> = api.getRandomArticle()
}