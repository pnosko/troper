package com.peterparameter.troper

import com.peterparameter.troper.domain.Parser
import com.peterparameter.troper.utils.getOrThrow
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
        val parsed = Parser.parse(TestArticle.content).getOrThrow()
        assertNotNull(parsed)
    }

    @Test
    fun parseAndWrapAndSave() {
        val wrapped = Parser.parse(TestArticle.content).getOrThrow()
        File("doc.html").writeText(wrapped.content)
        assertEquals(2, wrapped.subpages.size)
    }
}
