package com.peterparameter.troper.api

import arrow.fx.IO
import arrow.fx.IO.Companion.effect
import arrow.fx.extensions.io.functor.unit
import arrow.fx.extensions.io.monad.flatTap
import arrow.fx.extensions.io.monad.ifM
import com.peterparameter.troper.domain.*
import com.peterparameter.troper.persistence.ArticleRepository
import com.peterparameter.troper.utils.TropesApi
import com.peterparameter.troper.utils.getOrThrow
import org.http4k.core.Uri

class PersistentRetrievalApi(private val tropesApi: TropesApi, private val repo: ArticleRepository): RetrievalApi {
    override fun retrieve(articleSource: ArticleSource): IO<Article> =
        when(articleSource) {
            is RandomArticle -> tropesApi.getRandomArticle().flatTap(::persistIfNotExists)
            is ArticleUri -> tropesApi.getParsedArticle(Uri.of(articleSource.uri)).flatTap(::persistIfNotExists)
            is DatabaseArticle -> effect { repo.getArticle(articleSource.id).getOrThrow() }     // TODO: don't throw.
            else -> IO.raiseError(Exception("Uknown source"))
        }

    // TODO: refactor, I don't like this syntax; also, possibly push down to Repo impl
    private fun persistIfNotExists(article: Article) =
        effect { repo.getArticleDescriptorByTitle(article.title).isEmpty() }
            .ifM (
                { effect { repo.saveArticle(article) }.unit() },
                { IO.unit }
            )
}