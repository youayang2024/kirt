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
// import exportFromJSON from "export-from-json";
import { saveExcel } from "@progress/kendo-vue-excel-export";
import "jspdf-autotable";
export default {
  name: "QR_MERCHANT",
  data() {
    return {
      isLoading: false,
      headers: [
        { text: "QR_TYPE", value: "QR_TYPE" },
        { text: "BR_ID", value: "BR_ID" },
        { text: "BR_NAME", value: "BR_NAME" },
        { text: "COCODE", value: "COCODE" },
        { text: "MERCHANT_DATE", value: "MERCHANT_DATE" },

        { text: "MERCHANT_ID", value: "MERCHANT_ID" },
        { text: "ACCOUNT", value: "ACCOUNT" },

        { text: "ACCOUNT_NAME", value: "ACCOUNT_NAME" },

        { text: "MOBILE_NO", value: "MOBILE_NO" },
        { text: "ADDRESS", value: "ADDRESS" },
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
          { field: "QR_TYPE", title: "QR_TYPE" },
          { field: "BR_ID", title: "BR_ID" },
          { field: "BR_NAME", title: "BR_NAME" },
          { field: "COCODE", title: "COCODE" },
          { field: "MERCHANT_DATE", title: "MERCHANT_DATE" },
          { field: "MERCHANT_ID", title: "MERCHANT_ID" },
          { field: "ACCOUNT", title: "ACCOUNT" },
          { field: "ACCOUNT_NAME", title: "ACCOUNT_NAME" },
          { field: "MOBILE_NO", title: "MOBILE_NO" },
          { field: "ADDRESS", title: "ADDRESS" },
        ],
      });



    
      // const data = this.getdata;
      // const fileName = "Export Worksheet";
      // const exportType = exportFromJSON.types.xls;
      // exportFromJSON({ data, fileName, exportType });

    },
    Search_info() {
      this.isLoading = "red";
      axios
        .get("http://10.0.1.108:9889/api/get/VIEW_QR_DETAIL")
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
