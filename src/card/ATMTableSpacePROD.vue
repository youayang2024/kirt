<template>
  <v-card class="MobileDbaView" style="font-family: phetsarath OT">
    <v-card-title
      style="
        font-family: phetsarath OT;
        background-color: #0a6ebd;
        color: white;
        font-size: 14px;
      "
    >
      <v-icon style="color: chocolate; ">mdi-database</v-icon>ATM TABLE SPACE ON PRODUCTION</v-card-title
    >
    <!-- <v-divider></v-divider> -->
    <v-card>
      <v-card-title>
  
        &nbsp;
        <!-- <v-spacer></v-spacer> -->
        <v-btn
          color="success"
          outlined
          text
          @click="Download()"
          style="
            font-size: 12px;
            height: 30px;
            width: 150px;
            font-family: phetsarath OT;
          "
          >Export as Excel<i
            class="mdi mdi-export-variant"
            aria-hidden="true"
          ></i
        ></v-btn>
        <v-spacer></v-spacer>
        <v-text-field
          style="color: blue"
          v-model="search"
          append-icon="search"
          label="Search Cause"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>

      <v-data-table
        style="background-color: white; color: blue; font-family: phetsarath OT; color: #068fff"
        :search="search"
        ref="myTable"
       
        :headers="headers"
        :items="getdata"
        :items-per-page="5"
        class="elevation-1"
        :loading="isLoading"
      >
      <template #[`item.USED_PCT`]="{ item }" >
        <v-chip-group :color="getColorInfo(item.USED_PCT)">
          {{ item.USED_PCT }}
        </v-chip-group>
      </template>
      </v-data-table>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import axios from "axios";
import exportFromJSON from "export-from-json";
import "jspdf-autotable";

export default {
  name: "MobileDbaView",
  data() {
    return {
      search: "",
      isLoading: false,
      headers: [
      { text: "ສະຖານະ", value: "ONLINE_STATUS" },
        { text: "ຊື່ TABLE", value: "TABLESPACE_NAME" },
        { text: "ທັງ​ຫມົດ MB", value: "ALLOCATED_MB"},
        { text: "ໃຊ້ແລ້ວ MB", value: "USED_MB" },
        { text: "ຍັງ MB", value: "FREE_MB"},
        { text: "ເບີເຊັນທີໄດ້ໃຊ້ແລ້ວ (%)", value: "USED_PCT"},
        { text: "ເບີເຊັນທີຍັງເຫຼຶອ (%)", value: "FREE_PCT"},
        { text: "ວັນທີ່", value: "CREATE_DATE" },
      ],
      getdata: [],
    };
  },
  mounted() {
    this.isLoading = "red";
    axios
      .get("http://10.0.22.236:9889/api/get/getTablespacePROD")
      .then(({ data }) => {
        this.getdata = data;
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
  },
  methods: {
    getColorInfo(USED_PCT) {
      if (USED_PCT >= "90") return "red"
      else 
      return "#068fff"
    },

    onButtonClick(item) {
      console.log("click on " + item.no);
    },
    Download() {
      const data = this.getdata;
      const fileName = "Generate_report";
      const exportType = exportFromJSON.types.xls;
      exportFromJSON({ data, fileName, exportType });
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
</style>
