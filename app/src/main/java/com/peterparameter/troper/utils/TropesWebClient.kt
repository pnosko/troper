package com.peterparameter.troper.utils

import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import arrow.core.toOption
import com.peterparameter.troper.domain.ArticleAddedEvent
import com.peterparameter.troper.domain.ArticleUri
import kotlinx.coroutines.runBlocking
import org.http4k.core.Uri
import java.util.regex.Pattern

class TropesWebClient : WebViewClient() {
    private val tropesUrlPattern: Pattern = Pattern.compile("([.*]\\.)?tvtropes\\.org")

    private fun isTropesUrl(url: String): Boolean {
        val uri: Uri = Uri.of(url)
        return isRelativeUrl(uri) || tropesUrlPattern.matcher(uri.host).matches()
    }

    private fun isRelativeUrl(url: Uri): Boolean {
        return url.host.isEmpty()
    }

    private fun addNewArticle(url: String) {
        EventBus.post(ArticleAddedEvent(ArticleUri(url)))
    }

    override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
        val url = request?.url.toString()
        val shouldOverride = isTropesUrl(url)
        println(shouldOverride) // REMOVE
        if (shouldOverride) {
            addNewArticle(url)
            return true
        }
        return super.shouldOverrideUrlLoading(view, request)
    }
}