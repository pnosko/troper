package com.peterparameter.troper.domain

data class ArticleDescriptor(val title: String, val url: String)
data class Article(val title: String, val url: String, val content: String, val subPages: List<ArticleDescriptor>)