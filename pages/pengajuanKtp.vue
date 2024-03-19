<template>
  <v-row justify="center" align="center">
    <v-col class="py-4">
      <v-alert border="left" color="#C08261" class="text-subtitle-3 font-weight-bold  white--text">
        Pengajuan Surat Pengantar KTP
      </v-alert>
      <!-- Form Input -->
      <!-- <v-card>
    <v-card-text class="pt-8 text-subtitle-1 font-weight-bold text-center black--text">Form Pengajuan Surat
      Pengantar Penerbitan KTP</v-card-text>
    <v-form ref="form" lazy-validation class="px-10 pb-5 mx-10">
      <v-container>
        <v-row align="center">
          <v-col cols="12" class="text-subtitle text-justify"> Untuk memulai pengajuan Anda, pastikan untuk
            mempersiapkan dokumen persyaratan yang
            diperlukan, yaitu Kartu Keluarga (KK), Akte Kelahiran, dan Surat Pengantar RT. Jika Anda tidak memiliki
            Surat Pengantar RT, Anda dapat menggantinya dengan menyertakan Surat Pernyataan yang relevan. Mohon
            unggah salinan-salinan tersebut dengan jelas dan akurat untuk memastikan bahwa pengajuan Anda dapat
            segera diproses. </v-col>
          <v-col cols="12" xl="8" lg="8" md="8">Inputkan dokumen Kartu Keluarga/Akte Kelahiran dalam format
            PDF</v-col>
          <v-col cols="12" xl="4" lg="4" md="4">
            <v-file-input v-model="form.dokumen_pribadi" show-size counter multiple label="Input KK"
              prepend-icon="mdi-cloud-upload" solo></v-file-input>
          </v-col>
          <v-col cols="12" xl="8" lg="8" md="8">Inputkan dokumen Surat Pengantar RT atau dokumen Surat
            Pernyataan</v-col>
          <v-col cols="12" xl="4" lg="4" md="4">
            <v-file-input v-model="form.keterangan_rt" show-size counter multiple label="Input Surat Pengantar"
              prepend-icon="mdi-cloud-upload" solo></v-file-input>
          </v-col>
          <v-col class="pt-2 pb-2" cols="12" xl="6" lg="6" md="6">
            <v-btn :disabled="!valid" color="success" @click="dialog2 = true" block>
              Ajukan
            </v-btn>
          </v-col>
          <v-col class="pt-2 pb-2" cols="12" xl="6" lg="6" md="6">
            <v-btn :disabled="!valid" color="#E40017" class="white--text" @click="clear" block>
              Clear
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card> -->
      <CardFormInputFile />
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
      <DialogPeringatanPengajuan />
      <!-- =========Dialog============ -->
      <!-- =========Dialog2============ -->
      <!-- <v-dialog v-model="dialog2" persistent max-width="290">
        <v-card>
          <v-card-title class="text-h5">
            Apakah data sudah sesuai?
          </v-card-title>
          <v-card-text class="text-justify">Apabila data yang anda isikan tidak sesuai dengan persyaratan yang dibutuhkan
            atau tidak sesuai
            dengan data diri anda maka anda setuju apabila pengajuan surat anda dibatalkan atau digagalkan </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="createSurat">
              Setuju
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog> -->
      <!-- =========Dialog2============ -->

    </v-col>
  </v-row>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import DialogPeringatanPengajuan from '~/components/GlobalComponents/Dialog/DialogPeringatanPengajuan.vue';
import CardFormInputFile from '~/components/UserComponents/pengajuanKtpComponents/Card/CardFormInputFile.vue';

export default {
  middleware: ["auth"],
  head() {
    return {
      title: "KTP"
    };
  },
  data() {
    return {
      dialog2: false,
      valid: true,
      dialog2: false,
      valid: true,
      form: {
        // id_masyarakat:'',
        jns_surat: "",
        status: "",
        dokumen_pribadi: [],
        keterangan_rt: [],
      },
      abaout: [
        {
          color: "teal lighten-2",
          pertanyaan: "Apa saja persyaratan yang saya perlukan?",
          jawaban: "Persyaratan yang diperlukan untuk mengajukan permohonan penerbitan surat pengantar KTP adalah file scan KK berformat PDF"
        },
        {
          color: "deep-purple lighten-2",
          pertanyaan: "Data apa saja yang harus saya imputkan?",
          jawaban: "Data yang diinputkan merupakan data diri meliputi nama, alamat lengkap, status, jenis kelamin, agama, pekerjaan dan kewarganegaraan"
        },
        {
          color: "yellow lighten-2",
          pertanyaan: "Bagaimana cara agar saya dapat mengetahui surat yang saya ajukan sudah diterbitkan?",
          jawaban: "Anda dapat mengetahui status surat anda sudah dapat diambil atau tidak dengan masuk ke menu file dokumen. Pada menu tersebut terdapat sub menu diajukan yang berisi data surat anda yang sedang dalam proses pengajuan, sub menu terverifikasi  yang berisi data surat anda yang sudah di verifikasi sehingga anda hanya perlu menunggu surat tersebut diterbitkan, sub menu ditolak  yang berisi data surat anda yang sudah ditolak dikarenakan ada data yang kurang lengkap atau salah sehingga anda harus mengajukan kembali dan mengisi persyaratan dengan benar, sub diterbitkan  yang berisi data surat anda yang sudah diterbitkan, sehingga anda dapat datang ke Kantor Pemerintahan Desa Sumbung untuk mengambil surat tersebut, dan sub menu selesai  yang berisi data surat anda yang sudah anda ambil sebelumnya"
        },
      ],
    };
  },
  methods: {
    clear() {
      this.$refs.form.reset();
    },
    initialize() {
      this.$axios.$get(`/profile/${this.user.id}`)
        .then((response => {
          this.$data.dataUser = response;
          console.log(response);
        })).catch((error) => {
          console.log(error);
        });
    },
    createSurat() {
      this.$data.dialog2 = false;
      const formData = new FormData();
      this.form.dokumen_pribadi.forEach((file, index) => {
        formData.append(`dokumen_pribadi${index + 1}`, file);
        console.log(this.$data.form.dokumen_pribadi);
      });
      this.form.keterangan_rt.forEach((file, index) => {
        formData.append(`keterangan_rt${index + 1}`, file);
        console.log(this.$data.form.keterangan_rt);
      });
      // formData.append("dokumen_pribadi", this.form.dokumen_pribadi.values, this.form.dokumen_pribadi.values.name)
      // formData.append("keterangan_rt", this.form.keterangan_rt.values, this.form.keterangan_rt.values.name)
      formData.append("jns_surat", this.form.jns_surat);
      formData.append("status", this.form.status);
      this.$axios.$post(`/ktpbaru/${this.user.id}`, formData)
        .then((response) => {
          console.log(response);
        }).catch((error) => {
          console.log(error);
        });
    }
  },
  computed: {
    ...mapGetters("auth", {
      user: "user"
    })
  },
  components: { DialogPeringatanPengajuan, CardFormInputFile }
}
</script>
