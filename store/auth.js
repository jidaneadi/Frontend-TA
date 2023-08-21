import jwtDecode from "jwt-decode"

export const state = () => ({
  acces_token : null,
  refresh_token : null,
  nama : null,
  role:null,
  id:null,
})

export const getters = {
  // authitencated(state){
  //   if(state.acces_token && state.role == 'masyarakat'){
  //     return true
  //   } return false
  // },
  // authitencatedAdmin(state){
  //   if(state.acces_token && state.role == 'admin'){
  //     return true
  //   } return false
  // }

  authitencated(state){
      if(state.acces_token ){
        const cek = jwtDecode(state.acces_token)
        if(cek.role == "masyarakat"){
        return true
        }
        return false
      } return false
    },
    authitencatedAdmin(state){
      if(state.acces_token ){
 const cek = jwtDecode(state.acces_token)
 if(cek.role == "admin"){
        return true
        }
        return false
      } return false
    },
    user:(state) => {
      if(state.acces_token){
        return jwtDecode(state.acces_token)
      }
      return nil
    }
}

export const mutations = {
  setId(state, id) {
    state.id = id
  },
  setNama(state, nama) {
    state.nama = nama
  },
  setRole(state, role) {
    state.role = role
  },
  setAccesToken(state, acces_token) {
    state.acces_token = acces_token
  },
  setRefreshToken(state, refresh_token) {
    state.refresh_token = refresh_token
  },
}
export const actions = {
  async login({commit},payload){
      const response = await this.$axios.post('http://127.0.0.1:4000/auth/login', payload)
      if(!response){
        return false
      }

      // console.log(response.data)
      commit('setAccesToken', response.data.acces_token)
      commit('setRefreshToken', response.data.refresh_token)
      commit('setNama', response.data.nama)
      commit('setRole', response.data.role)
      commit('setId', response.data.id)

    return response.data
  }
}
