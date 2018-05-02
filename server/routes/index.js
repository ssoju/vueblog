import Router from 'koa-router'
import '../models'
import config from '../config'

const router = new Router({
    prefix: config.app.routerBaseApi
})


import authRouter from './auth'
router.use('/auth', authRouter.routes())


import blogRouter from './blog'
router.use('/blog', blogRouter.routes())

export default router
