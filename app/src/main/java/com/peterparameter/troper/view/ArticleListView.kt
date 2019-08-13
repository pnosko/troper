package com.peterparameter.troper.view

import android.content.Context
import android.view.View
import androidx.viewpager2.TabLayoutMediator
import arrow.core.getOrElse
import com.google.android.material.tabs.TabLayout
import com.peterparameter.troper.domain.ArticleSource
import com.peterparameter.troper.utils.viewPager
import splitties.arch.lifecycle.ObsoleteSplittiesLifecycleApi
import splitties.dimensions.dip
import splitties.experimental.InternalSplittiesApi
import splitties.views.dsl.core.*
import splitties.views.dsl.material.MaterialComponentsStyles
import kotlin.contracts.ExperimentalContracts

@ObsoleteSplittiesLifecycleApi
@ExperimentalContracts
@InternalSplittiesApi
class ArticleListView(
    override val ctx: Context,
    private val pagerAdapter: ArticlesPagerAdapter
) : Ui {

    private val s = MaterialComponentsStyles(ctx)

    override val root by lazy { createContent() }

    private val articlePager = viewPager {
        adapter = pagerAdapter
    }

    private val tabLayout = s.tabLayout.default()

    private val mediator = TabLayoutMediator(tabLayout, articlePager, ::configureTab)

    private fun createContent(): View {
        mediator.attach()
        return verticalLayout {
            add(tabLayout, lParams {
                width = matchParent
                height = wrapContent
            })
            add(articlePager, lParams {
                height = dip(0)
            })
        }
    }

    private fun configureTab(tab: TabLayout.Tab, position: Int) {
        tab.text = pagerAdapter.titleForIndex(position).getOrElse { "<LOADING>" }
    }

    fun addArticleSource(article: ArticleSource) {
        pagerAdapter.add(article)
    }

    fun removeArticle(article: ArticleSource) {
        pagerAdapter.remove(article)
    }
}