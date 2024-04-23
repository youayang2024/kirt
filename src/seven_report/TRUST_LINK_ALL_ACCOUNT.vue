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
// import { saveExcel } from "@progress/kendo-vue-excel-export";
import "jspdf-autotable";
export default {
  name: "TRUST_LINK_ALL_ACCOUNT",
  data() {
    return {
      isLoading: false,
      headers: [
        { text: "WALLET_CARD", value: "WALLET_CARD" },
        { text: "WALLET_DATE", value: "WALLET_DATE" },
        { text: "WALLET_BALANCE_DATE", value: "WALLET_BALANCE_DATE" },

        { text: "WALLET_BALANCE", value: "WALLET_BALANCE" },
        { text: "WALLET_NAME", value: "WALLET_NAME" },
        { text: "WALLET_MOBILE", value: "WALLET_MOBILE" },
        { text: "CARD_ACCOUNT", value: "CARD_ACCOUNT" },
        { text: "COCODE", value: "COCODE" },
        { text: "CARD_ACCOUNT_CURRENCY", value: "CARD_ACCOUNT_CURRENCY" },
        { text: "ACCT_NAME", value: "ACCT_NAME" },
        { text: "BALANCE_DATE", value: "BALANCE_DATE" },
        { text: "BALANCE", value: "BALANCE" },
        { text: "LAK_ECHANGE_RATE", value: "LAK_ECHANGE_RATE" },
        { text: "LAK_EXCHANGE_AMOUNT", value: "LAK_EXCHANGE_AMOUNT" },
      ],
      getdata: [],
    };
  },

  methods: {
    Download() {




      // const data = this.getdata;
      // const fileName = "Export Worksheet";
      // const exportType = exportFromJSON.types.xls;
      // exportFromJSON({ data, fileName, exportType });





      // saveExcel({
      //   data: this.getdata,
      //   fileName: "Export Worksheet.xlsx",
      //   columns: [
      //     { field: "WALLET_CARD", title: "WALLET_CARD" },
      //     { field: "WALLET_DATE", title: "WALLET_DATE" },
      //     { field: "WALLET_BALANCE_DATE", title: "WALLET_BALANCE_DATE" },
      //     { field: "WALLET_BALANCE", title: "WALLET_BALANCE" },
      //     { field: "WALLET_NAME", title: "WALLET_NAME" },
      //     { field: "WALLET_MOBILE", title: "WALLET_MOBILE" },
      //     { field: "CARD_ACCOUNT", title: "CARD_ACCOUNT" },
      //     { field: "COCODE", title: "COCODE" },
      //     { field: "CARD_ACCOUNT_CURRENCY", title: "CARD_ACCOUNT_CURRENCY" },
      //     { field: "ACCT_NAME", title: "ACCT_NAME" },
      //     { field: "BALANCE_DATE", title: "BALANCE_DATE" },
      //     { field: "BALANCE", title: "BALANCE" },
      //     { field: "LAK_ECHANGE_RATE", title: "LAK_ECHANGE_RATE" },
      //     { field: "LAK_EXCHANGE_AMOUNT", title: "LAK_EXCHANGE_AMOUNT" },
         
      //   ],
      // });





      const blob = new Blob([this.getdata], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.txt');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);


    },
    Search_info() {
      this.isLoading = "red";
      axios
        .get("http://10.0.22.236:9889/api/get/VIEW_TRUSTLINKALLACCOUNT")
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
