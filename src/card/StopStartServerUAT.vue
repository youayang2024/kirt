<template>
  <v-card class="CustomerList" style="font-family: phetsarath OT">
    <v-alert
      dense
      style="
        font-family: phetsarath OT;
        background-color: cornflowerblue;
        color: white;
      "
      class="text-center"
      >Stop & Start ເຊີບເວີ UAT</v-alert
    >
    <!-- deletedata -->

    <v-card style="font-family: phetsarath OT" class="scrollmenu">
      <!-- <v-card-title> -->
      <!-- &nbsp; &nbsp; &nbsp;
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
            height="40"
            width="40"
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
  name: "StopStartServerUAT",
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
      commandstartup: "/cardzone/oneswitch/bin/./startSwitch",
      commandshutdown: "/cardzone/oneswitch/bin/./stopSwitch",
      commandstartupATMC: "/cardzone/oneatmc/bin/./startAtmc",
      commandshutdownATMC: "/cardzone/oneatmc/bin/./stopAtmc",
      commandstartupCMS:
        "/cardzone/apache/apache-tomcat-9.0.0.M15/bin/./startup.sh",
      commandshutdownCMS:
        "/cardzone/apache/apache-tomcat-9.0.0.M15/bin/./shutdown.sh",
      commandstartupBATCH: "/cardzone/oneswitch_batch/bin/./startBatch",
      commandshutdownBATCH: "/cardzone/oneswitch_batch/bin/./stopBatch",

      // AQ server
      commandstartupSwitchAq: "/cardzone/oneswitch/bin/./startAcqSwitch",
      commandshutdownSwitchAq: "/cardzone/oneswitch/bin/./stopAcqSwitch",

      commandstartupMobileGW_C:
        "/cardzone/onemobilegw_client/bin/./startMobileGWClient",
      commandshutdownMobileGW_C:
        "/cardzone/onemobilegw_client/bin/./stopMobileGWClient",

      commandstartupMobileGW_M:
        "/cardzone/onemobilegw_merchant/bin/./startMobileGWMerchant",
      commandshutdownMobileGW_M:
        "/cardzone/onemobilegw_merchant/bin/./stopMobileGWMerchant",

      commandstartupAQCMS:
        "/cardzone/tomcat/apache-tomcat-8.5.45/bin/./startup.sh",
      commandshutdownAQCMS:
        "/cardzone/tomcat/apache-tomcat-8.5.45/bin/./shutdown.sh",

      urlGreen: "https://www.commpartners.com/wp-content/plugins/wp-meta-seo/assets/images/update_loading.gif",
      urlred:
        "https://icon-library.com/images/progress-icon-gif/progress-icon-gif-1.jpg",
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
        this.selectedItem.HOST_NAME == "SWITCH UAT"
      ) {
        this.loading_icon = true;
        axios
          .post("http://10.0.22.236:9889/api/checkServer/start_ServerUAT", {
            host: this.selectedItem.HOST_IP,
            user_id: this.access,
            host_name: this.selectedItem.HOST_NAME,
            command: this.commandstartup,
            password: this.selectedItem.PASS_HOST,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.selectedItem.HOST_NAME="";
            this.getresponse = response.data;
            this.loading_icon = false;
            this.freshgetdata();
            this.echeresult = true;
            console.log(response);
          });
      } else if (
        value == "CommandShutdown" &&
        this.selectedItem.HOST_NAME == "SWITCH UAT"
      ) {
        this.loading_icon = true;
        axios
          .post("http://10.0.22.236:9889/api/checkServer/stop_ServerUAT", {
            host: this.selectedItem.HOST_IP,
            user_id: this.access,
            host_name: this.selectedItem.HOST_NAME,
            command: this.commandshutdown,
            password: this.selectedItem.PASS_HOST,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.selectedItem.HOST_NAME="";
            this.getresponse = response.data;
            this.loading_icon = false;
            this.freshgetdata();
            this.echeresult = true;

            console.log(response);
          });
      } else if (
        value == "CommandStartUp" &&
        this.selectedItem.HOST_NAME == "ATMC UAT"
      ) {
        this.loading_icon = true;
        axios
          .post("http://10.0.22.236:9889/api/checkServer/start_ServerUAT", {
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
            this.selectedItem.HOST_NAME="";
            this.getresponse = response.data;
            this.loading_icon = false;
            this.freshgetdata();
            this.echeresult = true;
            console.log(response);
          });
      } else if (
        value == "CommandShutdown" &&
        this.selectedItem.HOST_NAME == "ATMC UAT"
      ) {
        this.loading_icon = true;
        axios
          .post("http://10.0.22.236:9889/api/checkServer/stop_ServerUAT", {
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
            this.selectedItem.HOST_NAME="";
            this.getresponse = response.data;
            this.loading_icon = false;
            this.freshgetdata();
            this.echeresult = true;
            console.log(response);
          });
      } else if (
        value == "CommandStartUp" &&
        this.selectedItem.HOST_NAME == "CMS UAT"
      ) {
        this.loading_icon = true;
        axios
          .post("http://10.0.22.236:9889/api/checkServer/start_ServerUAT", {
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
            this.selectedItem.HOST_NAME="";
            this.getresponse = response.data;
            this.loading_icon = false;
            this.freshgetdata();
            this.echeresult = true;
            console.log(response);
          });
      } else if (
        value == "CommandShutdown" &&
        this.selectedItem.HOST_NAME == "CMS UAT"
      ) {
        this.loading_icon = true;
        axios
          .post("http://10.0.22.236:9889/api/checkServer/stop_ServerUAT", {
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
            this.selectedItem.HOST_NAME="";
            this.getresponse = response.data;
            this.loading_icon = false;
            this.freshgetdata();
            this.echeresult = true;
            console.log(response);
          });
      } else if (
        value == "CommandStartUp" &&
        this.selectedItem.HOST_NAME == "BATCH UAT"
      ) {
        this.loading_icon = true;
        axios
          .post("http://10.0.22.236:9889/api/checkServer/start_Batch", {
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
            this.selectedItem.HOST_NAME="";
            this.getresponse = response.data;
            this.loading_icon = false;
            this.freshgetdata();
            this.echeresult = true;
            console.log(response);
          });
      } else if (
        value == "CommandShutdown" &&
        this.selectedItem.HOST_NAME == "BATCH UAT"
      ) {
        this.loading_icon = true;
        axios
          .post("http://10.0.22.236:9889/api/checkServer/stop_Batch", {
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
            this.selectedItem.HOST_NAME="";
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
          .post("http://10.0.22.236:9889/api/checkServer/start_ServerUAT", {
            host: this.selectedItem.HOST_IP,
            user_id: this.access,
            host_name: this.selectedItem.HOST_NAME,
            command: this.commandstartupSwitchAq,
            password: this.selectedItem.PASS_HOST,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.selectedItem.HOST_NAME="";
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
          .post("http://10.0.22.236:9889/api/checkServer/stop_ServerUAT", {
            host: this.selectedItem.HOST_IP,
            user_id: this.access,
            host_name: this.selectedItem.HOST_NAME,
            command: this.commandshutdownSwitchAq,
            password: this.selectedItem.PASS_HOST,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.selectedItem.HOST_NAME="";
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
          .post("http://10.0.22.236:9889/api/checkServer/start_ServerUAT", {
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
            this.selectedItem.HOST_NAME="";
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
          .post("http://10.0.22.236:9889/api/checkServer/stop_ServerUAT", {
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
            this.selectedItem.HOST_NAME="";
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
          .post("http://10.0.22.236:9889/api/checkServer/start_ServerUAT", {
            host: this.selectedItem.HOST_IP,
            user_id: this.access,
            host_name: this.selectedItem.HOST_NAME,
            command: this.commandstartupMobileGW_C,
            password: this.selectedItem.PASS_HOST,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.selectedItem.HOST_NAME="";
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
          .post("http://10.0.22.236:9889/api/checkServer/stop_ServerUAT", {
            host: this.selectedItem.HOST_IP,
            user_id: this.access,
            host_name: this.selectedItem.HOST_NAME,
            command: this.commandshutdownMobileGW_C,
            password: this.selectedItem.PASS_HOST,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.selectedItem.HOST_NAME="";
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
          .post("http://10.0.22.236:9889/api/checkServer/start_ServerUAT", {
            host: this.selectedItem.HOST_IP,
            user_id: this.access,
            host_name: this.selectedItem.HOST_NAME,
            command: this.commandstartupMobileGW_M,
            password: this.selectedItem.PASS_HOST,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.selectedItem.HOST_NAME="";
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
          .post("http://10.0.22.236:9889/api/checkServer/stop_ServerUAT", {
            host: this.selectedItem.HOST_IP,
            user_id: this.access,
            host_name: this.selectedItem.HOST_NAME,
            command: this.commandshutdownMobileGW_M,
            password: this.selectedItem.PASS_HOST,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.selectedItem.HOST_NAME="";
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
          .post("http://10.0.22.236:9889/api/checkServer/start_ServerUAT", {
            host: this.selectedItem.HOST_IP,
            user_id: this.access,
            host_name: this.selectedItem.HOST_NAME,
            command: this.commandstartupAQCMS,
            password: this.selectedItem.PASS_HOST,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.selectedItem.HOST_NAME="";
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
          .post("http://10.0.22.236:9889/api/checkServer/stop_ServerUAT", {
            host: this.selectedItem.HOST_IP,
            user_id: this.access,
            host_name: this.selectedItem.HOST_NAME,
            command: this.commandshutdownAQCMS,
            password: this.selectedItem.PASS_HOST,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.selectedItem.HOST_NAME="";
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
        .get("http://10.0.22.236:9889/api/get/get_stopstartServer")
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
