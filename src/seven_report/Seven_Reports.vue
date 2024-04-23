<template>
  <v-card >
    <v-toolbar
    dense
      style="
        background-image: url('https://www.shutterstock.com/image-photo/communication-technology-internet-business-global-260nw-1421446100.jpg');
      
      -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
   /* Set rules to fill background */
   min-height: 100%;
  min-width: 1024px;
	
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
      <img src="../assets/new-ldb.png" height="60" />
      <v-spacer></v-spacer>

      <v-spacer></v-spacer>
      <Label style="font-family: phetsarath OT">Development by switching</Label>
    </v-toolbar>
    <div class="text-center">
      <v-alert
        dense
        text
        type=""
        style="font-family: phetsarath OT; color: blue"
        >Seven Reports</v-alert
      >
    </div>

    <v-card style="font-family: phetsarath OT; color: blue">
      <v-tabs v-model="tab" style="font-size: 5px">
        &nbsp;&nbsp;
        <v-tab href="#TRUST_LINK_ALL_ACCOUNT">
          <v-icon style="color: #e7b10a">mdi-credit-card</v-icon>&nbsp;&nbsp;
          TRUST LINK ALL ACCOUNT
        </v-tab>

        <v-tab href="#TRUST_LINK_ACCOUNT">
          <v-icon style="color: #e7b10a">mdi-credit-card</v-icon>&nbsp;&nbsp;
          TRUST LINK ACCOUNT
        </v-tab>
        <v-tab href="#TRUSTTXN">
          <v-icon style="color: #e7b10a">mdi-credit-card</v-icon>&nbsp;&nbsp;
          TRUST TXN
        </v-tab>
        <v-tab href="#CARD_ACTIVE">
          <v-icon style="color: #e7b10a">mdi-credit-card</v-icon>&nbsp;&nbsp;
          CARD ACTIVE
        </v-tab>
        <v-tab href="#QR_MERCHANT">
          <v-icon style="color: #e7b10a">mdi-credit-card</v-icon>&nbsp;&nbsp; QR
          MERCHANT
        </v-tab>
        <v-tab href="#QR_SCAN_TXN_ALL_DETAILS">
          <v-icon style="color: #e7b10a">mdi-credit-card</v-icon>&nbsp;&nbsp; QR
          SCAN TXN ALL DETAILS
        </v-tab>
        <v-tab href="#CROSSBANK_SCAN_LDB_QR">
          <v-icon style="color: #e7b10a">mdi-credit-card</v-icon>&nbsp;&nbsp;
          CROSSBANK SCAN LDB QR
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <!-- debit card -->
        <v-tab-item :key="1" value="TRUST_LINK_ALL_ACCOUNT">
          <TRUST_LINK_ALL_ACCOUNT />
        </v-tab-item>

        <!-- repare card -->
        <v-tab-item :key="2" value="TRUST_LINK_ACCOUNT">
          <v-card flat>
            <TRUST_LINK_ACCOUNT />
          </v-card>
        </v-tab-item>
        <!--  -->
        <!--  -->
        <v-tab-item :key="3" value="TRUSTTXN">
          <v-card flat>
            <TRUST_TXN />
          </v-card>
        </v-tab-item>
        <!--  -->
        <!--  -->
        <v-tab-item :key="4" value="CARD_ACTIVE">
          <v-card flat>
            <CARD_ACTIVE />
          </v-card>
        </v-tab-item>
        <!--  -->
        <v-tab-item :key="5" value="QR_MERCHANT">
          <v-card flat>
            <QR_MERCHANT />
          </v-card>
        </v-tab-item>
        <!--  -->

        <v-tab-item :key="6" value="QR_SCAN_TXN_ALL_DETAILS">
          <v-card flat>
            <QR_SCAN_TXN_ALL_DETAILS />
          </v-card>
        </v-tab-item>
        <v-tab-item :key="7" value="CROSSBANK_SCAN_LDB_QR">
          <v-card flat>
            <CROSSBANK_SCAN_LDB_QR />
          </v-card>
        </v-tab-item>
        <!--  -->
      </v-tabs-items>
    </v-card>
  </v-card>
</template>
<script>
import TRUST_LINK_ACCOUNT from "./TRUST_LINK_ACCOUNT.vue";
import TRUST_LINK_ALL_ACCOUNT from "../seven_report/TRUST_LINK_ALL_ACCOUNT";
import TRUST_TXN from "./TRUST_TXN.vue";
import CARD_ACTIVE from "./CARD_ACTIVE.vue";
import QR_MERCHANT from "./QR_MERCHANT.vue";
import QR_SCAN_TXN_ALL_DETAILS from "./QR_SCAN_TXN_ALL_DETAILS.vue";
import CROSSBANK_SCAN_LDB_QR from "./CROSSBANK_SCAN_LDB_QR.vue";
export default {
  components: {
    TRUST_LINK_ACCOUNT,
    TRUST_LINK_ALL_ACCOUNT,
    TRUST_TXN,
    CARD_ACTIVE,
    QR_MERCHANT,
    QR_SCAN_TXN_ALL_DETAILS,
    CROSSBANK_SCAN_LDB_QR,
  },
  data() {
    return {
      tab: "",
    };
  },
};
</script>
