package com.peterparameter.troper.utils

import arrow.core.Either
import com.peterparameter.troper.api.TropesApi
import com.peterparameter.troper.domain.*
import org.http4k.core.Uri

class DummyTropesApi : TropesApi {
    private val randomUri: String ="https://tvtropes.org/pmwiki/randomitem.php"

    override suspend fun retrieveArticle(source: Uri): Attempt<Article> {
        return Either.Left(NotImplementedError())
    }
}