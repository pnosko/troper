package com.peterparameter.troper

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import com.beust.klaxon.Klaxon
import com.peterparameter.troper.activities.ArticleViewActivity
import com.peterparameter.troper.utils.*
import org.http4k.core.Uri
import org.jetbrains.anko.*
import org.jetbrains.anko.sdk27.coroutines.*

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        MainView().setContentView(this)
    }
}

class MainView : AnkoComponent<MainActivity> {
    private val dummyUrl = Uri.of("https://tvtropes.org/pmwiki/pmwiki.php/Main/RestingRecovery")

    override fun createView(ui: AnkoContext<MainActivity>) = ui.apply {
        verticalLayout {
            button("Load ArticleWrapper") {
                onClick {
                    val article = TropesApi.getParsedArticle(dummyUrl).await()
                    val articleJson = Klaxon().toJsonString(article)
                    val intent = intentFor<ArticleViewActivity>("articleJson" to articleJson).singleTop()
                    ui.ctx.startActivity(intent)
                }
            }
        }
    }.view

}