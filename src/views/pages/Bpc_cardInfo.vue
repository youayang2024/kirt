<template>
  <v-card dense class="MobileDbaView" style="font-family: Saysettha OT">
    <v-card-title
    dense
      style="
        font-family: phetsarath OT;
        background-color: #0a6ebd;
        color: white;
      "
    >
      VISA Credit Card
      Info</v-card-title
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
          @click="exportExcel()"
          style="
            font-size: 12px;
            height: 30px;
            width: 180px;
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
          @click="getbpccard()"
          style="
            font-size: 12px;
            height: 30px;
            width: 150px;
            font-family: phetsarath OT;
          "
          >BPC CARD INFO
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
import { saveExcel } from "@progress/kendo-vue-excel-export";
import "jspdf-autotable";
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export default {
  name: "Bpc_cardInfo",

  data() {
    return {
      updatesuccess: false,
      search: "",
      isLoading: false,
      headers: [
        { text: "CUSTOMERID", value: "CUSTOMERID" },
        { text: "EMBOSSEDNAME", value: "EMBOSSEDNAME" },
        { text: "CARDNUMBER", value: "CARDNUMBER" },
        { text: "ACCOUNT", value: "ACCOUNT" },
        { text: "BALANCE", value: "BALANCE" },
        { text: "EXPIRYDATE", value: "EXPIRYDATE" },
        { text: "CARDID", value: "CARDID" },
        { text: "CARDCREATIONDATE", value: "CARDCREATIONDATE" },
        { text: "PHONENUMBER", value: "PHONENUMBER" },
        { text: "CARDTYPENAME", value: "CARDTYPENAME" },
        { text: "HOTCARDSTATUSDESCRIPTION", value: "HOTCARDSTATUSDESCRIPTION" },
        { text: "CARDCONTRACTID", value: "CARDCONTRACTID" },
        { text: "CURRENCY", value: "CURRENCY" },
        { text: "CREDITLIMIT", value: "CREDITLIMIT" },
      ],
      getdata: [],
      headerCellConfig: { background: '#3468C0',textAlign: "center" },
    };
  },
  mounted() {
    this.isLoading = "red";
    axios
      .get("http://10.0.22.236:9889/api/get/getbpcCardInfo")
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


    //

    getbpccard() {
      axios
        .post("http://10.0.10.37:9889/api/post/postgetcarddatainfo")
        .then((response) => {
          if (response.data.status == "success") {
            //

            this.updatesuccess = true;
            this.isLoading = "red";
            axios
              .get("http://10.0.22.236:9889/api/get/getbpcCardInfo")
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
        .get("http://10.0.22.236:9889/api/get/getbpcCardInfo")
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
    // export as excel file
    exportExcel() {
      saveExcel({
        data: this.getdata,
        fileName: "Generate_report.xlsx",
        columns: [
        
          {
            title: "VISA Credit Card Info",
            headerCellOptions: this.headerCellConfig,
            children: [
              { field: "CUSTOMERID", title: "CUSTOMER ID" },
              { field: "EMBOSSEDNAME", title: "EMBOSSED NAME" },
              { field: "CARDNUMBER", title: "CARD NUMBER" },
              { field: "ACCOUNT", title: "ACCOUNT NUMBER" },
              { field: "BALANCE", title: "BALANCE" },
              { field: "EXPIRYDATE", title: "EXPIRYDATE" },
              { field: "CARDID", title: "CARDID" },
              { field: "CARDCREATIONDATE", title: "CARDCREATIONDATE" },
              { field: "PHONENUMBER", title: "PHONENUMBER" },
              { field: "CARDTYPENAME", title: "CARDTYPENAME" },
              { field: "HOTCARDSTATUSDESCRIPTION", title: "HOTCARDSTATUSDESCRIPTION" },
              { field: "CARDCONTRACTID", title: "CARDCONTRACTID" },
              { field: "CURRENCY", title: "CURRENCY" },
              { field: "CREDITLIMIT", title: "CREDITLIMIT" },
            ],
          },
        ],
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
