package com.peterparameter.troper

import com.peterparameter.troper.domain.Html2MarkdownConverter
import com.peterparameter.troper.domain.ArticleParser
import org.junit.Assert.*
import kotlinx.coroutines.runBlocking
import org.jsoup.Jsoup
import org.junit.Before
import org.junit.Test
import java.io.File

class Html2MarkdownConverterTest {
    private var articleText: String? = null

    @Before
    fun setup() {
        articleText = TestUtil.loadResource(TestConstants.articleFilename)
    }

    @Test()
    fun clean() {
        val text = TestUtil.loadResource("foldersection.html")
        val doc = Jsoup.parse(text)

        File("out/foldersection.cleaned.html").writeText(doc.html())
    }

    @Test
    fun link() {
        val text = """<em><a class="urllink" href="https://practicalguidetoevil.wordpress.com/summary/" rel="noreferrer" data-ss1633378324="1">A Practical Guide to Evil</em>"""
        val converted = Html2MarkdownConverter.convert(text).map{it.trim()}
        val expected = "*[A Practical Guide to Evil](https://practicalguidetoevil.wordpress.com/summary/)*"
        assertEquals(expected, converted.orNull()!!)
    }

    @Test()
    fun nestedList() {
        val text = """<ul>
      <li>This is a list item at root level</li>
      <li>This is another item at root level</li>
      <li>
        <ol>
          <li>This is a nested list item</li>
          <li>This is another nested list item</li>
          <li>
            <ul>
              <li>This is a deeply nested list item</li>
              <li>This is another deeply nested list item</li>
              <li>This is a third deeply nested list item</li>
            </ul>
          </li>
        </ol>
      </li>
      <li>This is a third item at root level</li>
    </ul>"""
        val expected = """*   This is a list item at root level
*   This is another item at root level
    1.  This is a nested list item
    2.  This is another nested list item
        *   This is a deeply nested list item
        *   This is another deeply nested list item
        *   This is a third deeply nested list item
*   This is a third item at root level"""

        val actual = Html2MarkdownConverter.convert(text)
        assertEquals(expected, actual.orNull()!!)
    }

    @Test
    fun folder() {
        val text = """<folder title="folder no. 1"><ul><li><em>haha</em></li><li><em>lol</em></li></ul></folder>"""
        val expected = """<details>
<summary>folder no. 1</summary>
 *  *haha*
 *  *lol*
</details>"""
        val converted = Html2MarkdownConverter.convert(text)
        assertEquals(expected, converted.orNull()!!)
    }

    @Test
    fun paragraph() {
        val text = """<p><em><a class="urllink" href="https://practicalguidetoevil.wordpress.com/summary/" rel="noreferrer" data-ss1636389067="1">A Practical Guide to Evil<img src="https://static.tvtropes.org/pmwiki/pub/external_link.gif" height="12" width="12" style="border:none;"></a></em> (2015-present) is a <a class="twikilink" href="/pmwiki/pmwiki.php/Main/YoungAdult" title="/pmwiki/pmwiki.php/Main/YoungAdult" data-ss1636389067="1">Young Adult</a> (<a class="twikilink" href="/pmwiki/pmwiki.php/Main/WhatDoYouMeanItsForKids" data-ss1636389067="1">Allegedly</a>) <a class="twikilink" href="/pmwiki/pmwiki.php/Main/HeroicFantasy" data-ss1636389067="1">Heroic Fantasy</a> <a class="twikilink" href="/pmwiki/pmwiki.php/Main/WebSerialNovel" data-ss1636389067="1">Web Serial Novel</a> written by erraticerrata.
            | The sixth book of the series was completed on January 1st, 2021, with the author announcing that he would be starting a seventh in March. A key element of the setting is that many <a class="twikilink" href="/pmwiki/pmwiki.php/Main/HeroicFantasy" data-ss1636389067="1">Heroic Fantasy</a> tropes are enforced by the universe's laws.</p>""".trimMargin()
        val converted = Html2MarkdownConverter.convert(text)
        val expected = "*[A Practical Guide to Evil](https://practicalguidetoevil.wordpress.com/summary/)* (2015-present) is a [Young Adult](/pmwiki/pmwiki.php/Main/YoungAdult \"/pmwiki/pmwiki.php/Main/YoungAdult\") ([Allegedly](/pmwiki/pmwiki.php/Main/WhatDoYouMeanItsForKids)) [Heroic Fantasy](/pmwiki/pmwiki.php/Main/HeroicFantasy) [Web Serial Novel](/pmwiki/pmwiki.php/Main/WebSerialNovel) written by erraticerrata. The sixth book of the series was completed on January 1st, 2021, with the author announcing that he would be starting a seventh in March. A key element of the setting is that many [Heroic Fantasy](/pmwiki/pmwiki.php/Main/HeroicFantasy) tropes are enforced by the universe's laws."
        assertEquals(expected, converted.orNull()!!)
    }

    @Test
    fun convert_to_markdown() {
        val parsed =
            runBlocking {
                ArticleParser.parse("", articleText.orEmpty())
            }
        val converted = Html2MarkdownConverter.convert(parsed.map { it.content }.orNull()!!)
        assert(converted.isRight())
        assert(converted.orNull()!!.isNotBlank())
        File("out/article.md").writeText(converted.orNull()!!)
    }
}