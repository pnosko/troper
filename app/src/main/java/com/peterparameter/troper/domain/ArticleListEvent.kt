package com.peterparameter.troper.domain

interface ArticleListEvent
data class AddArticleCommand(val articleSource: ArticleSource) : ArticleListEvent
data class ArticleRemovedEvent(val articleSource: ArticleSource) : ArticleListEvent