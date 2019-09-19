package com.peterparameter.troper.api

import arrow.fx.IO
import arrow.fx.IO.Companion.effect
import com.peterparameter.troper.domain.*
import com.peterparameter.troper.persistence.ArticleRepository
import com.peterparameter.troper.utils.TropesApi
import org.http4k.core.Uri

class PersistentRetrievalApi(private val tropesApi: TropesApi, private val repo: ArticleRepository): RetrievalApi {
    override fun retrieve(articleSource: ArticleSource): IO<Article> =
        when(articleSource) {
            is RandomArticle -> tropesApi.getRandomArticle()
            is ArticleUri -> tropesApi.getParsedArticle(Uri.of(articleSource.uri))
            is DatabaseArticle -> effect { repo.getArticle(articleSource.id) }
            else -> IO.raiseError(Exception("Uknown source"))
        }
}