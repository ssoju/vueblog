import Vue from 'vue'
import VcTip from '../components/vc-tip.vue'
import BlogLists from '../components/blog-lists.vue'
import BlogComments from '../components/blog-comments.vue'
import TopPreview from 'top-editor/src/lib/TopPreview.vue'
import TopEditor from 'top-editor/src/lib/TopEditor.vue'

const components = { VcTip, BlogLists, BlogComments, TopPreview, TopEditor }

Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
})
