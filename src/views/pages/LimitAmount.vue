div
<template>
  <v-card>
    <v-alert dense text type="" style="font-family: phetsarath OT; color: blue"
      >ປັບວົງເງິນ</v-alert
    >
    <!-- dialog data is null -->
    <v-dialog v-model="this.datanotfound" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="warning">
          ບໍ່ພົບທຸລະກໍາປະເພດ FUND MOB
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

    <v-card-title style="font-family: phetsarath OT">
      <v-card class="container" style="">
        <v-card-title>
          &nbsp;
          <v-text-field
            v-model="cardno"
            prepend-icon="mdi-credit-card"
            label="ກະລຸນາປ້ອນໝາຍເລກບັດ"
            style="width: 800px"
            clearable
            type="number"
            @keyup.enter="searchinfo()"
          />
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-btn
              color="primary"
              text
              outlined
              @click="searchinfo()"
              style="font-size: 12px; height: 30px; width: 30px"
              @keyup.enter="searchinfo()"
              ><v-icon color="blue">mdi-magnify</v-icon>ຄົ້ນຫາ</v-btn
            >
          </v-card-actions>
          <v-spacer></v-spacer>
        </v-card-title>
      </v-card>

      <!-- <div class="text-center">
        <label style="color: red; font-size: 16px" class="text-center"
          >ກະລຸນາອັບເດດສະເພາະເບື້ອງຂອງບັດ ແລະ
          ສຳລັບເບື້ອງຂອງບັນຊີກັບລູກຄ້າແມ່ນຈະອັບເດດອັດຕະໂນມັດຕາມເບື້ອງຂອງບັດກັບສະກຸນເງິນຂອງບັດ</label
        >
      </div> -->
    </v-card-title>
    <v-dialog
      v-model="editdata"
      max-width="800px"
      style="font-family: phetsarath OT"
    >
      <v-card style="font-family: phetsarath OT">
        <v-alert type="info" style="font-family: phetsarath OT"
          >ອັບເດດຂໍ້ມູນ Limit card</v-alert
        >

        <v-form>
          <div class="container">
            <v-card-title>
              <v-text-field
                v-model="card_no"
                prepend-icon="mdi-credit-card"
                label="Your card number"
                style="width: 200px; color: blue"
                clearable
                disabled="false"
              />
              <v-text-field
                v-model="amount"
                prepend-icon="mdi-money"
                label="Amount for limit"
                style="width: 200px"
                clearable
                type="number"
              />
              <v-text-field
                v-model="currency_id"
                prepend-icon="mdi-money"
                label="Currency Type"
                style="width: 200px"
                clearable
                disabled="false"
              />

              <v-text-field
                v-model="fund_mob"
                prepend-icon="mdi-money"
                label="Fund Mob"
                style="width: 200px"
                clearable
                disabled="false"
              />
            </v-card-title>
          </div>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="primary" text @click="editdata = false">ປິດ</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="updatelimitcardamount()"
            >ຢືນຢັນການອັບເດດ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="display_image"
      max-width="2000px"
      style="font-family: phetsarath OT"
    >
      <v-card style="font-family: phetsarath OT">
        <v-alert type="info" style="font-family: phetsarath OT"
          >ເອກະສານ LIMITED</v-alert
        >

        <v-card class="container">
          <img :src="selectedFile_image" alt="Image" />
        </v-card>

        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="primary" text @click="display_image = false">ປິດ</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="this.updatesuccess" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="success">
          ຂໍ້ມູນຂອງທ່ານຖືກ updated ສຳເລັດແລ້ວ
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
    <v-dialog v-model="this.validate_card" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="error"> ກະລຸນາປ້ອນເລກເລກບັດກ່ອນ! </v-alert>
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

    <v-dialog v-model="this.selectarecord" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="error">
          ກະລຸນາເລືອກລາຍການທີ່ທ່ານຕ້ອງການ!
        </v-alert>
        <v-card-text class="text-center">
          <div class="text-center">
            <img
              src="https://cdn.dribbble.com/users/251873/screenshots/9388228/error-img.gif"
              height="100"
              width="137"
            />
          </div>
          <br />
          ໃຫ້ແນ່ໃຈວ່າຂໍ້ມູນຂອງທ່ານຖືກຕ້ອງບໍ?
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" block text @click="selectarecord = false"
            >ປິດ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="this.validatelimit" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="error">
          ກະລຸນາອັບເດດສະເພາະເບື້ອງຂອງບັດ!
        </v-alert>
        <v-card-text class="text-center">
          <div class="text-center">
            <img
              src="https://cdn.dribbble.com/users/251873/screenshots/9388228/error-img.gif"
              height="100"
              width="137"
            />
          </div>
          <br /><span>
            ກະລຸນາອັບເດດສະເພາະເບື້ອງຂອງບັດ ແລະ
            ສຳລັບເບື້ອງຂອງບັນຊີກັບລູກຄ້າແມ່ນຈະອັບເດດອັດຕະໂນມັດຕາມເບື້ອງຂອງບັດກັບສະກຸນເງິນຂອງບັດ</span
          >
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" block text @click="validatelimit = false"
            >ປິດ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="this.validate_image"
      max-width="500px"
      style="font-family: phetsarath OT"
    >
      <v-card>
        <v-alert dense text type="error" style="font-family: phetsarath OT">
          ກະລຸນາເລືອກ File ຫຼື ຮູບກ່ອນ
        </v-alert>
        <div class="text-center">
          <img
            src="https://cdn.dribbble.com/users/251873/screenshots/9388228/error-img.gif"
            height="100"
            width="137"
          />
        </div>
        <v-card-text class="text-center" style="font-family: phetsarath OT">
          ຂໍ້ມູນຂອງທ່ານບໍ່ຖືກຕ້ອງ
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="error"
            block
            @click="validate_image = false"
            style="font-family: phetsarath OT"
            >ປິດ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card style="font-family: phetsarath OT" class="scrollmenu">
      <v-data-table
        :headers="headers"
        :items="getdata"
        :items-per-page="15"
        class="elevation-1"
        :loading="isLoading"
      >
        <!-- action button -->
        <template #[`item.actions`]>
          <div>
            <v-icon
              @click="checkupdates()"
              style="color: green; font-size: 18px"
              >mdi-pencil</v-icon
            >
          </div>
        </template>

        <template #[`item.checkbox`]="{ item }">
          <div>
            <input type="radio" :value="item" v-model="selected" />
          </div>
        </template>
        <template #[`item.VELOCITY_CHECK`]="{ item }">
              <v-chip :color="getColorInfoUSERCMS(item.VELOCITY_CHECK)">
                {{ item.VELOCITY_CHECK }}
              </v-chip>
            </template>
                  <template #[`item.SINGLE_TXN_LMT`]="{ item }">
        {{   formattedNumber(item.SINGLE_TXN_LMT) }}

        </template>
        <template #[`item.DAILY_AMT_LMT`]="{ item }">
        {{   formattedNumbers(item.DAILY_AMT_LMT) }}

        </template>
      </v-data-table>

      <!--  -->
    </v-card>
  
    <!--  -->
  

  </v-card>
</template>
<script lang="ts">
import axios from "axios";
export default {
  name: "ListResgisterUser",
  props: ["data"],
  data() {
    return {
      search: "",
      display_image: false,
      selectedFile_image: "",
      validate_image: false,
      validatelimit: false,
      user_id: localStorage.getItem("user_id"),
      selectedFile: "",
      isLoading: false,
      updatesuccess: false,
      editdata: false,
      selectarecord: false,
      card_no: "",
      currency_id: "",
      amount: "",
      validate_card: false,
      fund_mob: "",
      options: {},
      selected: [],
      headers: [
        { text: "", value: "checkbox" },
        // { text: "ຊື່ລູກຄ້າ", value: "7" },
        { text: "ປະເພດ LIMIT", value: "LIMIT_TYPE" },
        { text: "ໝາຍເລກບັດ", value: "CARDNO" },
        { text: "ລະຫັດກຸ່ມປະເພດທຸລະກໍາ", value: "TXNTYPGRP_ID" },
        { text: "ລະຫັດສະກຸນເງິນ", value: "CURRENCY_ID" },
        { text: "ລະຫັດກຸ່ມປະເທດ", value: "CNTRYGRP_ID" },
        { text: "ຈໍາກັດທຸລະກໍາດຽວ", value: "SINGLE_TXN_LMT", formatter: "formatCurrency" },
        { text: "ຈໍາ​ກັດ​ຈໍາ​ນວນ​ປະ​ຈໍາ​ວັນ", value: "DAILY_AMT_LMT" },
        { text: "VELOCITY_CHECK", value: "VELOCITY_CHECK" },

        { text: "ການກະທໍາ", value: "actions" },
      ],

      getdata: [],

      cardno: "",
      currency: "",
      valid: false,
      datanotfound: false,
      message: "",
      status: "",
      acc: "ACCOUNT",
      cus: "CUSTOMER",
    };
  },

  created() {
    this.selected[0] = this.card_no;
  },

  mounted() {
    //
  },

  methods: {
      formattedNumber(SINGLE_TXN_LMT) {
         return SINGLE_TXN_LMT.toLocaleString()
      },
    formattedNumbers(DAILY_AMT_LMT) {
         return DAILY_AMT_LMT.toLocaleString()
      },
    getColorInfoUSERCMS(VELOCITY_CHECK) {
      if (VELOCITY_CHECK == "N") return "green";
      else if (VELOCITY_CHECK == "Y") return "red";
      else return "#068fff";
    },

    searchinfo() {
      if (this.cardno !== "") {
        this.isLoading = "red";
        axios
          .post("http://10.0.22.236:9889/api/post/postgetlimitAmount", {
            cardno: this.cardno,
          })
          .then((response) => {
            if (response.data.status == "success") {
              (this.message = response.data.message),
                (this.status = response.data.status);
              if (response.data.data.length - 1 == -1) {
                this.datanotfound = true;
                this.isLoading = false;
                console.log(response);
                return;
              } else {
                this.getdata = response.data.data;
                console.log(response);
          
              }
              this.isLoading = false;
            } else {
              (this.message = response.data.message),
                (this.status = response.data.status);
              this.isLoading = false;
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
      } else {
        this.validate_card = true;
      }
    },
    checkupdates() {
      if (this.selected.CARDNO > 0) {
        (this.card_no = this.selected.CARDNO),
          (this.fund_mob = this.selected.TXNTYPGRP_ID),
          (this.currency_id = this.selected.CURRENCY_ID),
          (this.amount = this.selected.SINGLE_TXN_LMT),
          (this.editdata = true);
        //
      } else {
        this.selectarecord = true;
      }
    },
    checkupdates_imageurl() {
      if (this.selectedFile_image != "") {
        (this.card_no = this.selected[1]), (this.display_image = true);
        //
      } else {
        this.selectarecord = true;
      }
    },
    onFilesSelectted(event) {
      console.log(event);
      this.selectedFile = event.target.files[0];
    },
    updatelimitcardamount() {
      if (this.selected.LIMIT_TYPE != "ACCOUNT" && this.selected.LIMIT_TYPE != "CUSTOMER") {
        //  alert(this.amount + "_" +this.card_no +"_" + this.user_id + "_" + this.currency_id + "_" + this.fund_mob);

        axios
          .post(
            "http://10.0.22.236:9889/api/update/update_limitamount",

            {
              amount: this.amount,
              card_no: this.card_no,
              user_id: this.user_id,
              currency_id: this.currency_id,
              fund_mob: this.fund_mob,
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((response) => {
            if (response.data.status == "success") {
              this.editdata = false;
              this.updatesuccess = true;
              // window.location.reload();
              console.log(response);

              axios
                .post("http://10.0.22.236:9889/api/post/postgetlimitAmount", {
                  cardno: this.cardno,
                })
                .then((response) => {
                  this.getdata = response.data.data;
                });
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
      } else {
        this.editdata = false;
        this.validatelimit = true;
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
  color: white;
  text-align: center;
  padding: 2px;
  text-decoration: none;
}

.scrollmenu a:hover {
  background-color: #777;
}
</style>
