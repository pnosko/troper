package com.peterparameter.troper.activities

import android.os.Bundle
import android.support.v4.app.FragmentActivity
import android.support.v7.app.AppCompatActivity
import com.peterparameter.troper.domain.ArticleInfo
import com.peterparameter.troper.utils.deserialize
import com.peterparameter.troper.utils.deserializeList
import com.peterparameter.troper.utils.getOrThrow
import com.peterparameter.troper.view.ArticlesView
import org.jetbrains.anko.setContentView

class ArticlesActivity : FragmentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val articlesJson = intent.getStringExtra("articles")
        val articles = deserializeList<ArticleInfo>(articlesJson)
        println(articles.isDefined())
        ArticlesView(articles.getOrThrow().toList()).setContentView(this)
    }
}