package com.peterparameter.troper.activities

import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import com.peterparameter.troper.domain.ArticleInfo
import com.peterparameter.troper.utils.deserialize
import com.peterparameter.troper.utils.getOrThrow
import com.peterparameter.troper.view.ArticlesView
import org.jetbrains.anko.setContentView

class ArticleListActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val articles = deserialize<List<ArticleInfo>>(savedInstanceState?.getString("articles")!!)
        ArticlesView(articles.getOrThrow()).setContentView(this)
    }
}