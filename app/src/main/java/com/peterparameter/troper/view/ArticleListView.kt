package com.peterparameter.troper.view

import android.content.Context
import androidx.fragment.app.FragmentManager
import androidx.lifecycle.Lifecycle
import arrow.core.getOrElse
import com.google.android.material.tabs.TabLayout
import com.google.android.material.tabs.TabLayoutMediator
import com.peterparameter.troper.utils.viewPager
import com.peterparameter.troper.viewmodels.ArticleListViewModel
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
    fragmentManager: FragmentManager,
    lifecycle: Lifecycle,
    articleListVM: ArticleListViewModel
) : Ui {

    private val s = MaterialComponentsStyles(ctx)

    override val root by lazy {
//        TabLayoutMediator(tabLayout, articlePager, ::configureTab).attach()
        content
    }

//    private val pagerAdapter = ArticlesPagerAdapter(fragmentManager, lifecycle, articleListVM)
//
//    private val articlePager = viewPager {
//        adapter = pagerAdapter
//    }

    private val tabLayout = s.tabLayout.default()

    private val content by lazy {
        verticalLayout {
            add(tabLayout, lParams {
                width = matchParent
                height = wrapContent
            })
//            add(articlePager, lParams {
//                width = matchParent
//                height = matchParent
//            })
        }
    }

    private fun configureTab(tab: TabLayout.Tab, position: Int) {
//        tab.text = pagerAdapter.titleForIndex(position).getOrElse { "<LOADING>" }
    }
}