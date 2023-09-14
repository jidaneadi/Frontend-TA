import Cookies from 'js-cookie'

export default function ({ $axios, redirect, store }) {
  //Mengirim acces_token supaya dapat mengload data melalui api yg membutuhkan acces_token
  $axios.onRequest((config) => {
    if (
      store.getters['auth/authitencated'] ||
      store.getters['auth/authitencatedAdmin']
    ) {
      config.headers['Authorization'] = `Bearer ${store.state.auth.acces_token}`
    }
  })

  //Generate ulang acces_token & refresh_token saat kadaluwarsa
  $axios.onResponseError(async (error) => {
    try {
      //Pengecekan refresh token, jika expired token dihapus
      if (error.response.data.msg === 'Invalid refresh token') {
        throw new Error('Logout')
      }

      //Pengcekan acces token, jika invalid akan merequest token baru
      if (
        error.response.status === 401 &&
        error.response.data.msg === 'Invalid acces token'
      ) {
        let refresh_token = store.state.auth.refresh_token
        console.log(refresh_token)
        const response = await $axios.$post('/auth/refresh', {
          "refresh_token": refresh_token,
        })
        //Menyimpan token baru ke store
        console.log(error.response.data.msg)
        store.commit(`auth/setAccesToken`, response.acces_token)
        store.commit(`auth/setRefreshToken`, response.refresh_token)

        let originalRequest = error.config
        originalRequest.headers[
          'Authorization'
        ] = `Bearer ${response.acces_token}`
        return $axios(originalRequest)
      }
    } catch (error) {
      console.log(error.message)
      if(error.message === 'Logout'){
        Cookies.remove('token')
        return (window.location.href = '/')
      }
    }
  })
}
