package com.peterparameter.troper

import android.net.Uri
import android.os.Bundle
import androidx.activity.compose.setContent
import androidx.appcompat.app.AppCompatActivity
import com.peterparameter.troper.activities.ArticleListActivity
import com.peterparameter.troper.utils.DummyTropesApi
import com.peterparameter.troper.view.ArticleContentView
import com.peterparameter.troper.view.MainView
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.runBlocking
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

        val article = runBlocking { DummyTropesApi().retrieveArticle(Uri.EMPTY) }
        setContent { ArticleContentView(article.orNull()!!) }
    }
}
