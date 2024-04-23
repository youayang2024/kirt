<template>
  <div class="team">
    <h1
      class="subheading grey--text"
      style="font-family: phetsarath OT; font-size: 16px"
    >
      ຫນ້າ Dashboard
    </h1>
    <v-container  v-if="isAuthorized">
      <v-layout row wrap>
        <!--  -->
        <v-flex>
          <v-card style="font-family: phetsarath OT">
            <v-card-title
              ><v-icon style="color: chocolate">mdi-database</v-icon
              >ຖານຂໍ້ມູນ</v-card-title
            >
            <!-- <v-divider></v-divider> -->
            &nbsp;
            <v-btn
              to="/ListDBA"
              outlined
              text
              style="
                font-size: 12px;
                height: 30px;
                width: 190px;
                font-family: phetsarath OT;
              "
            >
              ຈັດການ DB ~ ATM & MOBILE </v-btn
            >&nbsp;
            <v-btn
              to="/ATMDbaView"
              outlined
              text
              style="
                font-size: 12px;
                height: 30px;
                width: 100px;
                font-family: phetsarath OT;
              "
            >
              ຖານຂໍ້ມູນ ATM </v-btn
            >&nbsp;
            <v-btn
              to="/MobileDbaView"
              outlined
              text
              style="
                font-size: 12px;
                height: 30px;
                width: 115px;
                font-family: phetsarath OT;
              "
            >
              ຖານຂໍ້ມູນ MOBILE
            </v-btn>
            <form><Label style="color: red">*</Label></form>
          </v-card>
        </v-flex>
        &nbsp;
        <!--  -->
        <v-flex>
          <v-card style="font-family: phetsarath OT">
            <v-card-title
              ><v-icon style="color: blue">credit_card</v-icon
              >ແອັບຕິບັດ</v-card-title
            >
            <!-- <v-divider></v-divider> -->
            &nbsp;
            <v-btn
              to="/ImportCard"
              outlined
              text
              style="
                font-size: 12px;
                height: 30px;
                width: 80px;
                font-family: phetsarath OT;
              "
            >
              ອັບໂຫຼດໄຟລ໌ </v-btn
            >&nbsp;
            <v-btn
              to="/DetailCard"
              outlined
              text
              style="
                font-size: 12px;
                height: 30px;
                width: 120px;
                font-family: phetsarath OT;
              "
            >
              ລາຍລະອຽດບັດແອັບຕິ
            </v-btn>
            <form><Label style="color: red">*</Label></form>
          </v-card>
        </v-flex>
        <!--  -->
      </v-layout>
      &nbsp;
      <v-layout row wrap>
        <v-flex>
          <v-card style="font-family: Saysettha OT">
            <v-card-title
              ><v-icon style="color: blue">credit_card</v-icon
              >ຈັດການບັດຕ່າງໆ</v-card-title
            >
            <!-- <v-divider></v-divider> -->
            &nbsp;
            <v-btn
              to="/CHeckCard"
              outlined
              text
              style="
                font-size: 12px;
                height: 30px;
                width: 80px;
                font-family: phetsarath OT;
              "
            >
              ກວດບັດ </v-btn
            >&nbsp;
            <v-btn
              to="/ListVirtualCard"
              outlined
              text
              style="
                font-size: 12px;
                height: 30px;
                width: 115px;
                font-family: phetsarath OT;
              "
            >
              ບັດເດບິດ Virtual </v-btn
            >&nbsp;
            <v-btn
              outlined
              text
              style="
                font-size: 12px;
                height: 30px;
                width: 115px;
                font-family: phetsarath OT;
              "
            >
              ບັດທັງໝົດ A & U </v-btn
            >&nbsp;
            <v-btn
              to="/LimitCard"
              outlined
              text
              style="
                font-size: 12px;
                height: 30px;
                width: 115px;
                font-family: phetsarath OT;
              "
            >
              ກວດສອບ Limit </v-btn
            >&nbsp;
            <v-btn
              to="/ViewTrustUserFinal"
              outlined
              text
              style="
                font-size: 12px;
                height: 30px;
                width: 130px;
                font-family: phetsarath OT;
              "
            >
              View Trust User </v-btn
            >&nbsp;
            <v-btn
              to="/CheckAccount"
              outlined
              text
              style="
                font-size: 12px;
                height: 30px;
                width: 90px;
                font-family: phetsarath OT;
              "
            >
              ຄົ້ນຫາເລກບັນຊີ </v-btn
            >&nbsp;
            <v-btn
              to="/GetOtp"
              outlined
              text
              style="
                font-size: 12px;
                height: 30px;
                width: 115px;
                font-family: phetsarath OT;
              "
            >
              ຊອກຫາ OTP </v-btn
            >&nbsp;
            <v-btn
              to="/ChangeAccountName"
              outlined
              text
              style="
                font-size: 12px;
                height: 30px;
                width: 128px;
                font-family: phetsarath OT;
              "
            >
              ປ່ຽນຊື່ບັນຊີບໍ່ກົງກັບ T24 </v-btn
            >&nbsp;<br /><br />&nbsp;
            <v-btn
              to="/CardManager"
              outlined
              text
              style="
                font-size: 12px;
                height: 30px;
                width: 60px;
                font-family: phetsarath OT;
              "
            >
              ບັດອື່ນໆ
            </v-btn>
            <form><Label style="color: red">*</Label></form>
          </v-card>
        </v-flex>
        <!--  -->
      </v-layout>
      &nbsp;
      <v-layout row wrap>
        <!--  -->
        <v-flex>
          <v-card style="font-family: Saysettha OT">
            <v-card-title
              ><v-icon style="color: blue">mdi-home</v-icon
              >ເອທີເອັມ</v-card-title
            >
            &nbsp;
            <v-btn
              to="/ATMDetail"
              outlined
              text
              style="
                font-size: 12px;
                height: 30px;
                width: 80px;
                font-family: phetsarath OT;
              "
            >
              ຕູ້ເອທີເອັມ</v-btn
            >&nbsp;
            <v-btn
              outlined
              text
              style="
                font-size: 12px;
                height: 30px;
                width: 160px;
                font-family: phetsarath OT;
              "
            >
              ອັບໂຫຼດຕູ້ເອທີເອັມ SCREEN
            </v-btn>
            <form><Label style="color: red">*</Label></form>
          </v-card>
        </v-flex>
        &nbsp;
        <!--  -->
        <v-flex>
          <v-card style="font-family: Saysettha OT">
            <v-card-title
              ><v-icon style="color: blue">mdi-reorder-horizontal</v-icon
              >ທຸລະກໍາອື່ນໆ</v-card-title
            >
            &nbsp;
            <v-btn
              to="/MobileTxn"
              outlined
              text
              style="
                font-size: 12px;
                height: 30px;
                width: 115px;
                font-family: phetsarath OT;
              "
              >ທຸລະກໍາ Mobile </v-btn
            >&nbsp;
            <v-btn
              to="/ATM_TXN"
              outlined
              text
              style="
                font-size: 12px;
                height: 30px;
                width: 100px;
                font-family: phetsarath OT;
              "
            >
              ທຸລະກໍາ ATM
            </v-btn>
            <form><Label style="color: red">*</Label></form>
          </v-card>
        </v-flex>
        <!--  -->
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAuthorized: false,
      role: localStorage.getItem("role"),
    };
  },
  created() {
  
    if (this.role=="0") {
      this.isAuthorized = true;
    } else{
      this.isAuthorized = false;
    }
  },
};
</script>
