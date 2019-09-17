package com.peterparameter.troper.persistence

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.Query
import com.peterparameter.troper.domain.ArticleDescriptor
import kotlinx.coroutines.flow.Flow

@Dao
interface ArticlesDao {
    @Query("select * from articles")
    fun all(): List<ArticleEntity>

    @Query("select title, url from articles where id == :id limit 1")
    fun getDescriptorById(id: Long): ArticleDescriptor

    @Query("select title, url from articles where title == :title limit 1")
    fun getDescriptorByTitle(title: String): ArticleDescriptor

    @Insert
    fun insert(article: ArticleEntity)

    @Delete
    fun delete(article: ArticleEntity)
}
