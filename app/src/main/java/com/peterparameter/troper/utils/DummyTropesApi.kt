package com.peterparameter.troper.utils

import android.net.Uri
import arrow.core.*
import com.peterparameter.troper.api.TropesApi
import com.peterparameter.troper.domain.*
import java.io.File

class DummyTropesApi : TropesApi {
    private val randomUri: String ="https://tvtropes.org/pmwiki/randomitem.php"

    private fun loadTestArticle(): Attempt<String> {
        return Either.catch {
            File("src/main/res/raw/article.html").readText()
        }
    }

    override suspend fun retrieveArticle(source: Uri): Attempt<Article> {
        return loadTestArticle().flatMap {
            Parser.parse(source.toString(), it)
        }
    }
}