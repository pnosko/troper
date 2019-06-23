package com.peterparameter.troper.activities

import android.os.Bundle
import androidx.fragment.app.FragmentActivity
import com.peterparameter.troper.domain.*
import com.peterparameter.troper.utils.EventBus
import com.peterparameter.troper.view.ArticleListView
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

    private val articleListVM: ArticleListViewModel by activityScope()

    object ArticlesSpec : BundleSpec() {
        var articles: List<ArticleSource> by bundle()
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        withExtras(ArticlesSpec) {

        }
        val ui = ArticleListView(this, supportFragmentManager)

        val sub1 = EventBus.filter<ArticleAddedEvent>().subscribe {
            articleListVM.addItem(it.article)
            ui.addArticle(it.article)
        }

        val sub2 = EventBus.filter<ArticleRemovedEvent>().subscribe {
            articleListVM.removeItem(it.article)
            ui.removeArticle(it.article)
        }

        subscription = CompositeDisposable(sub1, sub2)
        setContentView(ui)
    }

    override fun onDestroy() {
        subscription.dispose()
        super.onDestroy()
    }
}