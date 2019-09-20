package com.peterparameter.troper

import arrow.fx.IO
import arrow.fx.IO.Companion.effect
import com.peterparameter.troper.persistence.ArticlesDatabase
import com.peterparameter.troper.persistence.RoomArticleRepository
import com.peterparameter.troper.utils.Attempt
import com.peterparameter.troper.utils.Id
import com.peterparameter.troper.utils.getOrThrow
import org.junit.Test

class ArticleRepositoryTest {
    val repo = RoomArticleRepository(ArticlesDatabase.invoke())

    private fun insert(): Attempt<Id> {
        val article1 = TestUtils.createExampleArticle()
        return effect { repo.saveArticle(article1) }.unsafeRunSync()
    }

    @Test
    fun insertTest() {
        val value = insert()
        assert(value.isRight())
        assert(value.toOption().getOrThrow() > 0L)
    }
}