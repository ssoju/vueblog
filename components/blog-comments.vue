<template>
    <div class="blog-comments">
        <div class="blog-comment-write" v-if="$store.state.auth.token">
            <form @submit.prevent="onAddComment">
                <div class="blog-comment-avatar  size36x36">
                    <img :src="avatar" class="avatar-image size36x36" :alt="$store.state.auth.user.nickname">
                </div>
                <div class="blog-comment-writer">
                    {{ $store.state.auth.user.nickname }}
                </div>
                <textarea v-model="content" ref="content" class="blog-comment-textarea"
                          placeholder="댓글 추가..."></textarea>
                <div class="blog-comment-bottom">
                    <button>등록</button>
                </div>
            </form>
        </div>
        <div class="blog-comment-nonlogin" v-if="!$store.state.auth.token">
            <nuxt-link to="/login">로그인 후에 이용해 주세요.</nuxt-link>
        </div>
        <ul class="blog-comment-list">
            <li class="blog-comment-item" v-for="comment in comments">
                <div class="blog-comment-avatar size36x36">
                    <img :src="'/static/images/avatars/'+comment.user.avatar" class="avatar-image size36x36" :alt="comment.user.nickname">
                </div>
                <div class="blog-comment-body">
                    <div class="blog-comment-author">
                        <span class="blog-comment-nickname">{{ comment.user.nickname }}</span>
                        <timeago :since="comment.createdAt" class="blog-comment-timeago"></timeago>
                    </div>
                    <div class="blog-comment-content">
                        {{ comment.content }}

                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'blog-comments',
        props: ['articleId', 'comments'],
        data() {
            return {
                content: ''
            }
        },
        computed: {
            avatar() {
                return '/static/images/avatars/gilbert.jpg'// + this.$store.state.auth.user.avatar;
            }
        },
        mounted() {
        },
        methods: {
            getComments() {
                this.$store.dispatch('blog/GET_COMMENTS', {
                    articleId: this.articleId
                }).then((res) => {
                    if (res.success) {
                        this.comments = res.data;
                    }
                })
            },

            onAddComment(e) {
                if (!this.content) {
                    alert('please input content')
                    this.$refs.content.focus()
                    return
                }

                this.$store.dispatch('blog/CREATE_COMMENT', {
                    articleId: this.articleId,
                    content: this.content
                }).then((res) => {
                    if (res.success) {
                        this.comments.unshift(res.data);
                    }
                })
            }
        }
    }

</script>
<style lang="scss">
    .size36x36 {
        width: 36px;
        height: 36px;
    }

    .avatar-image {
        border-radius: 50%;
    }

    .blog-comments {
        //border: 1px solid blue;
        min-height: 100px;
        margin-top: 40px;
        color: #a1a1a1;
    }

    .blog-comment-avatar {
        display: inline-block;
        vertical-align: top;
    }

    .blog-comment-writer {
        display: inline-block;
        padding: 6px;
    }

    .blog-comment-textarea {
        display: block;
        width: 100%;
        height: 80px;
        margin-top: 10px;
        padding: 3px;
        font-size: 1em;
    }

    .blog-comment-bottom {
        padding: 5px 0;
        button {
            color: #fff;
            background-color: #000;
            float: right;
            border: none;
            line-height: 38px;
            width: 80px;
            border-radius: 3px;
            font-size: 16px;
            cursor: pointer;
        }
    }

    .blog-comment-list {
        margin-top: 30px;
        list-style: none;
    }

    .blog-comment-item {
        margin-bottom: 20px;
    }

    .blog-comment-timeago {
        font-size: 0.8em;
        color: #a1a1a1;
    }

    .blog-comment-body {
        display: inline-block;
        padding: 0 10px;
    }

    .blog-comment-nickname {
        margin-right: 6px;
    }

    .blog-comment-content {
        color: #000;
    }
</style>