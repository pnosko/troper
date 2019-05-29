package com.peterparameter.troper.view

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import arrow.core.toOption
import com.peterparameter.troper.utils.getOrThrow

class ArticleContentFragment : Fragment() {
    private lateinit var content: String

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        super.onCreateView(inflater, container, savedInstanceState)

        content = savedInstanceState?.getString("content").toOption().getOrThrow()
        return null
    }
}

