package com.peterparameter.troper.view

import android.content.Context
import com.peterparameter.troper.R
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
            add(
                verticalLayout {
                    add(
                        m.button.text { textResource = R.string.random_caption },
                        lParams { gravity = gravityCenterHorizontal })
//                add(favorites, lParams { gravity = gravityCenterHorizontal } )
                },
                defaultLParams { })
        }
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