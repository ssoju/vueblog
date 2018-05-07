import Vue from 'vue'
import VueTimeago from '~/components/common/vue-timeago'


export default ({ app }, inject) => {
    Vue.use(VueTimeago, {
        locale: 'en-US',
        locales: {
            'es-US': {}
        }
    });
}