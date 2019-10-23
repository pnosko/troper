package com.peterparameter.troper

import android.content.Context
import androidx.test.InstrumentationRegistry
import androidx.test.runner.AndroidJUnit4
import arrow.fx.IO.Companion.effect
import com.peterparameter.troper.persistence.ArticleRepository
import com.peterparameter.troper.persistence.RoomArticleRepository
import com.peterparameter.troper.utils.Attempt
import com.peterparameter.troper.utils.Id
import com.peterparameter.troper.utils.getOrThrow
import org.junit.Test
import org.junit.runner.RunWith
import splitties.arch.room.roomDb

@RunWith(AndroidJUnit4::class)
class ArticleRepositoryTest {

    private fun insert(repo: ArticleRepository): Attempt<Id> {
        val article1 = TestUtils1.createExampleArticle()
        return effect { repo.upsertArticle(article1) }.unsafeRunSync()
    }

    private fun createRepo(context: Context) =
        RoomArticleRepository(roomDb(context, "test_articles.db" ))

    @Test
    fun insertTest() {
        val appContext = InstrumentationRegistry.getTargetContext()
        val db = createRepo(appContext)
        val value = insert(db)
        assert(value.isRight())
        assert(value.toOption().getOrThrow() > 0L)
    }
}