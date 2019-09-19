package com.peterparameter.troper.utils

import arrow.fx.IO
import com.peterparameter.troper.domain.Article
import com.peterparameter.troper.domain.Parser
import org.http4k.core.Uri

class DummyTropesApi : TropesApi {
    override fun getRandomArticle(): IO<Article> {
        return getParsedArticle(Uri.of(""))       // Dude!
    }

    override fun getParsedArticle(url: Uri): IO<Article> = Parser.parse(TestArticle.content, TestArticle.script)
        .toEither { Error("Could not parse articleSource.") }
        .fold({IO.raiseError(it)}, IO.Companion::just)
}