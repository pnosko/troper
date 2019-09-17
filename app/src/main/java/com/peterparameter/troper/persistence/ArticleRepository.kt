package com.peterparameter.troper.persistence

import com.peterparameter.troper.domain.Article
import com.peterparameter.troper.domain.ArticleDescriptor

// TODO: Lift into Attempt
interface ArticleRepository {
    suspend fun getArticle(id: Long): Article
    suspend fun getArticleDescriptor(id: Long): ArticleDescriptor
    suspend fun getAllArticles(): List<Article>
    suspend fun saveArticle(article: Article)
    suspend fun saveArticleDescriptor(articleDescriptor: ArticleDescriptor)
}