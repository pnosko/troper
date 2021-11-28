package com.peterparameter.troper.view

import android.widget.Toast
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.text.selection.SelectionContainer
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Surface
import androidx.compose.material.darkColors
import androidx.compose.material.lightColors
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import com.halilibo.richtext.markdown.Markdown
import com.halilibo.richtext.ui.RichTextStyle
import com.halilibo.richtext.ui.material.MaterialRichText
import com.halilibo.richtext.ui.resolveDefaults
import com.peterparameter.troper.domain.Article

@Composable
fun ArticleView(state: ArticleState) {

}

@Composable
fun ArticleContentView(article: Article) {
    var richTextStyle by remember { mutableStateOf(RichTextStyle().resolveDefaults()) }
    var isDarkModeEnabled by remember { mutableStateOf(false) }

    val colors = if (isDarkModeEnabled) darkColors() else lightColors()
    val context = LocalContext.current

    MaterialTheme(colors = colors) {
        Surface {
            Column {
                SelectionContainer {
                    Column(Modifier.verticalScroll(rememberScrollState())) {
                        MaterialRichText(
                            style = richTextStyle,
                            modifier = Modifier.padding(8.dp),
                        ) {
                            Markdown(
                                content = article.content,
                                onLinkClicked = {
                                    Toast.makeText(context, it, Toast.LENGTH_SHORT).show()
                                }
                            )
                        }
                    }
                }
            }
        }
    }
}
class ArticleState {

}
//@ExperimentalContracts
//@InternalSplittiesApi
//class ArticleView(override val ctx: Context) : Ui {
//    private val s = AndroidStyles(ctx)
//
//    var isBusy: Boolean
//        get() = busyIndicator.isVisible
//        set(value) {
//            busyIndicator.isVisible = value
//        }
//
//    fun setup(article: Article) {
//        articleContentView.loadData(article.content!!, "text/html", "UTF-8")
//        title.text = article.title
//    }
//
//    override val root by lazy { content }
//
//    private val content by lazy {
//        verticalLayout {
//            add(articleContentView, lParams(matchParent, matchParent) { })
//            add(busyIndicator, lParams(matchParent, matchParent) { gravityCenter })
//        }
//    }
//
//    private val title by lazy { textView {} }
//
//    private val articleContentView by lazy { webView(View.generateViewId()) {
//        webViewClient = TropesWebClient()
//    } }
//
//    private val busyIndicator by lazy { s.progressBar.default { isVisible = false } }
//}
