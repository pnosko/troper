package com.peterparameter.troper.utils

import android.net.Uri
import arrow.core.Either
import arrow.core.computations.either
import com.peterparameter.troper.api.TropesApi
import com.peterparameter.troper.domain.Article
import com.peterparameter.troper.domain.ArticleParser
import java.nio.file.Paths

class DummyTropesApi : TropesApi {
    private val randomUri: String ="https://tvtropes.org/pmwiki/randomitem.php"

    private val rawFolder = "src/main/res/raw/"
    private val articleFilename = "article.html"

    private fun loadFileFromRaw(filename: String): Attempt<String> {
        return Either.catch {
            Paths.get(rawFolder, filename).toFile().readText()
        }
    }

    override suspend fun retrieveArticle(source: Uri): Attempt<Article> {
        return either {
            val article: String = loadFileFromRaw(articleFilename).bind()

            ArticleParser.parse(source.toString(), article).bind()
        }
    }
}