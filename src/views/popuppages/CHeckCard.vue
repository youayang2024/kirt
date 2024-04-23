<template>
  <v-card class="CustomerList" style="font-family: phetsarath OT">
    <v-card-title
      dense
      text
      style="
        font-family: phetsarath OT;
        background-color: #4f709c;
        color: white;
      "
      >ກວດສອບລາຍລະອຽດຂອງບັດ</v-card-title
    >
    <!-- dialog data is null -->
    <v-dialog v-model="this.datanotfound" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="warning"> ຄົ້ນຫາບໍ່ພົບຂໍ້ມູນຂອງທ່ານ </v-alert>
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

    <v-card class="container">
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
          style="font-size: 12px; height: 30px; width: 40px"
          ><v-icon color="blue">mdi-magnify</v-icon>ຄົ້ນຫາ</v-btn
        >
      </v-card-title>
    </v-card>

    &nbsp;
    <button
      class="download-btn"
      @click="Download_EXCEL()"
      style="font-family: phetsarath OT"
    >
      ດາວໂຫຼດ Excel<i class="mdi mdi-export-variant" aria-hidden="true"></i>
    </button>
    <label style="color: white">***</label>
    <button
      class="download-btn"
      @click="Download_PDF()"
      style="font-family: phetsarath OT"
    >
      ດາວໂຫຼດ PDF<i class="mdi mdi-export-variant" aria-hidden="true"></i>
    </button>
    <v-card style="font-family: phetsarath OT">
      <v-card-title>
        <!-- <v-spacer></v-spacer> -->

        <label style="color: white">***</label>
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
import jsPDF from "jspdf";
import "jspdf-autotable";
export default {
  name: "ViewTrustUserFinal",
  props: ["data"],
  data() {
    return {
      b_id: "",
      search: "",
      from_date: "",
      to_date: "",
      inputRules: [(v) => v.length >= 1 || "ກະລຸນາປ້ອນວັນທີ່ກ່ອນ"],
      inputID: [(v) => v.length >= 1 || "ກະລຸນາປ້ອນລະຫັດ"],
      isLoading: false,
      options: {},
      headers: [
        { text: "CARD_NO", value: "CARD_NO" },
        { text: "CARD_EMBOSSED_NAME", value: "CARD_EMBOSSED_NAME" },
        { text: "CARD_TYPE", value: "CARD_TYPE" },
        { text: "CARD_CRDACCT_NO", value: "CARD_CRDACCT_NO" },
        { text: "CARD_CUST_ID", value: "CARD_CUST_ID" },
        { text: "ADDRESS_LINE1", value: "ADDRESS_LINE1" },
        { text: "CARD_BS_IND", value: "CARD_BS_IND" },
        { text: "CARD_EXPIRY_CCYYMM", value: "CARD_EXPIRY_CCYYMM" },
        { text: "CARD_PLASTIC_CODE", value: "CARD_PLASTIC_CODE" },
        { text: "CARD_NEWRPL_IND", value: "CARD_NEWRPL_IND" },
        { text: "CARD_PLASTIC_DATE", value: "CARD_PLASTIC_DATE" },
        { text: "CARD_FIRST_USE_IND", value: "CARD_FIRST_USE_IND" },
        { text: "CARD_FIRST_USE_DATE", value: "CARD_FIRST_USE_DATE" },
        { text: "CARD_FIRST_USE_TIME", value: "CARD_FIRST_USE_TIME" },
        { text: "CARD_CLASS", value: "CARD_CLASS" },
        { text: "CARD_REMARKS", value: "CARD_REMARKS" },
        { text: "CARD_CARDPLAN_ID", value: "CARD_CARDPLAN_ID" },
        { text: "BR_ID", value: "BR_ID" },
        { text: "BR_NAME", value: "BR_NAME" },
        { text: "CARD_BRANCH_ID", value: "CARD_BRANCH_ID" },
        { text: "BRANCH_DESC", value: "BRANCH_DESC" },
        { text: "CARD_RISKPFL_ID", value: "CARD_RISKPFL_ID" },
        { text: "CARD_VELORISKPFL_ID", value: "CARD_VELORISKPFL_ID" },
        { text: "CARD_PLASTIC_FACE_DESIGN", value: "CARD_PLASTIC_FACE_DESIGN" },
        { text: "CARD_LAST_AUTH_CITY_ID", value: "CARD_LAST_AUTH_CITY_ID" },
        {
          text: "CARD_LAST_AUTH_COUNTRY_ID",
          value: "CARD_LAST_AUTH_COUNTRY_ID",
        },
        { text: "CARD_LAST_AUTH_TIMESTAMP", value: "CARD_LAST_AUTH_TIMESTAMP" },
        { text: "CARD_APP_NO", value: "CARD_APP_NO" },
        { text: "CARD_APP_DATE", value: "CARD_APP_DATE" },
        { text: "CARD_ANNIVERSARY_DATE", value: "CARD_ANNIVERSARY_DATE" },
        { text: "CARD_EMBOSSED_DATE", value: "CARD_EMBOSSED_DATE" },
        { text: "CARD_ACTIVATE_DATE", value: "CARD_ACTIVATE_DATE" },
        { text: "CARD_FIRST_ACTIVATE_DATE", value: "CARD_FIRST_ACTIVATE_DATE" },
        { text: "CARD_PLASTIC_UPDATED_BY", value: "CARD_PLASTIC_UPDATED_BY" },
        { text: "CARD_ISSUED_BY", value: "CARD_ISSUED_BY" },
        { text: "CRDPLAN_PRODUCT_NAME", value: "CRDPLAN_PRODUCT_NAME" },
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
          .post("http://10.0.22.236:9889/api/post/postgetcardnoinfo", {
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

    Download_PDF() {
      var source = this.$refs["myTable"];
      let rows = [];
      let columnHeader = [
        "CARD_NO",
        "CARD_EMBOSSED_NAME",
        "CARD_TYPE",
        "CARD_CRDACCT_NO",
        "CARD_CUST_ID",
        "ADDRESS_LINE1",
        "CARD_BS_IND",
        "CARD_EXPIRY_CCYYMM",
        "CARD_PLASTIC_CODE",
        "CARD_NEWRPL_IND",
      ];
      let pdfName = "generated report";
      source.items.forEach((element) => {
        var temp = [
          element.CARD_NO,
          element.CARD_EMBOSSED_NAME,
          element.CARD_TYPE,
          element.CARD_CRDACCT_NO,
          element.CARD_CUST_ID,
          element.ADDRESS_LINE1,
          element.CARD_BS_IND,
          element.CARD_EXPIRY_CCYYMM,
          element.CARD_PLASTIC_CODE,
          element.CARD_NEWRPL_IND,
        ];
        rows.push(temp);
      });
      var doc = new jsPDF();
      doc.autoTable(columnHeader, rows, { startY: 10 });
      doc.save(pdfName + ".pdf");
    },
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
