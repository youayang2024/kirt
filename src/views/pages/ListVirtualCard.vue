<template>
  <div class="CustomerList" style="font-family: phetsarath OT">
    <v-alert dense text type="info" style="font-family: phetsarath OT"
      >ບັດເດບິດ Virtual</v-alert
    >
    <!-- dialog data is null -->
    <v-dialog v-model="this.datanotfound" max-width="500px">
      <v-card>
        <v-alert dense text type="error">
          Your card number not found Txntypgrp_id (FUND MOB)
        </v-alert>
        <v-card-text class="text-center"> Thank you.... </v-card-text>
        <v-card-actions>
          <v-btn color="error" block text @click="datanotfound = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- <v-form
      color="deep-purple accent-4"
      ref="form"
      lazy-validation
      v-model="valid"
      style="font-family: phetsarath OT"
    >
      <div>
        <v-row>
          <v-text-field
            v-model="cardno"
            prepend-icon="mdi-credit-card"
            label="ກະລຸນາປ້ອນໝາຍເລກບັດ"
            style="width: 200px"
            clearable
          />
        </v-row>
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          outlined
          @click="searchinfo()"
          style="font-size: 12px; height: 30px; width: 30px"
          >ຄົ້ນຫາ</v-btn
        >
      </v-card-actions>
    </v-form> -->
    <button class="download-btn" @click="Download_EXCEL()">
      ດາວໂຫຼດ Excel<i class="mdi mdi-export-variant" aria-hidden="true"></i>
    </button>


    <label style="color:white">**</label>
    <button class="download-btn" @click="Download_PDF()">
      ດາວໂຫຼດ PDF<i class="mdi mdi-export-variant" aria-hidden="true"></i>
    </button>

    <v-card  style="font-family: phetsarath OT; background-color: #dbe4c6">

      <v-card-title>
        <!-- <v-spacer></v-spacer> -->
     
        <label style="color: #DBE4C6;">***</label>
        <v-text-field
        style="color: blue;"
          v-model="search"
          append-icon="search"
          label="Search Cause"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
    
        :headers="headers"
        :items="getdata"
        :items-per-page="5"
        ref="myTable" 
        :search="search"
        class="elevation-1"
        :loading="isLoading"
      />
    </v-card>
    <!--  -->
  </div>
</template>
<script lang="ts">
import axios from "axios";
import exportFromJSON from "export-from-json";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
export default {
  name: "ListVirtualCard",
  props: ["data"],
  data() {
    return {
      isLoading: false,
      search:"",
      options: {},
      headers: [
        { text: "ໝາຍເລກບັດ", value: "CARDNO"},
        { text: "ເລກບັນຊີ", value: "ACCOUNT"},
        { text: "ປະເພດບັນຊີ", value: "ACC_TYPE", width: 120},
        { text: "ຊື່ລູກຄ້າ", value: "ACC_NAME" ,width: 300},
        { text: "DEFAULTIND", value: "DEFAULTIND", width: 100 },
        {text: "ODEFAULTIND",value: "ODEFAULTIND",width: 100},
        { text: "ຢືນຢັນວັນທີ", value: "MOD_DATE",width: 108 },
        { text: "MOD_USER", value: "MOD_USER" },
        {text: "CRDLINK_DATE",value: "CRDLINK_DATE",width: 100},
        { text: "CRDLINK_CAPTURED_BY", value: "CRDLINK_CAPTURED_BY"},
        { text: "CRDLINK_APPROVED_BY", value: "CRDLINK_APPROVED_BY"},
      ],
      getdata: [],
      cardno: "",
      currency: "",
      valid: false,
      datanotfound: false,
      message: "",
      status: "",
    };
  },
  mounted() {
    this.isLoading = "red";
    axios
      .get("http://10.0.22.236:9889/api/get/getvirtualdebitcard_no")
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
  },

  methods: {
    searchinfo() {
      if (this.cardno !== "") {
        this.isLoading = "red";
        axios
          .post("http://10.0.22.236:9889/api/post/postgetlimitcard", {
            cardno: this.cardno,
          })
          .then((response) => {
            if (response.data.status == "success") {
              (this.message = response.data.message),
                (this.status = response.data.status);
              if (response.data.data.length - 1 == -1) {
                this.datanotfound = true;
                this.isLoading = false;
                console.log(response);
                return;
              } else {
                this.getdata = response.data.data;
              }
              this.isLoading = false;
            } else {
              (this.message = response.data.message),
                (this.status = response.data.status);
              this.isLoading = false;
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
      } else {
        alert("Please enter your card and account number");
      }
    },
    Download_EXCEL() {
      const data = this.getdata;
      const fileName = "Generate_report";
      const exportType = exportFromJSON.types.xls;
      exportFromJSON({ data, fileName, exportType });
    },
    Download_PDF(){
      var source =  this.$refs["myTable"];
          let rows = [];
          let columnHeader = ['CARDNO', 'ACCOUNT', 'ACC_TYPE', 'ACC_NAME', 'DEFAULTIND', 'ODEFAULTIND', 'MOD_DATE','MOD_USER'];
          let pdfName = 'generated report';
          source.items.forEach(element => {
              var temp = [
                  element.CARDNO,
                  element.ACCOUNT,
                  element.ACC_TYPE,
                  element.ACC_NAME,
                  element.DEFAULTIND,
                  element.ODEFAULTIND,
                  element.MOD_DATE,
                  element.MOD_USER,
               
              ];
              rows.push(temp);
          });
          var doc = new jsPDF();
          doc.autoTable(columnHeader, rows, { startY: 10 });
          doc.save(pdfName + '.pdf');
    }
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
