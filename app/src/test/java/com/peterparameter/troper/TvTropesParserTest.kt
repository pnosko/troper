package com.peterparameter.troper

import com.peterparameter.troper.domain.Parser
import com.peterparameter.troper.utils.notNull
import kotlinx.coroutines.runBlocking
import org.junit.Before
import org.junit.Test
import java.io.File

/**
 * Example local unit test, which will execute on the development machine (host).
 *
 * See [testing documentation](http://d.android.com/tools/testing).
 */
class TvTropesParserTest {
    private val testFilename = "src/main/res/raw/article.html"
    private var articleText: String? = null

    @Before
    fun setup() {
        articleText = File(testFilename).readText()
    }

    @Test
    fun parse_notNull() {
        val parsed =
            runBlocking {
                Parser.parse("", articleText.orEmpty())
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
                Parser.parse("", articleText.orEmpty())
            }
        assert(parsed.isRight())
        assert(parsed.exists { it.subPages.isNotEmpty() })
    }
}
