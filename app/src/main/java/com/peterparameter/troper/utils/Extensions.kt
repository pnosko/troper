package com.peterparameter.troper.utils

fun <T> T.setup(f: (T) -> Unit): T {
    f(this)
    return this
}
