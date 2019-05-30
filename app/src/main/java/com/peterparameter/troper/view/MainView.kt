package com.peterparameter.troper.view

import android.content.Context
import android.view.View
import android.widget.LinearLayout
import com.peterparameter.troper.R
import com.peterparameter.troper.utils.setupWith
import splitties.dimensions.dip
import splitties.views.dsl.coordinatorlayout.*
import splitties.views.dsl.core.*
import splitties.views.dsl.material.MaterialComponentsStyles
import splitties.views.gravityCenterHorizontal
import splitties.views.textAppearance
import splitties.views.textResource

class MainView(override val ctx: Context) : Ui {
    private val m = MaterialComponentsStyles(ctx)

    override val root: View = coordinatorLayout {
        fitsSystemWindows = true
        add(
            verticalLayout {
                add(m.button.text { textResource = R.string.random_caption }, lParams { gravity = gravityCenterHorizontal } )
//                add(favorites, lParams { gravity = gravityCenterHorizontal } )
            },
            defaultLParams { })
    }

//    val content = verticalLayout {
//        add(favorites, lParams {
//            gravity = gravityCenterHorizontal
//            topMargin = dip(8)
//        }).setupWith{ println(it)}
//        add(random, lParams {
//            gravity = gravityCenterHorizontal
//            topMargin = dip(8)
//        }).setupWith{ println(it)}
//        add(offline, lParams {
//            gravity = gravityCenterHorizontal
//            topMargin = dip(8)
//        })
//        add(recent, lParams {
//            gravity = gravityCenterHorizontal
//            topMargin = dip(8)
//        })
//    }

//    val favorites = m.button.text { textResource = R.string.favorites_caption }
    val random = m.button.text { textResource = R.string.random_caption }
//    val offline = button { textResource =  R.string.offline_caption }
//    val recent = button { textResource =  R.string.recent_caption }
//
//    private fun LinearLayout.placement() = lParams {
//        gravity = gravityCenterHorizontal
//        topMargin = dip(8)
//    }
}