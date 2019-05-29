package com.peterparameter.troper.utils

import android.content.Context
import android.view.View
import android.webkit.WebView
import androidx.fragment.app.Fragment
import arrow.core.Option
import arrow.core.toOption
import com.beust.klaxon.Klaxon

fun <T> identity(t: T): T { return t}

inline fun <reified T : Fragment> instanceOf(vararg params: Pair<String, Any>)
        = T::class.java.newInstance().apply {
    arguments = androidx.core.os.bundleOf(*params)
}



fun createApi(): TropesApi = DummyTropesApi()

inline fun <reified T> serialize(contents: T) = Klaxon().toJsonString(contents)
inline fun <reified T> deserialize(contents: String): Option<T> = Klaxon().parse<T>(contents).toOption()
inline fun <reified T> deserializeList(contents: String): Option<List<T>> = Klaxon().parseArray<T>(contents).toOption()