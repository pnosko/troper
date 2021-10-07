 package com.peterparameter.troper.domain

interface ArticleInfo {
    val url: String
    val title: String
}

data class ArticleDescriptor (override val url: String,
                              override val title: String) : ArticleInfo

data class Article(
    override val url: String,
    override val title: String,
    val content: String?,
    val subPages: List<ArticleInfo>
) : ArticleInfo