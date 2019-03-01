package com.peterparameter.troper.domain

import org.http4k.core.Uri

data class ArticleLink(val title: String, val url: Uri)
data class ArticleInfo(val title: String, val content: String, val subpages: List<ArticleLink>)