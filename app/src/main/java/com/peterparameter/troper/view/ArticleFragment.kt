package com.peterparameter.troper.view

import androidx.fragment.app.Fragment
import com.peterparameter.troper.viewmodels.ArticleViewModel
import splitties.arch.lifecycle.activityScope

class ArticleFragment : Fragment() {
    private val articleVM by activityScope<ArticleViewModel>()
}
