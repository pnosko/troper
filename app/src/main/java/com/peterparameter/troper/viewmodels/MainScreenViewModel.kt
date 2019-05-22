package com.peterparameter.troper.viewmodels

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.peterparameter.troper.domain.ArticleInfo

class MainScreenViewModel: ViewModel() {
    val searchViewModel: SearchViewModel by lazy {
        SearchViewModel()
    }

    fun search() {
        searchViewModel.search()
    }

    val favorites: LiveData<List<ArticleInfo>> = MutableLiveData(listOf())
}