package com.peterparameter.troper.utils

import android.content.Context
import android.support.v4.app.Fragment
import arrow.core.*
import arrow.instances.`try`.monad.binding
import com.beust.klaxon.Klaxon
import com.peterparameter.troper.R
import com.peterparameter.troper.activities.ArticleListActivity
import com.peterparameter.troper.activities.ArticleViewActivity
import org.http4k.core.Uri
import org.jetbrains.anko.*

fun <T> identity(t: T): T { return t}

inline fun <reified T : Fragment> instanceOf(vararg params: Pair<String, Any>)
        = T::class.java.newInstance().apply {
    arguments = bundleOf(*params)
}

suspend fun loadNewArticle(url: Uri, ctx: Context) {
    val article = TropesApi.getParsedArticle(url).await()
    println(article)
    val intent = binding {
        val articleJson = serialize(listOf(article.bind()))
        ctx.intentFor<ArticleListActivity>("articles" to articleJson).singleTop()
    }
    intent.fold(
        { e -> ctx.toast(e.message!!) },
        { ctx.startActivity(it) }
    )
}

inline fun <reified T> serialize(contents: T) = Klaxon().toJsonString(contents)
inline fun <reified T> deserialize(contents: String): Option<T> = Klaxon().parse<T>(contents).toOption()