export default function ({store, error, redirect, req}) {
    if (!store.state.auth.token) {
        /* error({
          message: 'cookie失效或未登录，请登录后操作',
          statusCode: 403
        }) */
        redirect('/login')
    }
}
