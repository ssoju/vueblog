export default {
  user: {
    role: 'superAdmin',
    username: 'comahead',
    password: 'qazx1234',
    email: 'comahead@gmail.com',
    nickname: 'VueBlog',
    motto: 'Never too old to learn',
    avatar: 'avatar.png'
  },
  jwt: {
    secret: 'vueblog'
  },
  mongodb: {
    host: 'ds127063.mlab.com',
    database: 'comahead',
    port: 27063,
    username: 'comahead',
    password: 'qazx1234'
  },
  production: {
    host: '211.110.5.182',
    domain: 'http://vueblog.maru.zone'
    // domain: 'http://127.0.0.1:3000'
  },
  app: {
    host: 'http://vueblog.maru.zone',
    port: 80,
    routerBaseApi: '/api'
  }
}
