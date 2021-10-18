package com.peterparameter.troper.utils

import androidx.lifecycle.MutableLiveData
import arrow.core.Either
import arrow.core.Either.Right
import java.lang.NullPointerException


fun <T> T?.orThrow(): T = this ?: throw NullPointerException()
fun <T> T?.toAttempt(): Attempt<T> = this?.let(::Right) ?: Either.Left(NullPointerException())
fun <T> List<T>.zipWithIndex(): List<Pair<T, Int>> = this.zip(0.rangeTo(this.size))

fun <T> T?.isNull(): Boolean = this === null
fun <T> T?.notNull(): Boolean = !this.isNull()
fun <T> List<T?>.flatten(): List<T> = this.mapNotNull(::identity)
fun String.nullIfEmpty(): String? = if (this.isNullOrEmpty()) null else this

fun <T, U, R> mapNotNull(t: T?, u: U?, func: (T, U) -> R): R? = t?.let{ tt -> u?.let { uu -> func(tt, uu) } }
fun <T, U, V, R> mapNotNull(t: T?, u: U?, v: V?, func: (T, U, V) -> R): R? = t?.let{ tt -> u?.let { uu -> v?.let { vv -> func(tt, uu, vv) } } }

fun <T, C : MutableList<T>> MutableLiveData<C>.add(item: T) {
    val collection = this.value
    collection?.add(item)
    this.value = collection
}

fun <T, C : MutableList<T>> MutableLiveData<C>.remove(item: T) {
    val collection = this.value
    collection?.remove(item)
    this.value = collection
}
