package com.peterparameter.troper.view

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.peterparameter.troper.domain.ArticleSource
import com.peterparameter.troper.viewmodels.ArticleViewModel
import splitties.arch.lifecycle.ObsoleteSplittiesLifecycleApi
import splitties.arch.lifecycle.fragmentScope
import splitties.arch.lifecycle.observeNotNull
import splitties.experimental.InternalSplittiesApi
import splitties.fragmentargs.arg
import kotlin.contracts.ExperimentalContracts

@ObsoleteSplittiesLifecycleApi
@InternalSplittiesApi
@ExperimentalContracts
class ArticleFragment : Fragment() {
    companion object {
        fun create(articleSource: ArticleSource): ArticleFragment = ArticleFragment().apply { this.articleSource = articleSource }
    }

    var articleSource: ArticleSource by arg()

    private val articleVM by fragmentScope{ArticleViewModel(articleSource)}

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val ui = ArticleView(context!!)
        observeNotNull(articleVM.article) { ui.setup(it) }
        observeNotNull(articleVM.isLoading) { ui.isBusy = it }
        return ui.root
    }
}
