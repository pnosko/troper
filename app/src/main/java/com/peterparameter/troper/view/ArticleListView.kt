package com.peterparameter.troper.view

import android.content.Context
import androidx.viewpager2.TabLayoutMediator
import arrow.core.getOrElse
import com.google.android.material.tabs.TabLayout
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
    private val pagerAdapter: ArticlesPagerAdapter
) : Ui {

    private val s = MaterialComponentsStyles(ctx)

    override val root by lazy {
        TabLayoutMediator(tabLayout, articlePager, ::configureTab).attach()
        content
    }

    private val articlePager = viewPager {
        adapter = pagerAdapter
    }

    private val tabLayout = s.tabLayout.default()

    private val content by lazy {
        verticalLayout {
            add(tabLayout, lParams {
                width = matchParent
                height = wrapContent
            })
            add(articlePager, lParams {
                width = matchParent
                height = matchParent
            })
        }
    }

    private fun configureTab(tab: TabLayout.Tab, position: Int) {
        tab.text = pagerAdapter.titleForIndex(position).getOrElse { "<LOADING>" }
    }
}