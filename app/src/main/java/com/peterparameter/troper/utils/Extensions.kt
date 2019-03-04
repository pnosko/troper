package com.peterparameter.troper.utils

import arrow.core.Option

fun <T> T.setup(f: (T) -> Unit): T {
    f(this)
    return this
}

fun <T> Option<T>.forEach(f: (T) -> Unit) {
    this.fold({null}, {f(it)})
}
