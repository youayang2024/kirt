<template>
  <v-card class="MobileDbaView" style="font-family: Saysettha OT">
    <v-card class="scrollmenu">
      <v-card-title>
        &nbsp;
        <v-text-field
          v-model="from_date"
          :format="YYYYMMDD"
          type="date"
          label="From Date"
          style="width: 10px; color: blue"
          :rules="inputRules"
          clearable
        >
        </v-text-field>
        &nbsp;
        <v-text-field
          v-model="to_date"
          type="date"
          label="To Date"
          style="width: 10px"
          :rules="inputRules"
          clearable
        >
        </v-text-field>
        <v-spacer></v-spacer>
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
        <v-spacer></v-spacer>

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
    <v-dialog v-model="this.validate_date" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="error"> ກະລຸນາປ້ອນວັນທີ່ກ່ອນ! </v-alert>
        <v-card-text class="text-center">
          <div class="text-center">
            <img
              src="https://cdn.dribbble.com/users/251873/screenshots/9388228/error-img.gif"
              height="100"
              width="137"
            />
          </div>
          <br /><span> ໃຫ້ແນ່ໃຈວ່າປ້ອນວັນທີແລ້ວບໍ? </span>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" block text @click="validate_date = false"
            >ປິດ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script lang="ts">
import axios from "axios";
import { saveExcel } from "@progress/kendo-vue-excel-export";
export default {
  name: "QR_SCAN_TXN_ALL_DETAILS",
  data() {
    return {
      validate_date: false,
      isLoading: false,
      from_date: "",
      to_date: "",
      inputRules: [(v) => v.length >= 1 || "ກະລຸນາປ້ອນວັນທີ່ກ່ອນ"],
      headers: [
        { text: "AUTHTXN_REQUEST_DATE", value: "AUTHTXN_REQUEST_DATE" },
        { text: "REF_NO", value: "REF_NO" },
        { text: "TXNTYPE_ID", value: "TXNTYPE_ID" },
        { text: "TXNTYPE_DESC", value: "TXNTYPE_DESC" },

        { text: "CUSTOMER_COCODE", value: "CUSTOMER_COCODE" },

        { text: "CUSTOMER_ACCOUNT", value: "CUSTOMER_ACCOUNT" },

        { text: "CUSTOMER_AMOUNT", value: "CUSTOMER_AMOUNT" },

        { text: "MERCHANT_COCODE", value: "MERCHANT_COCODE" },

        { text: "MERCHANT_ACCOUNT", value: "MERCHANT_ACCOUNT" },
        { text: "MERCHANT_AMOUNT", value: "MERCHANT_AMOUNT" },
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
          { field: "AUTHTXN_REQUEST_DATE", title: "AUTHTXN_REQUEST_DATE" },
          { field: "REF_NO", title: "REF_NO" },
          { field: "TXNTYPE_ID", title: "TXNTYPE_ID" },
          { field: "TXNTYPE_DESC", title: "TXNTYPE_DESC" },
          { field: "CUSTOMER_COCODE", title: "CUSTOMER_COCODE" },
          { field: "CUSTOMER_ACCOUNT", title: "CUSTOMER_ACCOUNT" },
          { field: "CUSTOMER_AMOUNT", title: "CUSTOMER_AMOUNT" },
          { field: "MERCHANT_COCODE", title: "MERCHANT_COCODE" },
          { field: "MERCHANT_ACCOUNT", title: "MERCHANT_ACCOUNT" },
          { field: "MERCHANT_AMOUNT", title: "MERCHANT_AMOUNT" },
        ],
      });
    },
    Search_info() {
      if (this.from_date !== "" && this.to_date !== "") {
        this.isLoading = "red";
        axios
          .post("http://10.0.1.108:9889/api/post/QRSCANTXNALLDETAILS", {
            from_date: this.from_date,
            to_date: this.to_date,

            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.data.status == "success") {
              console.log(response);
              if (response.data.data.length - 1 == -1) {
                this.datanotfound = true;
                this.isLoading = false;

                return;
              } else {
                this.getdata = response.data.data;
              }
              this.isLoading = false;
            } else {
              this.isLoading = false;
              console.log(response);
            }
          })
          .catch(function (error) {
            if (error.response.response.message == "TokenExpiredError") {
              localStorage.removeItem("token");
              this.$router.push("/LoginPage");
            } else {
              console.log(error);
            }
          });
      } else {
        this.validate_date = true;
      }
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
