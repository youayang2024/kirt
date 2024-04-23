<template>
  <v-card-title>
    <div>
      <label style="color: blue">ຂໍ້ມູນລາຍລະອຽດໃນເຊີບເວີ Aq Batch >></label>
      <br />
    </div>
    <v-alert
      >{{ this.getdata }} <br />
      {{ this.getdata1 }} <br />
      {{ this.getdata2 }} <br />
      {{ this.getdata3 }} <br />
      {{ this.getdata4 }} <br />
      {{ this.getdata5 }} <br />
      {{ this.getdata6 }} <br />
      {{ this.getdata7 }} <br />
      {{ this.getdata8 }} <br />
      <!-- {{ this.getdata9 }} <br /> -->
    </v-alert>
    <label style="color: blue">ສະຖານະ >> </label>&nbsp;<label>
      <v-chip-group :color="getColorInfo(getdata10)">
        {{ getdata10 }}%
      </v-chip-group>
    </label>
  </v-card-title>
</template>

<script lang="ts">
import axios from "axios";

export default {
  name: "AqBatch",
  data() {
    return {
      test: true,

      isLoading: false,
      isLoadingPage: false,
      command: "df -h",
      host: "10.0.4.66",
      port: 22, // Default SSH port
      username: "cardzone",
      password: "WaBcapp@66",

      getdata: "",
      getdata1: "",
      getdata2: "",
      getdata3: "",
      getdata4: "",
      getdata5: "",
      getdata6: "",
      getdata7: "",
      getdata8: "",

      getdata10: "",
    };
  },
  mounted() {
    this.Search_info();
  },
  methods: {
    getColorInfo(getdata10) {
      if (getdata10 >= 80) return "#C70039";
      else return "green";
    },
    Search_info() {
      this.isLoading = "red";
      this.isLoadingPage = true;
      axios
        .post("api/checkServer/post_checkServer", {
          command: this.command,
          host: this.host,
          port: this.port,
          username: this.username,
          password: this.password,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.isLoadingPage = false;

          this.getdata = response.data.substring(0, 58);
          this.getdata1 = response.data.substring(57, 107);
          this.getdata2 = response.data.substring(107, 159);
          this.getdata3 = response.data.substring(158, 215);
          this.getdata4 = response.data.substring(215, 267);
          this.getdata5 = response.data.substring(267, 329);
          this.getdata6 = response.data.substring(329, 381);
          this.getdata7 = response.data.substring(382, 441);
          this.getdata8 = response.data.substring(442, 503);

          this.getdata10 = response.data.substring(100, 103);

          console.log(response.data);
        });
    },
  },
};
</script>

<style scoped>
.overlap-icon {
  position: absolute;
  top: -33px;
  text-align: center;
  padding-top: 12px;
}
.download-btn {
  color: blue;
  font-size: 14px;
  /* padding: none;
            padding-inline: none; */
}
.scrollmenu {
  background-color: white;
  overflow: auto;
  white-space: nowrap;
}

.scrollmenu a {
  display: inline-block;
  /* color: white; */
  text-align: center;
  padding: 2px;
  /* text-decoration: none; */
}
.Switch01 {
  height: 900px;
}
</style>
