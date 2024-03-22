<template>
  <v-container class="pa-4">
    <div class="pb-4">
      <v-card>
        <v-tabs background-color="grey lighten-4" center-active dark>
          <v-tab class="text-center black--text">Data Dokumen Persyaratan</v-tab>
        </v-tabs>
      </v-card>
    </div>
    <v-card>
      <v-data-table dense :headers="headers" :items="data_dokumen_syarat" item-key="id" class="elevation-1">
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            fa-solid fa-download
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
<script>
export default {
  middleware: ['authAdmin'],
  layout: 'defaultAdmin',
  data() {
    return {
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Filename', value: 'filename' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      data_dokumen_syarat: [],
      editedIndex: -1,
      editedItem: {
        id: '',
        filename: '',
        jns_surat: '',
      },
    }
  },
  created() {
    this.initialize()
  },
  methods: {
    initialize() {
      this.$axios.$get(`http://localhost:4001/surat/data_doc/${this.$route.query.id_surat}`)
        .then((response => {
          console.log(response)
          this.$data.data_dokumen_syarat = response
        })).catch((error) => {
          console.log(error)
        })
    },
    download() {

    },
    editItem(item) {
      this.editedIndex = this.data_dokumen_syarat.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.$axios.$get(`http://localhost:4001/surat/doc/${this.$data.editedItem.id}`, {
        responseType: 'blob' // Menggunakan responseType 'blob' untuk file binary
      })
        .then((response => {
          console.log(response)
          const url = window.URL.createObjectURL(new Blob([response]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', this.$data.editedItem.filename); // Nama file yang diunduh
          document.body.appendChild(link);
          link.click();
        })).catch((error) => {
          console.error('Error downloading PDF:', error);
        })
    },
  }
}
</script>
