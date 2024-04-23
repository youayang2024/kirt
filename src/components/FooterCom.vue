<template>
  <v-footer dark padless app inset>
    <v-card class="flex" flat tile color="white" :elevation="0" style="font-family: phetsarath OT;">
      <v-card-text class="foorercolor" style="color: blue">Copyright@
        {{ new Date().getFullYear() }} —  Lao Development Bank. All Rights Reserved.
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<style>
.foorercolor {
  text-align: center;
}
</style>
