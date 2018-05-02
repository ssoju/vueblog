import Koa from 'koa'
import {Nuxt, Builder} from 'nuxt'
import path from 'path'
import KoaStatic from 'koa-static'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'
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
    router.use('', route.routes())
    app
        .use(router.routes())
        .use(router.allowedMethods())

    // Import and Set Nuxt.js options
    let config = require('../nuxt.config.js')
    config.dev = !(app.env === 'production')

    // Instantiate nuxt.js
    const nuxt = new Nuxt(config)

    // Build in development
    if (config.dev) {
        console.log('dev mode...')
        const builder = new Builder(nuxt)
        await builder.build()
    }

    console.log('server starting...')

    app.use(async (ctx, next) => {
        console.log('request', ctx.req.url)
        await next()
        ctx.status = 200 // koa defaults to 404 when it sees that status is unset
        return new Promise((resolve, reject) => {
            console.log('in promise')
            ctx.res.on('close', resolve)
            ctx.res.on('finish', resolve)
            nuxt.render(ctx.req, ctx.res, promise => {
                console.log('nuxt render')
                // nuxt.render passes a rejected promise into callback on error.
                promise.then(resolve).catch(reject)
            })
        })
    })

    app.listen(port, host)
    console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
}

start()
