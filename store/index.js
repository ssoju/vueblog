import Vuex from 'vuex'
import axios from 'axios'

import auth from './modules/auth'
import blog from './modules/blog'
import shared from './shared'

export default () => {
    return new Vuex.Store({
        modules: {
            auth,
            blog
        },
        getters: {...shared.getters},
        mutations: {...shared.mutations},
        state: {...shared.state},
        actions: {
            ...shared.actions,

            async nuxtServerInit({ dispatch, commit, getters }, { req, res }) {
                if (req.headers.cookie) {
                    // eg: token='asdf';id='123'
                    let cookie = req.headers.cookie
                    let cookieObj = {}
                    let cookieArr = []
                    let key = ''
                    let value = ''

                    cookie = cookie.split(';')

                    for (let i = 0; i < cookie.length; i++) {
                        cookieArr = cookie[i].split('=')
                        key = cookieArr[0]
                        value = cookieArr[1]
                        cookieObj[key] = value
                    }
                    commit('auth/SET_TOKEN', cookieObj.token)
                }

                const { data } = await axios.get(`${getters.baseUrl}/user`)
                commit('auth/SET_USER', data)
            }
        },
        strict: true,
        plugins: []
    })
}
