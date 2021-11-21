package com.peterparameter.troper

import com.peterparameter.troper.domain.ArticleParser
import com.peterparameter.troper.utils.notNull
import kotlinx.coroutines.runBlocking
import org.junit.Before
import org.junit.Test
import java.io.File

class TvTropesParserTest {
    private var articleText: String? = null

    @Before
    fun setup() {
        articleText = File(TestConstants.articleFilename).readText()
    }

    @Test
    fun parse_notNull() {
        val parsed =
            runBlocking {
                ArticleParser.parse("", articleText.orEmpty())
            }
        assert(parsed.isRight())
        assert(parsed.exists { it.content.notNull() })
        writeToFile(parsed.orNull()?.content!!)
    }

    private fun writeToFile(content: String) {
        File("out/article.html").writeText(content)
    }

    @Test
    fun parse_hasSubpages() {
        val parsed =
            runBlocking {
                ArticleParser.parse("", articleText.orEmpty())
            }
        assert(parsed.isRight())
        assert(parsed.exists { it.subPages.isNotEmpty() })
    }


}

