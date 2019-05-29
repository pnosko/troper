package com.peterparameter.troper.utils

import android.content.Context
import android.view.View
import android.webkit.WebView
import androidx.annotation.IdRes
import androidx.annotation.StyleRes
import splitties.experimental.InternalSplittiesApi
import splitties.views.dsl.core.NO_THEME
import splitties.views.dsl.core.Ui
import splitties.views.dsl.core.view
import kotlin.contracts.ExperimentalContracts
import kotlin.contracts.InvocationKind
import kotlin.contracts.contract

@ExperimentalContracts
@InternalSplittiesApi
inline fun Context.webView(
    @IdRes id: Int = View.NO_ID,
    @StyleRes theme: Int = NO_THEME,
    initView: WebView.() -> Unit = {}
): WebView {
    contract { callsInPlace(initView, InvocationKind.EXACTLY_ONCE) }
    return view(id, theme, initView)
}

@InternalSplittiesApi
@ExperimentalContracts
inline fun Ui.webView(
    @IdRes id: Int = View.NO_ID,
    @StyleRes theme: Int = NO_THEME,
    initView: WebView.() -> Unit = {}
): WebView = ctx.webView(id, theme, initView)

@InternalSplittiesApi
@ExperimentalContracts
inline fun View.webView(
    @IdRes id: Int = View.NO_ID,
    @StyleRes theme: Int = NO_THEME,
    initView: WebView.() -> Unit = {}
): WebView = context.webView(id, theme, initView)