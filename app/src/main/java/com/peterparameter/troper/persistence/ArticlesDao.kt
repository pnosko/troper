package com.peterparameter.troper.persistence

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.Query
import com.peterparameter.troper.domain.ArticleDescriptor
import com.peterparameter.troper.utils.Id
import kotlinx.coroutines.flow.Flow

@Dao
interface ArticlesDao {
    @Query("select * from articles")
    suspend fun all(): List<ArticleEntity>

    @Query("select * from articles where id = :id limit 1")
    suspend fun getById(id: Id): ArticleEntity?

    @Query("select title, url from articles where id == :id limit 1")
    suspend fun getDescriptorById(id: Long): ArticleDescriptor?

    @Query("select title, url from articles where title == :title limit 1")
    suspend fun getDescriptorByTitle(title: String): ArticleDescriptor?

    @Insert
    suspend fun insert(article: ArticleEntity): Long?

    @Delete
    suspend fun delete(article: ArticleEntity): Int
}
