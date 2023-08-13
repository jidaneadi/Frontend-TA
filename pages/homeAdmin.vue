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

  name: 'IndexPage',
}
</script>
