package com.peterparameter.troper.domain

data class ArticleLoadedEvent(val articleSource: ArticleSource, val article: Article)
