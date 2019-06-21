package com.peterparameter.troper.activities

import android.os.Bundle
import androidx.fragment.app.FragmentActivity
import androidx.lifecycle.ViewModel
import com.peterparameter.troper.domain.ArticleSource
import com.peterparameter.troper.view.ArticleListView
import splitties.views.dsl.core.*
import splitties.bundle.BundleSpec
import splitties.bundle.bundle
import splitties.bundle.withExtras
import splitties.experimental.InternalSplittiesApi
import splitties.intents.ActivityIntentSpec
import splitties.intents.activitySpec
import kotlin.contracts.ExperimentalContracts

@InternalSplittiesApi
@ExperimentalContracts
class ArticleListActivity : FragmentActivity() {
    companion object : ActivityIntentSpec<ArticleListActivity, ArticlesSpec> by activitySpec(ArticlesSpec)

    object ArticlesSpec : BundleSpec() {
        var articles: List<ArticleSource> by bundle()
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        withExtras(ArticlesSpec) {

        }
//        val articlesJson = intent.
//        val articles = deserializeList<ArticleInfo>(articlesJson)
//        println(articles.isDefined())
////        setContentView(ArticlesView().createView().id)
        setContentView(ArticleListView(this, supportFragmentManager))
    }
}

class ArticleListViewModel(initialSources: List<ArticleSource> = emptyList()): ViewModel() {
    private val sources = MutableList(initialSources.size, initialSources::get)

    val articleSources: List<ArticleSource> = sources

    fun addItem(item: ArticleSource) {
        sources.add(item)
        // TODO: notify
    }
}