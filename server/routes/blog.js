import checkToken from '../middlewares/check-token'
import Router from 'koa-router'
import * as tag from '../controllers/tag'
import * as blog from '../controllers/blog'
import * as comment from '../controllers/comment'

const blogRouter = new Router();

blogRouter
    .get('/tags/:id?', tag.getTagsOrArticles)
    .post('/tag', checkToken, tag.postTag)
    .patch('/tag', checkToken, tag.patchTag)
    .del('/tag/:id?', checkToken, tag.deleteTag)

    .get('/search/:keyword?', blog.search)

    .get('/article/:id?', blog.getArticle)
    .get('/articles/:page?/:limit?', blog.getArticles)
    .get('/private-articles', checkToken, blog.getPrivateArticles)
    .get('/archives', blog.archives)
    .post('/article', checkToken, blog.postArticle)
    .post('/upload', checkToken, blog.upload)
    .patch('/article', checkToken, blog.patchArticle)
    .del('/article/:id?', checkToken, blog.deleteArticle)

    .post('/comment', checkToken, comment.postComment)
    .patch('/comment', checkToken, comment.patchComment)
    .delete('/comment', checkToken, comment.deleteComment)

export default blogRouter