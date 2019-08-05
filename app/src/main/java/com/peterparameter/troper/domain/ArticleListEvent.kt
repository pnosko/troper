package com.peterparameter.troper.domain

interface ArticleListEvent
data class ArticleAddedEvent(val articleSource: ArticleSource) : ArticleListEvent
data class ArticleRemovedEvent(val articleSource: ArticleSource) : ArticleListEvent