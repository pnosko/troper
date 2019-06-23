package com.peterparameter.troper

import com.peterparameter.troper.domain.ArticleInfo
import com.peterparameter.troper.domain.Parser
import com.peterparameter.troper.utils.TestArticle
import com.peterparameter.troper.utils.deserializeList
import com.peterparameter.troper.utils.getOrThrow
import com.peterparameter.troper.utils.serialize
import org.junit.Test

import org.junit.Assert.*
import java.io.File

/**
 * Example local unit test, which will execute on the development machine (host).
 *
 * See [testing documentation](http://d.android.com/tools/testing).
 */
class ParserUnitTest {
    @Test
    fun parse_notNull() {
        val parsed = createExampleArticle()
        assertNotNull(parsed)
    }

    @Test
    fun parseAndWrapAndSave() {
        val wrapped = createExampleArticle()
        File("doc.html").writeText(wrapped.content)
        assertEquals(5, wrapped.subpages.size)
    }

    private fun createExampleArticle(): ArticleInfo = Parser.parse(TestArticle.content, TestArticle.script).getOrThrow()

    @Test
    fun serializeDeserializeList() {
        val list = arrayOf(createExampleArticle())
        val ser = serialize(list)
        val des = deserializeList<ArticleInfo>(ser).getOrThrow()

        assertEquals(list.size, des.size)
    }
}
