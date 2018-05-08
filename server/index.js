import Koa from 'koa'
import {Nuxt, Builder} from 'nuxt'
import path from 'path'
import KoaStatic from 'koa-static'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'
import KoaCookie from 'koa-cookie'
import cors from '@koa/cors'
import globalConfig from './config'
import route from './routes'

async function start() {
    const app = new Koa()
    const host = process.env.HOST || globalConfig.app.host
    const port = process.env.PORT || globalConfig.app.port
    const router = new Router()

    app.use(cors())
    app.use(bodyParser())
    app.use(KoaStatic('.'))
    app.use(KoaCookie())
    router.use('', route.routes())
    app
        .use(router.routes())
        .use(router.allowedMethods())

    let config = require('../nuxt.config.js')
    config.dev = !(app.env === 'production')

    const nuxt = new Nuxt(config)
    if (config.dev) {
        console.log('dev mode...')
        const builder = new Builder(nuxt)
        await builder.build()
    }

    app.use(async (ctx, next) => {
        await next()
        ctx.status = 200 
        return new Promise((resolve, reject) => {
            ctx.res.on('close', resolve)
            ctx.res.on('finish', resolve)
            nuxt.render(ctx.req, ctx.res, promise => {
                promise.then(resolve).catch(reject)
            })
        })
    })

    app.listen(port, host)
    console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
}

start()

/*
// Start nuxt.js
  let config = require('../nuxt.config.js')
  config.dev = !(process.env.NODE_ENV === 'production')
  const nuxt = await new Nuxt(config)
  app.use(nuxt.render)
  if (config.dev) {
    // console.log(config.dev)
    try {
      await nuxt.build()
    } catch (error) {
      console.error(error) // eslint-disable-line no-console
      process.exit(1)
    }
  }
 */
