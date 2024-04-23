<template>
  <v-card class="CustomerList" style="font-family: phetsarath OT">
    <v-card-title dense text 

    style="
        font-family: phetsarath OT;
        background-color: #4f709c;
        color: white;
      " 
      >ບັດ wallet</v-card-title
    >
    <!-- dialog data is null -->
    <v-dialog v-model="this.datanotfound" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="warning">
          ຄົ້ນຫາບໍ່ພົບຂໍ້ມູນຂອງທ່ານ
        </v-alert>
        <div class="text-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/eb/Blinking_warning.gif"
            height="80"
            width="100"
          />
        </div>
        <v-card-text class="text-center"> ກະລຸນາລອງອີກຄັ້ງ.... </v-card-text>
        <v-card-actions>
          <v-btn color="error" block text @click="datanotfound = false"
            >ປິດ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- <v-form
      color="deep-purple accent-4"
      ref="form"
      lazy-validation
      v-model="valid"
      class="container"
      style="font-family: phetsarath OT;"
    > -->
 
    <v-card class="container" style="">
      <v-card-title>
      
          <v-text-field
            v-model="b_id"
            type="number"  
            prepend-icon="mdi-message-text"
            label="ກະລຸນາປ້ອນລະຫັດສາຂາຂອງທ່ານ"
            style="width: 200px"
           
            clearable
          >
          </v-text-field>
          <v-text-field
            v-model="from_date"
            prepend-icon="mdi-domain"
            type="number" 
            label="ເລີ່ມວັນທີ່ (yyyymmdd)"
            style="width: 200px"
           
            clearable
          >
          </v-text-field>

          <v-text-field
            v-model="to_date"
            type="number" 
            prepend-icon="mdi-domain"
            label="ຫາວັນທີ່ (yyyymmdd)"
            style="width: 200px"
          
            clearable
          >
          </v-text-field>

        
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          outlined
       
          @click="searchinfo()"
          style="font-size: 12px; height: 30px; width: 30px"
          ><v-icon color="blue">mdi-magnify</v-icon>ຄົ້ນຫາ</v-btn
        >
   
      </v-card-title>
    </v-card>
    <!-- </v-form> -->
    &nbsp;
    <button class="download-btn" @click="Download_EXCEL()" style="font-family: phetsarath OT" >
      ດາວໂຫຼດ Excel<i class="mdi mdi-export-variant" aria-hidden="true"></i>
    </button>
    <label style="color: white;">***</label>
    <button class="download-btn" @click="Download_PDF()" style="font-family: phetsarath OT" >
      ດາວໂຫຼດ PDF<i class="mdi mdi-export-variant" aria-hidden="true"></i>
    </button>
    <v-card style="font-family: phetsarath OT; ">
      <v-card-title>
        <!-- <v-spacer></v-spacer> -->
      
        <label style="color: white;">***</label>
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
   
         :item-height="1"
        :headers="headers"
        :items="getdata"
        ref="myTable" 
        :items-per-page="5"
        :search="search"
        class="elevation-1"
        :loading="isLoading" 
      />
    </v-card>
    <!--  -->
  </v-card>
</template>
<script lang="ts">
import axios from "axios";
import exportFromJSON from "export-from-json";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
export default {
  name: "ViewTrustUserFinal",
  props: ["data"],
  data() {
    return {
      b_id: "",
      search:"",
      from_date: "",
      to_date: "",
      inputRules: [(v) => v.length >= 1 || "ກະລຸນາປ້ອນວັນທີ່ກ່ອນ"],
      inputID: [(v) => v.length >= 1 || "ກະລຸນາປ້ອນລະຫັດ"],
      //   to_date: vm.formatDates(new Date().toISOString().substr(0, 10)),
      //   menu2: false,
      //   dates: new Date().toISOString().substr(0, 10),

      //   date: new Date().toISOString().substr(0, 10),
      //   from_date: vm.formatDate(new Date().toISOString().substr(0, 10)),
      //   menu1: false,

      isLoading: false,
      options: {},
      headers: [
        { text: "WALLET_CUST_ID", value: "WALLET_CUST_ID" },
        { text: "WALLET_CARD_NO", value: "WALLET_CARD_NO" },
        { text: "WALLET_ACCT", value: "WALLET_ACCT" },
        { text: "WALLET_NAME", value: "WALLET_NAME" },
        { text: "WALLET_MOBILE_NO", value: "WALLET_MOBILE_NO" },
        { text: "WALLET_STATUS", value: "WALLET_STATUS" },
        { text: "WALLET_DATE", value: "WALLET_DATE" },
        { text: "DEBIT_CUST_ID", value: "DEBIT_CUST_ID" },
        { text: "DEBIT_CARD_NO", value: "DEBIT_CARD_NO" },
        { text: "DEBIT_ACCT", value: "DEBIT_ACCT" },
        { text: "DEBIT_NAME", value: "DEBIT_NAME" },
        { text: "DEBIT_MOBILE_NO", value: "DEBIT_MOBILE_NO" },
        { text: "DEBIT_STATUS", value: "DEBIT_STATUS" },
        { text: "DEBIT_DATE", value: "DEBIT_DATE" },
        { text: "DEBIT_BR_ID", value: "DEBIT_BR_ID" },
        { text: "DEBIT_BR_NAME", value: "DEBIT_BR_NAME" },
        { text: "VDE_CUST_ID", value: "VDE_CUST_ID" },
        { text: "VDE_CARD_NO", value: "VDE_CARD_NO" },
        { text: "VDE_ACCT", value: "VDE_ACCT" },
        { text: "VDE_NAME", value: "VDE_NAME" },
        { text: "VDE_MOBILE_NO", value: "VDE_MOBILE_NO" },
        { text: "VDE_STATUS", value: "VDE_STATUS" },
        { text: "VDE_DATE", value: "VDE_DATE" },
        { text: "VDE_BR_ID", value: "VDE_BR_ID" },
        { text: "VDE_BR_NAME", value: "VDE_BR_NAME" },
      ],
      getdata: [],

      valid: false,
      datanotfound: false,
      message: "",
      status: "",
    };
  },
  methods: {
    searchinfo() {
      if (this.cardno !== "") {
        this.isLoading = "red";
        axios
          .post("http://10.0.22.236:9889/api/get/getViewtrustuserfinal", {
            b_id: this.b_id,
            from_date: this.from_date,
            to_date: this.to_date,
            headers: {
              "Content-Type": "multipart/form-data",
            },
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

    // formatted from date

    // formatDate(date) {
    //   if (!date) return null;

    //   const [year, month, day] = date.split("-");

    //   return `${year}-${month}-${day}`;
    // },
    // parseDate(date) {
    //   if (!date) return null;

    //   const [year, month, day] = date.split("/");
    //   return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    // },
    Download_EXCEL() {
      const data = this.getdata;
      const fileName = "Generate_report";
      const exportType = exportFromJSON.types.xls;
      exportFromJSON({ data, fileName, exportType });
    },


    Download_PDF(){
      var source =  this.$refs["myTable"];
          let rows = [];
          let columnHeader = ['WALLET_CUST_ID', 'WALLET_CARD_NO', 'WALLET_ACCT', 'WALLET_NAME', 'WALLET_MOBILE_NO', 'WALLET_STATUS', 'WALLET_DATE'];
          let pdfName = 'generated report';
          source.items.forEach(element => {
              var temp = [
                  element.WALLET_CUST_ID,
                  element.WALLET_CARD_NO,
                  element.WALLET_ACCT,
                  element.WALLET_NAME,
                  element.WALLET_MOBILE_NO,
                  element.WALLET_STATUS,
                  element.WALLET_DATE
               
              ];
              rows.push(temp);
          });
          var doc = new jsPDF();
          doc.autoTable(columnHeader, rows, { startY: 10 });
          doc.save(pdfName + '.pdf');
    }
  },
  //   watch: {
  //     date() {
  //       this.from_date = this.formatDate(this.date);
  //       this.to_date = this.formatDates(this.dates);

  //     },
  //   },
  // end formatted date
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
