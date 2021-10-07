package com.peterparameter.troper

import com.peterparameter.troper.domain.Parser
import com.peterparameter.troper.utils.*
import kotlinx.coroutines.runBlocking
import org.junit.Test

import org.junit.Before
import java.io.File
import java.sql.DriverManager.println

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
        assert(parsed.exists { it.content?.notNull()!! })
    }

    @Test
    fun parse_hasSubpages() {
        val parsed =
            runBlocking {
                Parser.parse("", articleText.orEmpty())
            }
        assert(parsed.isRight())
        assert(parsed.exists { it.subPages.isNotEmpty() })
        println(parsed.map{it.content}.orNull())
    }
}
