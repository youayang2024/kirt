<template>
  <v-card class="MobileDbaView" style="font-family: Saysettha OT">
  
    <v-card class="scrollmenu">
      <v-card-title>
        &nbsp;
        <v-text-field
          v-model="branch_id"
          prepend-icon="mdi-chevron-right"
          label="Please Input Branch ID"
          style="width: 100px; color: blue"
          clearable
        >
        </v-text-field>
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

        <v-spacer></v-spacer>
      </v-card-title>

      <v-data-table
        v-if="isAuthorized"
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
      branch_id: "",
      isLoading: false,
      isLoadingPage: false,
      headers: [
        { text: "BRANCH_NAME", value: "BRANCH_NAME" },
        { text: "TOTAL_CARD_ACTIVE", value: "TOTAL_CARD_ACTIVE" },
        { text: "TOTAL_CARD_UNACTIVE", value: "TOTAL_CARD_UNACTIVE" },
        { text: "TOTAL_CARD_CLOSED", value: "TOTAL_CARD_CLOSED" },
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
              "​ຂໍ້​ມູນລາຍ​ລະ​ອຽດຂອງ​ບັດ Active,Unactive and Closed " +
              ", ວັນທີ " +
              formattedDate,
            headerCellOptions: this.headerCellConfig,
            children: [
              { field: "BRANCH_NAME", title: "BRANCH_NAME" },
              { field: "TOTAL_CARD_ACTIVE", title: "TOTAL_CARD_ACTIVE" },
              { field: "TOTAL_CARD_UNACTIVE", title: "TOTAL_CARD_UNACTIVE" },
              { field: "TOTAL_CARD_CLOSED", title: "TOTAL_CARD_CLOSED" },
            ],
          },
        ],
      });
    },
    Search_info() {
      if (this.branch_id != "" && this.branch_id != null) {
        this.isLoading = "red";
        this.isLoadingPage = true;
        axios
          .post("api/post/post_CheckcardStatus", {
            branch_id: this.branch_id,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.data.status == "success") {
              this.isAuthorized = true;

              this.getdata = response.data.data;
              this.isLoading = false;
              this.isLoadingPage = false;
              console.log(response.data);
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
        this.isLoading = "red";
        this.isLoadingPage = true;
        axios
          .get("api/get/get_cardstatus")
          .then((response) => {
            this.isAuthorized = true;
            this.getdata = response.data;
            this.isLoading = false;
            this.isLoadingPage = false;
          })
          .catch(function (error) {
            if (error.response.data.message == "TokenExpiredError") {
              localStorage.removeItem("token");
              this.$router.push("/LoginPage");
            } else {
              console.log(error);
            }
          });
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
