<template>
  <v-row justify="center" align="center">
    <v-col class="py-4">
      <!-- <v-card>
        <v-tabs background-color="grey lighten-4" center-active dark>
          <v-tab class="text-center black--text">Pengajuan Surat Pengantar KTP</v-tab>
        </v-tabs>
      </v-card> -->
      <v-alert border="left" color="teal lighten-1" class="text-subtitle-3 font-weight-bold  white--text">
        Pengajuan Surat Pengantar KTP
      </v-alert>

      <div class="">
        <v-card>
          <v-card-text class="py-2 text-subtitle-1 font-weight-bold text-center black--text">Form Pengajuan Surat
            Pengantar Penerbitan KTP</v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation class="px-12 py-6 mx-12">
            <v-container>
              <v-row align="center" class="py-2">
                <v-col cols="2">Jenis Surat</v-col>
                <v-col cols="1">:</v-col>
                <v-col cols="3">
                  <v-text-field value="Surat Pengantar KTP" :rules="alamatRules" label="Jenis Surat" solo required
                    readonly></v-text-field>
                </v-col>
                <v-col cols="2">File Dokumen KK</v-col>
                <v-col cols="1">:</v-col>
                <v-col cols="3">
                  <v-file-input show-size counter multiple label="Input KK" prepend-icon="mdi-cloud-upload"
                    solo></v-file-input>
                </v-col>
                <v-btn :disabled="!valid" color="success" @click="dialog2 = true" block>
                  Kirim
                </v-btn>
              </v-row>

            </v-container>
            <!-- <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required col="6"></v-text-field>

            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

            <v-select v-model="select" :items="items" :rules="[v => !!v || 'Item is required']" label="Item"
              required></v-select>

            <v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']" label="Do you agree?"
              required></v-checkbox> -->

            <!-- <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
              Validate
            </v-btn>

            <v-btn color="error" class="mr-4" @click="reset">
              Reset Form
            </v-btn> -->

            <!-- <v-btn color="warning" @click="resetValidation">
              Reset Validation
            </v-btn> -->
          </v-form>
        </v-card>
      </div>


      <!-- <div class="pt-2">
        <v-alert border="bottom" color="grey lighten-3" class="text-subtitle-3 font-weight-bold  white--text">
        <v-icon  color="white">mdi-help-box-outline</v-icon>
          About
      </v-alert>
      </div> -->

      <div class="pt-4">
        <v-card>
          <v-tabs background-color="grey lighten-4" center-active dark>
            <v-tab class="text-subtitle-2 black--text">
              About
            </v-tab>
          </v-tabs>
        </v-card>
      </div>

      <div class="pt-2">
        <v-expansion-panels>
          <v-expansion-panel v-for="(item, i) in abaout" :key="i">
            <v-expansion-panel-header border="left">
              {{ item.pertanyaan }}
            </v-expansion-panel-header>
            <v-expansion-panel-content class="text-justify">
              {{ item.jawaban }}
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>

      <!-- =========Dialog============ -->
      <v-list nav dense>
        <v-list-item text @click="dialog = true" color="teal" left>
        </v-list-item>
      </v-list>
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-text>
            <h2 class="pt-4 pb-2 black--text font-weight-bold text-center ">PERHATIAN !!!!</h2>
            <v-divider color="black"></v-divider>
          </v-card-text>
          <v-card-text class="text-justify">Layanan ini hanya melayani pengajuan penerbitan surat pengantar. Surat yang
            sudah diajukan dapat diambil apabila status surat sudah dinyatakan diterbitkan atau sudah berada pada tabel
            penerbitan di halaman diterbitkan dan anda harus datang ke Kantor Desa Sumbung untuk mengambil surat yang
            sudah diterbitkan. </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">
              Mengerti
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- =========Dialog============ -->

      <!-- =========Dialog2============ -->
      <v-dialog v-model="dialog2" persistent max-width="290">
        <v-card>
          <v-card-title class="text-h5">
            Apakah data sudah sesuai?
          </v-card-title>
          <v-card-text class="text-justify">Apabila data yang anda isikan tidak sesuai dengan persyaratan yang dibutuhkan atau tidak sesuai
            dengan data diri anda maka anda setuju apabila pengajuan surat anda dibatalkan atau digagalkan </v-card-text>
          <v-card-actions>
            <!-- <v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']" label="Do you agree?"
              required>Setuju</v-checkbox> -->
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog2=false">
              Setuju
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- =========Dialog2============ -->

    </v-col>
  </v-row>
</template>
<script>
export default {
  middleware : ['auth'],
  head() {
    return {
      title: 'KTP'
    }
  },
  data() {
    return {
      dialog: true,
      dialog2: false,
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name masih kosong',
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
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: false,

      abaout: [
        {
          color: 'teal lighten-2',
          pertanyaan: 'Apa saja persyaratan yang saya perlukan?',
          jawaban: 'Persyaratan yang diperlukan untuk mengajukan permohonan penerbitan surat pengantar KTP adalah file scan KK berformat PDF'
        },
        {
          color: 'deep-purple lighten-2',
          pertanyaan: 'Data apa saja yang harus saya imputkan?',
          jawaban: 'Data yang diinputkan merupakan data diri meliputi nama, alamat lengkap, status, jenis kelamin, agama, pekerjaan dan kewarganegaraan'
        },
        {
          color: 'yellow lighten-2',
          pertanyaan: 'Bagaimana cara agar saya dapat mengetahui surat yang saya ajukan sudah diterbitkan?',
          jawaban: 'Anda dapat mengetahui status surat anda sudah dapat diambil atau tidak dengan masuk ke menu file dokumen. Pada menu tersebut terdapat sub menu diajukan yang berisi data surat anda yang sedang dalam proses pengajuan, sub menu terverifikasi  yang berisi data surat anda yang sudah di verifikasi sehingga anda hanya perlu menunggu surat tersebut diterbitkan, sub menu ditolak  yang berisi data surat anda yang sudah ditolak dikarenakan ada data yang kurang lengkap atau salah sehingga anda harus mengajukan kembali dan mengisi persyaratan dengan benar, sub diterbitkan  yang berisi data surat anda yang sudah diterbitkan, sehingga anda dapat datang ke Kantor Pemerintahan Desa Sumbung untuk mengambil surat tersebut, dan sub menu selesai  yang berisi data surat anda yang sudah anda ambil sebelumnya'
        },
      ],
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
  },

}
</script>
