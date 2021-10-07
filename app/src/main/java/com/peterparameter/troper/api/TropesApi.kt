package com.peterparameter.troper.api

import com.peterparameter.troper.domain.Article
import com.peterparameter.troper.utils.Attempt
import org.http4k.core.Uri

interface TropesApi {
    suspend fun retrieveArticle(source: Uri): Attempt<Article>
}
