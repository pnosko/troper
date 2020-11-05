package com.peterparameter.troper.utils

import com.peterparameter.troper.domain.Article
import arrow.fx.IO
import org.http4k.core.Uri

interface TropesApi {
    fun getArticle(url: Uri): IO<Article>
    fun getRandomArticle(): IO<Article>
}
