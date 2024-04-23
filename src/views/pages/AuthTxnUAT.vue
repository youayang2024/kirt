<template>
  <v-card class="MobileDbaView" style="font-family: Saysettha OT">
    <v-card-title
      style="
        font-family: phetsarath OT;
        background-color: #0a6ebd;
        color: white;
      "
    >
      <v-icon style="color: chocolate">mdi-</v-icon>ທຸລະກໍາ AUTHTXN ຜ່ານ
      UAT</v-card-title
    >
    <!-- <v-divider></v-divider> -->
    <v-card>
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
          color: #068fff;
        "
        :search="search"
        ref="myTable"
        :headers="headers"
        :items="getdata"
        :items-per-page="20"
        class="elevation-1"
        :loading="isLoading"
      >
        <template #[`item.RESPONSE_CODE`]="{ item }">
          <v-chip-group :color="getColorInfo(item.RESPONSE_CODE)">
            {{ item.RESPONSE_CODE }}
          </v-chip-group>
        </template>
        <!-- <template #[`item.CARD_NO`]="{ item }">
          <v-chip-group :color="getColorInfo(item.CARD_NO)">
            {{ item.CARD_NO }}
          </v-chip-group>
        </template> -->
      </v-data-table>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import axios from "axios";
import exportFromJSON from "export-from-json";
import "jspdf-autotable";

export default {
  name: "MobileDbaView",
  data() {
    return {
      search: "",
      isLoading: false,
      headers: [
        { text: "CARD_NO", value: "CARD_NO", width: 130 },
        { text: "TXNTYPE_ID", value: "TXNTYPE_ID", width: 100 },

        { text: "APPROVED_AMT", value: "APPROVED_AMT", width: 120 },
        { text: "REQUEST_DATE", value: "REQUEST_DATE", width: 130 },
        { text: "RES_CODE", value: "RESPONSE_CODE" },
        { text: "RRN", value: "RRN" },
        { text: "TXN_ENTRY_MODE", value: "TXN_ENTRY_MODE", width: 160 },
        { text: "AUTHTXN_DEST", value: "AUTHTXN_DEST", width: 160 },
        { text: "SOURCE", value: "AUTHTXN_SOURCE" },
        { text: "MOD_DATE", value: "MOD_DATE", width: 180 },
      ],
      getdata: [],
    };
  },
  mounted() {
    this.isLoading = "red";
    axios
      .get("http://10.0.22.236:9889/api/get/getauthTxnUAT")
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
    getColorInfo(RESPONSE_CODE) {
      if (RESPONSE_CODE != "00") return "red";
      else return "#068fff";
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
