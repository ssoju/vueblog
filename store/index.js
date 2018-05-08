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
            // 서버에서 호출되는 부분으로서, 얻어진 데이타를 본문내에 json으로 뿌려주고,
            // 이를 브라우저의 store에 셋팅해 준다.
            async nuxtServerInit({ dispatch, commit, getters }, { req, res }) {
                if (req.headers.cookie) {
                    let cookieObj = cookie.parse(req.headers.cookie)

                    if (cookieObj && cookieObj.token) {
                        commit('auth/SET_TOKEN', cookieObj.token)
                    }
                }

                const { data }  = await dispatch('auth/USER')
                commit('auth/SET_USER', data)
            },
            ...actions

        },
        strict: true,
        plugins: []
    })
}
