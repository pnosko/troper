package com.peterparameter.troper

import com.peterparameter.troper.domain.Article
import com.peterparameter.troper.domain.Parser
import com.peterparameter.troper.utils.TestArticle
import com.peterparameter.troper.utils.getOrThrow

object TestUtils1 {
    fun createExampleArticle(): Article = with(TestArticle) { Parser.parse(url, content, script) }.getOrThrow()
}