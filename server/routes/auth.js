import Router from 'koa-router'
import checkToken from '../middlewares/check-token';
import * as user from '../controllers/user'

const auth = new Router();

auth
    .get('/user', user.getUserInfo)
    .patch('/user', checkToken, user.patchUserInfo)
    .post('/login', user.login)
    .post('/logout', checkToken, user.logout)

export default auth;