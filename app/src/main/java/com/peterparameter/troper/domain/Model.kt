 package com.peterparameter.troper.domain


data class ArticleReference(val title: String, val url: String)

data class Article(
    val url: String,
    val title: String,
    val category: String,
    val content: String,
    val subPages: List<ArticleReference>
)