package com.peterparameter.troper.activities

import android.os.Bundle
import androidx.fragment.app.FragmentActivity
import com.peterparameter.troper.domain.*
import com.peterparameter.troper.utils.EventBus
import com.peterparameter.troper.view.ArticleListView
import com.peterparameter.troper.view.DummyFragment
import com.peterparameter.troper.view.DummyPagerAdapter
import splitties.views.dsl.core.*
import splitties.bundle.BundleSpec
import splitties.bundle.bundle
import splitties.bundle.withExtras
import splitties.experimental.InternalSplittiesApi
import splitties.intents.ActivityIntentSpec
import splitties.intents.activitySpec
import kotlin.contracts.ExperimentalContracts
import com.peterparameter.troper.viewmodels.ArticleListViewModel
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.disposables.Disposable
import splitties.arch.lifecycle.ObsoleteSplittiesLifecycleApi
import splitties.arch.lifecycle.activityScope

@ObsoleteSplittiesLifecycleApi
@InternalSplittiesApi
@ExperimentalContracts
class ArticleListActivity : FragmentActivity() {
    companion object : ActivityIntentSpec<ArticleListActivity, ArticlesSpec> by activitySpec(ArticlesSpec)

    private lateinit var subscription: Disposable

    private val articleListVM: ArticleListViewModel by activityScope {
        val sources: List<ArticleSource> = withExtras(ArticlesSpec) {
            articles
        }

        ArticleListViewModel(sources, supportFragmentManager, lifecycle)
    }

    object ArticlesSpec : BundleSpec() {
        var articles: List<ArticleSource> by bundle()
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val ui = ArticleListView(this, articleListVM.pagerAdapter)

        subscription = CompositeDisposable(
            EventBus.filter<ArticleAddedEvent>().subscribe { addArticleSource(ui, it.articleSource) },
            EventBus.filter<ArticleRemovedEvent>().subscribe { removeArticleSource(ui, it.articleSource) }
        )

        withExtras(ArticlesSpec) {
            articles.forEach{ EventBus.post(ArticleAddedEvent(it)) }
        }

        setContentView(ui)
    }

    private fun addArticleSource(ui: ArticleListView, articleSource: ArticleSource) {
        articleListVM.addItem(articleSource)
        ui.addArticleSource(articleSource)
    }

    private fun removeArticleSource(ui: ArticleListView, articleSource: ArticleSource) {
        articleListVM.removeItem(articleSource)
        ui.removeArticle(articleSource)
    }

    override fun onDestroy() {
        subscription.dispose()
        super.onDestroy()
    }
}