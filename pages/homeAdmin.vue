<template>
  <v-row justify="center" align="center">
    <v-col class="py-4">
      <div class="pt-4 pb-2">
        <h3 class="text-subtitle font-weight-regular-blod">Welcome Back, Admin</h3>
      </div>
      <v-chip outlined color="grey">
        <v-icon color="grey">mdi-account</v-icon>
        Admin
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

      <v-row no-gutters>
        <v-col class="d-flex flex-wrap justify-space-between">
          <v-card>

          </v-card>
        </v-col>
      </v-row>

      <!-- ===============Batas Pilihan Layanan===================== -->
      <div class="d-flex justify-center mb-2 mt-2 pt-6">
        <p class="grey--text text-subtitle-1 font-weight-bold">Lihat Data User</p>
        <v-spacer />
        <v-btn color="white" class="teal--text" to="/dataUser" rounded>
          <v-icon icon color="teal">mdi-account-multiple-outline</v-icon>
        </v-btn>
      </div>
      <v-divider color="black"></v-divider>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware : ['authAdmin'],
  head() {
    return {
      title: 'Home Admin'
    }
  },
  layout:'defaultAdmin',
  data() {
    return {
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
    }
  },

  name: 'IndexPage',
}
</script>
