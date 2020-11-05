 package com.peterparameter.troper.domain

interface ArticleInfo {
    val url: String
    val title: String
    val isOffline: Boolean
}

data class ArticleDescriptor (override val url: String,
                              override val title: String,
                              override val isOffline: Boolean) : ArticleInfo

data class Article(
    override val url: String,
    override val title: String,
    val content: String?,
    val subPages: List<ArticleInfo>
) : ArticleInfo
{
    override val isOffline: Boolean = content.isNullOrEmpty()
}