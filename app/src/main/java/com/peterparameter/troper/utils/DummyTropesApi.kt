package com.peterparameter.troper.utils

import arrow.core.Try
import arrow.effects.DeferredK
import com.peterparameter.troper.domain.ArticleInfo
import com.peterparameter.troper.domain.Parser
import org.http4k.core.Uri

class DummyTropesApi : TropesApi {
    override fun getParsedArticle(url: Uri): DeferredK<Try<ArticleInfo>> = DeferredK {
        Parser.parse(TestArticle.content, TestArticle.script).toTry()
    }
}