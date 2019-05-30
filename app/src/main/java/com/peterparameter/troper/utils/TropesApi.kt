package com.peterparameter.troper.utils

import arrow.core.*
import com.peterparameter.troper.domain.ArticleInfo
import arrow.effects.*
import org.http4k.core.Uri

interface TropesApi {
    fun getParsedArticle(url: Uri): DeferredK<Try<ArticleInfo>>
    fun getRandomArticle(): DeferredK<Try<ArticleInfo>>
}
