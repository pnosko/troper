package com.peterparameter.troper.activities

import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import com.peterparameter.troper.view.ArticleCollectionView
import org.jetbrains.anko.setContentView

class ArticleCollectionActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        ArticleCollectionView().setContentView(this)
    }
}