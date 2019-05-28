package com.peterparameter.troper.activities

import android.os.Bundle
import androidx.fragment.app.FragmentActivity
import com.peterparameter.troper.domain.ArticleInfo
import com.peterparameter.troper.domain.ArticleWrapper
import com.peterparameter.troper.utils.*
import com.peterparameter.troper.view.ArticlesView
import splitties.bundle.BundleSpec
import splitties.bundle.bundle
import splitties.bundle.withExtras
import splitties.intents.ActivityIntentSpec
import splitties.intents.activitySpec

class ArticlesActivity : FragmentActivity() {
    companion object : ActivityIntentSpec<ArticlesActivity, ArticlesSpec> by activitySpec(ArticlesSpec)

    object ArticlesSpec : BundleSpec() {
        var articles: List<String> by bundle()
    }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        withExtras(ArticlesSpec) {

        }
        val articlesJson = intent.getStringExtra("articles")
        val articles = deserializeList<ArticleInfo>(articlesJson)
        println(articles.isDefined())
        setContentView(ArticlesView().createView().id)
    }
}