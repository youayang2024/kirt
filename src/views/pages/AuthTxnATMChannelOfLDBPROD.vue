<template>
  <v-card class="MobileDbaView" style="font-family: Saysettha OT">
    <v-card-title
      style="
        font-family: phetsarath OT;
        background-color: #0a6ebd;
        color: white;
      "
    >
      <v-icon style="color: chocolate">mdi-</v-icon>ທຸລະກໍາ AUTHTXN ຜ່ານຊ່ອງທາງ ATM LDB
      PROD Only 2023 ~ T24-CHANNEL</v-card-title
    >
    <!-- <v-divider></v-divider> -->
    <v-card>
      <v-card-title>
        <!-- <v-spacer></v-spacer> -->

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
        style="
          background-color: white;
          color: blue;
          font-family: phetsarath OT;
          color: #068fff;
        "
        :search="search"
        ref="myTable"
        :headers="headers"
        :items="getdata"
        :items-per-page="20"
        class="elevation-1"
        :loading="isLoading"
      >
        <template #[`item.RESPONSE_CODE`]="{ item }">
          <v-chip-group :color="getColorInfo(item.RESPONSE_CODE)">
            {{ item.RESPONSE_CODE }}
          </v-chip-group>
        </template>
        <!-- <template #[`item.CARD_NO`]="{ item }">
          <v-chip-group :color="getColorInfo(item.CARD_NO)">
            {{ item.CARD_NO }}
          </v-chip-group>
        </template> -->
      </v-data-table>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import axios from "axios";
import exportFromJSON from "export-from-json";
import "jspdf-autotable";

export default {
  name: "AuthTxnATMChannelOfLDBPROD",
  data() {
    return {
      search: "",
      isLoading: false,
      headers: [
      { text: "AUTHTXN_REQUEST_DATE", value: "AUTHTXN_REQUEST_DATE"},
        { text: "LDB_TXN", value: "LDB_TXN" },
        { text: "LDB_FEE", value: "LDB_FEE"},
        { text: "LDB_AMT", value: "LDB_AMT" },
        { text: "AVERAGE_PER_MONTH", value: "AVERAGE_PER_MONTH" }
      ],
      getdata: [],
    };
  },
  mounted() {
    this.isLoading = "red";
    axios
      .get("http://10.0.22.236:9889/api/get/getTxn_fromLDB_Channel")
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
    getColorInfo(RESPONSE_CODE) {
      if (RESPONSE_CODE != "00") return "red";
      else return "#068fff";
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
