package com.peterparameter.troper.view

import android.os.Bundle
import androidx.fragment.app.*
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import arrow.core.toOption
import com.peterparameter.troper.R
import com.peterparameter.troper.TropesWebClient
import com.peterparameter.troper.utils.*

class ArticleContentFragment : Fragment() {
    private lateinit var content: String

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        super.onCreateView(inflater, container, savedInstanceState)

        content = savedInstanceState?.getString("content").toOption().getOrThrow()
        return null
    }

//    override fun onSaveInstanceState(outState: Bundle) {
//        super.onSaveInstanceState(outState)
//
//        outState.putString("content", content)
//    }
}

//class ActicleContentView : ViewPlaceholder {
//
//    override fun createView() = ViewId(R.id.article_content
//    ui.apply {
//        verticalLayout{
//            val articleView = webView().setup {
//                it.settings.javaScriptEnabled = true
//                it.settings.loadsImagesAutomatically = true
//                it.webViewClient = TropesWebClient()
//            }
//            articleView.loadData(content, "text/html", "ISO-8859-1")
//        }
//    }.view
//}

