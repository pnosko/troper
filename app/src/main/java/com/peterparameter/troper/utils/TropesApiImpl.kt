package com.peterparameter.troper.utils

import arrow.effects.IO
import com.peterparameter.troper.domain.Article
import org.http4k.core.Uri

class TropesApiImpl : TropesApi {
    private val randomUri: Uri = Uri.of("https://tvtropes.org/pmwiki/randomitem.php")

    override fun getRandomArticle(): IO<Article> = getParsedArticle(randomUri)

    private var mainJS: String? = null



    override fun getParsedArticle(url: Uri): IO<Article> =
        IO.raiseError(NotImplementedError())
//            fetchAndParseArticle(url)

//    private suspend fun fetchAndParseArticle(url: Uri): Try<Article> {
//        val htmlResponse = fetchArticleAsync(url).await()
////        val script = fetchScript()
//        return htmlResponse.flatMap { Parser.parse(it, "").toTry() }
//
////        htmlResponse.flatMap { a ->
////            script.flatMap { s ->
////                Parser.parse(a, s).toTry()
////            }
////        }
//    }

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

//    private fun fetchArticleAsync(url: Uri): Deferred<Try<String>> =
//        bg {
//            val client = ClientFilters.FollowRedirects().then(JettyClient())
//            val request = Request(Method.GET, url)
//            val response = Try { client(request) }
//            response.map { it.bodyString() }
//        }
//
//    private fun fetchMainScriptAsync(): Deferred<Try<String>> =
//        bg {
//            val url = Uri.of("https://static.tvtropes.org/main.js")
//            val client = JettyClient()
//            val request = Request(Method.GET, url)
//            val response = Try { client(request) }
//            response.map { it.bodyString() }.filter { it.isNotEmpty() }
//        }
}