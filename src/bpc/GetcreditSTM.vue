<template>
  <v-card class="MobileDbaView" style="font-family: Saysettha OT">
    <v-card-title
      style="
        font-family: phetsarath OT;
        background-color: #0a6ebd;
        color: white;
      "
    >
      <v-icon style="color: chocolate">mdi-credit</v-icon> VISA credit
      statement</v-card-title
    >
    <!-- <v-divider></v-divider> -->
    <v-card class="scrollmenu">
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
        &nbsp;
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          outlined
          text
          @click="getinvoices()"
          style="
            font-size: 12px;
            height: 30px;
            width: 300px;
            font-family: phetsarath OT;
          "
          >Credit statement daily report
        </v-btn>
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
          font-size: 8px;
          color: #068fff;
        "
        :search="search"
        ref="myTable"
        :headers="headers"
        :items="getdata"
        :items-per-page="5"
        class="elevation-1"
        :loading="isLoading"
      >
        <template #[`item.PERCENT_USED`]="{ item }">
          <v-chip-group :color="getColorInfo(item.PERCENT_USED)">
            {{ item.PERCENT_USED }}
          </v-chip-group>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="this.updatesuccess" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="success">
          ຂໍ້ມູນຂອງທ່ານຖືກດືງສຳເລັດແລ້ວ
        </v-alert>
        <v-card-text class="text-center">
          <div class="text-center">
            <img
              src="https://media.tenor.com/0AVbKGY_MxMAAAAM/check-mark-verified.gif"
              height="60"
              width="60"
            />
          </div>
          <br />
          ຂອບໃຈ
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="updatesuccess = false"
            >ປິດ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script lang="ts">
import axios from "axios";

import jsPDF from "jspdf";
import "jspdf-autotable";
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
import { saveExcel } from "@progress/kendo-vue-excel-export";
export default {
  name: "GetcreditSTM",

  data() {
    return {
      updatesuccess: false,
      search: "",
      isLoading: false,
      headers: [
        { text: "Customer number", value: "CUSTOMER_NUMBER" },
        { text: "Account number", value: "ACCOUNT_NUMBER" },
        { text: "Customer name", value: "CUSTOMER_NAME" },
        { text: "Surname", value: "SURNAME" },
        { text: "Email", value: "EMAIL" },
        { text: "Card number", value: "CARD_NUMBER" },
        { text: "Statement date", value: "REPORT_DATE" },
        { text: "Invoice date", value: "INVOICE_DATE" },
        { text: "Credit limit", value: "CREDIT_LIMIT" },
        { text: "Available balance", value: "AVAILABLE_BALANCE" },
        { text: "Total amount due", value: "TOTAL_AMOUNT_DUE" },
        { text: "Min amount due", value: "MIN_AMOUNT_DUE" },
        { text: "Day past due", value: "DAY_PAST_DUE" },
      ],
      getdata: [],
      headerCellConfig: { background: "#3468C0", textAlign: "center" },
    };
  },
  mounted() {
    this.isLoading = "red";
    axios
      .get("http://10.0.22.236:9889/api/get/getcreditstm")
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
    getColorInfo(PERCENT_USED) {
      if (PERCENT_USED >= "80") return "red";
      else return "#068fff";
    },
    onButtonClick(item) {
      console.log("click on " + item.no);
    },
    Download() {
      saveExcel({
        data: this.getdata,
        fileName: "Generate_report.xlsx",
        columns: [
          {
            title: "VISA Credit Statement",
            headerCellOptions: this.headerCellConfig,
            children: [
              { field: "CUSTOMER_NUMBER", title: "CUSTOMER_NUMBER" },
              { field: "ACCOUNT_NUMBER", title: "ACCOUNT_NUMBER" },
              { field: "CUSTOMER_NAME", title: "CUSTOMER_NAME" },
              { field: "SURNAME", title: "SURNAME" },
              { field: "EMAIL", title: "EMAIL" },

              { field: "CARD_NUMBER", title: "CARD_NUMBER" },
              { field: "REPORT_DATE", title: "STATEMENT_DATE" },
              { field: "INVOICE_DATE", title: "INVOICE_DATE" },
              { field: "CREDIT_LIMIT", title: "CREDIT_LIMIT" },
              { field: "AVAILABLE_BALANCE", title: "AVAILABLE_BALANCE" },
              { field: "TOTAL_AMOUNT_DUE", title: "TOTAL_AMOUNT_DUE" },
              { field: "MIN_AMOUNT_DUE", title: "MIN_AMOUNT_DUE" },
              { field: "DAY_PAST_DUE", title: "DAY_PAST_DUE" },
            ],
          },
        ],
      });
    },
    createPDF() {
      var source = this.$refs["myTable"];
      let rows = [];
      let columnHeader = [
        "IP",
        "dba name",
        "channel",
        "Total GB",
        "Use GB",
        "free GB",
        "percent used",
        "free percent",
        "date",
      ];
      let pdfName = "generated report";
      source.items.forEach((element) => {
        var temp = [
          element.DBA_SERVER,
          element.DBA_NAME,
          element.CHANNEL,
          element.TOTAL_GB,
          element.USED_GB,
          element.FREE_GB,
          element.PERCENT_USED,
          element.PERCENT_FREE,
          element.CREATE_DATE,
        ];
        rows.push(temp);
      });
      var doc = new jsPDF();
      doc.autoTable(columnHeader, rows, { startY: 10 });
      doc.save(pdfName + ".pdf");
    },

    //

    getinvoices() {
      axios
        .post("http://10.0.10.37:9889/api/post/postgetStatement")
        .then((response) => {
          if (response.data.status == "success") {
            //

            this.updatesuccess = true;
            this.isLoading = "red";
            axios
              .get("http://10.0.22.236:9889/api/get/getcreditstm")
              .then(({ data }) => {
                this.getdata = data;
              })
              .catch(function (error) {
                if (error.response.data.message == "TokenExpiredError") {
                  localStorage.removeItem("token");
                  this.$router.push("/LoginPage");
                } else {
                  console.log(error);
                }
              });
            // alert("Please waiting data response")
            console.log(response);

            this.waiting_data();
          } else {
            console.log(response);
          }
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

    //
    async waiting_data() {
      this.isLoading = "red";
      await pause(6500);
      axios
        .get("http://10.0.22.236:9889/api/get/getcreditstm")
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
  color: white;
  text-align: center;
  padding: 2px;
  text-decoration: none;
}

.scrollmenu a:hover {
  background-color: #777;
}
</style>
