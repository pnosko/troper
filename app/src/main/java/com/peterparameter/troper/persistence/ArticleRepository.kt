package com.peterparameter.troper.persistence

import arrow.core.Option
import com.peterparameter.troper.domain.Article
import com.peterparameter.troper.domain.ArticleDescriptor
import com.peterparameter.troper.utils.*

// TODO: Lift into Attempt
interface ArticleRepository {
    suspend fun getArticle(id: Id): Option<Article>
    suspend fun getArticleDescriptor(id: Id): Option<ArticleDescriptor>
    suspend fun getAllArticles(): List<Article>
    suspend fun saveArticle(article: Article): Attempt<Id>
    suspend fun saveArticleDescriptor(articleDescriptor: ArticleDescriptor): Attempt<Id>
}