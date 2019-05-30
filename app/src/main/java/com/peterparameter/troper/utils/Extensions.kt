package com.peterparameter.troper.utils

import arrow.core.Option
import arrow.core.Try

fun <T> T.setupWith(f: (T) -> Unit): T {
    f(this)
    return this
}

fun <T> Option<T>.forEach(f: (T) -> Unit) {
    this.fold({null}, {f(it)})
}

fun <T> Option<T>.getOrThrow(): T = this.fold({throw NullPointerException("Option is empty.")}, {it})

fun <T> Option<T>.toTry(): Try<T> = Try{this.getOrThrow()}

fun <T> List<T>.zipWithIndex(): List<Pair<T, Int>> = this.zip(0.rangeTo(this.size))
