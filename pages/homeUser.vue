<template>
  <v-row justify="center" align="center">
    <v-col class="py-1">
      <!-- <p>NIK: {{ $route.query.nik }}</p> -->
      <div class="pt-4 pb-2">
        <h3 class="text-subtitle font-weight-regular-blod">Welcome Back, {{ nama }}</h3>
      </div>
      <v-chip outlined color="grey">
        <v-icon color="grey">mdi-account</v-icon>
        Masyarakat
      </v-chip>

      <v-card class="d-flex justify-space-around flex-wrap my-2 py-4 mx-auto" max-width="1500" color="#E2C799">

        <!-- ===============Batas Card===================== -->
        <v-card class="mx-1 my-2 " width="230" height="110" three-line v-for="(item, i) in items" :key="i" :to="item.to">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-subtitle-1 font-weight-bold text-center">
                {{ item.title }}
              </div>
              <v-divider></v-divider>
              <v-list-item-title class="text-h4 font-weight-bold text-center mt-3 mb-1" text="center">
                19
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn fab small :color="item.color">
                <v-icon dark color="white">
                  {{ item.icon }}
                </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-card>
      </v-card>
      <!-- ===============Batas Card===================== -->
      <div class="pt-4 darken-1 text-center text-subtitle font-weight-black">
        Jenis Layanan Surat
      </div>
      <v-divider max-width="30px"></v-divider>
      <div>
        <v-sheet class="mx-auto" max-width="1500">
          <v-slide-group v-model="model" class="pa-4" center-active show-arrows>
            <v-slide-item v-for="n in layanan" :key="n" v-slot="{ active, toggle }">
              <v-card class="ma-4" width="250" height="150" hover @click="toggle">
                <v-list-item class="justify-center align-center">
                  <v-list-item-action>
                    <!-- <v-btn x-large color="#C08261"> -->
                    <v-icon dark x-large color="#C08261">
                      {{ n.icon }}
                    </v-icon>
                    <!-- </v-btn> -->
                  </v-list-item-action>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <div class="text-subtitle-1 font-weight-bold text-center">
                      {{ n.title }}
                    </div>
                  </v-list-item-content>
                </v-list-item>
                <v-fade-transition>
                  <v-overlay v-if="active" absolute color="#F2ECBE">
                    <v-btn color="#C08261" :to="n.to" >Ajukan surat</v-btn>
                  </v-overlay>
                </v-fade-transition>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
      </div>

      <v-divider></v-divider>
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
                Pemerintah Desa Sumbung berkomitmen untuk memberikan pelayanan terbaik kepada Anda.Kami memahami
                betapaberharganya
                waktu Anda, oleh karena itu kami menyediakan platcard online yang memudahkan Anda mengajukan surat
                permohonan.
                Dengan layanan kami, Anda dapat mengurus surat permohonan dengan mudah, cepat, dan tanpa harus datang ke
                kantor
                kami. Tim kami yang ramah dan profesional akan dengan cepat memproses permohonan Anda, sehingga Anda tidak
                perlu
                khawatir tentang antrian panjang atau jam buka kantor. Dapatkan kemudahan dan kenyamanan dengan
                menggunakan teknologi
                terkini.Ayo, ajak sanak saudara dan teman-teman kalian untuk mengunjungi web Desa Sumbung sekarang dan
                rasakan perbedaannya.
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>

<script>

import { mapState, mapGetters } from 'vuex';
export default {
  middleware: ['auth'],
  head() {
    return {
      title: 'Home'
    }
  },
  data() {
    return {
      items: [
        {
          title: 'Surat Diproses',
          icon: 'mdi-history',
          color: 'yellow darken-2',
          to: '/diajukan',
        },
        {
          title: 'Surat Ditolak',
          color: 'red lighten-1',
          icon: 'mdi-cancel',
          to: '/tolak',
        },
        {
          title: 'Surat Terverifikasi',
          icon: 'mdi-checkbox-marked-circle-outline',
          color: 'green lighten-1',
          to: '/terverivikasi',
        },
        {
          title: 'Surat Diterbitkan',
          color: 'indigo lighten-1',
          icon: 'fa-solid fa-signature',
          to: '/terbit',
        },
      ],
      layanan: [
        {
          title: 'Pengantar KTP',
          icon: 'fa-regular fa-id-card',
          to: '/pengajuanktp',
        },
        {
          title: 'Pengantar KK',
          icon: 'fa-solid fa-house-chimney-user',
          to: '/pengajuankk',
        },
        {
          title: 'Pengantar Kematian',
          icon: 'fa-solid fa-book-skull',
          to: '/pengajuankematian',
        },
        {
          title: 'Pengantar Kelahiran',
          icon: 'fa-solid fa-baby',
          to: '/pengajuankelahiran',
        },
        {
          title: 'Pengantar Tidak Mampu',
          icon: 'fa-solid fa-hands-holding-child',
          to: '/pengajuantidakmampu',
        },
      ],
    }
  },
  computed: {
    ...mapState('auth', ['nama']),
    ...mapGetters('auth', {
      user: 'user'
    })
  },
  mounted() {
    // console.log(this.user.role)
  }
  // name: 'IndexPage',
}
</script>
