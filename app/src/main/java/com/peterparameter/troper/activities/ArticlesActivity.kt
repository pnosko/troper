package com.peterparameter.troper.activities

import android.os.Bundle
import androidx.fragment.app.FragmentActivity
import com.peterparameter.troper.domain.ArticleInfo
import com.peterparameter.troper.utils.*
import com.peterparameter.troper.view.ArticlesView

class ArticlesActivity : FragmentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val articlesJson = intent.getStringExtra("articles")
        val articles = deserializeList<ArticleInfo>(articlesJson)
        println(articles.isDefined())
        setContentView(ArticlesView().createView().id)
    }
}