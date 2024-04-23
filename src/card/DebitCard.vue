<template>
  <v-card class="MobileDbaView" style="font-family: Saysettha OT">
    <!-- <v-card-title
      style="
        font-family: phetsarath OT;
        background-color: #0a6ebd;
        color: white;
      "
    >
      <v-icon style="color: chocolate">mdi-database</v-icon>ຖານຂໍ້ມູນຂອງ
      ATM</v-card-title
    > -->
    <!-- <v-divider></v-divider> -->
    <v-card>
      <v-card-title>
        <!-- <v-spacer></v-spacer> -->
        <!-- <v-btn
          color="red"
          outlined
          text
          style="
            font-size: 12px;
            height: 30px;
            width: 130px;
            font-family: phetsarath OT;
          "
          @click="createPDF()"
          >Export as PDF<i class="mdi mdi-export-variant" aria-hidden="true"></i
        ></v-btn> -->
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
        style="background-color: white; color: blue; font-family: phetsarath OT; color: #068fff"
        :search="search"
        ref="myTable"
       
        :headers="headers"
        :items="getdata"
        :items-per-page="5"
        class="elevation-1"
        :loading="isLoading"
      >
      <template #[`item.PERCENT_USED`]="{ item }" >
        <v-chip-group :color="getColorInfo(item.PERCENT_USED)">
          {{ item.PERCENT_USED }}
        </v-chip-group>
      </template>
      </v-data-table>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import axios from "axios";
import exportFromJSON from "export-from-json";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
  name: "MobileDbaView",
  data() {
    return {
      search: "",
      isLoading: false,
      headers: [
        { text: "CARD NO", value: "CARDNO", width: 130 },
        { text: "CUSTOMER NAME", value: "CUS_NAME", width: 170 },
        { text: "CARD TYPE", value: "CARD_TYPE", width: 120 },
     
        { text: "ACCOUNT NUMBER", value: "ACC", width: 130 },
        { text: "STATUS CODE", value: "CODE1", width: 160 },
        { text: "STATUS RESPONSE", value: "CODE2", width: 160 },
        { text: "CREATE DATE", value: "CREATE_DATE", width: 160 },
       
      ],
      getdata: [],
    };
  },
  mounted() {
    this.isLoading = "red";
    axios
      .get("http://10.0.22.236:9889/api/get/getdebitcard_no")
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
      if (PERCENT_USED >= "80.00%") return "red"
      else 
      return "#068fff"
    },

    onButtonClick(item) {
      console.log("click on " + item.no);
    },
    Download() {
      const data = this.getdata;
      const fileName = "Generate_report";
      const exportType = exportFromJSON.types.xls;
      exportFromJSON({ data, fileName, exportType });
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
