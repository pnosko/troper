package com.peterparameter.troper

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.peterparameter.troper.activities.ArticleListActivity
import com.peterparameter.troper.activities.LoadRandomArticleActivity
import com.peterparameter.troper.domain.RandomArticle
import com.peterparameter.troper.view.MainView
import splitties.arch.lifecycle.ObsoleteSplittiesLifecycleApi
import splitties.experimental.InternalSplittiesApi
import splitties.intents.start
import splitties.toast.toast
import splitties.views.dsl.core.Ui
import splitties.views.dsl.core.setContentView
import splitties.views.onClick
import kotlin.contracts.ExperimentalContracts

@ObsoleteSplittiesLifecycleApi
@InternalSplittiesApi
@ExperimentalContracts
class MainActivity : AppCompatActivity(){

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(createUi())
    }

    private fun createUi(): Ui {
        val ui = MainView(this)

        ui.random.onClick {
            start(ArticleListActivity){ _, extrasSpec ->
                extrasSpec.articles = listOf(RandomArticle)
            }
        }
        ui.favorites.onClick { toast("Favorites!!") }
        return ui
    }
}
