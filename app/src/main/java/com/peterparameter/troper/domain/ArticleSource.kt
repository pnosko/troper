package com.peterparameter.troper.domain

import android.os.Parcelable
import kotlinx.android.parcel.Parcelize

@Parcelize
open class ArticleSource: Parcelable

@Parcelize
data class ArticleUri(val uri: String): ArticleSource()

@Parcelize
object RandomArticle: ArticleSource()

@Parcelize
data class DatabaseArticle(val id: Long): ArticleSource()