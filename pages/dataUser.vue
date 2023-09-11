<template>
  <v-row justify="center" align="center">
    <v-col class="py-4">
      <v-alert border="left" color="#C08261" class="text-subtitle-3 font-weight-bold  white--text">
        Data User
      </v-alert>
      <v-card>
        <v-card-title class="grey--text text-h6 font-weight-bold">
          <v-icon color="grey lighten-1" large>mdi-account-multiple-outline</v-icon>Data User
          <v-spacer></v-spacer>
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        </v-card-title>
        <v-card-actions class="px-4">
          <v-btn color="green darken-1" dark small rounded class="mb-2 pa-1" @click="dialogAdd = true">
            <v-icon>fa-solid fa-user-plus</v-icon>
          </v-btn>
          <v-btn color="yellow darken-1" dark small rounded class="mb-2 pa-1" @click="printData">
            <v-icon>fa-solid fa-print</v-icon>
          </v-btn>
        </v-card-actions>

        <!-- ===========================Table======================= -->
        <v-data-table ref="table" :headers="headers" :items="dataUser" :search="search">
          <template v-slot:item.actions="{ item }">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="blue-grey darken-2" small icon dark v-bind="attrs" v-on="on">
                  <v-icon>mdi-gesture-tap-button</v-icon>
                </v-btn>
              </template>
              <v-list nav dense>
                <v-list-item @click="editItem(item)">
                  <v-icon color="yellow darken-1" small class="mr-2">
                    fa-regular fa-pen-to-square
                  </v-icon>
                  <v-list-item-content>
                    <v-list-item-title>Edit Item</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="deleteItem(item)">
                  <v-icon color="red darken-1" small>
                    fa-regular fa-trash-can
                  </v-icon>
                  <v-list-item-content>
                    <v-list-item-title>Hapus Data</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
      </v-card>
      <!-- ============Dialog Tambah Data================= -->
      <v-dialog v-model="dialogAdd" max-width="700px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Tambah Data Masyarakat</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="tambahItem.id" :rules="rules.id" label="NIK"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="tambahItem.email" :rules="rules.email" label="E-mail"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="tambahItem.nama" :rules="rules.nama" label="Nama Lengkap"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="tambahItem.password" :rules="rules.password" label="Password"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="tambahItem.konf_pass" :rules="rules.konfPass"
                    label="Confirm Password"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-combobox v-model="tambahItem.gender" label="Jenis Kelamin" :items="items"></v-combobox>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="tambahItem.no_hp" :rules="rules.no_hp" label="No HP"></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="6">
                  <v-text-field v-model="tambahItem.tempat_lahir" :rules="rules.ttl" label="Tempat Lahir"></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="6">
                <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
                  offset-y max-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="tambahItem.birthday" label="Tanggal Lahir" append-icon="mdi-calendar" readonly
                      v-bind="attrs" v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="tambahItem.birthday" @input="menu = false"></v-date-picker>
                </v-menu>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field v-model="tambahItem.alamat" :rules="rules.alamat" label="Alamat"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogAdd = false">
              Cancel
            </v-btn>
            <v-btn color="blue darken-1" text @click="addData">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- ============Dialog Edit Data================= -->
      <v-dialog v-model="dialogEdit" max-width="700px">
        <v-card>
          <!-- <v-card> -->
          <v-card-title>
            <span class="text-h5">Edit Data Masyarakat</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="editedItem.nik" label="NIK"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="editedItem.email" :rules="rules.email" label="E-mail"></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field v-model="editedItem.nama" label="Nama Lengkap"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-combobox v-model="editedItem.gender" label="Jenis Kelamin" :items="items"></v-combobox>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="editedItem.no_hp" label="No HP"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="editedItem.tempat_lahir" label="Tempat Lahir"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
                  offset-y max-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="editedItem.birthday" label="Tanggal Lahir" append-icon="mdi-calendar" readonly
                      v-bind="attrs" v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="editedItem.birthday" @input="menu = false"></v-date-picker>
                </v-menu>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="editedItem.alamat" label="Alamat"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogEdit = false">
              Cancel
            </v-btn>
            <v-btn color="blue darken-1" text @click="editData">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>



      <!-- ============Dialog Delete================= -->
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogDelete = false">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- ============Dialog ERROR================= -->
      <v-dialog v-model="dialogErr" persistent max-width="315">
        <v-card>
          <v-card-text align="center">
            <h2 class="pt-4 pb-2 black--text font-weight-bold">GAGAL!!!</h2>
          </v-card-text>
          <v-card-text align="center"><v-btn class="mx-2" fab dark large color="red">
              <v-icon x-large dark>
                mdi-close
              </v-icon>
            </v-btn>
          </v-card-text>
          <v-card-text>Cek kembali data anda!. Pastikan NIK dan E-mail yang anda inputkan
            benar</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="green darken-1" @click="dialogErr = false">
              Mengerti
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- ============Dialog Berhasil================= -->
      <v-dialog v-model="dialogBerhasil" persistent max-width="290">
        <v-card>
          <v-card-text align="center">
            <h2 class="pt-4 pb-2 black--text font-weight-bold">SUKSES!!!</h2>
          </v-card-text>
          <v-card-text align="center"><v-btn class="mx-2" fab dark large color="green">
              <v-icon x-large dark>
                mdi-checkbox-marked-circle
              </v-icon>
            </v-btn>
          </v-card-text>
          <v-card-actions>
            <v-btn block color="green darken-1" class="white--text" @click="dialogBerhasil = false">
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>
<script>
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default {
  head() {
    return {
      title: 'Data User'
    }
  },

  layout: 'defaultAdmin',
  data() {
    return {
      show: false,
      menu:'',
      // selectedItem:null,
      dialogAdd: false,
      dialogEdit: false,
      dialogDelete: false,
      dialogErr: false,
      dialogBerhasil: false,
      items: ['laki-laki', 'perempuan'],
      search: '',
      headers: [
        {
          text: 'NIK',
          align: 'start',
          sortable: false,
          value: 'nik',
        },
        { text: 'Nama', value: 'nama' },
        { text: 'Email', value: 'email' },
        { text: 'Nomor HP', value: 'no_hp' },
        { text: 'Jenis Kelamin', value: 'gender' },
        { text: 'Tempat Lahir', value: 'tempat_lahir'},
        { text: 'Birthday', value: 'birthday'},
        { text: 'Alamat', value: 'alamat' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      rules: {
        id: [
          v => !!v || 'NIK tidak boleh kosong',
          v => (v && v.length >= 15) || 'NIK harus berjumlah 16 karakter berupa angka',
        ],
        email: [
          v => !!v || 'E-mail tidak boleh kosong',
          v => /.+@.+\..+/.test(v) || 'E-mail tidak valid',
        ],
        password: [
          v => !!v || 'Password tidak boleh kosong',
          v => (v && v.length >= 8) || 'Password berisi minimal 8 karakter',
        ],
        konfPass: [
          v => !!v || 'Konfirmasi password tidak boleh kosong',
          v => (v && v.length >= 8) || 'Password berisi minimal 8 karakter',
        v => v === this.tambahItem.password || 'Konfirmasi password tidak sama dengan password'
        ],
        nama: [
          v => !!v || 'nama tidak boleh kosong'
        ],
        no_hp: [
          v => !!v || 'Nomor HP tidak boleh kosong'
        ],
        gender: [
          v => !!v || 'Jenis kelamin tidak boleh kosong'
        ],
        ttl: [
          v => !!v || 'Tempat tanggal lahir tidak boleh kosong'
        ],
        alamat: [
          v => !!v || 'Alamat tidak boleh kosong'
        ],
      },
      dataUser: [],
      editedIndex: -1,
      editedItem: {
        nik: '',
        email: '',
        nama: '',
        no_hp: '',
        gender: '',
        tempat_lahir: '',
        birthday:'',
        alamat: '',
      },
      tambahItem: {
        id: '',
        email: '',
        password: '',
        konf_pass: '',
        nama: '',
        no_hp: '',
        gender: '',
        tempat_lahir: '',
        birthday:'',
        alamat: '',
      },
      defaultItem: {
        nik: '',
        nama: '',
        no_hp: '',
        gender: '',
        ttl: '',
        alamat: '',
      },
    }
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Tambah Data Masyarakat' : 'Edit Data Masyarakat'
    },
  },

  created() {
    this.initialize()

  },

  methods: {
    initialize() {
      this.$axios.get('http://127.0.0.1:4000/profile/')
        .then((response => {
          console.log(response.data)
          this.dataUser = response.data
          // this.$data.dialogAdd = false
        })).catch((error) => {
          console.log(error.response)
        })
    },

    addData() {
      this.$axios.post('http://127.0.0.1:4000/auth/register/', this.tambahItem)
        .then((response) => {
          console.log(response)
          // this.dialogAdd = false
          this.$data.dialogAdd = false
          this.$data.dialogBerhasil = true
        }).catch((error) => {
          console.log(error.response.data.msg)
          if (error.response.data.msg == 'DATA_FAILED') {
            this.$data.dialogAdd = false
            this.$data.dialogErr = true
          }
        })
    },

    editItem(item) {
      this.editedIndex = this.dataUser.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogEdit = true
    },

    editData() {
      this.$axios.put(`http://127.0.0.1:4000/profile/${this.editedItem.nik}`, this.editedItem)
        .then((response) => {
          console.log(response)
          this.$data.dialogEdit = false
          this.$data.dialogBerhasil = true
        }).catch((error) => {
          console.log(error)
          this.$data.dialogEdit = false
          this.dialogErr = true
        })
    },

    deleteItem(item) {
      this.editedIndex = this.dataUser.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.$axios.delete(`http://127.0.0.1:4000/profile/${this.editedItem.nik}`, this.editedItem)
        .then((response) => {
          console.log(response)
          this.$data.dialogDelete = false
          this.$data.dialogBerhasil = true
        }).catch((error) => {
          console.log(error)
        })
    },

    printData() {
      window.print();
    },
  },

  middleware : ['authAdmin'],
}
</script>
