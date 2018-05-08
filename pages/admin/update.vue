<template>
    <div class="admin-update">
        <div class="update-info">
            <h4>개인정보 수정</h4>
            <input type="text" v-model="user.nickname">
            <input type="text" v-model="user.motto">
            <input type="text" v-model="user.email">
            <button @click="updateInfo">수정하기</button>
        </div>
        <div class="update-password">
            <h4>암호 변경</h4>
            <input type="password" v-model="oldPassword" placeholder="이전 암호">
            <input type="password" v-model="newPassword" placeholder="신규 암호">
            <input type="password" v-model="vertifyPassword" placeholder="암호 확인">
            <button @click="updatePassword">암호 수정</button>
        </div>
        <vc-tip ref="tip"/>
    </div>
</template>
<script>
    export default {
        middleware: 'auth',
        data() {
            return {
                oldPassword: '',
                newPassword: '',
                vertifyPassword: '',
                user: {}
            }
        },
        mounted() {
            this.$store.dispatch('auth/ADMIN_INFO').then((data) => {
                this.user = data.data
            })
        },
        methods: {
            updateInfo() {
                this.$store.dispatch('auth/UPDATE_ADMIN', this.user).then((data) => {
                    if (data.success) {
                        this.$refs.tip.openTip('수정되었습니다.')
                    }
                })
            },
            updatePassword() {
                if (!this.oldPassword || !this.newPassword || !this.vertifyPassword) {
                    return false
                }
                if (this.newPassword !== this.vertifyPassword) {
                    this.$refs.tip.openTip('암호가 동일하지 않습니다.')
                    return false
                }
                this.$store.dispatch('auth/UPDATE_ADMIN', {
                    oldPassword: this.oldPassword,
                    newPassword: this.newPassword
                }).then((data) => {
                    if (data.success) {
                        this.$refs.tip.openTip('수정되었습니다.')
                        // clear token
                        this.$store.dispatch('auth/LOGOUT').then(ret => {
                            if (ret.success) {
                                this.$store.commit('auth/LOGOUT')
                                this.$router.push('/login')
                            }
                        })
                    }
                })
            }
        },
        components: {}
    }

</script>
<style lang="scss" scoped>
    @import '~/assets/css/var.scss';

    .admin-update {
        max-width: 960px;
        margin: 60px auto;
        text-align: center;
        .update-info {
            margin-bottom: 30px;
        }
        input {
            display: block;
            width: 300px;
            margin: 20px auto;
        }
        button {
            border: none;
            line-height: 40px;
            width: 300px;
            background-color: $font-color;
            color: #fff;
            border-radius: 3px;
            font-size: 16px;
            &:hover {
                background-color: darken($font-color, 5%);
            }
        }
    }
</style>
