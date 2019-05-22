package com.peterparameter.troper.utils

import android.content.Context
import android.content.Intent
import androidx.fragment.app.*
import androidx.core.os.*
import arrow.core.*
import arrow.instances.`try`.monad.binding
import com.beust.klaxon.Klaxon
import com.peterparameter.troper.activities.ArticlesActivity
import org.http4k.core.Uri
import org.jetbrains.anko.*

fun <T> identity(t: T): T { return t}

inline fun <reified T : Fragment> instanceOf(vararg params: Pair<String, Any>)
        = T::class.java.newInstance().apply {
    arguments = androidx.core.os.bundleOf(*params)
}

fun createApi(): TropesApi = DummyTropesApi()

suspend fun loadNewArticle(url: Uri, ctx: Context) {
    val api = createApi()
    val article = api.getParsedArticle(url).await()
    val intent = binding {
        val articles = arrayOf(article.bind())
        val articlesJson = serialize(articles)
        ctx.intentFor<ArticlesActivity>("articles" to articlesJson).singleTop().setup { it.flags = Intent.FLAG_ACTIVITY_NEW_TASK }
    }
    intent.fold(
        { e -> ctx.toast(e.message!!) },
        { ctx.startActivity(it) }
    )
}

inline fun <reified T> serialize(contents: T) = Klaxon().toJsonString(contents)
inline fun <reified T> deserialize(contents: String): Option<T> = Klaxon().parse<T>(contents).toOption()
inline fun <reified T> deserializeList(contents: String): Option<List<T>> = Klaxon().parseArray<T>(contents).toOption()