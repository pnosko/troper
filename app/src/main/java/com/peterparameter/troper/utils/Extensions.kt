package com.peterparameter.troper.utils

import arrow.core.Option
import arrow.core.Try

fun <T> T.setup(f: (T) -> Unit): T {
    f(this)
    return this
}

fun <T> Option<T>.forEach(f: (T) -> Unit) {
    this.fold({null}, {f(it)})
}

fun <T> Option<T>.getOrThrow(): T {
    return this.fold({throw NullPointerException("Option is empty.")}, {it})
}

fun <T> Option<T>.toTry(): Try<T> {
    return Try{this.getOrThrow()}
}
