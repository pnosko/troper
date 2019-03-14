package com.peterparameter.troper.view

import android.os.Bundle
import android.support.v4.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.peterparameter.troper.TropesWebClient
import com.peterparameter.troper.utils.*
import org.jetbrains.anko.*

class ArticleContentFragment : Fragment() {
    private lateinit var content: String

    override fun onCreate(savedInstanceState: Bundle?) {
        this.content = savedInstanceState?.getString("content")!!
        super.onCreate(savedInstanceState)
    }
    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return ActicleContentView(content).createView(AnkoContext.create(inflater.context, this))
    }
}

class ActicleContentView(val content: String) : AnkoComponent<ArticleContentFragment> {

    override fun createView(ui: AnkoContext<ArticleContentFragment>) = ui.apply {
        verticalLayout{
            val articleView = webView().setup {
                it.settings.javaScriptEnabled = true
                it.settings.loadsImagesAutomatically = true
                it.webViewClient = TropesWebClient()
            }
            articleView.loadData(content, "text/html", "ISO-8859-1")
        }
    }.view
}

