<template>
  <v-card class="DetailCard" style="font-family: Saysettha OT">
    <v-alert
      dense
      style="
        font-family: phetsarath OT;
        background-color: #1679ab;
        color: white;
      "
      class="text-center"
      >ລາຍລະອຽດ log ຂອງແຕ່ລະ Sever</v-alert
    >

    <v-card class="scrollmenu">
      <v-data-table
        :headers="headers"
        :items="getdata"
        :items-per-page="15"
        class="elevation-1"
        :loading="isLoading"
      >
        <template #[`item.STATUS`]="{ item }">
          <img :src="getColorInfo(item.STATUS)" width="30" />

          {{ item.STATUS }} %
        </template>
      </v-data-table>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import axios from "axios";

export default {
  name: "ManagerAllServer",
  data() {
    return {
      isLoading: false,

      headers: [
        { text: "ຊື່ຂອງເຊີເວີ", value: "HOST_NAME" },
        { text: "ໄອພີ", value: "HOSTIP" },
        { text: "ລາຍ​ລະ​ອຽດ​ຂອງ​ log​", value: "DETAIL_LOG" },
        { text: "ສະຖານະ", value: "STATUS" },
        { text: "ວັນທີ / ເວລາ", value: "CREATE_DATE" },
      ],
      getdata: [],
      urlGreen:
        "https://www.commpartners.com/wp-content/plugins/wp-meta-seo/assets/images/update_loading.gif",
      urlred:
        "https://icon-library.com/images/progress-icon-gif/progress-icon-gif-1.jpg",
      urlredw:
        "https://icon-library.com/images/loading-icon-animated-gif/loading-icon-animated-gif-7.jpg",
    };
  },

  mounted() {
    this.isLoading = "red";

    axios
      .post("http://10.0.22.236:9889/api/checkServer/post_getManagerAllServer")
      .then((response) => {
        if (response.data == "Success") {
          axios
            .get("http://10.0.22.236:9889/api/get/get_allServerLog")
            .then((response) => {
              this.getdata = response.data;
              this.isLoading = false;
            })
            .catch(function (error) {
              if (error.response.data.message == "TokenExpiredError") {
                localStorage.removeItem("token");
                this.$router.push("/LoginPage");
              } else {
                console.log(error);
              }
            });
        }
      });
  },
  methods: {
    getColorInfo(STATUS) {
      if (STATUS >= 80) return this.urlred;
      else if (STATUS >= 60 && STATUS <= 79) return this.urlredw;
      else if (STATUS <= 59) return this.urlGreen;
    },
    onButtonClick(item) {
      console.log("click on " + item.no);
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
  padding-inline: 8px;
}

.scrollmenu {
  background-color: white;
  overflow: auto;
  white-space: nowrap;
}

.scrollmenu a {
  display: inline-block;
  color: white;
  text-align: center;
  padding: 2px;
  text-decoration: none;
}

.scrollmenu a:hover {
  background-color: #777;
}
</style>
