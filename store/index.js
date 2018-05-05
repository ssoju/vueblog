import Vuex from 'vuex'

import cookie from '~/plugins/cookie'
import auth from './modules/auth'
import blog from './modules/blog'
import { getters, actions, mutations, state } from './shared'

export default () => {
    return new Vuex.Store({
        modules: {
            auth,
            blog
        },
        getters,
        mutations,
        state,
        actions: {
            ...actions,

            async nuxtServerInit({ dispatch, commit, getters }, { req, res }) {
                if (req.headers.cookie) {
                    let cookieObj = cookie.parse(req.headers.cookie)


                    console.log('nuxtServerInit', cookieObj)

                    if (cookieObj && cookieObj.token) {
                        console.log('!!!')
                        commit('auth/SET_TOKEN', cookieObj.token)
                    }
                }

                const { data }  = await dispatch('auth/USER')
                commit('auth/SET_USER', data)
            }
        },
        strict: true,
        plugins: []
    })
}
