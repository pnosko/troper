package com.peterparameter.troper.utils

import android.content.Context
import androidx.appcompat.app.AppCompatActivity
import androidx.coordinatorlayout.widget.CoordinatorLayout
import splitties.views.appcompat.configActionBar
import splitties.views.appcompat.homeAsUp
import splitties.views.dsl.appcompat.toolbar
import splitties.views.dsl.coordinatorlayout.*
import splitties.views.dsl.core.add
import splitties.views.dsl.material.appBarLayout

fun CoordinatorLayout.addDefaultAppBar(ctx: Context) {
    add(appBarLayout(/*theme = R.style.AppTheme_AppBarOverlay*/) {
        add(toolbar {
//            popupTheme = R.style.AppTheme_PopupOverlay
            val activity = ctx as? AppCompatActivity ?: return@toolbar
            activity.setSupportActionBar(this)
            activity.configActionBar { homeAsUp = true }
        }, defaultLParams())
    }, appBarLParams())
}