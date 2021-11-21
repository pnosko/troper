package com.peterparameter.troper.utils

import androidx.fragment.app.Fragment
import arrow.core.*
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.json.Json

fun <T> identity(t: T): T { return t }

inline fun <reified T : Fragment> instanceOf(vararg params: Pair<String, Any>)
        = T::class.java.newInstance().apply {
    arguments = androidx.core.os.bundleOf(*params)
}

typealias Attempt<T> = Either<Throwable, T>
typealias Id = Long

//inline fun <reified T> serialize(contents: T): String? = Json.encodeToString<T>(contents)
inline fun <reified T> deserialize(contents: String): T? = Either.catch { Json.decodeFromString<T>(contents) }.orNull()
inline fun <reified T> deserializeList(contents: String): List<T> = Json.decodeFromString(contents)