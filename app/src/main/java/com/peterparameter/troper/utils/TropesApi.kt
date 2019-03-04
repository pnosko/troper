package com.peterparameter.troper.utils

import arrow.core.Try
import com.peterparameter.troper.domain.ArticleInfo
import com.peterparameter.troper.domain.Parser
import arrow.effects.*
import kotlinx.coroutines.Deferred
import org.http4k.client.JettyClient
import org.http4k.core.Method
import org.http4k.core.Request
import org.http4k.core.Uri
import org.http4k.core.then
import org.http4k.filter.ClientFilters
import org.jetbrains.anko.coroutines.experimental.bg

object TropesApi {

    fun getParsedArticle(url: Uri): DeferredK<Try<ArticleInfo>> = DeferredK {
        fetchAndParseArticle(url)
    }

    private suspend fun fetchAndParseArticle(url: Uri): Try<ArticleInfo> {
        val htmlResponse = fetchArticleAsync(url).await()
        return htmlResponse.map(Parser::parse)
    }

    private fun fetchArticleAsync(url: Uri): Deferred<Try<String>> = bg {
        val client = ClientFilters.FollowRedirects().then(JettyClient())
        val request = Request(Method.GET, url)
        val response = Try { client(request) }
        response.map { it.bodyString() }
    }
}