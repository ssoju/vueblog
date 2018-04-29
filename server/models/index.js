import mongoose from 'mongoose'
import md5 from 'md5'
import config from '../config'

import './user'
import './tag'
import './article'

const User = mongoose.model('User')

const mongoUrl = `mongodb://${config.mongodb.username}:${config.mongodb.password}@${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.database}`
mongoose.Promise = global.Promise
mongoose.connection
  .openUri(mongoUrl)
  .once('open', async () => {
    console.log('database connect successed')
    // init admin information
    let userInfo = config.user
    userInfo.password = md5(userInfo.password)

    let user = await User.findOne({ role: 'superAdmin' }).exec()
    if (!user) {
      user = new User(userInfo)
      await user.save()
      console.log('Administrator information initialization succeeded')
    }
  })
  .on('error', (error) => {
    console.warn('database connect fail', error)
  })
