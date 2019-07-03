package com.peterparameter.troper.domain

data class ArticleLink(val title: String, val url: String)
data class Article(val title: String, val content: String, val subpages: List<ArticleLink>)