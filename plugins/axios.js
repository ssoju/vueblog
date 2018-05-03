import axios from 'axios'
import Vue from 'vue'

let instance = axios.create({
  baseURL: 'http://vueblog.maru.zone/api'
})

if (false && process.BROWSER_BUILD) {
  instance.interceptors.request.use(
    (config) => {
      if (localStorage.getItem('jwt_token')) {
        config.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt_token')}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )
  instance.interceptors.response.use(
    response => response,
    (error) => {
      if (error.response.status >= 500) {
        /*swal({
          type: 'error',
          title: 'Oops...',
          html: 'Something went wrong! Please try again.'
        })*/
      } else if (error.response.status === 401 && localStorage.getItem('jwt_token')) {
        /*swal({
          title: 'Session Expired!',
          html: 'Please log in again to continue.',
          allowOutsideClick: false
        })
          .then(() => store.dispatch('auth/LOGOUT'))
          .catch(swal.noop)*/

      }
      return Promise.reject(error)
    }
  )
}

Vue.axios = instance;
export default instance
