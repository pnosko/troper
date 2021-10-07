//package com.peterparameter.troper.persistence
//
//import arrow.core.Option
//import arrow.core.toMap
//import arrow.core.toOption
//import com.peterparameter.troper.domain.Article
//import com.peterparameter.troper.domain.ArticleDescriptor
//import com.peterparameter.troper.domain.ArticleInfo
//import com.peterparameter.troper.utils.*
//import kotlinx.coroutines.*
//import splitties.arch.room.inTransaction
//
//class RoomArticleRepository(private val database: ArticlesDatabase) : ArticleRepository {
//    override suspend fun getArticleInfoByUrl(url: String): Option<ArticleInfo> =
//        database.articlesDao().getInfoByUrl(url).toOption()
//
//    override suspend fun getArticleInfoById(id: Long): Option<ArticleInfo> = database.articlesDao().getInfoById(id).toOption()
//
//    override suspend fun getAllArticles(): List<Article> {
//        val idToArticles =
//            withContext(Dispatchers.IO) {
//                database.articlesDao().all().map { Pair(it.id!!, it) }.toMap()
//            }
//        val groupedByParent = idToArticles.values
//            .filter { it.parentId.notNull() }
//            .groupBy { it.parentId!! }
//        return idToArticles.values.map {
//            Article(
//                it.url,
//                it.title,
//                it.content.orEmpty(),
//                groupedByParent.getValue(it.id!!).map { a -> a.asDescriptor() }
//            )
//        }
//    }
//
//    override suspend fun upsertArticle(article: Article): Attempt<Id> {
//        val existingArticleId = database.articlesDao().getInfoByUrl(article.url)?.id.toOption()
//
//        val nonExistentSubpages = article.subPages.filter { !exists(it.url) }
//        val entity = with(article) { ArticleEntity(null, url, title, content) }
//        return Attempt.catch {
//                database.inTransaction { db ->
//                    val id = if (existingArticleId.nonEmpty()) {
//                        db.articlesDao().update(entity)
//                        existingArticleId.getOrThrow()
//                    } else {
//                        db.articlesDao().insert(entity)
//                    }
//                    nonExistentSubpages.map { CompletableDeferred(saveDescriptor(db, id, it)) }.awaitAll()
//                    id!!
//                }
//        }
//    }
//
//    private suspend fun saveDescriptor(
//        db: ArticlesDatabase,
//        parentId: Id?,
//        articleInfo: ArticleInfo
//    ): Attempt<Id> {
//        val article =
//            ArticleEntity(null, parentId, articleInfo.url, articleInfo.title, null)
//        return Attempt.catch { db.articlesDao().insert(article)!! }
//    }
//
//    override suspend fun upsertArticleInfo(articleInfo: ArticleInfo): Attempt<Id> {     // TODO: update if exists
//        return saveDescriptor(database, null, articleInfo)
//    }
//
//    override suspend fun getArticle(id: Id): Option<Article> {
//        val article = database.articlesDao().getById(id).toOption()
//        val subPages = database.articlesDao().getSubPageInfos(id)
//        return article.map { Article(it.url, it.title, it.content.orEmpty(), subPages) }
//    }
//
//    private suspend fun exists(url: String): Boolean = database.articlesDao().getInfoByUrl(url).toOption().nonEmpty()
//}
//
//fun ArticleEntity.asDescriptor(): ArticleDescriptor = ArticleDescriptor(this.url, this.title)