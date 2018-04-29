import Router from 'koa-router'
import config from '../config'
import db from '../models'
import checkToken from '../middlewares/check-token'

const router = new Router({
  prefix: config.app.routerBaseApi
})

const user = require('../controllers/user')
const tag = require('../controllers/tag')
const article = require('../controllers/article')

router
  .get('/auth/user', user.getUserInfo)
  .patch('/auth/user', checkToken, user.patchUserInfo)
  .post('/auth/login', user.login)
  .post('/auth/logout', checkToken, user.logout)

router
  .get('/blog/tags/:id?', tag.getTagsOrArticles)
  .post('/blog/tag', checkToken, tag.postTag)
  .patch('/blog/tag', checkToken, tag.patchTag)
  .del('/blog/tag/:id?', checkToken, tag.deleteTag)

router
  .get('/blog/search/:keyword?', article.search)
  .get('/blog/article/:id?', article.getArticle)
  .get('/blog/articles/:page?/:limit?', article.getArticles)
  .get('/blog/private-articles', checkToken, article.getPrivateArticles)
  .get('/blog/archives', article.archives)
  .post('blog/article', checkToken, article.postArticle)
  .post('/blog/upload', checkToken, article.upload)
  .patch('/blog/article', checkToken, article.patchArticle)
  .del('/blog/article/:id?', checkToken, article.deleteArticle)

export default router
