package com.peterparameter.troper.utils

import com.peterparameter.troper.domain.ArticleInfo
import com.peterparameter.troper.domain.Parser
import kotlinx.coroutines.Deferred
import org.http4k.client.JettyClient
import org.http4k.core.Method
import org.http4k.core.Request
import org.http4k.core.Uri
import org.http4k.core.then
import org.http4k.filter.ClientFilters
import org.jetbrains.anko.coroutines.experimental.bg

object TropesApi {
    suspend fun getParsedArticle(url: Uri): ArticleInfo {
        val htmlResponse = fetchArticleAsync(url).await()
        return Parser.parse(htmlResponse)
    }

    private fun fetchArticleAsync(url: Uri): Deferred<String> = bg {
        val client = ClientFilters.FollowRedirects().then(JettyClient())
        val request = Request(Method.GET, org.http4k.core.Uri.of(url.toString()))
        val response = client(request)
        response.bodyString()
    }
}