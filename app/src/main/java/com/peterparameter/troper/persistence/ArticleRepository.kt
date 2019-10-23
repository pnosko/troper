package com.peterparameter.troper.persistence

import arrow.core.Option
import com.peterparameter.troper.domain.Article
import com.peterparameter.troper.domain.ArticleInfo
import com.peterparameter.troper.utils.*

// TODO: Lift into Attempt
interface ArticleRepository {
    suspend fun getArticle(id: Id): Option<Article>
    suspend fun getArticleInfoById(id: Id): Option<ArticleInfo>
    suspend fun getArticleInfoByUrl(url: String): Option<ArticleInfo>
    suspend fun getAllArticles(): List<Article>
    suspend fun upsertArticle(article: Article): Attempt<Id>
    suspend fun upsertArticleInfo(articleInfo: ArticleInfo): Attempt<Id>
}