package com.peterparameter.troper.view

import com.peterparameter.troper.R

class ArticlesView : ViewPlaceholder  {
    override fun createView(): ViewId {
        return ViewId(R.id.view_pager)
    }
}
