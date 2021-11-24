package com.peterparameter.troper.utils

import android.net.Uri
import arrow.core.Either
import arrow.core.computations.either
import com.peterparameter.troper.api.TropesApi
import com.peterparameter.troper.domain.Article
import com.peterparameter.troper.domain.ArticleParser
import com.peterparameter.troper.domain.Constants
import java.nio.charset.Charset
import java.nio.file.Paths

class DummyTropesApi : TropesApi {
    private val randomUri: String ="https://tvtropes.org/pmwiki/randomitem.php"

    private val rawFolder = "src/main/res/raw/"
    private val articleFilename = "article.html"

    private fun loadFileFromRaw(filename: String, charset: Charset = Charset.defaultCharset()): Attempt<String> {
        return Either.catch {
            Paths.get(rawFolder, filename).toFile().readBytes().toString(charset)   // Charset.forName("Windows-1252"))
        }
    }

    override suspend fun retrieveArticle(source: Uri): Attempt<Article> {
        return either {
            val article: String = loadFileFromRaw(articleFilename, Charset.forName("Windows-1252")).bind()

            ArticleParser.parse(source.toString(), article).bind()
        }
    }
}