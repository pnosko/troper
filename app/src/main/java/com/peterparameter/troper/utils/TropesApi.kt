package com.peterparameter.troper.utils

import com.peterparameter.troper.domain.ArticleInfo
import arrow.effects.*
import org.http4k.core.Uri

interface TropesApi {
    fun getParsedArticle(url: Uri): IO<ArticleInfo>
    fun getRandomArticle(): IO<ArticleInfo>
}
