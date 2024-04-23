<template>
  <v-card class="MobileDbaView" style="font-family: Saysettha OT">
    <v-card class="scrollmenu">
      <v-card-title>
        &nbsp;
        <v-btn
          color="primary"
          outlined
          text
          style="
            font-size: 12px;
            height: 31px;
            width: 130px;
            font-family: phetsarath OT;
          "
          @click="Search_info()"
          ><v-icon color="blue">mdi-magnify</v-icon> Search info</v-btn
        >
        &nbsp;

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
      </v-card-title>

      <v-data-table
        style="
          background-color: white;
          color: blue;
          font-family: phetsarath OT;
          color: #068fff;
        "
        ref="myTable"
        :headers="headers"
        :items="getdata"
        :items-per-page="10"
        class="elevation-1"
        :loading="isLoading"
      >
      </v-data-table>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import axios from "axios";
import { saveExcel } from "@progress/kendo-vue-excel-export";
import "jspdf-autotable";
export default {
  name: "TRUST_TXN",
  data() {
    return {
      isLoading: false,
      headers: [
        { text: "MONTH", value: "MONTH" },
        { text: "ACCOUNT_COCODE", value: "ACCOUNT_COCODE" },
        { text: "ACCOUNT_BRANCH_UNIT", value: "ACCOUNT_BRANCH_UNIT" },
        { text: "ACCOUNT_NO", value: "ACCOUNT_NO" },
        { text: "ACCOUNT_MOBILE_NO", value: "ACCOUNT_MOBILE_NO" },
        { text: "TXN_TYPE", value: "TXN_TYPE" },
        { text: "CURRENCY_CODE", value: "CURRENCY_CODE" },
        { text: "CURRENCY_NAME", value: "CURRENCY_NAME" },
        { text: "TXN", value: "TXN" },
        { text: "TOTAL_AMOUNT", value: "TOTAL_AMOUNT" },
      ],
      getdata: [],
    };
  },

  methods: {
    Download() {
      saveExcel({
        data: this.getdata,
        fileName: "Export Worksheet.xlsx",
        columns: [
          { field: "MONTH", title: "MONTH" },
          { field: "ACCOUNT_COCODE", title: "ACCOUNT_COCODE" },
          { field: "ACCOUNT_BRANCH_UNIT", title: "ACCOUNT_BRANCH_UNIT" },
          { field: "ACCOUNT_NO", title: "ACCOUNT_NO" },
          { field: "ACCOUNT_MOBILE_NO", title: "ACCOUNT_MOBILE_NO" },
          { field: "TXN_TYPE", title: "TXN_TYPE" },
          { field: "CURRENCY_CODE", title: "CURRENCY_CODE" },
          { field: "CURRENCY_NAME", title: "CURRENCY_NAME" },
          { field: "TXN", title: "TXN" },
          { field: "TOTAL_AMOUNT", title: "TOTAL_AMOUNT" },
        ],
      });
    },
    Search_info() {
      this.isLoading = "red";
      axios
        .get("http://10.0.1.108:9889/api/get/VIEW_TRUST_TXN")
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
</style>
