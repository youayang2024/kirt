<template>
  <v-card-title>
    <div><label style="color: blue">ຂໍ້ມູນລາຍລະອຽດໃນເຊີບເວີ Switch02  >></label> <br /></div>
    <v-alert
      >{{ this.getdata }} <br />
      {{ this.getdata1 }} <br />
     
    </v-alert>
    <label style="color: blue">ສະຖານະ >> </label>&nbsp;<label
      >  
      
      <v-chip-group :color="getColorInfo(getdata10)">
              
              {{ getdata10 }}%
         
         
            </v-chip-group>
            
            </label
    >
  </v-card-title>
</template>

<script lang="ts">
import axios from "axios";

export default {
  name: "MobileGateWay",
  data() {
    return {
      test: true,

      isLoading: false,
      isLoadingPage: false,
      command: "df -h",
      host: "10.0.4.220",
      port: 22, // Default SSH port
      username: "cardzone",
      password: "CardSwt02@220",

      getdata: "",
      getdata1: "",
      
      getdata10: "",
    };
  },
  mounted() {
    this.Search_info();
  },
  methods: {
    getColorInfo(getdata10) {
      if (getdata10 >=80) return "#C70039";
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

          this.getdata = response.data.substring(0, 66);
          this.getdata1 = response.data.substring(1133, 1200);
       
          this.getdata10 = response.data.substring(1183, 1185);

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
