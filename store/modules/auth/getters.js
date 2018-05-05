export default {
    isLogin(state) {
        return !!state.token;
    },

    getUser(state) {
        return state.user || {}
    }
}