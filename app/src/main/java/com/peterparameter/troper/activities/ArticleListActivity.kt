package com.peterparameter.troper.activities

import android.os.Bundle
import androidx.fragment.app.FragmentActivity
import com.peterparameter.troper.domain.*
import com.peterparameter.troper.view.ArticleListView
import splitties.views.dsl.core.*
import splitties.bundle.BundleSpec
import splitties.bundle.bundle
import splitties.experimental.InternalSplittiesApi
import splitties.intents.ActivityIntentSpec
import splitties.intents.activitySpec
import kotlin.contracts.ExperimentalContracts
import com.peterparameter.troper.viewmodels.ArticleListViewModel
import splitties.arch.lifecycle.ObsoleteSplittiesLifecycleApi

@ObsoleteSplittiesLifecycleApi
@InternalSplittiesApi
@ExperimentalContracts
class ArticleListActivity : FragmentActivity() {
    companion object : ActivityIntentSpec<ArticleListActivity, ArticlesSpec> by activitySpec(ArticlesSpec)

//    private val articleListVM: ArticleListViewModel by activityScope {
//        val sources: List<ArticleSource> = withExtras(ArticlesSpec) {
//            articles
//        }
//
//        ArticleListViewModel(sources)
//    }

    object ArticlesSpec : BundleSpec() {
//        var articles: List<ArticleSource> by bundle()
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val ui = ArticleListView(this, supportFragmentManager, lifecycle, ArticleListViewModel())
        setContentView(ui)
    }
}