package com.peterparameter.troper.view

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.peterparameter.troper.domain.ArticleInfo
import com.peterparameter.troper.utils.deserialize
import com.peterparameter.troper.utils.getOrThrow
import com.peterparameter.troper.utils.serialize
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
        fun create(article: ArticleInfo): ArticleFragment = ArticleFragment().apply { articleInfoString = serialize(article )}
    }

    private val articleVM: ArticleViewModel by activityScope{ArticleViewModel(deserialize<ArticleInfo>(articleInfoString).getOrThrow())}

    var articleInfoString: String by arg()       // change to descriptor

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val ui = ArticleView(context!!)     // TODO: error if null?
        ui.setup(articleVM.article.value!!)
        return ui.root
    }
}
