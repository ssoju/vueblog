import axios from '~/plugins/axios'

export default {
    async ADMIN_INFO({ commit, state, getters }) {
        const { data } = await axios.get(`auth/user`)
        return data
    },

    async UPDATE_ADMIN({ commit, state, getters }, params) {
        const { data } = await axios.patch(`auth/user`, params, {
            headers: {
                token: state.token
            }
        })
        return data
    },

    async USER({ commit, state, getters }) {
        const { data } = await axios.get('auth/user')
        commit('SET_USER', data)
        return data;
    },

    async LOGIN({ commit, state, getters }, user) {
        const { data } = await axios.post(`auth/login`, user)
        commit('SET_TOKEN', data.data.token)
        return data
    },

    async LOGOUT({ commit, state, getters }) {
        const { data } = await axios.post(`auth/logout`, {}, {
            headers: {
                token: state.token
            }
        })
        commit('SET_TOKEN', null)
        commit('SET_USER', null)
        return data
    }
}
