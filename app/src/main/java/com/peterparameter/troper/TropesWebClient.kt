package com.peterparameter.troper

import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import arrow.core.getOrElse
import arrow.core.toOption
import com.peterparameter.troper.utils.forEach
import com.peterparameter.troper.utils.loadNewArticle
import kotlinx.coroutines.runBlocking
import org.http4k.core.Uri
import java.util.regex.Pattern

class TropesWebClient : WebViewClient() {
    private val tropesUrlPattern: Pattern = Pattern.compile("([.*]\\.)?tvtropes\\.org")

    private fun isTropesUrl(url: Uri): Boolean {
        return isRelativeUrl(url) || tropesUrlPattern.matcher(url.host).matches()
    }

    private fun isRelativeUrl(url: Uri): Boolean {
        return url.host.isEmpty()
    }

    override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
        val url = request?.url.toOption().map{Uri.of(it.toString())}
        val shouldOverride = url.map { isTropesUrl(it) }.getOrElse { false }
        println(shouldOverride) // REMOVE
        if (shouldOverride) {
            val ctx =  view!!.context
            url.forEach {
                runBlocking {
                    loadNewArticle(it, ctx)
                }
            }
            return true
        }
        return super.shouldOverrideUrlLoading(view, request)
    }
}