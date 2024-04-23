<template>
  <v-card class="MobileDbaView" style="font-family: Saysettha OT">
    <v-card class="scrollmenu" >
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
          type="grow"
          :loading="isLoadingPage"
        >
          Search info <v-icon color="blue">mdi-magnify</v-icon></v-btn
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

      <v-data-table v-if="isAuthorized"
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
import moment from "moment";
import "jspdf-autotable";
export default {
  name: "TRUST_LINK_ALL_ACCOUNT",
  data() {
    return {
    
      isLoading: false,
      isLoadingPage: false,
      headers: [
        { text: "CRDPLAN_ID", value: "AUTHTXN_CRDPLAN_ID" },
        { text: "TXNTYPE_ID", value: "AUTHTXN_TXNTYPE_ID" },
        { text: "CUST_ID", value: "AUTHTXN_CUST_ID" },
        { text: "CARD_NO", value: "AUTHTXN_CARD_NO" },
        { text: "CARDHOLDER_NAME", value: "AUTHTXN_CARDHOLDER_NAME" },
        { text: "RRN", value: "AUTHTXN_RETRIEVAL_REFNO" },
        { text: "COUNTRY", value: "COUNTRY" },
      ],
      getdata: [],
      headerCellConfig: { background: "#3468C0", textAlign: "center" },
      isAuthorized: false,
    };
  },
// created(){
//   if (this.getdata.CRDPLAN_ID =="0" ) {
//       this.isAuthorized = true;
//     } else{
//       this.isAuthorized = false;
//     }
// },
  methods: {
    Download() {
      const get_today = new Date();
      const formattedDate = moment(get_today).format("YYYY-MM-DD hh:mm ss");

      saveExcel({
        data: this.getdata,
        fileName:
          "Generated_reported_" +
          moment(new Date()).format("YYYYMMDD") +
          ".xlsx",
        columns: [
          {
            title:
              "​ຂໍ້​ມູນລາຍ​ລະ​ອຽດຂອງ​ບັດທີ່ເຮັດທຸລະກໍາຢູ່ຕ່າງປະເທດ " +
              ", ວັນທີ " +
              formattedDate,
            headerCellOptions: this.headerCellConfig,
            children: [
              { field: "AUTHTXN_CRDPLAN_ID", title: "AUTHTXN_CRDPLAN_ID" },
              { field: "AUTHTXN_TXNTYPE_ID", title: "AUTHTXN_TXNTYPE_ID" },
              { field: "AUTHTXN_CUST_ID", title: "AUTHTXN_CUST_ID" },
              { field: "AUTHTXN_CARD_NO", title: "AUTHTXN_CARD_NO" },
              { field: "CARD_PLASTIC_DATE", title: "ວັນທີ່ບັດ PLASTIC" },
              {
                field: "AUTHTXN_CARDHOLDER_NAME",
                title: "AUTHTXN_CARDHOLDER_NAME",
              },
              {
                field: "AUTHTXN_RETRIEVAL_REFNO",
                title: "AUTHTXN_RETRIEVAL_REFNO",
              },
              { field: "COUNTRY", title: "COUNTRY" },
            ],
          },
        ],
      });
    },
    Search_info() {
      this.isLoading = "red";
     this.isLoadingPage= true;
      axios
        .get("http://10.0.22.236:9889/api/get/get_ThreeTxn")
        .then(( response ) => {
          this.isAuthorized = true
          this.getdata = response.data;
          this.isLoading = false;
          this.isLoadingPage= false;
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
