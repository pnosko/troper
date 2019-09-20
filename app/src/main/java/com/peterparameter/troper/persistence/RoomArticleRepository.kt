package com.peterparameter.troper.persistence

import arrow.core.Option
import arrow.core.toMap
import arrow.core.toOption
import arrow.core.toT
import com.peterparameter.troper.domain.Article
import com.peterparameter.troper.domain.ArticleDescriptor
import com.peterparameter.troper.utils.*
import kotlinx.coroutines.*
import splitties.arch.room.inTransaction

class RoomArticleRepository(private val database: ArticlesDatabase) : ArticleRepository {

    override suspend fun getArticleDescriptor(id: Long): Option<ArticleDescriptor> = database.articlesDao().getDescriptorById(id).toOption()

    override suspend fun getAllArticles(): List<Article> {
        val idToArticles =
            withContext(Dispatchers.IO) {
                database.articlesDao().all().map { it.id!! toT it }.toMap()
            }
        val groupedByParent = idToArticles.values
            .filter { it.parentId.notNull() }
            .groupBy { it.parentId!! }
        return idToArticles.values.map {
            Article(
                it.url,
                it.title,
                it.content.orEmpty(),
                groupedByParent.getValue(it.id!!).map { a -> a.asDescriptor() }
            )
        }
    }

    override suspend fun saveArticle(article: Article): Attempt<Id> {
        val nonExistentSubpages = article.subPages.filter { !exists(it.title) }
        val entity = with(article) { ArticleEntity(null, null, url, title, content) }
        return Attempt.catch {
                database.inTransaction { db ->
                    val id = db.articlesDao().insert(entity)
                    nonExistentSubpages.map { CompletableDeferred(saveDescriptor(db, id, it)) }.awaitAll()
                    id!!
                }
        }
    }

    private suspend fun saveDescriptor(
        db: ArticlesDatabase,
        parentId: Id?,
        articleDescriptor: ArticleDescriptor
    ): Attempt<Id> {
        val article =
            ArticleEntity(null, parentId, articleDescriptor.url, articleDescriptor.title, null)
        return Attempt.catch { db.articlesDao().insert(article)!! }
    }

    override suspend fun saveArticleDescriptor(articleDescriptor: ArticleDescriptor): Attempt<Id> {
        return saveDescriptor(database, null, articleDescriptor)
    }

    override suspend fun getArticle(id: Id): Option<Article> {
//        return database.articlesDao().getById(id).toOption().map()
        TODO("not implemented")
    }

    private suspend fun exists(title: String): Boolean = database.articlesDao().getDescriptorByTitle(title).toOption().nonEmpty()
}

fun ArticleEntity.asDescriptor(): ArticleDescriptor = ArticleDescriptor(this.title, this.url)