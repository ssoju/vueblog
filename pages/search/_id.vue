<template>
    <div>
        <template v-if="$route.params.id">
            <top-lists :articles="articles"/>
        </template>
        <template v-else>
            <div class="search">
                <h3>검색어</h3>
                <label>
                    <input type="text" v-model="keyword" @keyup.enter="search" autofocus placeholder="검색어를 입력해 주세요.">
                </label>
            </div>
        </template>
    </div>
</template>
<script>
    export default {
        async asyncData({store, route}) {
            let id = route.params.id || ''
            const {data} = await store.dispatch('blog/SEARCH', id)
            return {
                articles: data || []
            }
        },
        head() {
            return {
                title: '유저 - ' + this.$store.getters.user.nickname
            }
        },
        data() {
            return {
                keyword: ''
            }
        },
        methods: {
            search() {
                if (this.keyword === '') {
                    return false
                }
                let keyword = encodeURIComponent(this.keyword)
                this.$router.push(`/search/${keyword}`)
            }
        }
    }

</script>
<style lang="scss" scoped>
    @import '~/assets/css/var.scss';

    .search {
        text-align: center;
        margin: 60px auto;
        h3 {
            font-size: 20px;
            font-weight: 400;
            margin-bottom: 30px;
        }
        label {
            display: block;
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
        }
        input {
            width: 100%;
        }
    }
</style>
