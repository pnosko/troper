package com.peterparameter.troper.api

import arrow.fx.IO
import arrow.fx.IO.Companion.effect
import arrow.fx.extensions.io.functor.unit
import arrow.fx.extensions.io.monad.flatTap
import arrow.fx.extensions.io.monad.ifM
import com.peterparameter.troper.domain.Article
import com.peterparameter.troper.persistence.ArticleRepository
import com.peterparameter.troper.utils.TropesApi
import org.http4k.core.Uri

class PersistentRetrievalApi(private val tropesApi: TropesApi, private val repo: ArticleRepository): RetrievalApi {
    override fun retrieveRandomArticle(): IO<Article> =
        tropesApi.getRandomArticle().flatTap(::persistIfNotExists)

    override fun retrieveArticle(uri: Uri): IO<Article> =
        tropesApi.getArticle(uri).flatTap(::persistIfNotExists)

    // TODO: refactor, I don't like this syntax; also, possibly push down to Repo impl
    private fun persistIfNotExists(article: Article) =
        effect { repo.getArticleInfoByUrl(article.title).map{ it.isOffline }.isEmpty() }
            .ifM (
                { effect { repo.upsertArticle(article) }.unit() },
                { IO.unit }
            )
}