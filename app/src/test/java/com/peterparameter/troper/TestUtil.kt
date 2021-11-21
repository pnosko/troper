package com.peterparameter.troper

import java.io.File

object TestUtil {
    fun loadResource(filename: String): String =
        File(TestConstants.resourceFolder + filename).readText()
}