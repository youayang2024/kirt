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
  name: "CARD_ACTIVE",
  data() {
    return {
      isLoading: false,
      headers: [
        { text: "BR_ID", value: "BR_ID" },
        { text: "BR_NAME", value: "BR_NAME" },
        { text: "COCODE", value: "COCODE" },
        { text: "CARD_BRANCH_ID", value: "CARD_BRANCH_ID" },
        { text: "CARD_NO", value: "CARD_NO" },
        { text: "CARD_EMBOSSED_NAME", value: "CARD_EMBOSSED_NAME" },
        { text: "CARD_TYPE", value: "CARD_TYPE" },
        { text: "CARD_BASIC_CUST_ID", value: "CARD_BASIC_CUST_ID" },
        { text: "CARD_CUST_ID", value: "CARD_CUST_ID" },
        { text: "CARD_PLASTIC_CODE", value: "CARD_PLASTIC_CODE" },
        { text: "CARD_CARDPLAN_ID", value: "CARD_CARDPLAN_ID" },
        { text: "CARD_ANNIVERSARY_DATE", value: "CARD_ANNIVERSARY_DATE" },
        { text: "CARD_EMBOSSED_DATE", value: "CARD_EMBOSSED_DATE" },
        { text: "CARD_ISSUED_BY", value: "CARD_ISSUED_BY" },
        { text: "CARD_PLASTIC_UPDATED_BY", value: "CARD_PLASTIC_UPDATED_BY" },
      
       
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
          { field: "BR_ID", title: "BR_ID" },
          { field: "BR_NAME", title: "BR_NAME" },
          { field: "COCODE", title: "COCODE" },
          { field: "CARD_BRANCH_ID", title: "CARD_BRANCH_ID" },
          { field: "CARD_NO", title: "CARD_NO" },
          { field: "CARD_EMBOSSED_NAME", title: "CARD_EMBOSSED_NAME" },
          { field: "CARD_TYPE", title: "CARD_TYPE" },
          { field: "CARD_BASIC_CUST_ID", title: "CARD_BASIC_CUST_ID" },
          { field: "CARD_CUST_ID", title: "CARD_CUST_ID" },
          { field: "CARD_PLASTIC_CODE", title: "CARD_PLASTIC_CODE" },
          { field: "CARD_CARDPLAN_ID", title: "CARD_CARDPLAN_ID" },
          { field: "CARD_ANNIVERSARY_DATE", title: "CARD_ANNIVERSARY_DATE" },
          { field: "CARD_EMBOSSED_DATE", title: "CARD_EMBOSSED_DATE" },
          { field: "CARD_ISSUED_BY", title: "CARD_ISSUED_BY" },
          { field: "CARD_PLASTIC_UPDATED_BY", title: "CARD_PLASTIC_UPDATED_BY" },
     
        ],
      });
    },
    Search_info() {
      this.isLoading = "red";
      axios
        .get("http://10.0.1.108:9889/api/get/VIEW_CARD_ACTIVES")
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
