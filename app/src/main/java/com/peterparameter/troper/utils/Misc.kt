package com.peterparameter.troper.utils

import android.content.Context
import arrow.instances.`try`.monad.binding
import com.beust.klaxon.Klaxon
import com.peterparameter.troper.activities.ArticleViewActivity
import org.http4k.core.Uri
import org.jetbrains.anko.intentFor
import org.jetbrains.anko.singleTop
import org.jetbrains.anko.toast

fun <T> identity(t: T): T { return t}

suspend fun loadNewArticle(url: Uri, ctx: Context) {
    val article = TropesApi.getParsedArticle(url).await()
    val intent = binding {
        val contents = article.bind()
        val articleJson = Klaxon().toJsonString(contents)
        ctx.intentFor<ArticleViewActivity>("articleJson" to articleJson).singleTop()
    }
    intent.fold(
        { e -> ctx.toast(e.message!!) },
        { ctx.startActivity(it) }
    )
}