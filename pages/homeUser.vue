<template>
  <v-row justify="center" align="center">
    <v-col class="py-1">
      <!-- <p>NIK: {{ $route.query.nik }}</p> -->
      <div class="pt-4 pb-2">
        <h3 class="text-subtitle font-weight-regular-bold">Welcome Back, {{ nama }}</h3>
      </div>
      <v-chip outlined color="grey">
        <v-icon color="grey">mdi-account</v-icon>
        Masyarakat
      </v-chip>

      <!-- ===============Batas Card===================== -->
      <div class="px-0 mx-0">
        <v-row no-gutters>
          <v-col class="d-flex justify-space-around flex-wrap mx-auto my-2" cols="12" xl="3" lg="3" md="3" sm="6"
            v-for="(item, i) in items" :key="i">
            <v-card class="mx-1" width="300px" height="100px" three-line :to="item.to">
              <v-system-bar :color="item.color" height="20px">
                <div class="text-subtitle-2 font-weight-bold white--text text-center">
                  {{ item.title }}
                </div>
                <v-spacer />
                <div>
                  <v-icon dark small color="white">
                    {{ item.icon }}
                  </v-icon>
                </div>
              </v-system-bar>
              <div class="text-subtitle-1 font-weight-bold text-center">
                <v-row no-gutters>
                  <v-col cols="7" class="d-flex justify-center align-center mx-auto">
                    <v-card :color="item.bg" width="110px" height="60px">
                      <v-card-title class="text-subtitle-2 justify-center">
                        199
                      </v-card-title>
                    </v-card>
                  </v-col>
                  <v-col cols="5" class="justify-center">
                    <v-img height="75px" class="" width="100px" :src="item.image"> </v-img>
                  </v-col>
                </v-row>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <!-- ===============Batas Card===================== -->

      <!-- ===============Batas Card Jenis Layanan Surat===================== -->
      <div class="pt-8 darken-1 text-center text-subtitle font-weight-black">
        Jenis Layanan Surat
      </div>
      <div>
        <v-sheet class="mx-auto" max-width="1500" color="#F7F7F7">
          <v-slide-group v-model="model" class="py-4 px-0" center-active show-arrows>
            <v-slide-item v-for="(n, i) in layanan" :key="i" v-slot="{ active, toggle }">
              <v-card class="ma-4" width="250" height="150" hover @click="toggle">
                <v-list-item>
                  <v-list-item-action class="mx-auto">
                    <v-icon dark x-large color="#C08261">
                      {{ n.icon }}
                    </v-icon>
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
                    <v-btn color="#C08261" :to="n.to">Ajukan surat</v-btn>
                  </v-overlay>
                </v-fade-transition>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
      </div>
      <!-- ===============Batas Card Jenis Layanan Surat===================== -->

      <v-card class="my-2">
        <v-row no-gutters>
          <v-col class="d-flex flex-wrap mx-auto pl-3 py-2" cols="12" xl="3" lg="3" md="3" sm="12" xs="12">
            <v-img src="img/icon/about.svg" height="auto" width="auto"></v-img>
          </v-col>
          <v-col class="d-flex flex-wrap" cols="12" xl="9" lg="9" md="9">
            <v-card-title class="text-h4 grey--text lighten-1 pb-1"><strong>Sistem Informasi Pengajuan Surat
                Pengantar</strong></v-card-title>
            <v-card-text class="text-caption grey--text darken-3 text-justify">
              Selamat datang di platform pengajuan surat pengantar Kalurahan Sumbung, tempat di mana kami menyediakan layanan
              penerbitan surat pengantar dengan
              cepat dan mudah. Kami berkomitmen untuk memberikan pengalaman layanan terbaik kepada Anda, dan dengan
              kerjasama dalam menyediakan dokumen yang dibutuhkan,
              kami dapat memastikan bahwa permohonan anda akan segera diurus. Kami berkomitmen bahwa keamanan data Anda
              adalah prioritas utama bagi kami. Setiap informasi
              yang Anda berikan akan dijaga dengan ketat dan dirahasiakan sesuai dengan standar yang ada. Terima kasih
              atas kepercayaan Anda, dan jangan ragu untuk
              menghubungi kami jika Anda memiliki pertanyaan lebih lanjut.
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
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
      model: '',
      items: [
        {
          title: 'Surat Diproses',
          icon: 'mdi-history',
          bg: 'yellow lighten-5',
          color: 'yellow darken-2',
          image: 'img/icon/diproses.svg',
          to: '/diajukan',
        },
        {
          title: 'Surat Ditolak',
          bg: 'red lighten-5',
          color: 'red lighten-1',
          icon: 'mdi-cancel',
          image: 'img/icon/ditolak.svg',
          to: '/tolak',
        },
        {
          title: 'Surat Terverifikasi',
          icon: 'mdi-checkbox-marked-circle-outline',
          bg: 'green lighten-5',
          color: 'green lighten-1',
          image: 'img/icon/terverifikasi.svg',
          to: '/terverivikasi',
        },
        {
          title: 'Surat Diterbitkan',
          bg: 'indigo lighten-5',
          color: 'indigo lighten-1',
          icon: 'fa-solid fa-signature',
          image: 'img/icon/diterbitkan.svg',
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
          title: 'Keterangan Kematian',
          icon: 'fa-solid fa-book-skull',
          to: '/pengajuankematian',
        },
        {
          title: 'Keterangan Kelahiran',
          icon: 'fa-solid fa-baby',
          to: '/pengajuankelahiran',
        },
        {
          title: 'Keterangan Tidak Mampu',
          icon: 'fa-solid fa-hand-holding-dollar',
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
