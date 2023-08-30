<template>
  <v-app dark>

    <!-- Drawer -->
    <v-navigation-drawer width="245" v-model="drawer" :mini-variant="miniVariant" fixed app dark color="#9A3B3B">
      <v-list nav dense>
        <div class="d-flex justify-center align-start pt-2 pb-2 px-6">
          <v-img class="pa-1" height="80px" width="55px" src="img/logo3.png"></v-img>
          <p class="align-start justify-start text-start white--text font-weight-black"><span
              class="amber--text darken-1">Pengajuan Surat</span><v-spacer></v-spacer>Desa Sumbung</p>
        </div>
        <v-divider color="#F5F5F5" class="mb-3"></v-divider>
        <v-list-item color="white" to="/homeUser">
          <v-list-item-icon>
            <v-icon color="white">mdi-home-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="white--text">Home</v-list-item-title>
        </v-list-item>

        <!-- Grup 1 -->
        <v-list-group color="white" :value="false">
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon color="white">mdi-clipboard-text-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="white--text">Layanan</v-list-item-title>
          </template>
          <v-list-item color="white" v-for="(item, i) in layanan" :key="i" :to="item.to" exact>
            <v-list-item-action>
              <v-icon color="white">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <!-- Grup 2 -->
        <v-list-group color="white" :value="false">
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon color="white">mdi-folder-open-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="white--text">Data Pengajuan</v-list-item-title>
          </template>
          <v-list-item color="white" v-for="(item, i) in dokumen" :key="i" :to="item.to" router exact>
            <v-list-item-action>
              <v-icon color="white">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <!-- ====================Drawer=================== -->


    <!-- =================Navbar======================  -->

    <!-- Pages -->
    <v-main>
      <div class="d-flex justify-center">
        <v-app-bar-nav-icon :clipped-left="clipped" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-spacer />
        <!-- <p class="text-h6 white--text fa font-bold">Pemerintah Kelurahahan Sumbung</p> -->
        <v-spacer />
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="#C08261" icon dark v-bind="attrs" v-on="on">
              <v-icon>mdi-account-circle</v-icon>
            </v-btn>
          </template>
          <v-list nav dense>
            <v-list-item>
              <v-list-item-avatar>
                <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  {{ nama }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  <v-icon x-small>fa-solid fa-users-line</v-icon>
                  Masyarakat
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>
            <v-list-item link text to="/profile">
              <v-list-item-icon>
                <v-icon small>fa-solid fa-user-pen</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="grey--text lighten-2">Edit Profile</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item text @click="dialog = true">
              <v-list-item-icon>
                <v-icon>mdi-lock-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="grey--text lighten-2">Reset Password</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <!-- ================Logout================= -->
            <div class="pa-2">
              <v-btn color="red darken-1" text @click="dialog2 = true" block>
                <v-icon class="mx-2">mdi-export</v-icon>
                Logout
              </v-btn>
            </div>
          </v-list>
        </v-menu>
      </div>

      <!-- Content -->
      <div class="px-8 pt-2">
        <Nuxt />
      </div>
    </v-main>
    <!-- =================Pages================== -->

    <!-- ===========footer============== -->
    <v-footer dark padless color="grey lighten-1">
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>jidanear</strong>
      </v-col>
    </v-footer>

    <!-- Dialog 1 -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Reset Password</span>
          <v-spacer />
          <v-icon color="red draken-1" icon @click="dialog = false">mdi-close</v-icon>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" label="Old Password*"
                  hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]"
                  :type="show2 ? 'text' : 'password'" name="input-10-2" label="New Password*" hint="At least 8 characters"
                  value="" class="input-group--focused" counter @click:append="show2 = !show2"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="rePassword" :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.passwordMatch]" :type="show4 ? 'text' : 'password'" name="input-10-2"
                  label="Confirm Password*" hint="At least 8 characters" value="Pa" counter error
                  @click:append="show4 = !show4"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color=" green darken-1" text @click="dialog = false">
            Save
          </v-btn>
          <v-btn color="red darken-1" text @click="dialog = false">
            Clear
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog 2 -->
    <v-dialog v-model="dialog2" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5">
          Log Out
        </v-card-title>
        <v-card-text>Apakah anda yakin untuk keluar dari akun ini?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="onLogout">
            Ya
          </v-btn>
          <v-btn color="red darken-1" text @click="dialog2 = false">
            Tidak
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Batas Dialog 2 -->
  </v-app>
</template>
<script>
import { mapState } from 'vuex'
import * as Cookies from 'js-cookie'

export default {
  name: 'DefaultLayout',
  data() {
    return {
      drawer: false,
      fixed: true,
      clipped: false,
      dialog: false,
      dialog2: false,
      show1: false,
      show2: false,
      show3: true,
      show4: false,
      rePassword: '',
      password: 'Password',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        passwordMatch: () => (`The password you entered don't match`),
      },
      computed: {
        passwordConfirmationRule() {
          return () => (this.password === this.rePassword) || 'Password must match'
        }
      },

      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],

      layanan: [
        {
          title: 'Pengantar KTP',
          to: '/pengajuanKtp',
        },
        {
          title: 'Pengantar KK',
          to: '/pengajuanKk',
        },
        {
          title: 'Pengantar Kematian',
          to: '/pengajuanKematian',
        },
        {
          title: 'Pengantar Kelahiran',
          to: '/pengajuanKelahiran',
        },
        {
          title: 'Pengantar Tidak Mampu',
          to: '/pengajuanTidakmampu',
        },
      ],
      dokumen: [
        {
          title: 'Diproses',
          to: '/diajukan',
        },
        {
          title: 'Ditolak',
          to: '/tolak',
        },
        {
          title: 'Terverivikasi',
          to: '/terverivikasi',
        },
        {
          title: 'Diterbitkan',
          to: '/terbit',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Desa Sumbung',
    }
  },
  methods: {
    onLogout() {
      //Cara 1
      // this.$store.commit('auth/logout')
      // this.$router.push('/')
      console.log(this.user)
      //Cara 2
      Cookies.remove('token')
      window.location.href = '/'
    }
  },
  computed: {
    ...mapState('auth', ['nama']),
    ...mapState('auth', ['role']),
  },
}
</script>

