<template>
  <v-card class="CustomerList" style="font-family: phetsarath OT">
    <v-alert
      dense
      style="font-family: phetsarath OT; background-color: cornflowerblue; color: white"
      class="text-center"
    >Stop & Start ເຊີບເວີ PRODUCTION</v-alert>
    <!-- deletedata -->

    <v-card style="font-family: phetsarath OT" class="scrollmenu">
      <!-- <v-card-title>
        &nbsp; &nbsp; &nbsp;
        <v-text-field
          style="color: blue"
          v-model="search"
          append-icon="search"
          label="Search Cause"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title> -->

      <v-data-table
        :headers="headers"
        :items="getdata"
        :search="search"
        :items-per-page="10"
        class="elevation-1"
      >
        <!-- action button -->
        <template #[`item.actions`]>
          <div>
            &nbsp;
            <v-btn color="green" @click="startstop('CommandStartUp')"
              >Start</v-btn
            >
            &nbsp;
            <v-btn color="red" @click="startstop('CommandShutdown')"
              >Stop</v-btn
            >
          </div>
        </template>

        <template #[`item.checkbox`]="{ item }">
          <div>
            <input type="radio" :value="item" v-model="selectedItem" />
          </div>
        </template>

        <template #[`item.STATUS_STARTSTOP`]="{ item }">
          <img :src="getColorInfo(item.STATUS_STARTSTOP)" width="30" />

          {{ item.STATUS }}
        </template>
      </v-data-table>
    </v-card>
    <!--  -->
    <!-- {{ this.selectedItem }} -->
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
    <v-dialog v-model="this.dataisnull" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="error">
          ກະລຸນາເລືອກເຊີບເວີຕ້ອງການ Start ຫຼື Stop
        </v-alert>
        <div class="text-center">
          <img
            src="https://cdn.dribbble.com/users/251873/screenshots/9388228/error-img.gif"
            height="100"
            width="137"
          />
        </div>
        <v-card-text class="text-center">
          ກະລຸນາເລືອກໜຶ່ງເຊີບເວີທີ່ຕ້ອງການກ່ອນ.
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" block text @click="dataisnull = false"
            >ປິດ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="this.echeresult"
      max-width="500px"
      style="font-family: phetsarath OT"
    >
      <v-card>
        <v-alert dense text type="success" style="font-family: phetsarath OT">
        </v-alert>
        <div class="text-center">
          <img
            src="https://media.tenor.com/0AVbKGY_MxMAAAAM/check-mark-verified.gif"
            height="60"
            width="60"
          />
        </div>
        <v-card-text class="text-center" style="font-family: phetsarath OT">
          {{ this.getresponse }}
        </v-card-text>
        <v-card-actions style="font-family: phetsarath OT">
          <v-btn color="primary" text @click="echeresult = false">ປິດ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script lang="ts">
import axios from "axios";

export default {
  name: "StopStartServerprod",
  props: ["data"],
  data() {
    return {
      loading_icon: false,
      echeresult: false,
      dataisnull: false,
      token: localStorage.getItem("token"),
      role: localStorage.getItem("role"),
      selectedItem: [],
      search: "",

      headers: [
        { text: "", value: "checkbox" },

        { text: "HOST_NAME", value: "HOST_NAME" },
        { text: "HOST_IP", value: "HOST_IP" },
        { text: "STATUS", value: "STATUS_STARTSTOP" },

        { text: "DATE_STOSTR", value: "DATE_STOSTR" },
        { text: "MOD_USER", value: "MOD_USER" },
        { text: "MOD_HOST", value: "MOD_HOST" },
        { text: "Actions", value: "actions" },
      ],
      getdata: [],
      getresponse: "",

      checking_token: localStorage.getItem("token"),

      access: localStorage.getItem("user_id"),
      commandstartupSWITCH: "/cardzone/oneswitch/bin/./startSwitch",
      commandshutdownSWITCH: "/cardzone/oneswitch/bin/./stopSwitch",

      commandstartupATMC: "/cardzone/oneatmc/bin/./startAtmc",
      commandshutdownATMC: "/cardzone/oneatmc/bin/./stopAtmc",

      commandstartupCMS: "/cardzone/apache-tomcat-9.0.0.0.M15/bin/./startup.sh",
      commandshutdownCMS:
        "/cardzone/apache-tomcat-9.0.0.0.M15/bin/./shutdown.sh",

      commandstartupBATCH: "/cardzone/oneswitch_batch/bin/./startBatch",
      commandshutdownBATCH: "/cardzone/oneswitch_batch/bin/./stopBatch",

      // aq server

      commandstartupMobileGWCLIENT:
        "/cardzone/onemobilegw_client/bin/./startMobileGWClient",
      commandshutdownMobileGWCLIENT:
        "/cardzone/onemobilegw_client/bin/./stopMobileGWClient",

      commandstartupMobileGWMerchant:
        "/cardzone/onemobilegw_merchant/bin/./startMobileGWMerchant",
      commandshutdownMobileGWMerchant:
        "/cardzone/onemobilegw_merchant/bin/./stopMobileGWMerchant",

      commandstartupSWITCHAQ: "/cardzone/oneswitch/bin/./startAcqSwitch",
      commandshutdownSWITCHAQ: "/cardzone/oneswitch/bin/./stopAcqSwitch",

      commandstartupBatchAQ: "/cardzone/oneswitch_batch/bin/./startBatch",
      commandshutdownBatchAQ: "/cardzone/oneswitch_batch/bin/./stopBatch",

      commandstartupCMSAQ:
        "/cardzone/tomcat/apache-tomcat-8.5.45/bin/./startup.sh",
      commandshutdownCMSAQ:
        "/cardzone/tomcat/apache-tomcat-8.5.45/bin/./shutdown.sh",

      urlGreen: "https://media.giphy.com/media/w7jtVnXxMOq08/giphy.gif",
      urlred:
        "https://th.bing.com/th/id/R.7451b91f5127c275823e7b632ebcf864?rik=68LDrvYXLz2yiA&pid=ImgRaw&r=0",
    };
  },

  mounted() {
    this.freshgetdata();
  },

  methods: {
    getColorInfo(STATUS_STARTSTOP) {
      if (STATUS_STARTSTOP == "1") return this.urlGreen;
      else return this.urlred;
    },

    startstop(value) {
      if (
        value == "CommandStartUp" &&
        this.selectedItem.HOST_NAME == "SWITCH01"
      ) {
        this.loading_icon = true;
        axios
          .post("http://10.0.22.236:9889/api/checkServer/startServerProd", {
            host: this.selectedItem.HOST_IP,
            user_id: this.access,
            host_name: this.selectedItem.HOST_NAME,
            command: this.commandstartupSWITCH,
            password: this.selectedItem.PASS_HOST,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.getresponse = response.data;
            this.loading_icon = false;
            this.freshgetdata();
            this.echeresult = true;
            console.log(response);
          });
      } else if (
        value == "CommandShutdown" &&
        this.selectedItem.HOST_NAME == "SWITCH01"
      ) {
        this.loading_icon = true;
        axios
          .post("http://10.0.22.236:9889/api/checkServer/stopServerProd", {
            host: this.selectedItem.HOST_IP,
            user_id: this.access,
            host_name: this.selectedItem.HOST_NAME,
            command: this.commandshutdownSWITCH,
            password: this.selectedItem.PASS_HOST,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.getresponse = response.data;
            this.loading_icon = false;
            this.freshgetdata();
            this.echeresult = true;

            console.log(response);
          });
      } else if (
        value == "CommandStartUp" &&
        this.selectedItem.HOST_NAME == "SWITCH02"
      ) {
        this.loading_icon = true;
        axios
          .post("http://10.0.22.236:9889/api/checkServer/startServerProd", {
            host: this.selectedItem.HOST_IP,
            user_id: this.access,
            host_name: this.selectedItem.HOST_NAME,
            command: this.commandstartupSWITCH,
            password: this.selectedItem.PASS_HOST,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.getresponse = response.data;
            this.loading_icon = false;
            this.freshgetdata();
            this.echeresult = true;
            console.log(response);
          });
      } else if (
        value == "CommandShutdown" &&
        this.selectedItem.HOST_NAME == "SWITCH02"
      ) {
        this.loading_icon = true;
        axios
          .post("http://10.0.22.236:9889/api/checkServer/stopServerProd", {
            host: this.selectedItem.HOST_IP,
            user_id: this.access,
            host_name: this.selectedItem.HOST_NAME,
            command: this.commandshutdownSWITCH,
            password: this.selectedItem.PASS_HOST,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.getresponse = response.data;
            this.loading_icon = false;
            this.freshgetdata();
            this.echeresult = true;
            console.log(response);
          });
      } else if (
        value == "CommandStartUp" &&
        this.selectedItem.HOST_NAME == "ATMC01"
      ) {
        this.loading_icon = true;
        axios
          .post("http://10.0.22.236:9889/api/checkServer/startServerProd", {
            host: this.selectedItem.HOST_IP,
            user_id: this.access,
            host_name: this.selectedItem.HOST_NAME,
            command: this.commandstartupATMC,
            password: this.selectedItem.PASS_HOST,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.getresponse = response.data;
            this.loading_icon = false;
            this.freshgetdata();
            this.echeresult = true;
            console.log(response);
          });
      } else if (
        value == "CommandShutdown" &&
        this.selectedItem.HOST_NAME == "ATMC01"
      ) {
        this.loading_icon = true;
        axios
          .post("http://10.0.22.236:9889/api/checkServer/stopServerProd", {
            host: this.selectedItem.HOST_IP,
            user_id: this.access,
            host_name: this.selectedItem.HOST_NAME,
            command: this.commandshutdownATMC,
            password: this.selectedItem.PASS_HOST,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.getresponse = response.data;
            this.loading_icon = false;
            this.freshgetdata();
            this.echeresult = true;
            console.log(response);
          });
      } else if (
        value == "CommandStartUp" &&
        this.selectedItem.HOST_NAME == "ATMC02"
      ) {
        this.loading_icon = true;
        axios
          .post("http://10.0.22.236:9889/api/checkServer/startServerProd", {
            host: this.selectedItem.HOST_IP,
            user_id: this.access,
            host_name: this.selectedItem.HOST_NAME,
            command: this.commandstartupATMC,
            password: this.selectedItem.PASS_HOST,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.getresponse = response.data;
            this.loading_icon = false;
            this.freshgetdata();
            this.echeresult = true;
            console.log(response);
          });
      } else if (
        value == "CommandShutdown" &&
        this.selectedItem.HOST_NAME == "ATMC02"
      ) {
        this.loading_icon = true;
        axios
          .post("http://10.0.22.236:9889/api/checkServer/stopServerProd", {
            host: this.selectedItem.HOST_IP,
            user_id: this.access,
            host_name: this.selectedItem.HOST_NAME,
            command: this.commandshutdownATMC,
            password: this.selectedItem.PASS_HOST,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.getresponse = response.data;
            this.loading_icon = false;
            this.freshgetdata();
            this.echeresult = true;
            console.log(response);
          });
      } else if (
        value == "CommandStartUp" &&
        this.selectedItem.HOST_NAME == "CMS01"
      ) {
        this.loading_icon = true;
        axios
          .post("http://10.0.22.236:9889/api/checkServer/startServerProd", {
            host: this.selectedItem.HOST_IP,
            user_id: this.access,
            host_name: this.selectedItem.HOST_NAME,
            command: this.commandstartupCMS,
            password: this.selectedItem.PASS_HOST,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.getresponse = response.data;
            this.loading_icon = false;
            this.freshgetdata();
            this.echeresult = true;
            console.log(response);
          });
      } else if (
        value == "CommandShutdown" &&
        this.selectedItem.HOST_NAME == "CMS01"
      ) {
        this.loading_icon = true;
        axios
          .post("http://10.0.22.236:9889/api/checkServer/stopServerProd", {
            host: this.selectedItem.HOST_IP,
            user_id: this.access,
            host_name: this.selectedItem.HOST_NAME,
            command: this.commandshutdownCMS,
            password: this.selectedItem.PASS_HOST,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.getresponse = response.data;
            this.loading_icon = false;
            this.freshgetdata();
            this.echeresult = true;
            console.log(response);
          });
      } else if (
        value == "CommandStartUp" &&
        this.selectedItem.HOST_NAME == "CMS02"
      ) {
        this.loading_icon = true;
        axios
          .post("http://10.0.22.236:9889/api/checkServer/startServerProd", {
            host: this.selectedItem.HOST_IP,
            user_id: this.access,
            host_name: this.selectedItem.HOST_NAME,
            command: this.commandstartupCMS,
            password: this.selectedItem.PASS_HOST,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.getresponse = response.data;
            this.loading_icon = false;
            this.freshgetdata();
            this.echeresult = true;
            console.log(response);
          });
      } else if (
        value == "CommandShutdown" &&
        this.selectedItem.HOST_NAME == "CMS02"
      ) {
        this.loading_icon = true;
        axios
          .post("http://10.0.22.236:9889/api/checkServer/stopServerProd", {
            host: this.selectedItem.HOST_IP,
            user_id: this.access,
            host_name: this.selectedItem.HOST_NAME,
            command: this.commandshutdownCMS,
            password: this.selectedItem.PASS_HOST,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.getresponse = response.data;
            this.loading_icon = false;
            this.freshgetdata();
            this.echeresult = true;
            console.log(response);
          });
      } else if (
        value == "CommandStartUp" &&
        this.selectedItem.HOST_NAME == "BATCH01"
      ) {
        this.loading_icon = true;
        axios
          .post("http://10.0.22.236:9889/api/checkServer/startBatchProd", {
            host: this.selectedItem.HOST_IP,
            user_id: this.access,
            host_name: this.selectedItem.HOST_NAME,
            command: this.commandstartupBATCH,
            password: this.selectedItem.PASS_HOST,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.getresponse = response.data;
            this.loading_icon = false;
            this.freshgetdata();
            this.echeresult = true;
            console.log(response);
          });
      } else if (
        value == "CommandShutdown" &&
        this.selectedItem.HOST_NAME == "BATCH01"
      ) {
        this.loading_icon = true;
        axios
          .post("http://10.0.22.236:9889/api/checkServer/stopBatchProd", {
            host: this.selectedItem.HOST_IP,
            user_id: this.access,
            host_name: this.selectedItem.HOST_NAME,
            command: this.commandshutdownBATCH,
            password: this.selectedItem.PASS_HOST,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.getresponse = response.data;
            this.loading_icon = false;
            this.freshgetdata();
            this.echeresult = true;
            console.log(response);
          });
      } else if (
        value == "CommandStartUp" &&
        this.selectedItem.HOST_NAME == "BATCH02"
      ) {
        this.loading_icon = true;
        axios
          .post("http://10.0.22.236:9889/api/checkServer/startBatchProd", {
            host: this.selectedItem.HOST_IP,
            user_id: this.access,
            host_name: this.selectedItem.HOST_NAME,
            command: this.commandstartupBATCH,
            password: this.selectedItem.PASS_HOST,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.getresponse = response.data;
            this.loading_icon = false;
            this.freshgetdata();
            this.echeresult = true;
            console.log(response);
          });
      } else if (
        value == "CommandShutdown" &&
        this.selectedItem.HOST_NAME == "BATCH02"
      ) {
        this.loading_icon = true;
        axios
          .post("http://10.0.22.236:9889/api/checkServer/stopBatchProd", {
            host: this.selectedItem.HOST_IP,
            user_id: this.access,
            host_name: this.selectedItem.HOST_NAME,
            command: this.commandshutdownBATCH,
            password: this.selectedItem.PASS_HOST,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.getresponse = response.data;
            this.loading_icon = false;
            this.freshgetdata();
            this.echeresult = true;
            console.log(response);
          });
      } else if (
        value == "CommandStartUp" &&
        this.selectedItem.HOST_NAME == "MOBILE GW_CLIENT"
      ) {
        this.loading_icon = true;
        axios
          .post("http://10.0.22.236:9889/api/checkServer/startServerProd", {
            host: this.selectedItem.HOST_IP,
            user_id: this.access,
            host_name: this.selectedItem.HOST_NAME,
            command: this.commandstartupMobileGWCLIENT,
            password: this.selectedItem.PASS_HOST,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.getresponse = response.data;
            this.loading_icon = false;
            this.freshgetdata();
            this.echeresult = true;
            console.log(response);
          });
      } else if (
        value == "CommandShutdown" &&
        this.selectedItem.HOST_NAME == "MOBILE GW_CLIENT"
      ) {
        this.loading_icon = true;
        axios
          .post("http://10.0.22.236:9889/api/checkServer/stopServerProd", {
            host: this.selectedItem.HOST_IP,
            user_id: this.access,
            host_name: this.selectedItem.HOST_NAME,
            command: this.commandshutdownMobileGWCLIENT,
            password: this.selectedItem.PASS_HOST,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.getresponse = response.data;
            this.loading_icon = false;
            this.freshgetdata();
            this.echeresult = true;
            console.log(response);
          });
      } else if (
        value == "CommandStartUp" &&
        this.selectedItem.HOST_NAME == "MOBILE GW_MERCHANT"
      ) {
        this.loading_icon = true;
        axios
          .post("http://10.0.22.236:9889/api/checkServer/startServerProd", {
            host: this.selectedItem.HOST_IP,
            user_id: this.access,
            host_name: this.selectedItem.HOST_NAME,
            command: this.commandstartupMobileGWMerchant,
            password: this.selectedItem.PASS_HOST,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.getresponse = response.data;
            this.loading_icon = false;
            this.freshgetdata();
            this.echeresult = true;
            console.log(response);
          });
      } else if (
        value == "CommandShutdown" &&
        this.selectedItem.HOST_NAME == "MOBILE GW_MERCHANT"
      ) {
        this.loading_icon = true;
        axios
          .post("http://10.0.22.236:9889/api/checkServer/stopServerProd", {
            host: this.selectedItem.HOST_IP,
            user_id: this.access,
            host_name: this.selectedItem.HOST_NAME,
            command: this.commandshutdownMobileGWMerchant,
            password: this.selectedItem.PASS_HOST,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.getresponse = response.data;
            this.loading_icon = false;
            this.freshgetdata();
            this.echeresult = true;
            console.log(response);
          });
      } else if (
        value == "CommandStartUp" &&
        this.selectedItem.HOST_NAME == "AQ SWITCH"
      ) {
        this.loading_icon = true;
        axios
          .post("http://10.0.22.236:9889/api/checkServer/startServerProd", {
            host: this.selectedItem.HOST_IP,
            user_id: this.access,
            host_name: this.selectedItem.HOST_NAME,
            command: this.commandstartupSWITCHAQ,
            password: this.selectedItem.PASS_HOST,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.getresponse = response.data;
            this.loading_icon = false;
            this.freshgetdata();
            this.echeresult = true;
            console.log(response);
          });
      } else if (
        value == "CommandShutdown" &&
        this.selectedItem.HOST_NAME == "AQ SWITCH"
      ) {
        this.loading_icon = true;
        axios
          .post("http://10.0.22.236:9889/api/checkServer/stopServerProd", {
            host: this.selectedItem.HOST_IP,
            user_id: this.access,
            host_name: this.selectedItem.HOST_NAME,
            command: this.commandshutdownSWITCHAQ,
            password: this.selectedItem.PASS_HOST,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.getresponse = response.data;
            this.loading_icon = false;
            this.freshgetdata();
            this.echeresult = true;
            console.log(response);
          });
      } else if (
        value == "CommandStartUp" &&
        this.selectedItem.HOST_NAME == "AQ BATCH"
      ) {
        this.loading_icon = true;
        axios
          .post("http://10.0.22.236:9889/api/checkServer/startBatchProd", {
            host: this.selectedItem.HOST_IP,
            user_id: this.access,
            host_name: this.selectedItem.HOST_NAME,
            command: this.commandstartupBatchAQ,
            password: this.selectedItem.PASS_HOST,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.getresponse = response.data;
            this.loading_icon = false;
            this.freshgetdata();
            this.echeresult = true;
            console.log(response);
          });
      } else if (
        value == "CommandShutdown" &&
        this.selectedItem.HOST_NAME == "AQ BATCH"
      ) {
        this.loading_icon = true;
        axios
          .post("http://10.0.22.236:9889/api/checkServer/stopBatchProd", {
            host: this.selectedItem.HOST_IP,
            user_id: this.access,
            host_name: this.selectedItem.HOST_NAME,
            command: this.commandshutdownBatchAQ,
            password: this.selectedItem.PASS_HOST,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.getresponse = response.data;
            this.loading_icon = false;
            this.freshgetdata();
            this.echeresult = true;
            console.log(response);
          });
      } else if (
        value == "CommandStartUp" &&
        this.selectedItem.HOST_NAME == "AQ CMS"
      ) {
        this.loading_icon = true;
        axios
          .post("http://10.0.22.236:9889/api/checkServer/startServerProd", {
            host: this.selectedItem.HOST_IP,
            user_id: this.access,
            host_name: this.selectedItem.HOST_NAME,
            command: this.commandstartupCMSAQ,
            password: this.selectedItem.PASS_HOST,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.getresponse = response.data;
            this.loading_icon = false;
            this.freshgetdata();
            this.echeresult = true;
            console.log(response);
          });
      } else if (
        value == "CommandShutdown" &&
        this.selectedItem.HOST_NAME == "AQ CMS"
      ) {
        this.loading_icon = true;
        axios
          .post("http://10.0.22.236:9889/api/checkServer/stopServerProd", {
            host: this.selectedItem.HOST_IP,
            user_id: this.access,
            host_name: this.selectedItem.HOST_NAME,
            command: this.commandshutdownCMSAQ,
            password: this.selectedItem.PASS_HOST,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.getresponse = response.data;
            this.loading_icon = false;
            this.freshgetdata();
            this.echeresult = true;
            console.log(response);
          });
      } else {
        this.dataisnull = true;
      }
    },

    freshgetdata() {
      this.isLoading = "red";
      axios
        .get("http://10.0.22.236:9889/api/get/get_stopstartServerprod")
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
  },
};
</script>
<style>
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
