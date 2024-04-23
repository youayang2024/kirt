<template>
  <v-card class="MobileDbaView" style="font-family: Saysettha OT">
    <v-toolbar
      dense
      style="
        background-image: url('https://t3.ftcdn.net/jpg/05/14/95/12/360_F_514951224_2dxMLbIw5qNRdPGD003chpbVcxWtcp7K.jpg');

        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        /* Set rules to fill background */
        min-height: 80%;
        min-width: auto;

        /* Set up proportionate scaling */
        width: 100%;
        height: auto;

        /* Set up positioning */
        position: fixed;
        top: 0;
        left: 0;
        color: white;
      "
    >
      <!-- <v-spacer></v-spacer> -->
      <img src="../assets/visa1.png" height="45" style="color: white" />
      <img src="../assets/MC.png" height="35" style="color: white" />

      <v-spacer></v-spacer>
      <!-- <Label style="font-family: phetsarath OT">Development by switching</Label> -->
    </v-toolbar>
    <div class="text-center">
      <v-alert
        dense
        type=""
        style="
          font-family: phetsarath OT;
          color: white;
          background-color: #2874a6;
        "
        >ກວດສອບທຸລະກຳບັດ VISA</v-alert
      >
    </div>
    <v-card class="scrollmenu">
      <v-card-title>
        &nbsp;
        <v-text-field
          v-model="card_no"
          prepend-icon="mdi-chevron-right"
          label="ເລກບັດ"
          type="number"
          style="width: 100px; color: blue"
          clearable
        >
        </v-text-field>
        &nbsp; &nbsp;
        <v-text-field
          v-model="startDate"
          :format="YYYYMMDD"
          type="date"
          label="ເລີ່ມວັນທີ່"
          style="width: 100px"
          :rules="inputRules"
          clearable
        >
        </v-text-field>
        &nbsp; &nbsp;
        <v-text-field
          v-model="endDate"
          type="date"
          label="ຫາວັນທີ່"
          style="width: 100px"
          :rules="inputRules"
          clearable
        >
        </v-text-field>
        &nbsp; &nbsp;
        
 <v-btn color="primary" @click="Search_info()"
              >Search</v-btn
            >
        &nbsp;

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
        :items-per-page="5"
        class="elevation-1"
        :loading="isLoading"
      >
        <template #[`item.internalResponseCode`]="{ item }">
          <v-chip-group :color="getColorInfoStatus(item.internalResponseCode)">
            {{
              item.internalResponseCode +
              " ~ " +
              item.internalResponseCodeDescription
            }}
          </v-chip-group>
        </template>
        <template #[`item.transactionType`]="{ item }">
          {{ item.transactionType + " ~ " + item.transactionDescription }}
        </template>
        <template #[`item.amount`]="{ item }">
          {{ item.amount / 100 }}
        </template>
        <template #[`item.amountInAccountCurrency`]="{ item }">
          {{ item.amountInAccountCurrency / 100 }}
        </template>
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
    <v-dialog v-model="this.validate_card" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="error"> ກະລຸນາປ້ອນເລກບັດກ່ອນ! </v-alert>
        <v-card-text class="text-center">
          <div class="text-center">
            <img
              src="https://cdn.dribbble.com/users/251873/screenshots/9388228/error-img.gif"
              height="100"
              width="137"
            />
          </div>
          <br /><span> ໃຫ້ແນ່ໃຈວ່າປ້ອນເລກບັດແລ້ວບໍ? </span>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" block text @click="validate_card = false"
            >ປິດ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="this.loading_icon" max-width="200px">
      <v-card style="font-family: phetsarath OT">
        <v-alert> </v-alert>
        <v-card-text class="text-center">
          <div class="text-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
              height="100"
              width="150"
            />
          </div>
          <br /><span> ກະລຸນາລໍຖ້າ... </span>
        </v-card-text>
      </v-card>
    </v-dialog>
    <FooterCom />
  </v-card>
</template>

<script lang="ts">
import axios from "axios";
import "jspdf-autotable";
import moment from "moment";
import "jspdf-autotable";
import FooterCom from "../components/FooterCom.vue";
export default {
  name: "CheckVisaTransaction",
  components: {
      FooterCom,
    },
   data() {
    return {
      inputRules: [(v) => v.length >= 1 || "ກະລຸນາປ້ອນວັນທີ່ກ່ອນ"],
      card_no: "",
      startDate: "",
      endDate: "",
      validate_date: false,
      validate_card: false,
      date_now: moment(new Date()).format("YYYY-MM-DD"),
      isLoading: false,
      isLoadingPage: false,
      headers: [
        { text: "Authorization Date", value: "authorizationDate" },
        { text: "Transaction Type", value: "transactionType" },
        // { text: "Transaction Description", value: "transactionDescription" },

        { text: "Transaction Amount", value: "amount" },
        { text: "Utrnno", value: "utrnno" },
        { text: "Internal Response Code", value: "internalResponseCode" },
        // {
        //   text: "Internal Response Code Description",
        //   value: "internalResponseCodeDescription",
        // },
        { text: "Operation Type", value: "operationType" },
        { text: "Account Number", value: "accountNumber" },
        { text: "Operation Direction", value: "operationDirection" },

        { text: "Currency", value: "currency" },
        {
          text: "Amount In Account Currency",
          value: "amountInAccountCurrency",
        },

        { text: "Fee Direction", value: "feeDirection" },
        { text: "Acquire Fee Amount", value: "acquireFeeAmount" },
        { text: "Fe Issuer Fee Amount", value: "feIssuerFeeAmount" },
        { text: "Mcc", value: "mcc" },
        { text: "Merchant Country", value: "merchantCountry" },
        { text: "Merchant City", value: "merchantCity" },
        { text: "Merchant Name", value: "merchantName" },
        { text: "Merchant Id", value: "merchantId" },
        { text: "Terminal Address", value: "terminalAddress" },
        { text: "POS Data Code", value: "posDataCode" },
        { text: "Authorization Id Response", value: "authorizationIdResponse" },
        { text: "Reversal Date", value: "reversalDate" },
        { text: "Reversal", value: "reversal" },
        { text: "Reversal Allowed", value: "reversalAllowed" },
        { text: "Request Amount", value: "requestAmount" },
        { text: "Terminal Id", value: "terminalId" },

        { text: "System Trace Audit Number", value: "systemTraceAuditNumber" },
        { text: "Issuer Institution Id", value: "issuerInstitutionId" },
        { text: "Acquirer Institution Id", value: "acquirerInstitutionId" },
      ],

      getdata: [],

      headerCellConfig: { background: "#3468C0", textAlign: "center" },
      isAuthorized: false,

      loading_icon: false,
    };
  },
  mounted() {
    if (this.startDate == "" && this.endDate == "") {
      const currect_date = moment(new Date()).format("YYYY-MM-DD");

      this.startDate = currect_date;
      this.endDate = currect_date;
    }
  },
  methods: {
    getColorInfoStatus(internalResponseCode) {
      if (internalResponseCode != -1) return "red";
      else return "green";
    },
    Search_info() {
      if (this.card_no != "" && this.card_no != null) {
        if (this.startDate !== "" && this.endDate !== "") {
          this.isLoading = "red";
          this.loading_icon = true;
          axios
            .post("http://10.0.10.37:9889/api/post/post_getTransactions", {
              CardNo: this.card_no,
              startDate: this.startDate,
              endDate: this.endDate,
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
              const dataresponse = response.data;
              this.getdata = dataresponse;
              this.loading_icon = false;
              this.isLoading = false;
              this.isAuthorized = true;
              console.log(response.data[0]);
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
          this.validate_date = true;
        }
      } else {
        this.validate_card = true;
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
