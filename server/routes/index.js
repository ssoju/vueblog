import Router from 'koa-router'
import config from '../config'
import db from '../models'
import checkToken from '../middlewares/check-token'

const router = new Router()

const user = require('../controllers/user')
const tag = require('../controllers/tag')
const article = require('../controllers/article')

const auth = new Router();

auth
  .get('/user', user.getUserInfo)
  .patch('/user', checkToken, user.patchUserInfo)
  .post('/login', user.login)
  .post('/logout', checkToken, user.logout)
router.use('/auth', auth.routes())



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
router.use('/blog', blog.routes())

export default router
