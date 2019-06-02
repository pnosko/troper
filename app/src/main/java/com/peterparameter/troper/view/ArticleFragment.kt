package com.peterparameter.troper.view

import android.os.Bundle
import androidx.fragment.app.Fragment
import com.peterparameter.troper.domain.ArticleInfo
import com.peterparameter.troper.viewmodels.ArticleViewModel
import splitties.arch.lifecycle.ObsoleteSplittiesLifecycleApi
import splitties.arch.lifecycle.activityScope
import splitties.arch.lifecycle.observeNotNull
import splitties.experimental.InternalSplittiesApi
import splitties.fragmentargs.arg
import kotlin.contracts.ExperimentalContracts

@ObsoleteSplittiesLifecycleApi
@InternalSplittiesApi
@ExperimentalContracts
class ArticleFragment : Fragment() {
    companion object {
        fun create(article: ArticleInfo): ArticleFragment = ArticleFragment().apply { articleInfo = article }
    }

    private val articleVM: ArticleViewModel by activityScope{ArticleViewModel(articleInfo)}

    var articleInfo: ArticleInfo by arg()       // change to descriptor

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val ui = ArticleView(context!!)     // TODO: error if null?
        observeNotNull(articleVM.article) {
            ui.setup(it)
        }
    }
}
