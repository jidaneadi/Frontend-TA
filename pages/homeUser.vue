<template>
  <v-row justify="center" align="center">
    <v-col class="py-4">
      <!-- <p>NIK: {{ $route.query.nik }}</p> -->
      <div class="pt-4 pb-2">
        <h3 class="text-subtitle font-weight-regular-blod">Welcome Back, {{ nama }}</h3>
      </div>
      <v-chip outlined color="grey">
        <v-icon color="grey">mdi-account</v-icon>
        Masyarakat
      </v-chip>
      <!-- ===============Batas Card===================== -->
      <v-row class="d-flex justify-space-around mb-2 mt-2 pt-6">
        <v-card color="yellow lighten-1" width="210" height="110" three-line to="/diajukan">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-subtitle-1 font-weight-bold mb-4 text-center">
                Diproses
              </div>
              <v-list-item-title class="text-h4 font-weight-bold text-center mb-1" text="center">
                19
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon large dark>
                mdi-history
              </v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-card>
        <v-card color="red lighten-1" width="210" height="110" three-line to="/tolak">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-subtitle-1 font-weight-bold mb-4 text-center">
                Ditolak
              </div>
              <v-list-item-title class="text-h4 font-weight-bold text-center mb-1" text="center">
                19
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon large dark>
                mdi-cancel
              </v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-card>
        <v-card color="light-green lighten-1" width="210" height="110" three-line to="/terverivikasi">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-subtitle-1 font-weight-bold mb-4 text-center">
                Terverifikasi
              </div>
              <v-list-item-title class="text-h4 font-weight-bold text-center mb-1" text="center">
                19
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon large dark>
                mdi-gesture-tap-button
              </v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-card>
        <v-card color="green lighten-1" width="210" height="110" three-line to="/terbit">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-subtitle-1 font-weight-bold mb-4 text-center">
                Diterbitkan
              </div>
              <v-list-item-title class="text-h4 font-weight-bold text-center mb-1" text="center">
                19
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon large dark>
                mdi-arrow-up-bold-box-outline
              </v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-card>
        <v-card color="green darken-1" width="210" height="110" three-line to="/selesai">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-subtitle-1 font-weight-bold mb-4 text-center">
                Diambil
              </div>
              <v-list-item-title class="text-h4 font-weight-bold text-center mb-1" text="center">
                19
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon large dark>
                mdi-checkbox-marked-circle-outline
              </v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-card>
      </v-row>
      <!-- ===============Batas Card===================== -->

      <!-- ===============Batas Pilihan Layanan===================== -->
      <div class="d-flex justify-center mb-2 mt-2 pt-6">
        <p class="grey--text text-subtitle-1 font-weight-bold">Silahkan Ajukan Surat</p>
        <v-spacer />
        <v-menu offset-y open-on-hover>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="white" class="teal--text" v-bind="attrs" v-on="on" rounded>
              Ajukan Surat
              <v-icon color="teal">mdi-cached</v-icon>
            </v-btn>
          </template>
          <v-list nav dense>
            <v-list-item color="teal" v-for="(item, i) in layanan" :key="i" :to="item.to" class="text-subtitle-2" router
              exact>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <v-divider color="black"></v-divider>
      <div class="pt-8">
      <v-card>
        <v-card-text>
          <h2 class="py-2 font-weight-bold text-center black--text">Pesan Kepada Masyarakat Desa Tercinta!</h2>
          <v-divider></v-divider>
        </v-card-text>
        <v-card-text>
          <v-row align="center">
            <v-col cols="6">
              <v-img src="img/logo.png" height="180" width="700"></v-img>
            </v-col>
            <v-col class="text-subtitle-2 text-justify " cols="6">
              Pemerintah Desa Sumbung berkomitmen untuk memberikan pelayanan terbaik kepada Anda.Kami memahami betapaberharganya
              waktu Anda, oleh karena itu kami menyediakan platcard online yang memudahkan Anda mengajukan surat permohonan.
              Dengan layanan kami, Anda dapat mengurus surat permohonan dengan mudah, cepat, dan tanpa harus datang ke kantor
              kami. Tim kami yang ramah dan profesional akan dengan cepat memproses permohonan Anda, sehingga Anda tidak perlu
              khawatir tentang antrian panjang atau jam buka kantor. Dapatkan kemudahan dan kenyamanan dengan menggunakan teknologi
              terkini.Ayo, ajak sanak saudara dan teman-teman kalian untuk mengunjungi web Desa Sumbung sekarang dan rasakan perbedaannya.
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
    </v-col>
  </v-row>
</template>

<script>

import { mapState } from 'vuex';
export default {
  middleware : ['auth'],
  head() {
    return {
      title: 'Home User'
    }
  },
  data() {
    return {
      items: [
        {
          title: 'Diajukan',
          to: '/diajukan',
        },
        {
          title: 'Terverivikasi',
          to: '/terverivikasi',
        },
        {
          title: 'Diterbitkan',
          to: '/terbit',
        },
        {
          title: 'Ditolak',
          to: '/tolak',
        },
        {
          title: 'Selesai',
          to: '/selesai',
        },
      ],
      layanan: [
        {
          title: 'Pengantar KTP',
          to: '/l_ktp',
        },
        {
          title: 'Pengantar KK',
          to: '/l_kk',
        },
        {
          title: 'Pengantar Kematian',
          to: '/l_kematian',
        },
        {
          title: 'Pengantar Kelahiran',
          to: '/l_kelahiran',
        },
        {
          title: 'Pengantar Tidak Mampu',
          to: '/l_tidakmampu',
        },
      ],
    }
  },
  computed :{
    ...mapState('auth', ['nama']),
  }
  // name: 'IndexPage',
}
</script>
