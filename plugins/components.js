import Vue from 'vue'


import TopTip from '../components/top-tip.vue'

const components = { TopTip }

Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
})
