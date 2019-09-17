package com.peterparameter.troper.utils

import android.content.Context
import android.view.View
import androidx.annotation.IdRes
import androidx.annotation.StyleRes
import androidx.viewpager.widget.ViewPager
import androidx.viewpager2.widget.ViewPager2
import splitties.experimental.InternalSplittiesApi
import splitties.views.dsl.core.NO_THEME
import splitties.views.dsl.core.Ui
import splitties.views.dsl.core.view
import kotlin.contracts.ExperimentalContracts
import kotlin.contracts.InvocationKind
import kotlin.contracts.contract


@ExperimentalContracts
@InternalSplittiesApi
inline fun Context.viewPager(
    @IdRes id: Int = View.generateViewId(),
    @StyleRes theme: Int = NO_THEME,
    initView: ViewPager2.() -> Unit = {}
): ViewPager2 {
    contract { callsInPlace(initView, InvocationKind.EXACTLY_ONCE) }
    return view(id, theme, initView)
}

@InternalSplittiesApi
@ExperimentalContracts
inline fun Ui.viewPager(
    @IdRes id: Int = View.generateViewId(),
    @StyleRes theme: Int = NO_THEME,
    initView: ViewPager2.() -> Unit = {}
): ViewPager2 = ctx.viewPager(id, theme, initView)

@InternalSplittiesApi
@ExperimentalContracts
inline fun View.viewPager(
    @IdRes id: Int = View.generateViewId(),
    @StyleRes theme: Int = NO_THEME,
    initView: ViewPager2.() -> Unit = {}
): ViewPager2 = context.viewPager(id, theme, initView)


// TODO: LEGACY - remove
@ExperimentalContracts
@InternalSplittiesApi
inline fun Context.legacyViewPager(
    @IdRes id: Int = View.generateViewId(),
    @StyleRes theme: Int = NO_THEME,
    initView: ViewPager.() -> Unit = {}
): ViewPager {
    contract { callsInPlace(initView, InvocationKind.EXACTLY_ONCE) }
    return view(id, theme, initView)
}

@InternalSplittiesApi
@ExperimentalContracts
inline fun Ui.legacyViewPager(
    @IdRes id: Int = View.generateViewId(),
    @StyleRes theme: Int = NO_THEME,
    initView: ViewPager.() -> Unit = {}
): ViewPager = ctx.legacyViewPager(id, theme, initView)