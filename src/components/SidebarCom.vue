<template>
  <nav>
    <!-- top bar menu -->
    <v-app-bar dense style="background-color: white" dark app>
      <v-app-bar-nav-icon dense @click.stop="drawer = !drawer" style="color: blue;"></v-app-bar-nav-icon>

      &nbsp;&nbsp;
      <span>
        <img
          :src="image"
          alt="Image"
          width="40"
          height="40"
          class="rounded-circle"
      /></span>
      &nbsp;&nbsp;
      <span style="font-family: phetsarath OT; color: black;">ID : {{ user_id }} </span>

      <v-spacer></v-spacer>

      <!-- menu exit -->
      <v-btn text @click="logout()">
        <span @click="logout()" style="font-family: phetsarath OT; color: black;"
          >ອອກຈາກລະບົບ</span
        >
        <v-icon right style="color: red;">mdi-power</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Side Bar admin-->
    <v-navigation-drawer

      v-model="drawer"
      dark
      app
      style="background-color: #002c51"
    >
      <!-- image -->
      <v-layout column align-leght>
        <img src="../assets/new-ldb.png" style="height: 63px; width: 180px" />
      </v-layout>
      <v-divider></v-divider>

      <v-list flat>
        <v-list-item
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
          active-class="border"
        >
          <v-list-item-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-family: phetsarath OT">{{
              link.text
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <div style="font-family: phetsarath OT">
        <ul
          class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center"
          id="menu"
        >
          <!-- <li class="divider" role="separator"></li> -->
          <!--Overview-->
          <li v-if="isAuthorized">
            <a
              href="#atmdb"
              data-bs-toggle="collapse"
              class="nav-link align-middle collapsed"
            >
              <i class="fa fa-database" aria-hidden="true"></i>
              <span class="d-none d-sm-inline"> ລາຍງານ DB </span>
              <i class="fa fa-chevron-up"></i>
            </a>
            <ul
              class="collapse nav flex-column submenu collapse"
              id="atmdb"
              data-bs-parent="#menu"
            >
              <li class="w-100">
                <router-link
                  to="/ATMDbaView"
                  class="nav-link px-0"
                  active-class="border"
                >
                  <!-- <i class="fa fa-dot-circle-o"  aria-hidden="true"></i> -->
                  <span class="d-none d-sm-inline">ຖານຂໍ້ມູນ ATM</span>
                </router-link>
              </li>
              <li class="w-100">
                <router-link
                  to="/MobileDbaView"
                  class="nav-link px-0"
                  active-class="border"
                >
                  <!-- <i class="fa fa-dot-circle-o"  aria-hidden="true"></i> -->
                  <span class="d-none d-sm-inline">ຖານຂໍ້ມູນ Mobile</span>
                </router-link>
              </li>
  
              <li class="w-100">
                <router-link
                  to="/ListDBA"
                  class="nav-link px-0"
                  active-class="border"
                >
                  <!-- <i class="fa fa-dot-circle-o"  aria-hidden="true"></i> -->
                  <!-- <v-icon style="color: blue">mdi-chevron-double-right</v-icon> -->
                  <span class="d-none d-sm-inline">ຈັດການ DB</span>
                </router-link>
              </li>
            </ul>
          </li>
          <!--Overview-->
          <!-- <li class="divider" role="separator"></li> -->
          <!-- test -->
          <li v-if="isAuthorized">
            <a
              href="#activecard"
              data-bs-toggle="collapse"
              class="nav-link align-middle collapsed"
            >
              <v-icon>mdi-credit-card</v-icon>
              <span class="d-none d-sm-inline"> ແອັບຕິບັດ</span>
              <i class="fa fa-chevron-up"></i>
            </a>
            <ul
              class="collapse nav flex-column submenu collapse"
              id="activecard"
              data-bs-parent="#menu"
            >
              <li class="w-100">
                <router-link
                  to="/DetailCard"
                  class="nav-link px-0"
                  active-class="border"
                >
                  <!-- <i class="fa fa-dot-circle-o"  aria-hidden="true"></i> -->
                  <span class="d-none d-sm-inline">ແອັບຕິບັດໃຫມ່</span>
                </router-link>
              </li>
              <!-- <li class="w-100">
                <router-link
                  to="/ImportCard"
                  class="nav-link px-0"
                  active-class="border"
                >
               
                  <span class="d-none d-sm-inline">ອັບໂຫຼດໄຟລ໌</span>
                </router-link>
              </li> -->
              <li class="w-100">
                <router-link
                  to="/BlockLDBCard"
                  class="nav-link px-0"
                  active-class="border"
                >
                  <!-- <i class="fa fa-dot-circle-o"  aria-hidden="true"></i> -->
                  <span class="d-none d-sm-inline">ລັອກບັດເກີນ  6 ເດືອນ</span>
                </router-link>
              </li>
            </ul>
          </li>
          <!-- <li class="divider" role="separator"></li> -->

          <li v-if="isAuthorized" >
            <a
              href="#managercard"
              data-bs-toggle="collapse"
              class="nav-link align-middle collapsed"
            >
              <v-icon>mdi-credit-card</v-icon>
              <span class="d-none d-sm-inline"> ຈັດການບັດຕ່າງໆ</span>
              <i class="fa fa-chevron-up"></i>
            </a>
            <ul
              class="collapse nav flex-column submenu collapse"
              id="managercard"
              data-bs-parent="#menu"
            >
              <li class="w-100">
                <router-link
                  to="/CHeckCard"
                  class="nav-link px-0"
                  active-class="border"
                >
                  <!-- <i class="fa fa-dot-circle-o"  aria-hidden="true"></i> -->
                  <span class="d-none d-sm-inline">ກວດບັດ</span>
                </router-link>
              </li>
              <li class="w-100">
                <router-link
                  to="/ListVirtualCard"
                  class="nav-link px-0"
                  active-class="border"
                >
                  <!-- <i class="fa fa-dot-circle-o"  aria-hidden="true"></i> -->
                  <span class="d-none d-sm-inline">ບັດເດບິດ Virtual</span>
                </router-link>
              </li>
              <li class="w-100">
                <router-link
                  to="/LimitCard"
                  class="nav-link px-0"
                  active-class="border"
                >
                  <!-- <i class="fa fa-dot-circle-o"  aria-hidden="true"></i> -->
                  <span class="d-none d-sm-inline">ກວດສອບ Limit</span>
                </router-link>
              </li>
              <li class="w-100">
                <router-link
                  to="/LimitAmount"
                  class="nav-link px-0"
                  active-class="border"
                >
                  <!-- <i class="fa fa-dot-circle-o"  aria-hidden="true"></i> -->
                  <span class="d-none d-sm-inline">ປັບວົງເງິນ</span>
                </router-link>
              </li>
              <li class="w-100">
                <router-link
                  to="/ViewTrustUserFinal"
                  class="nav-link px-0"
                  active-class="border"
                >
                  <!-- <i class="fa fa-dot-circle-o"  aria-hidden="true"></i> -->
                  <span class="d-none d-sm-inline">ບັດ Wallet</span>
                </router-link>
              </li>

              <li class="w-100">
                <router-link
                  to="/CheckAccount"
                  class="nav-link px-0"
                  active-class="border"
                >
                  <!-- <i class="fa fa-dot-circle-o"  aria-hidden="true"></i> -->
                  <span class="d-none d-sm-inline">ຄົ້ນຫາເລກບັນຊີໃນ QR</span>
                </router-link>
              </li>
              <li class="w-100">
                <router-link
                  to="/CheckMerchantAccount"
                  class="nav-link px-0"
                  active-class="border"
                >
                  <!-- <i class="fa fa-dot-circle-o"  aria-hidden="true"></i> -->
                  <span class="d-none d-sm-inline">ຄົ້ນຫາເລກບັນຊີໃນ Merchant QR</span>
                </router-link>
              </li>
              <li class="w-100">
                <router-link
                  to="/FromAcctToAcct"
                  class="nav-link px-0"
                  active-class="border"
                >
                  <!-- <i class="fa fa-dot-circle-o"  aria-hidden="true"></i> -->
                  <span class="d-none d-sm-inline">ກວດສອບບັນຊີຕົ້ນທາງ ແລະ ປາຍທາງ</span>
                </router-link>
              </li>
              <li class="w-100">
                <router-link
                  to="/GetOtp"
                  class="nav-link px-0"
                  active-class="border"
                >
                  <!-- <i class="fa fa-dot-circle-o"  aria-hidden="true"></i> -->
                  <span class="d-none d-sm-inline">ຊອກຫາ OTP</span>
                </router-link>
              </li>
              <li class="w-100">
                <router-link
                  to="/ChangeAccountName"
                  class="nav-link px-0"
                  active-class="border"
                >
                  <!-- <i class="fa fa-dot-circle-o"  aria-hidden="true"></i> -->
                  <span class="d-none d-sm-inline"
                    >ປ່ຽນຊື່ບັນຊີບໍ່ກົງກັບ T24</span
                  >
                </router-link>
              </li>
              <li class="w-100">
                <router-link
                  to="/ChangeCurrencyID"
                  class="nav-link px-0"
                  active-class="border"
                >
                  <!-- <i class="fa fa-dot-circle-o"  aria-hidden="true"></i> -->
                  <span class="d-none d-sm-inline"
                    >ປ່ຽນ Currency ID ບໍ່ກົງກັບ T24</span
                  >
                </router-link>
              </li>
              <li class="w-100">
                <router-link
                  to="/CardManager"
                  class="nav-link px-0"
                  active-class="border"
                >
                  <!-- <i class="fa fa-dot-circle-o"  aria-hidden="true"></i> -->
                  <span class="d-none d-sm-inline">ບັດອື່ນໆ</span>
                </router-link>
              </li>
            </ul>
          </li>
          <!-- atm -->
          <li v-if="isAuthorized">
            <a
              href="#atm"
              data-bs-toggle="collapse"
              class="nav-link align-middle collapsed"
            >
              <i class="fa fa-align-center" aria-hidden="true"></i>
              <span class="d-none d-sm-inline"> ເອທີເອັມ</span>
              <i class="fa fa-chevron-up"></i>
            </a>
            <ul
              class="collapse nav flex-column submenu collapse"
              id="atm"
              data-bs-parent="#menu"
            >
              <li class="w-100">
                <router-link
                  to="/ATMDetail"
                  class="nav-link px-0"
                  active-class="border"
                >
                  <!-- <i class="fa fa-dot-circle-o"  aria-hidden="true"></i> -->
                  <span class="d-none d-sm-inline">ຕູ້ເອທີເອັມ</span>
                </router-link>
              </li>
              <li class="w-100">
                <router-link
                  to="/UploadAtmScreen"
                  class="nav-link px-0"
                  active-class="border"
                >
                  <!-- <i class="fa fa-dot-circle-o"  aria-hidden="true"></i> -->
                  <span class="d-none d-sm-inline">ອັບໂຫຼດ ATM Screen</span>
                </router-link>
              </li>
              <li class="w-100">
                <router-link
                  to="/StopStartServerUAT"
                  class="nav-link px-0"
                  active-class="border"
                >
                  <!-- <i class="fa fa-dot-circle-o"  aria-hidden="true"></i> -->
                  <span class="d-none d-sm-inline">Stop & Start ເຊີບເວີ UAT</span>
                </router-link>
              </li>
              <li class="w-100">
                <router-link
                  to="/StopStartServerprod"
                  class="nav-link px-0"
                  active-class="border"
                >
                  <!-- <i class="fa fa-dot-circle-o"  aria-hidden="true"></i> -->
                  <span class="d-none d-sm-inline">Stop-Start Server prod</span>
                </router-link>
              </li>
            </ul>
          </li>
          <!-- txn -->

          <li v-if="isAuthorized">
            <a
              href="#txn"
              data-bs-toggle="collapse"
              class="nav-link align-middle collapsed"
            >
              <i class="fa fa-align-left" aria-hidden="true"></i>
              <span class="d-none d-sm-inline"> ທຸລະກໍາອື່ນໆ </span>
              <i class="fa fa-chevron-up"></i>
            </a>
            <ul
              class="collapse nav flex-column submenu collapse"
              id="txn"
              data-bs-parent="#menu"
            >
              <li class="w-100">
                <router-link
                  to="/MobileTxn"
                  class="nav-link px-0"
                  active-class="border"
                >
                  <!-- <i class="fa fa-dot-circle-o"  aria-hidden="true"></i> -->
                  <span class="d-none d-sm-inline">ທຸລະກໍາ Mobile</span>
                </router-link>
              </li>
              <li class="w-100">
                <router-link
                  to="/ATM_TXN"
                  class="nav-link px-0"
                  active-class="border"
                >
                  <!-- <i class="fa fa-dot-circle-o"  aria-hidden="true"></i> -->
                  <span class="d-none d-sm-inline">ທຸລະກໍາ ATM</span>
                </router-link>
              </li>
              <li class="w-100">
                <router-link
                  to="/AuthTxnUAT"
                  class="nav-link px-0"
                  active-class="border"
                >
                  <!-- <i class="fa fa-dot-circle-o"  aria-hidden="true"></i> -->
                  <span class="d-none d-sm-inline">ທຸລະກໍາຜ່ານ UAT</span>
                </router-link>
              </li>
              <li class="w-100">
                <router-link
                  to="/AuthTxnPROD"
                  class="nav-link px-0"
                  active-class="border"
                >
                  <!-- <i class="fa fa-dot-circle-o"  aria-hidden="true"></i> -->
                  <span class="d-none d-sm-inline">ທຸລະກໍາຜ່ານ PROD</span>
                </router-link>
              </li>
              <li class="w-100">
                <router-link
                  to="/AuthTxnATMChannelOfLDBPROD"
                  class="nav-link px-0"
                  active-class="border"
                >
                  <!-- <i class="fa fa-dot-circle-o"  aria-hidden="true"></i> -->
                  <span class="d-none d-sm-inline"
                    >ທຸລະກໍາຜ່ານຊ່ອງທາງ ATM LDB</span
                  >
                </router-link>
              </li>
              <li class="w-100">
                <router-link
                  to="/AuthTxnATMChannelOfLapsPROD"
                  class="nav-link px-0"
                  active-class="border"
                >
                  <!-- <i class="fa fa-dot-circle-o"  aria-hidden="true"></i> -->
                  <span class="d-none d-sm-inline"
                    >ທຸລະກໍາຜ່ານຊ່ອງທາງ LAPS ATM LDB</span
                  >
                </router-link>
              </li>
              <li class="w-100">
                <router-link
                  to="/AuthTxnATMChannelOfOverseaPROD"
                  class="nav-link px-0"
                  active-class="border"
                >
                  <!-- <i class="fa fa-dot-circle-o"  aria-hidden="true"></i> -->
                  <span class="d-none d-sm-inline"
                    >ທຸລະກໍາຜ່ານຊ່ອງທາງບັດສາກົນ OVERSEA</span
                  >
                </router-link>
              </li>
              <li class="w-100">
                <router-link
                  to="/AuthTxnATMChannelOfEDCPROD"
                  class="nav-link px-0"
                  active-class="border"
                >
                  <!-- <i class="fa fa-dot-circle-o"  aria-hidden="true"></i> -->
                  <span class="d-none d-sm-inline"
                    >ທຸລະກໍາຜ່ານຊ່ອງທາງ EDC OF LDB</span
                  >
                </router-link>
              </li>
              <li class="w-100">
                <router-link
                  to="/AuthTxnChannelOfEDClapsPROD"
                  class="nav-link px-0"
                  active-class="border"
                >
                  <!-- <i class="fa fa-dot-circle-o"  aria-hidden="true"></i> -->
                  <span class="d-none d-sm-inline"
                    >ທຸລະກໍາຜ່ານຊ່ອງທາງ EDC by Laps Card</span
                  >
                </router-link>
              </li>
              <li class="w-100">
                <router-link
                  to="/AuthTxnChannelOfEDOverseaPROD"
                  class="nav-link px-0"
                  active-class="border"
                >
                  <!-- <i class="fa fa-dot-circle-o"  aria-hidden="true"></i> -->
                  <span class="d-none d-sm-inline"
                    >ທຸລະກໍາຜ່ານຊ່ອງທາງ EDC by OVERSEA</span
                  >
                </router-link>
              </li>
            </ul>
          </li>
          <li class="w-100" v-if="isAuthorized">
            <router-link
              to="/ITDocs"
              class="nav-link px-0"
              active-class="border"
            >
              &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
              <!-- <i class="fa fa-sign-out" aria-hidden="true"></i> -->
              <v-icon>mdi-message-text</v-icon>
              <span class="d-none d-sm-inline"> ເອກະສານອື່ນໆ </span>
            </router-link>
          </li>
          <!--  -->
          <li v-if="isAuthorized">
            <a
              href="#bpc"
              data-bs-toggle="collapse"
              class="nav-link align-middle collapsed"
            >
              <i class="fa fa-align-center" aria-hidden="true"></i>
              <span class="d-none d-sm-inline"> BPC STATEMENT</span>
              <i class="fa fa-chevron-up"></i>
            </a>
            <ul
              class="collapse nav flex-column submenu collapse"
              id="bpc"
              data-bs-parent="#menu"
            >
              <li class="w-100">
                <router-link
                  to="/GetcreditSTM"
                  class="nav-link px-0"
                  active-class="border"
                >
                  <!-- <i class="fa fa-dot-circle-o"  aria-hidden="true"></i> -->
                  <span class="d-none d-sm-inline">VISA credit Statement</span>
                </router-link>
              </li>
              <li class="w-100">
                <router-link
                  to="/Visa_Credit"
                  class="nav-link px-0"
                  active-class="border"
                >
                  <!-- <i class="fa fa-dot-circle-o"  aria-hidden="true"></i> -->
                  <span class="d-none d-sm-inline">VISA CREDIT</span>
                </router-link>
              </li>
              <li class="w-100">
                <router-link
                  to="/Bpc_cardInfo"
                  class="nav-link px-0"
                  active-class="border"
                >
                  <!-- <i class="fa fa-dot-circle-o"  aria-hidden="true"></i> -->
                  <span class="d-none d-sm-inline">VISA CREDIT CARD INFO</span>
                </router-link>
              </li>
              <li class="w-100">
                <router-link
                  to="/AddVISACard"
                  class="nav-link px-0"
                  active-class="border"
                >
                  <!-- <i class="fa fa-dot-circle-o"  aria-hidden="true"></i> -->
                  <span class="d-none d-sm-inline">Add VISA Card</span>
                </router-link>
              </li>
            </ul>
          </li>
          <!-- test -->
          <li v-if="isAuthorizedUSER">
            <a
              href="#limit"
              data-bs-toggle="collapse"
              class="nav-link align-middle collapsed"
            >
              <i class="fa fa-align-center" aria-hidden="true"></i>
              <span class="d-none d-sm-inline"> ປັບວົງເງິນ</span>
              <i class="fa fa-chevron-up"></i>
            </a>
            <ul
              class="collapse nav flex-column submenu collapse"
              id="limit"
              data-bs-parent="#menu"
            >
              <li class="w-100">
                <router-link
                  to="/RequestApprove"
                  class="nav-link px-0"
                  active-class="border"
                >
                  <!-- <i class="fa fa-dot-circle-o"  aria-hidden="true"></i> -->
                  <span class="d-none d-sm-inline"
                    >ລໍຖ້າອະນຸມັດ ( <label style="color: "> {{ this.CountRow }} </label> )</span
                  >
                </router-link>
              </li>
              <li class="w-100">
                <router-link
                  to="/ListApproved"
                  class="nav-link px-0"
                  active-class="border"
                >
                  <!-- <i class="fa fa-dot-circle-o"  aria-hidden="true"></i> -->
                  <span class="d-none d-sm-inline"
                    >ລາຍການອະນຸມັດສຳເລັດແລ້ວ</span
                  >
                </router-link>
              </li>
              
            </ul>
          </li>
          <!-- test -->



          <li class="w-100" v-if="Settlement_team">
                <router-link
                  to="/CheckAccount"
                  class="nav-link px-0"
                  active-class="border"
                >
                &nbsp; &nbsp;&nbsp;&nbsp; <i class="fa fa-dot-circle-o"  aria-hidden="true"></i>

                  &nbsp;<span class="d-none d-sm-inline">ຄົ້ນຫາເລກບັນຊີໃນ QR</span>
                </router-link>
              </li>



          <li class="w-100" v-if="isAuthorized">
            <router-link
              to="/ListResgisterUser"
              class="nav-link px-0"
              active-class="border"
            >
              &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
              <!-- <i class="fa fa-sign-out" aria-hidden="true"></i> -->
              <v-icon>mdi-account-multiple</v-icon>
              <span class="d-none d-sm-inline"> ຜູ້ໃຊ້ </span>
            </router-link>
          </li>
        </ul>
        <!-- <hr> -->
      </div>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
     
      tabuser: false,
      drawer: true,
      token: localStorage.getItem("token"),
      role: localStorage.getItem("role"),
      user_id: localStorage.getItem("user_id"),
      image: localStorage.getItem("image"),

      currentUser: {},
      links: [{ icon: "dashboard", text: "ໜ້າຫລັກ", route: "/DashboardPages" }],

      CountRow: "",
      isAuthorized: false,
      isAuthorizedUSER: false,
      Settlement_team:false,
    };
  },
 

  created() {
    axios.defaults.headers.common["Authorization"] = `${this.token}`;
    this.getUser();

    if (this.role=="0") {
      this.isAuthorized = true;
    } else{
      this.isAuthorized = false;
    }
    if (this.role==null) {
      this.isAuthorizedUSER = false;
    } else if(this.role=="1"){
      this.isAuthorizedUSER = true;
    }else if(this.role=="0"){
      this.isAuthorizedUSER = true;
    }else
  
    {
      this.isAuthorizedUSER = false;
    }
    if(this.role=="2" || this.role=="1"){

    this.Settlement_team=true;
   }else{
    this.Settlement_team=false;
   }

  },
  mounted() {
    if (this.role == "0") {
      this.tabuser = true;
    }

    axios
      .get("http://10.0.22.236:9889/api/get/get_countrequestapprove")
      .then((response) => {
        this.CountRow = response.data.CountRow;
        console.log(response);
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
    
    getColorInfo(CountRow) {
      if (CountRow > 0) return "red"
      else 
      return "green"
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/LoginPage");
    },
    getUser() {
      axios
        .get("http://10.0.22.236:9889/api/get/getuserresgisterlist")
        .then((response) => {
          this.currentUser = response.data;
        })
        .catch((error) => {
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
<style scoped>
.border {
  border-left: 4px solid #0ba518;
}
.v-btn {
  font-size: 12px;
}
.link.text {
  font-size: 8px;
}
</style>
