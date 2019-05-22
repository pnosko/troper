package com.peterparameter.troper.view

import android.content.Context
import android.view.View
import com.peterparameter.troper.R
import splitties.dimensions.dip
import splitties.views.dsl.coordinatorlayout.*
import splitties.views.dsl.core.*
import splitties.views.dsl.material.MaterialComponentsStyles
import splitties.views.gravityCenterHorizontal
import splitties.views.textResource

class MainView(override val ctx: Context) : Ui {
    private val m = MaterialComponentsStyles(ctx)


    val content: View = verticalLayout {
        add(
            m.button.text { textResource = R.string.favorites_caption },
            lParams {
                gravity = gravityCenterHorizontal
                topMargin = dip(8)
            }
        )
    }
    override val root: View = coordinatorLayout {
        fitsSystemWindows = true
    }
}