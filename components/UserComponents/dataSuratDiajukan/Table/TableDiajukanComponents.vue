<template>
  <v-row justify="center" align="center">
    <v-col class="py-4">
      <v-card>
        <v-card-title class="grey--text text-h6 font-weight-bold">
          <v-icon color="grey lighten-1" large>mdi-account-multiple-outline</v-icon>Surat Yang Diajukan
          <v-spacer></v-spacer>
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        </v-card-title>
        <div class="pb-2"></div>
        <v-data-table :headers="headers" :items="dataSurat" :search="search">

          <template v-slot:item.actions="{ item }">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="blue-grey darken-2" small icon dark v-bind="attrs" v-on="on">
                  <v-icon>mdi-gesture-tap-button</v-icon>
                </v-btn>
              </template>
              <v-list nav dense>
                <v-list-item @click="tolakItem(item)">
                  <v-icon color="red" icon>
                    mdi-cancel
                  </v-icon>
                  <v-list-item-content>
                    <v-list-item-title>Batalkan</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
export default {
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'ID Surat',
          align: 'start',
          sortable: false,
          value: 'id_surat',
        },
        { text: 'NIK', value: 'nik' },
        { text: 'Nama Pemohon', value: 'nama' },
        { text: 'Jenis Surat', value: 'jns_surat' },
        { text: 'Tanggal Pengajuan', value: 'updated_at' },
        { text: 'Status', value: 'status' },
        { text: 'Keterangan', value: 'keterangan' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      dataSurat: [],
      dataEditSurat: [],
      editedIndex: -1,
      editedItem: {
        id_surat: '',
        idm: '',
        nik: '',
        nama: '',
        syarat: '',
        jns_surat: '',
        status: '',
        updated_at: '',
        keterangan: '',
      },
      defaultItem: {
        id_surat: '',
        nik: '',
        nama: '',
        syarat: '',
        jns_surat: '',
        status: '',
        keterangan: '',
        updated_at: '',
      },
    }
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.$axios.get(`/surat/${this.user.id}`)
        .then((response => {
          console.log(response.data)
          const filteredData = response.data.filter(item => item.status === "diproses");
          //Sorting data dr waktu paling awal
          const sortedData = filteredData.sort((a, b) => a.updated_at.localeCompare(b.updated_at));
          this.dataSurat = sortedData;
          // this.editedItem=sortedData;
          console.log(filteredData.updated_at)
        })).catch((error) => {
          console.log(error.response)
        })
    },
  },
  computed: {
    ...mapGetters('auth', {
      user: 'user'
    })
  },
}
</script>
