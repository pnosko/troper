package com.peterparameter.troper.viewmodels

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.peterparameter.troper.domain.ArticleInfo

class ArticleViewModel(private val articleInfo: ArticleInfo) : ViewModel() {
    val article: LiveData<ArticleInfo> = MutableLiveData(articleInfo)
}