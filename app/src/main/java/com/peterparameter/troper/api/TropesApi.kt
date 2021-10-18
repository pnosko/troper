package com.peterparameter.troper.api

import android.net.Uri
import com.peterparameter.troper.domain.Article
import com.peterparameter.troper.utils.Attempt

interface TropesApi {
    suspend fun retrieveArticle(source: Uri): Attempt<Article>
}
