package com.peterparameter.troper.persistence

import androidx.room.Database
import androidx.room.RoomDatabase
import splitties.arch.room.roomDb

@Database(entities = [ArticleEntity::class], version = 1, exportSchema = false)
abstract class ArticlesDatabase: RoomDatabase() {
    abstract fun articlesDao(): ArticlesDao

    companion object {
        fun invoke(): ArticlesDatabase = roomDb("articles.db")
    }
}