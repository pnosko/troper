package com.peterparameter.troper.utils

import com.peterparameter.troper.domain.Article
import arrow.effects.*
import org.http4k.core.Uri

interface TropesApi {
    fun getParsedArticle(url: Uri): IO<Article>
    fun getRandomArticle(): IO<Article>
}
