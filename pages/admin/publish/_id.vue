<template>
    <div class="admin-publish">
        <input type="text" placeholder="제목" v-model="article.title" class="publish-title">
        <div class="publish-content">
            <top-editor v-model="article.content" :upload="upload" :options="options" @save="save"/>
        </div>
        <div class="publish-handle">
            <input type="text" placeholder="태그 추가" v-model="tag" @keyup.enter="addTag">
            <ul class="handle-tag">
                <li v-for="(item, index) in article.tags" :key="index"> {{ item.name }} <span
                        @click="delTag(item, index)">&times;</span></li>
            </ul>
            <div class="handle-button">
                <button class="button-private" @click="publish(false)">비공개 등록</button>
                <button class="button-publish" @click="publish(true)">등록</button>
            </div>
        </div>
        <div class="publish-tags">
            <p class="tags-intro">태그：</p>
            <div class="tags-all">
                <a v-for="(tag,index) in tags" :key="index" @click="chooseTag(tag)">{{ tag.name }}</a>
            </div>
        </div>
        <vc-tip ref="tip"/>
    </div>
</template>
<script>
    import TopPreview from 'top-editor/src/lib/TopPreview.vue'
    import TopEditor from 'top-editor/src/lib/TopEditor.vue'

    export default {
        middleware: 'auth',
        data() {
            return {
                upload: {
                    url: this.$store.getters.baseUrl + '/upload',
                    headers: {
                        token: this.$store.state.auth.token
                    }
                },
                options: {},
                article: {
                    title: '',
                    content: '',
                    tags: []
                },
                tags: [],
                tag: ''
            }
        },

        mounted() {
            if (process.browser) {
                this.options = {
                    linkify: true,
                    preview: false,
                    highlight(str, lang = 'javascript') {
                        if (require('highlight.js').getLanguage(lang)) {
                            try {
                                return require('highlight.js').highlight(lang, str).value
                            } catch (__) {
                            }
                        }
                        return ''
                    }
                }
            }
            this.$store.dispatch('blog/TAGS').then((data) => {
                this.tags = data.data
            })
            if (this.$route.params.id) {
                let id = this.$route.params.id
                this.$store.dispatch('blog/ARTICLE_DETAIL', id).then((data) => {
                    this.article = data.data
                })
            }
        },
        methods: {
            chooseTag(tag) {
                if (this.article.tags.findIndex(item => item.name === tag.name) > -1) {
                    this.$refs.tip.openTip('이미 등록된 태그입니다.')
                    return
                }
                this.article.tags.push(tag)
            },
            delTag(tag, index) {
                this.article.tags.splice(index, 1)
            },
            addTag() {
                if (this.tags.findIndex(item => item.name === this.tag) > -1) {
                    // add tag
                    this.tags.forEach((item) => {
                        if (item.name === this.tag) {
                            this.article.tags.push(item)
                            this.tag = ''
                        }
                    })
                } else {
                    // create tag
                    this.$store.dispatch('blog/CREATE_TAG', {name: this.tag}).then((data) => {
                        if (data.success) {
                            this.article.tags.push(data.data)
                            this.$refs.tip.openTip('태그가 등록되었습니다.')
                            this.tag = ''
                        }
                    })
                }
            },
            publish(isPublish) {
                let tagsID = []
                let article = {}
                if (!this.article.title || !this.article.content) {
                    this.$refs.tip.openTip('제목 및 내용을 입력해 주세요！')
                    return false
                }
                this.article.tags.forEach((item) => {
                    tagsID.push(item.id)
                })
                // update article
                if (this.article.id) {
                    article = {
                        id: this.article.id,
                        title: this.article.title,
                        content: this.article.content,
                        tags: tagsID,
                        publish: isPublish,
                    }
                    this.$store.dispatch('blog/UPDATE_ARTICLE', article).then((data) => {
                        if (data.success) {
                            this.$refs.tip.openTip('수정되었습니다.')
                        }
                    })
                } else {
                    article = {
                        title: this.article.title,
                        content: this.article.content,
                        tags: tagsID,
                        publish: isPublish,
                    }
                    this.$store.dispatch('blog/CREATE_ARTICLE', article).then((data) => {
                        if (data.success) {
                            this.$refs.tip.openTip('등록되었습니다.')
                            this.article.title = ''
                            this.article.content = ''
                            this.article.tags = []
                        }
                    })
                }
            },
            save(val) {
                if (val === true) {
                    // ctrl + s save article
                    this.publish(false)
                }
            }
        },
        components: {
            TopEditor,
            TopPreview
        }
    }

</script>
<style lang="scss" scoped>
    @import '~/assets/css/var.scss';

    .admin-publish {
        max-width: 960px;
        margin: 30px auto;
        .publish-title {
            display: block;
            width: 100%;
            margin-bottom: 20px;
        }
        .publish-handle {
            margin-top: 40px;
            display: flex;
            position: relative;
            input {
                flex: 1;
            }
            .handle-button {
                width: 400px;
                text-align: right;
                button {
                    border: none;
                    line-height: 38px;
                    width: 80px;
                    border-radius: 3px;
                    font-size: 16px;
                    cursor: pointer;
                }

                .button-private {
                    margin-right: 15px;
                    background-color: #ccc;
                    &:hover {
                        background-color: darken(#ccc, 5%);
                    }
                }
                .button-publish {
                    background-color: $font-color;
                    color: #fff;
                    &:hover {
                        background-color: darken($font-color, 5%);
                    }
                }
            }
            .handle-tag {
                position: absolute;
                overflow: hidden;
                top: -90%;
                li {
                    position: relative;
                    display: inline-block;
                    font-size: 14px;
                    background-color: #eee;
                    margin-right: 15px;
                    padding-left: 8px;
                    padding-right: 8px;
                    border-radius: 3px;
                    span {
                        cursor: pointer;
                    }
                }
            }
        }
        .publish-tags {
            margin-top: 15px;
            display: flex;
            .tags-intro {
                width: 90px;
            }
            .tags-all {
                flex: 1;
                a {
                    margin-right: 15px;
                }
            }
        }
    }

</style>
