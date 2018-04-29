import axios from '~/plugins/axios'

export default {
    async ADMIN_INFO({ commit, state, getters }) {
        const { data } = await axios.get(`/user`)
        return data
    },

    async UPDATE_ADMIN({ commit, state, getters }, params) {
        const { data } = await axios.patch(`/user`, params, {
            headers: {
                token: state.token
            }
        })
        return data
    },

    async LOGIN({ commit, state, getters }, user) {
        const { data } = await axios.post(`/login`, user)
        commit('SET_TOKEN', data.data.token)
        return data
    },

    async LOGOUT({ commit, state, getters }) {
        const { data } = await axios.post(`/logout`, {}, {
            headers: {
                token: state.token
            }
        })
        return data
    }
}
