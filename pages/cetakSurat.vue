<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12" class="d-flex justify-center align-center">
          <v-card max-width="800px" max-heigth="400px">
            <v-list-item two-line>
              <v-list-item-avatar tile size="100" color="white">
                <v-img src="img/logo3.png"/>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="text-h5 mb-1 text-center">
                  <p class="mt-0 mb-0">Pemerintah Kabupaten Boyolali</p>
                  <p class="mt-0 mb-0">Kecamatan Cepogo</p>
                  <p class="mt-0 mb-0">Desa Sumbung</p>
                </v-list-item-title>
                <v-list-item-subtitle class="text-center">
                  <p class="mt-0 mb-0">Sekretariat: Dukuh Tegalarum RT.009 / RW.001</p>
                  <p class="mt-0 mb-0">Desa Sumbung Kecamatan Cepogo Kabupaten Boyolali</p>
                  <p class="mt-0 mb-0"> Provinsi Jawa Tengah Kode Pos 57362</p>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-card-title>
              <v-divider></v-divider>
              <hr>
              <v-divider></v-divider>
            </v-card-title>
            <v-card-text>
              Kode Desa : 09032004
            </v-card-text>
            <v-card-title class="mb-0 justify-center">
              <span class="text-decoration-underline">Surat Pengantar</span>
            </v-card-title>
            <v-card-text class="mt-0">
              <p class="text-center">Nomor : 474/13/KTP/004/2022</p>
              <p>Yang bertanda tangan di bawah ini kami Kepala Desa Sumbung Kecamatan Cepogo Kabupaten Boyolali Provinsi
                Jawa Tengah, menerangkan bahwa:</p>
              <ol class="ma-3">
                <li>Nama : JIDANE ADI RAMADHZAN</li>
                <li>Tempat/Tanggal Lahir : BOYOLALI/11 Juni 2001</li>
                <li>Warganegara : INDONESIA</li>
                <li>Agama : Islam</li>
                <li>Pekerjaan : PELAJAR/MAHASISWA</li>
                <li>Status Perkawinan : BELUM KAWIN</li>
                <li>Tempat Tinggal : TEGALARUM, RT.009/RW.001</li>
                <li>Surat bukti diri : <span>NIK.
                    3309031106010002,</span><v-spacer><v-spacer></v-spacer></v-spacer><span>No. KK.
                    3309032101070003</span></li>
                <li>Keperluan : Pengantar Cetak Ulang KTP E Karena Rusak</li>
                <li>Berlaku : 22 Maret 2024 s/d 21 April 2024</li>
                <li>Keterangan lain : Orang tersebut di atas benar benar warga Desa Sumbung</li>
              </ol>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text>Simpan</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
export default {
  name: 'LetterComponent',
  middleware: ['authAdmin'],
  layout: 'defaultAdmin'
};
</script>
