<template>
  <v-row justify="center" align="center">
    <v-col class="py-4">
      <v-alert border="left" color="#C08261" class="text-subtitle-3 font-weight-bold  white--text">
        My Profile
      </v-alert>
      <div class="pt-3">
        <v-card>
          <div class="pa-2">
            <v-alert color="grey lighten-4" class="text-subtitle-2 text-center font-weight-bold  black--text">
              Edit Profile
            </v-alert>
          </div>
          <v-form ref="dataUser" lazy-validation class="px-1 py-3 mx-auto">
            <v-container >
              <v-row no-gutters align="center" class="py-2">
                <v-col class="d-flex flex-wrap text-subtitle-2 px-2" cols="12" xl="3" lg="3" md="3" >Email <strong class="red--text">*</strong> </v-col>
                <v-col cols="12" xl="9" lg="9" md="9">
                  <v-text-field v-model="form.email" :value="form.emai" :rules="emailRules" label="Input email" solo
                    required></v-text-field>
                </v-col>

                <!-- Jika sudah masuk api sepertinya harus menggunakan v-model -->
                <v-col class="d-flex flex-wrap text-subtitle-2 px-2" cols="12" xl="3" lg="3" md="3" >Nomor Induk Kependudukan <strong class="red--text">*</strong> </v-col>
                <v-col cols="12" xl="9" lg="9" md="9">
                  <v-text-field v-model="form.nik" :counter="20" :rules="nikRules" label="Input nomor induk kependudukan" solo required></v-text-field>
                </v-col>

                <v-col class="d-flex flex-wrap text-subtitle-2 px-2" cols="12" xl="3" lg="3" md="3" >Nama Lengkap <strong class="red--text">*</strong> </v-col>
                <v-col cols="12" xl="9" lg="9" md="9">
                  <v-text-field v-model="form.nama" :counter="50" :rules="nameRules" label="Input nama lengkap" solo
                    required></v-text-field>
                </v-col>

                <v-col class="d-flex flex-wrap text-subtitle-2 px-2" cols="12" xl="3" lg="3" md="3" >Jenis Kelamin <strong class="red--text">*</strong> </v-col>
                <v-col cols="12" xl="3" lg="3" md="3">
                  <v-select v-model="form.gender" :items="jenisKelamin" :rules="jkRules" label="Input jenis kelamin" solo required></v-select>
                </v-col>

                <v-col class="d-flex flex-wrap text-subtitle-2 px-2" cols="12" xl="2" lg="2" md="2" >No HP <strong class="red--text">*</strong> </v-col>
                <v-col cols="12" xl="4" lg="4" md="4">
                  <v-text-field v-model="form.no_hp" :counter="20" :rules="noRules" label="Input nomor handphone" solo required></v-text-field>
                </v-col>

                <v-col class="d-flex flex-wrap text-subtitle-2 px-2" cols="12" xl="3" lg="3" md="3" >Tempat Lahir <strong class="red--text">*</strong> </v-col>
                <v-col cols="12" xl="3" lg="3" md="3">
                  <v-text-field v-model="form.tempat_lahir" :counter="100" :rules="tmptRules" label="Input tempat lahir" solo
                    append-icon="mdi-map-marker" required></v-text-field>
                </v-col>

                <v-col class="d-flex flex-wrap text-subtitle-2 px-2" cols="12" xl="2" lg="2" md="2">Tanggal Lahir <strong class="red--text">*</strong> </v-col>
                <v-col cols="12" xl="4" lg="4" md="4">
                  <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
                    offset-y min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field v-model="form.birthday" label="Input tanggal lahir" append-icon="mdi-calendar" readonly
                        v-bind="attrs" v-on="on" solo></v-text-field>
                    </template>
                    <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
                  </v-menu>
                </v-col>

                <v-col class="d-flex flex-wrap text-subtitle-2 px-2" cols="12" xl="3" lg="3" md="3" >Alamat Rumah <strong class="red--text">*</strong> </v-col>
                <v-col cols="12" xl="9" lg="9" md="9">
                  <v-text-field v-model="form.alamat" :counter="100" :rules="alamatRules" label="Input alamat" solo append-icon="mdi-map-marker"
                    required></v-text-field>
                </v-col>
                <v-btn color="success" @click="dialog2 = true" block>
                  Kirim
                </v-btn>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </div>

      <!-- =========Dialog============ -->
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="text-h5">
            Apakah alamat email anda sudah benar?
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">
              Ya
            </v-btn>
            <v-btn color="red darken-1" text @click="dialog = false">
              Tidak
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- =========Dialog============ -->

      <!-- =========Dialog2============ -->
      <v-dialog v-model="dialog2" persistent max-width="290">
        <v-card>
          <v-card-title class="text-h5">
            Apakah data diri yang anda inputkan sudah benar?
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog2 = false">
              Ya
            </v-btn>
            <v-btn color="red darken-1" text @click="dialog2 = false">
              Tidak
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- =========Dialog2============ -->

    </v-col>
  </v-row>
</template>
<script>

import { mapGetters, mapState } from 'vuex'
export default {
  middleware: ['auth'],

  computed:{
    ...mapState('auth',['id'])
  },
  head() {
    return {
      title: 'My Profile'
    }
  },

  data() {
    return {
      dialog: false,
      dialog2: false,
      dataUser:[],
      form : {
        nik:'',
        email :'',
        nama: '',
        no_hp: '',
        gender: '',
        tempat_lahir: '',
        birthday: '',
        alamat: ''
      },
      nameRules: [
        v => !!v || 'Name masih k osong',
        v => (v && v.length <= 50) || 'Nama harus kurang dari 50 karakter',
      ],
      nikRules: [
        v => !!v || 'NIK masih kosong',
        v => (v && v.length == 16) || 'NIK harus berjumlah 16 karakter berupa angka',
      ],
      jkRules: [
        v => !!v || 'Jenis kelamin masih kosong',
      ],
      alamatRules: [
        v => !!v || 'Alamat masih kosong',
        v => (v && v.length <= 100) || 'Alamat harus kurang dari 100 karakter',
      ],
      jenisKelamin: ['Laki-laki', 'Perempuan'],
      noRules: [
        v => !!v || 'No HP masih kosong',
        v => (v && v.length <= 20) || 'No HP melebihi 20 karakter',
      ],
      tmptRules: [
      v => !!v || 'Tempat lahir masih kosong',
      ],
      tglRules: [
      v => !!v || 'Tanggal lahir masih kosong',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'Masukkan email yang valid',
      ],
      newemailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'Masukkan email yang valid',
        // v => newEmail==oldEmail || 'Email tidak boleh sama',
      ],
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      modal: false,
    }
  },
  created() {
    this.initialize()

  },
  methods:{
    initialize(){
      this.$axios.$get(`http://localhost:4000/profile/${this.user.id}`)
      .then((response => {
        this.$data.form = response
        console.log(response)
      })).catch((error) => {
        console.log(error)
      })
    },

    updateProfile() {
      this.$axios.$put(`http://localhost:4000/profile/${this.form.nik}`, this.form)
    }
  },

  computed:{
    ...mapGetters('auth', {
      user : 'user'
    })
  },
  name: 'My Profile',
}
</script>
