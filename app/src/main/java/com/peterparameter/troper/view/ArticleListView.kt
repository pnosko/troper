package com.peterparameter.troper.view

import android.content.Context
import androidx.fragment.app.FragmentManager
import com.peterparameter.troper.domain.ArticleSource
import com.peterparameter.troper.utils.viewPager
import splitties.experimental.InternalSplittiesApi
import splitties.views.dsl.core.Ui
import kotlin.contracts.ExperimentalContracts

@ExperimentalContracts
@InternalSplittiesApi
class ArticleListView(
    override val ctx: Context,
    supportFragmentManager: FragmentManager
) : Ui {
    override val root by lazy { articlePager }

    private val pagerAdapter = ArticlesPagerAdapter(supportFragmentManager)

    private val articlePager = viewPager {
        adapter = pagerAdapter
    }

    fun addArticle(article: ArticleSource) {
        pagerAdapter.add(article)
    }

    fun removeArticle(article: ArticleSource) {
        pagerAdapter.remove(article)
    }
}