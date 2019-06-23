package com.peterparameter.troper.view

import android.content.Context
import android.widget.LinearLayout
import com.peterparameter.troper.R
import splitties.dimensions.dip
import splitties.views.dsl.coordinatorlayout.coordinatorLayout
import splitties.views.dsl.coordinatorlayout.defaultLParams
import splitties.views.dsl.core.Ui
import splitties.views.dsl.core.add
import splitties.views.dsl.core.lParams
import splitties.views.dsl.core.verticalLayout
import splitties.views.dsl.material.MaterialComponentsStyles
import splitties.views.*

class MainView(override val ctx: Context) : Ui {
    private val m = MaterialComponentsStyles(ctx)

    override val root by lazy {
        coordinatorLayout {
            fitsSystemWindows = true
//            addDefaultAppBar(ctx)

            add(content, defaultLParams { })
        }
    }

    val content by lazy {
        verticalLayout {
            add(favorites, placement())
            add(random, placement())
            add(offline, placement())
            add(recent, placement())
        }
    }

    val favorites = m.button.text { textResource = R.string.favorites_caption }
    val random = m.button.text { textResource = R.string.random_caption }
    val offline = m.button.text { textResource =  R.string.offline_caption }
    val recent =  m.button.text { textResource =  R.string.recent_caption }

    private fun LinearLayout.placement() = lParams {
        gravity = gravityCenterHorizontal
        topMargin = dip(8)
    }
}