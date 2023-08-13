export const state = () => ({
  acces_token : null,
  refresh_token : null,
  nama : null,
  role:null,
})

export const getters = {
  authitencated(state){
    if(state.acces_token && state.role == 'masyarakat'){
      return true
    } return false
  },
  authitencatedAdmin(state){
    if(state.acces_token && state.role == 'admin'){
      return true
    } return false
  }
}

export const mutations = {
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

    return response.data
  }
}
