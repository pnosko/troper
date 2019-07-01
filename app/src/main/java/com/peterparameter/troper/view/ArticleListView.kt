package com.peterparameter.troper.view

import android.content.Context
import androidx.fragment.app.FragmentManager
import com.peterparameter.troper.domain.ArticleSource
import com.peterparameter.troper.utils.viewPager
import splitties.arch.lifecycle.ObsoleteSplittiesLifecycleApi
import splitties.experimental.InternalSplittiesApi
import splitties.views.dsl.core.*
import splitties.views.dsl.material.MaterialComponentsStyles
import kotlin.contracts.ExperimentalContracts

@ObsoleteSplittiesLifecycleApi
@ExperimentalContracts
@InternalSplittiesApi
class ArticleListView(
    override val ctx: Context,
    supportFragmentManager: FragmentManager
) : Ui {
    private val s = MaterialComponentsStyles(ctx)

    override val root by lazy { verticalLayout {
        add(tabLayout, lParams {  })
        add(articlePager, lParams {  })
    } }

    private val pagerAdapter = ArticlesPagerAdapter(supportFragmentManager)

    private val articlePager = viewPager {
        adapter = pagerAdapter
    }

    private val tabLayout = s.tabLayout.default {
        setupWithViewPager(articlePager)
    }

    fun addArticle(article: ArticleSource) {
        pagerAdapter.add(article)
        articlePager.currentItem = pagerAdapter.count - 1
    }

    fun removeArticle(article: ArticleSource) {
        pagerAdapter.remove(article)
    }
}