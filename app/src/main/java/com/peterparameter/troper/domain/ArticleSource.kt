package com.peterparameter.troper.domain

import org.http4k.core.Uri

interface ArticleSource

data class ArticleUri(val uri: Uri): ArticleSource

object RandomArticle: ArticleSource

data class DatabaseArticle(val id: Long): ArticleSource