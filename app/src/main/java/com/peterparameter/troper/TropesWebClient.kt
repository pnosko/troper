package com.peterparameter.troper

import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import arrow.core.getOrElse
import arrow.core.toOption
import com.peterparameter.troper.activities.ArticleViewActivity
import com.peterparameter.troper.utils.TropesApi
import kotlinx.coroutines.runBlocking
import org.http4k.core.Uri
import org.jetbrains.anko.internals.AnkoInternals
import java.util.regex.Pattern

class TropesWebClient : WebViewClient() {
    private val tropesUrlPattern: Pattern = Pattern.compile("([.*]\\.)?tvtropes\\.org")

    private fun isTropesUrl(url: Uri): Boolean {
        return tropesUrlPattern.matcher(url.host).matches()
    }

    override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
        val url = request?.url.toOption().map{Uri.of(it.toString())}
        val shouldOverride = url.map { isTropesUrl(it) }.getOrElse { false }
        if (shouldOverride) {
            runBlocking {
                val article = url.map{TropesApi.getParsedArticle(it)}
                val intent = article.map {
                    AnkoInternals.createIntent(view?.context!!, ArticleViewActivity::class.java, arrayOf("article" to it))
                }
                intent.map{view!!.context.startActivity(it)}
            }
            return true
        }
        return super.shouldOverrideUrlLoading(view, request)
    }
}