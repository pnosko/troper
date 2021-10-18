package com.peterparameter.troper.utils

import arrow.core.Either
import arrow.core.getOrHandle
import com.peterparameter.troper.api.TropesApi
import com.peterparameter.troper.domain.*
import org.http4k.client.OkHttp
import android.net.Uri as LegacyUri
import org.http4k.core.*
import org.http4k.filter.ClientFilters

typealias ArticleContent = String

class TropesApiImpl : TropesApi {
    private val randomUri: Uri = Uri.of("https://tvtropes.org/pmwiki/randomitem.php")

    private suspend fun fetchAndParseArticle(url: Uri): Article {
        val articleContent = fetchArticleContent(url)
        return Parser.parse(url.toString(), articleContent).getOrHandle{ e -> throw e }
    }

    private suspend fun fetchArticleContent(url: Uri): ArticleContent {
        val client = ClientFilters.FollowRedirects().then(OkHttp())
        val request = Request(Method.GET, url)
        return client(request).bodyString()
    }

    override suspend fun retrieveArticle(source: LegacyUri): Attempt<Article> {
        return Either.Left(NotImplementedError())
    }
}