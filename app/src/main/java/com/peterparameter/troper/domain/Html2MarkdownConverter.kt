package com.peterparameter.troper.domain

import arrow.core.Either
import com.peterparameter.troper.utils.Attempt
import com.overzealous.remark.*

object Html2MarkdownConverter {
    fun convert(htmlContent: String): Attempt<String> {
        return Either.catch {
            Remark().convertFragment(htmlContent)
        }
    }
}