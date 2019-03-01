package com.peterparameter.troper

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import com.peterparameter.troper.activities.ArticleViewActivity
import com.peterparameter.troper.utils.*
import org.jetbrains.anko.*
import org.jetbrains.anko.sdk27.coroutines.*

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        MainView().setContentView(this)
    }
}

class MainView : AnkoComponent<MainActivity> {
    private val dummyUrl = android.net.Uri.parse("https://tvtropes.org/pmwiki/pmwiki.php/Main/RestingRecovery")

    override fun createView(ui: AnkoContext<MainActivity>) = ui.apply {
        verticalLayout {
            button("Load ArticleWrapper") {
                onClick {
                    val article = getParsedArticle(dummyUrl)
                    val intent = intentFor<ArticleViewActivity>("article" to article).singleTop()
                    ui.ctx.startActivity(intent)
                }
            }
        }
    }.view

}