export default function ({$axios,redirect, store}){

  //Mengirim acces_token supaya dapat mengload data melalui api yg membutuhkan acces_token
  $axios.onRequest(config=>{
    if(store.getters['auth/authitencated'] || store.getters['auth/authitencatedAdmin']){
      config.headers['Authorization'] = `Bearer ${store.state.auth.acces_token}`
    }
  })

  //Generate ulang acces_token & refresh_token saat kadaluwarsa
  $axios.onResponseError(async (error) =>{
    try {
      // console.log(error.response)
      if(error.response.status === 401 && error.response.data.msg == "Invalid acces token"){
        // alert('Invalid acces token')
        let refresh_token = store.state.auth.refresh_token
        // console.log(refresh_token)
        const response = await $axios.$post('/auth/refresh', {'refresh_token': refresh_token})
        //Menyimpan token baru ke store
        // console.log(error)
        store.commit(`auth/setAccesToken`, response.acces_token)
        store.commit(`auth/setRefreshToken`, response.refresh_token)

        let originalRequest = error.config
        originalRequest.headers['Authorization'] = `Bearer ${response.acces_token}`
        return $axios(originalRequest)
      }
    } catch (error) {
      console.log(error)
      return redirect('/')
    }
  })
}
