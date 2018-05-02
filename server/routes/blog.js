import checkToken from '../middlewares/check-token'
import Router from 'koa-router'
import * as tag from '../controllers/tag'
import * as article from '../controllers/article'

const blog = new Router();

blog
    .get('/tags/:id?', tag.getTagsOrArticles)
    .post('/tag', checkToken, tag.postTag)
    .patch('/tag', checkToken, tag.patchTag)
    .del('/tag/:id?', checkToken, tag.deleteTag)
    .get('/search/:keyword?', article.search)
    .get('/article/:id?', article.getArticle)
    .get('/articles/:page?/:limit?', article.getArticles)
    .get('/private-articles', checkToken, article.getPrivateArticles)
    .get('/archives', article.archives)
    .post('article', checkToken, article.postArticle)
    .post('/upload', checkToken, article.upload)
    .patch('/article', checkToken, article.patchArticle)
    .del('/article/:id?', checkToken, article.deleteArticle)

export default blog