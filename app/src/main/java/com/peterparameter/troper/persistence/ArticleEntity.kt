package com.peterparameter.troper.persistence

import androidx.room.*
import com.peterparameter.troper.domain.ArticleInfo
import java.time.OffsetDateTime


@TypeConverters(Converters::class)
@Entity(tableName = "articles")
data class ArticleEntity (
    @PrimaryKey(autoGenerate = true) val id: Long?,
    @ColumnInfo val url: String,
    @ColumnInfo val title: String,
    @ColumnInfo val content: String?,
    @ColumnInfo val createdAt: OffsetDateTime = OffsetDateTime.now()
)


data class ArticleEntityInfo (
    val id: Long?,
    override val url: String,
    override val title: String) : ArticleInfo