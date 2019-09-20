package com.peterparameter.troper.utils

import android.content.Context
import android.view.View
import android.webkit.WebView
import androidx.fragment.app.Fragment
import arrow.core.*
import com.beust.klaxon.Klaxon
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

fun <T> identity(t: T): T { return t}

inline fun <reified T : Fragment> instanceOf(vararg params: Pair<String, Any>)
        = T::class.java.newInstance().apply {
    arguments = androidx.core.os.bundleOf(*params)
}

typealias Attempt<T> = Either<Throwable, T>
typealias Id = Long

object Attempts {
    fun <T> eagerCatch(f: () -> T): Attempt<T> {
        return try {
            f().right()
        } catch (t: Throwable) {
            t.nonFatalOrThrow().left()
        }
    }
}

fun createApi(): TropesApi = DummyTropesApi()

inline fun <reified T> serialize(contents: T) = Klaxon().toJsonString(contents)
inline fun <reified T> deserialize(contents: String): Option<T> = Klaxon().parse<T>(contents).toOption()
inline fun <reified T> deserializeList(contents: String): Option<List<T>> = Klaxon().parseArray<T>(contents).toOption()