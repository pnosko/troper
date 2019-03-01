package com.peterparameter.troper.domain

import android.net.Uri
import android.os.Parcelable
import kotlinx.android.parcel.Parcelize

@Parcelize
data class ArticleLink(val title: String, val url: Uri): Parcelable

@Parcelize
data class ArticleInfo(val title: String, val content: String, val subpages: List<ArticleLink>): Parcelable