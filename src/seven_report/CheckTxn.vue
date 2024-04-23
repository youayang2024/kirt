<template>
  <v-card class="MobileDbaView" style="font-family: Saysettha OT">
    <v-toolbar
      style="
        background-image: url('https://www.shutterstock.com/image-photo/communication-technology-internet-business-global-260nw-1421446100.jpg');

        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;

        width: auto;
        height: auto;

        /* Set up positioning */
        position: fixed;
        top: 0;
        left: 0;
        color: white;
      "
    >
      <img src="../assets/new-ldb.png" height="80" />
      <v-spacer></v-spacer>

      <v-spacer></v-spacer>
      <Label style="font-family: phetsarath OT">Development by ATM Team</Label>
    </v-toolbar>
    <div class="text-center">
      <v-alert
        dense
        type=""
        style="
          font-family: phetsarath OT;
          color: white;
          background-color: #0b60b0;
        "
        >Check detail of transactions</v-alert
      >
    </div>
    <v-card class="scrollmenu">
      <v-card-title style="">
        <v-text-field
          v-model="cardnumber"
          prepend-icon="mdi-credit-card"
          type="number"
          label="Card number"
          style="width: 200px"
          @keyup.enter="searchinfo()"
          clearable
        />

        <v-spacer></v-spacer>
        <v-text-field
          v-model="acc"
          type="number"
          prepend-icon="-moz-background-size"
          label="Account number"
          style="width: 200px"
          clearable
          @keyup.enter="searchinfo()"
        />
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="rrn"
          type="number"
          prepend-icon="-moz-background-size"
          label="RRN"
          style="width: 200px"
          clearable
          @keyup.enter="searchinfo()"
        />
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          outlined
          @click="searchinfo()"
          style="font-size: 12px; height: 30px; width: 50px"
          @keyup.enter="searchinfo()"
          >Enter</v-btn
        >
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
        :items-per-page="20"
        class="elevation-1"
        :loading="isLoading"
      >
        <template #[`item.RES_CODE`]="{ item }">
          <v-chip-group :color="getColorInfo(item.RES_CODE)">
            {{ item.RES_CODE }}
          </v-chip-group>
        </template>

        <template #[`item.CARD_NO`]="{ item }">
          <div>
           
            <a
              value="item.CARD_NO"
              name="card"
              target="_blank"
              style="color: #068fff"
              v-on:click="onclick(item.CARD_NO)"
              >{{ item.CARD_NO }}</a
            >
          </div>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="this.detailcard" max-width="auto">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="success"> Card Info </v-alert>
        <v-data-table
          style="
            background-color: white;
            color: white;
            font-family: phetsarath OT;
            color: blue;
          "
          ref="myTable"
          :headers="headerscardinfo"
          :items="getdataDeatil"
          :items-per-page="20"
          class="elevation-1"
          :loading="isLoading"
        />

        <v-card-actions>
          <v-btn color="primary" block @click="detailcard = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
        <!-- dialog data is null -->
        <v-dialog v-model="this.datanotfound" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="warning">
          ບໍ່ພົບທຸລະກໍາ
        </v-alert>

        <v-card-text class="text-center">
          <div class="text-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/e/eb/Blinking_warning.gif"
              height="80"
              width="100"
            />
          </div>
          ກະລຸນາລອງອີກຄັ້ງ
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue" block text @click="datanotfound = false"
            >ປິດ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script lang="ts">
import axios from "axios";
import exportFromJSON from "export-from-json";
import "jspdf-autotable";
export default {
  name: "CheckTxn",
  data() {
    return {
      counter: 0,
      rrn: "",
      card: "",
      cardnumber: "",
      acc: "",
      isLoading: false,
      detailcard: false,
      datanotfound: false,
      headers: [
        { text: "CARD NO:", value: "CARD_NO" },
        { text: "CUST ID:", value: "CUST_ID" },
        { text: "TXN TYPE ID:", value: "TXNTYPE_ID" },
        { text: "APPROVED AMT:", value: "APPROVED_AMT" },
        { text: "RRN:", value: "RRN" },
        { text: "REQ DATE:", value: "REQ_DATE" },
        { text: "CARD HOLDER NAME:", value: "CARDHOLDER_NAME" },
        { text: "RES CODE:", value: "RES_CODE" },
        { text: "REFERRAL CODE:", value: "REFERRAL_CODE" },

        { text: "TERMINAL ID:", value: "TERMINAL_ID" },
        { text: "CURRENCY CODE:", value: "CURRENCY_CODE" },
        { text: "SOURCE:", value: "SOURCE" },
        { text: "DEST:", value: "DEST" },
        { text: "PROCESSED BY:", value: "PROCESSEDBY" },
        { text: "CRDACCT NO:", value: "CRDACCT_NO" },
        { text: "CRDACCT_NO TO:", value: "CRDACCT_NO_TO" },
        { text: "CARD_NO TO:", value: "CARD_NO_TO" },
      ],
      headerscardinfo: [
        { text: "CUST ID:", value: "CARD_BASIC_CUST_ID" },
        { text: "CARD NO:", value: "CARD_NO" },
        { text: "TYPE:", value: "CARD_TYPE" },
        { text: "B/S:", value: "CARD_BS_IND" },
        { text: "EMBOSSED NAME:", value: "CARD_EMBOSSED_NAME" },
        { text: "PSts:", value: "CARD_PLASTIC_CODE" },
        { text: "EXPIRY DATE:", value: "CARD_EXPIRY_CCYYMM" },
        { text: "ACCOUNT NO:", value: "CARD_CRDACCT_NO" },
      ],
      getdata: [],
      getdataDeatil: [],
    };
  },
  mounted() {
    // this.isLoading = "red";
    // axios
    //   .get("http://10.0.22.236:9889/api/get/getchecktransaction")
    //   .then(({ data }) => {
    //     this.getdata = data;
    //     this.isLoading = false;
    //   })
    //   .catch(function (error) {
    //     if (error.response.data.message == "TokenExpiredError") {
    //       localStorage.removeItem("token");
    //       this.$router.push("/LoginPage");
    //     } else {
    //       console.log(error);
    //     }
    //   });
  },
  methods: {
    // showdetailcard() {
    //   if (this.getdataDeatil.length > 0) {
    //     this.detailcard = true;
    //   }
    // },
    getColorInfo(RES_CODE) {
      if (RES_CODE != "00") return "red";
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

    funcao: function () {
      alert(" Comming soon!" + this.CARD_NO);
    },

    searchinfo() {
      this.isLoading = "red";
      axios
        .post("http://10.0.22.236:9889/api/post/checktransaction", {
          cardnumber: this.cardnumber,
          acc: this.acc,
          rrn: this.rrn,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data.data.length - 1 == -1) {
           
            this.datanotfound = true;
            this.isLoading = false;
            console.log(response);
            return;
          } else {
            this.isLoading = false;
            this.getdata = response.data.data;
          }
        });
    },

    onclick: function onclick(ev) {
      const cardno = ev;
      alert(cardno);
      axios
        .post("http://10.0.22.236:9889/api/post/post_getCheckCZcardDetail", {
          cardno: cardno,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })

        .then((response) => {
          if (response.data.status == "success") {
            //
            this.getdataDeatil = response.data.data;

            if (this.getdataDeatil.length > 0) {
              this.detailcard = true;
            }
          } else {
            console.log(response);
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
