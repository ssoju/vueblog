import axios from '~/plugins/axios'

export default {

    async CREATE_TAG({ commit, state, getters }, params) {
        // eg: {name: 'new tag'}
        const { data } = await axios.post(`/tag`, params, {
            headers: {
                token: state.token
            }
        })
        return data
    },

    async DELETE_TAG({ commit, state, getters }, id) {
        const { data } = await axios.delete(`/tag/${id}`, {
            headers: {
                token: state.token
            }
        })
        return data
    },

    async UPDATE_TAG({ commit, state, getters }, params) {
        // eg: {id: '001', name: 'new tag name'}
        const { data } = await axios.patch(`/tag`, params, {
            headers: {
                token: state.token
            }
        })
        return data
    },

    async TAGS({ commit, state, getters }, id = '') {
        const { data } = await axios.get(`/tags/${id}`)
        return data
    },

    async SEARCH({ commit, state, getters }, id = '') {
        const { data } = await axios.get(`/search/${id}`)
        return data
    },

    async ARTICLES({ commit, state, getters }, page = 1, limit = 15) {
        const { data } = await axios.get(`/articles/${page}/${limit}`)
        return data
    },

    async PRIVATE_ARTICLES({ commit, state, getters }) {
        const { data } = await axios.get(`/private-articles`, {
            headers: {
                token: state.token
            }
        })
        return data
    },

    async CREATE_ARTICLE({ commit, state, getters }, params) {
        const { data } = await axios.post(`/article`, params, {
            headers: {
                token: state.token
            }
        })
        return data
    },

    async DELETE_ARTICLE({ commit, state, getters }, id) {
        // let id = params.id, isPublish = params.publish, data
        const { data } = await axios.delete(`/article/${id}`, {
            headers: {
                token: state.token
            }
        })
        return data
    },

    async UPDATE_ARTICLE({ commit, state, getters }, params) {
        const { data } = await axios.patch(`/article`, params, {
            headers: {
                token: state.token
            }
        })
        return data
    },

    async ARTICLE_DETAIL({ commit, state, getters }, id) {
        const { data } = await axios.get(`/article/${id}`)
        return data
    },

    async ARCHIVES({ commit, state, getters }) {
        const { data } = await axios.get(`/archives`)
        return data
    }
}