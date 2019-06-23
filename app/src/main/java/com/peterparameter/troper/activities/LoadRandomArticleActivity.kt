package com.peterparameter.troper.activities

import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import arrow.core.Either
import arrow.core.Try
import com.peterparameter.troper.domain.ArticleInfo
import com.peterparameter.troper.domain.ArticleWrapper
import com.peterparameter.troper.domain.RandomArticle
import com.peterparameter.troper.utils.createApi
import com.peterparameter.troper.view.ArticleFragment
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.runBlocking
import org.http4k.core.Uri
import splitties.arch.lifecycle.ObsoleteSplittiesLifecycleApi
import splitties.experimental.InternalSplittiesApi
import splitties.toast.toast
import splitties.views.dsl.core.frameLayout
import kotlin.coroutines.CoroutineContext
import kotlin.contracts.ExperimentalContracts

@ObsoleteSplittiesLifecycleApi
@ExperimentalContracts
@InternalSplittiesApi
class LoadRandomArticleActivity: AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(layout)

        val ui = ArticleFragment.create(RandomArticle)
        val ft = supportFragmentManager.beginTransaction()
        ft.add(layout.id, ui).commit()
    }

    private val layout by lazy { frameLayout(View.generateViewId()) }
}