package com.peterparameter.troper.utils

import androidx.lifecycle.MutableLiveData
import arrow.core.Option

fun <T> Option<T>.forEach(f: (T) -> Unit) {
    this.fold({null}, {f(it)})
}

fun <T> Option<T>.getOrThrow(): T = this.fold({throw NullPointerException("Option is empty.")}, {it})

fun <T> List<T>.zipWithIndex(): List<Pair<T, Int>> = this.zip(0.rangeTo(this.size))

fun Any?.isNull(): Boolean = this === null
fun Any?.notNull(): Boolean = !this.isNull()

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
