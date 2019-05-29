package com.peterparameter.troper

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import kotlin.coroutines.CoroutineContext
import kotlinx.coroutines.*
import org.http4k.core.Uri

class MainActivity : AppCompatActivity(), CoroutineScope {
    override val coroutineContext: CoroutineContext
        get() = Dispatchers.Main

    private val dummyUrl = Uri.of("https://tvtropes.org/pmwiki/pmwiki.php/Main/RestingRecovery")

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.main_activity)
//        launch {
//            loadNewArticle(dummyUrl, baseContext)
//        }
    }
}
