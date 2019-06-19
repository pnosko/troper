package com.peterparameter.troper.utils

import arrow.core.Try
import arrow.core.extensions.either.applicativeError.raiseError
import arrow.effects.IO
import arrow.effects.IO.*
import com.peterparameter.troper.domain.ArticleInfo
import com.peterparameter.troper.domain.Parser
import org.http4k.core.Uri

class DummyTropesApi : TropesApi {
    override fun getRandomArticle(): IO<ArticleInfo> {
        return getParsedArticle(Uri.of(""))       // Dude!
    }

    override fun getParsedArticle(url: Uri): IO<ArticleInfo> = Parser.parse(TestArticle.content, TestArticle.script)
        .toEither { Error("Could not parse article.") }
        .fold({IO.raiseError<ArticleInfo>(it)}, IO.Companion::just)
}