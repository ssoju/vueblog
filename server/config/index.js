export default {
  user: {
    role: 'superAdmin',
    username: 'q',
    password: 'q',
    email: 'comahead@gmail.com',
    nickname: 'VueBlog',
    motto: 'Never too old to learn',
    avatar: 'avatar.png'
  },
  jwt: {
    secret: 'vueblog'
  },
  mongodb: {
    host: '.mlab.com',
    database: '',
    port: 27063,
    username: '',
    password: ''
  },
  production: {
    host: '198.13.32.165',
    domain: 'http://www.'
    // domain: 'http://127.0.0.1:3000'
  },
  app: {
    host: '127.0.0.1',
    port: 3000,
    routerBaseApi: '/api'
  }
}
