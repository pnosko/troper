package com.peterparameter.troper.utils

import arrow.core.Try
import arrow.core.toOption
import arrow.effects.DeferredK
import com.peterparameter.troper.domain.ArticleInfo
import com.peterparameter.troper.domain.Parser
import kotlinx.coroutines.Deferred
import org.http4k.client.JettyClient
import org.http4k.core.Method
import org.http4k.core.Request
import org.http4k.core.Uri
import org.http4k.core.then
import org.http4k.filter.ClientFilters

class TropesApiImpl : TropesApi {
    private var mainJS: String? = null

    override fun getParsedArticle(url: Uri): DeferredK<Try<ArticleInfo>> =
        DeferredK {
            fetchAndParseArticle(url)
        }

    private suspend fun fetchAndParseArticle(url: Uri): Try<ArticleInfo> {
        val htmlResponse = fetchArticleAsync(url).await()
//        val script = fetchScript()
        return htmlResponse.flatMap { Parser.parse(it, "").toTry() }

//        htmlResponse.flatMap { a ->
//            script.flatMap { s ->
//                Parser.parse(a, s).toTry()
//            }
//        }
    }

    private suspend fun fetchScript(): Try<String> {
        return if (mainJS.toOption().exists { it.isNotBlank() })
            Try.Success(mainJS!!)
        else {
            val script = fetchMainScriptAsync().await()
            if (script.isSuccess())
                mainJS = script.toOption().getOrThrow()
            script
        }
    }

    private fun fetchArticleAsync(url: Uri): Deferred<Try<String>> =
        bg {
            val client = ClientFilters.FollowRedirects().then(JettyClient())
            val request = Request(Method.GET, url)
            val response = Try { client(request) }
            response.map { it.bodyString() }
        }

    private fun fetchMainScriptAsync(): Deferred<Try<String>> =
        bg {
            val url = Uri.of("https://static.tvtropes.org/main.js")
            val client = JettyClient()
            val request = Request(Method.GET, url)
            val response = Try { client(request) }
            response.map { it.bodyString() }.filter { it.isNotEmpty() }
        }
}