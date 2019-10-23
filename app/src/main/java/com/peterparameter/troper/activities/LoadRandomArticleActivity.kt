package com.peterparameter.troper.activities

import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.peterparameter.troper.domain.ArticleUri
import com.peterparameter.troper.view.ArticleFragment
import splitties.arch.lifecycle.ObsoleteSplittiesLifecycleApi
import splitties.experimental.InternalSplittiesApi
import splitties.views.dsl.core.frameLayout
import kotlin.contracts.ExperimentalContracts

@ObsoleteSplittiesLifecycleApi
@ExperimentalContracts
@InternalSplittiesApi
class LoadRandomArticleActivity: AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(layout)

        val ui = ArticleFragment.create(ArticleUri("/pmwiki/pmwiki.php/Main/MagicAIsMagicA"))
        val ft = supportFragmentManager.beginTransaction()
        ft.add(layout.id, ui).commit()
    }

    private val layout by lazy { frameLayout(View.generateViewId()) }
}