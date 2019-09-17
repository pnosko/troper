package com.peterparameter.troper.persistence

import androidx.room.*
import java.time.OffsetDateTime


@TypeConverters(Converters::class)
@Entity(tableName = "articles")
data class ArticleEntity (
    @PrimaryKey(autoGenerate = true) val id: Long?,
    @ColumnInfo val parentId: Long?,
    @ColumnInfo val url: String,
    @ColumnInfo val title: String,
    @ColumnInfo val content: String?,
    @ColumnInfo val createdAt: OffsetDateTime = OffsetDateTime.now()
) {
    @Ignore
    val isOffline: Boolean = !content.isNullOrBlank()
}


