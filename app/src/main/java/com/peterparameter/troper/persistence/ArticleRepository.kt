package com.peterparameter.troper.persistence

import arrow.core.Option
import com.peterparameter.troper.domain.Article
import com.peterparameter.troper.domain.ArticleReference
import com.peterparameter.troper.utils.*

// TODO: Lift into Attempt
interface ArticleRepository {
    suspend fun getArticle(id: Id): Option<Article>
    suspend fun getArticleInfoById(id: Id): Option<ArticleReference>
    suspend fun getArticleInfoByUrl(url: String): Option<ArticleReference>
    suspend fun getAllArticles(): List<Article>
    suspend fun upsertArticle(article: Article): Attempt<Id>
    suspend fun upsertArticleInfo(articleInfo: ArticleReference): Attempt<Id>
}