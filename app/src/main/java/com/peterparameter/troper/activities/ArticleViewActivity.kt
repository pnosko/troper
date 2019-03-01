package com.peterparameter.troper.activities

import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import com.peterparameter.troper.TropesWebClient
import com.peterparameter.troper.domain.ArticleInfo
import com.peterparameter.troper.utils.setup
import org.jetbrains.anko.*

class ArticleViewActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val article = intent.getParcelableExtra<ArticleInfo>("article")
        ActicleView(article).setContentView(this)
    }
}

class ActicleView(val article: ArticleInfo) : AnkoComponent<ArticleViewActivity> {

    override fun createView(ui: AnkoContext<ArticleViewActivity>) = ui.apply {
        verticalLayout{
            val articleView = webView().setup {
                it.settings.setJavaScriptEnabled(true)
                it.webViewClient = TropesWebClient()
            }
            articleView.loadData(article.content, "text/html", "ISO-8859-1")
        }
    }.view
}

