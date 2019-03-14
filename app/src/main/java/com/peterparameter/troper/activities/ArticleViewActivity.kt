package com.peterparameter.troper.activities

import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import com.peterparameter.troper.TropesWebClient
import com.peterparameter.troper.domain.ArticleInfo
import com.peterparameter.troper.utils.*
import org.jetbrains.anko.*

class ArticleViewActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val articleJson = intent.getStringExtra("articleJson")
        val article = deserialize<ArticleInfo>(articleJson)
        ActicleView2(article.getOrThrow()).setContentView(this)
    }
}

class ActicleView2(val article: ArticleInfo) : AnkoComponent<ArticleViewActivity> {

    override fun createView(ui: AnkoContext<ArticleViewActivity>) = ui.apply {
        verticalLayout{
            val articleView = webView().setup {
                it.webViewClient = TropesWebClient()
                it.settings.setJavaScriptEnabled(true)
                it.settings.setLoadsImagesAutomatically(true)
            }
            articleView.loadData(article.content, "text/html", "ISO-8859-1")
        }
    }.view
}

