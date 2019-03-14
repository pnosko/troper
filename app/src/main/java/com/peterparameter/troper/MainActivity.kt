package com.peterparameter.troper

import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import com.peterparameter.troper.utils.loadNewArticle
import org.http4k.core.Uri
import org.jetbrains.anko.*
import org.jetbrains.anko.design.appBarLayout
import org.jetbrains.anko.design.coordinatorLayout
import org.jetbrains.anko.sdk27.coroutines.onClick
import org.jetbrains.anko.support.v4.viewPager

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        MainView().setContentView(this)
    }
}

class MainView : AnkoComponent<MainActivity>, AnkoLogger {
    private val dummyUrl = Uri.of("https://tvtropes.org/pmwiki/pmwiki.php/Main/RestingRecovery")

    override fun createView(ui: AnkoContext<MainActivity>) = ui.apply {
//        val pager = viewPager()
        coordinatorLayout {
            appBarLayout {
                toolbar()
            }
            button("Load Article") {
                onClick {
                    loadNewArticle(dummyUrl, ui.ctx)
                }
            }
        }
    }.view
}