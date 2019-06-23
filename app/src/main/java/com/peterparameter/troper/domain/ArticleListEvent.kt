package com.peterparameter.troper.domain

interface ArticleListEvent
data class ArticleAddedEvent(val article: ArticleSource) : ArticleListEvent
data class ArticleRemovedEvent(val article: ArticleSource) : ArticleListEvent