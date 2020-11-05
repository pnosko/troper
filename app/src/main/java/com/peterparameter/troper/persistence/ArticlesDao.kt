package com.peterparameter.troper.persistence

import androidx.room.*
import com.peterparameter.troper.utils.Id

@Dao
interface ArticlesDao {
    @Query("select * from articles")
    suspend fun all(): List<ArticleEntity>

    @Query("select * from articles where id = :id limit 1")
    suspend fun getById(id: Id): ArticleEntity?

    @Query("select id, url, title, isnull(content, false) from articles where id == :id limit 1")
    suspend fun getInfoById(id: Id): ArticleEntityInfo?

    @Query("select id, url, title, isnull(content, false) from articles where url == :url limit 1")
    suspend fun getInfoByUrl(url: String): ArticleEntityInfo?

    @Query("select id, url, title from articles where parentId == :parentId")
    suspend fun getSubPageInfos(parentId: Id): List<ArticleEntityInfo>

    @Insert
    suspend fun insert(article: ArticleEntity): Id?

    @Update
    suspend fun update(article: ArticleEntity)

    @Delete
    suspend fun delete(article: ArticleEntity)
}
