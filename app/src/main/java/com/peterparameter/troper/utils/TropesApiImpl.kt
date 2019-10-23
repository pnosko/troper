package com.peterparameter.troper.utils

import arrow.fx.IO
import arrow.fx.IO.Companion.effect
import com.peterparameter.troper.domain.Article
import com.peterparameter.troper.domain.Parser
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.http4k.client.JettyClient
import org.http4k.core.*
import org.http4k.filter.ClientFilters

typealias ArticleContent = String

class TropesApiImpl : TropesApi {
    private val randomUri: Uri = Uri.of("https://tvtropes.org/pmwiki/randomitem.php")

    override fun getRandomArticle(): IO<Article> = getParsedArticle(randomUri)

    private var mainJS: String? = null

    override fun getParsedArticle(url: Uri): IO<Article> =
          effect { fetchAndParseArticle(url) }

    private suspend fun fetchAndParseArticle(url: Uri): Article {
        val articleContent = fetchArticleContentAsync(url)
        return Parser.parse(url.toString(), articleContent, "").getOrThrow()
    }

//    private suspend fun fetchScript(): Try<String> {
//        return if (mainJS.toOption().exists { it.isNotBlank() })
//            Try.Success(mainJS!!)
//        else {
//            val script = fetchMainScriptAsync().await()
//            if (script.isSuccess())
//                mainJS = script.toOption().getOrThrow()
//            script
//        }
//    }

    private suspend fun fetchArticleContentAsync(url: Uri): ArticleContent =
        withContext(Dispatchers.IO) {
            val client = ClientFilters.FollowRedirects().then(JettyClient())
            val request = Request(Method.GET, url)
            client(request).bodyString()
        }

//    private fun fetchMainScriptAsync(): Deferred<Try<String>> =
//        bg {
//            val url = Uri.of("https://static.tvtropes.org/main.js")
//            val client = JettyClient()
//            val request = Request(Method.GET, url)
//            val response = Try { client(request) }
//            response.map { it.bodyString() }.filter { it.isNotEmpty() }
//        }
}