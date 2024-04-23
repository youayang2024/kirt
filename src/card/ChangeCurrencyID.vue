div
<template>
  <v-card>
    <v-alert dense text type="" style="font-family: phetsarath OT; color: blue"
      >ປ່ຽນ Currency ID ບໍ່ກົງກັບ T24</v-alert
    >
    <!-- dialog data is null -->
    <v-dialog v-model="this.datanotfound" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="warning"> ບໍ່ພົບເລກບັນຊີ </v-alert>

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
      <v-text-field
        v-model="accountNumber"
        prepend-icon="mdi-credit-card"
        label="ກະລຸນາປ້ອນໝາຍເລກບັນຊີ"
        style="width: 900px"
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
        > </v-card-actions
      ><v-spacer></v-spacer>
    </v-card-title>
    <!--  -->
    <v-dialog v-model="this.validate_date" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="error"> ກະລຸນາປ້ອນເລກບັນຊີກ່ອນ! </v-alert>
        <v-card-text class="text-center">
          <div class="text-center">
            <img
              src="https://cdn.dribbble.com/users/251873/screenshots/9388228/error-img.gif"
              height="100"
              width="137"
            />
          </div>
          <br /><span> ໃຫ້ແນ່ໃຈວ່າປ້ອນເລກບັນຊີແລ້ວບໍ? </span>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" block text @click="validate_date = false"
            >ປິດ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--  -->
    <v-dialog
      v-model="editdata"
      max-width="800px"
      style="font-family: phetsarath OT"
    >
      <v-card style="font-family: phetsarath OT">
        <v-alert type="info" style="font-family: phetsarath OT"
          >ອັບເດດຂໍ້ມູນ CURRENCY ID</v-alert
        >

        <v-form>
          <div class="container">
            <v-card class="pa-20" outlined>
              <v-card-title>
                <v-text-field
                  v-model="accountNumber"
                  prepend-icon="mdi-credit-card"
                  label="ເລກບັນຊີ"
                  style="width: 200px"
                  clearable
                  disabled="false"
                />
                &nbsp; &nbsp;
                <v-combobox
                  label="Currency ID"
                  v-model="currency"
                  type="number"
                  :items="['978', '418', '156', '764', '840', '704']"
                ></v-combobox>
                <!-- <v-text-field
                v-model="accountName"
                prepend-icon="mdi-money"
                label="Currency ID"
                style="width: 200px"
                 type="number"
                clearable
              /> --></v-card-title
              >
            </v-card>
          </div>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="primary" text @click="editdata = false">ປິດ</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="updateAccountName()"
            >ຢືນຢັນການອັບເດດ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="this.updatesuccess" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="success">
          ຂໍ້ມູນຂອງທ່ານຖືກ Updated ສຳເລັດແລ້ວ
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
        <v-alert dense text type="error"> ກະລຸນາປ້ອນ Currency ກ່ອນ! </v-alert>
        <v-card-text class="text-center">
          <div class="text-center">
            <img
              src="https://cdn.dribbble.com/users/251873/screenshots/9388228/error-img.gif"
              height="100"
              width="137"
            />
          </div>
          <br /><span> ກະລຸນາປ້ອນ Currency ID ກ່ອນ</span>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" block text @click="validatelimit = false"
            >ປິດ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-card style="font-family: phetsarath OT">
      <v-data-table
        :headers="headers"
        :items="getdata"
        :items-per-page="15"
        class="elevation-1"
        :loading="isLoading"
        height="290"
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
      </v-data-table>
    </v-card>
    <!--  -->
  </v-card>
</template>
<script lang="ts">
import axios from "axios";
export default {
  name: "ChangeCurrencyID",
  props: ["data"],
  data() {
    return {
      accountNumber: "",
      validatelimit: false,
      isLoading: false,
      updatesuccess: false,
      editdata: false,
      selectarecord: false,

      currency_id: "",
      accountName: "",
      fund_mob: "",
      validate_date: false,
      options: {},
      selected: [],
      headers: [
        { text: "", value: "checkbox" },
        { text: "ເລກບັນຊີ", value: "0" },
        { text: "ACCTLMT_COMPONENT", value: "1" },
        { text: "ປະເພດບັນຊີ", value: "2" },
        { text: "MOD_DATE", value: "3" },
        { text: "MOB_USER", value: "4" },
        { text: "REFRESH_DATE", value: "5" },
        { text: "Operator", value: "actions" },
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

  methods: {
    searchinfo() {
      if (this.accountNumber !== "") {
        this.isLoading = "red";
        axios
          .post("http://10.0.22.236:9889/api/post/changecurrencyid", {
            accountNumber: this.accountNumber,
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
        this.validate_date = true;
      }
    },
    checkupdates() {
      if (this.selected.length - 1 > 0) {
        (this.accountNumber = this.selected[0]),
          (this.currency = this.selected[2]),
          (this.editdata = true);
        //
      } else {
        this.selectarecord = true;
      }
    },

    updateAccountName() {
      if (this.currency != "" && this.accountNumber != "") {
        axios
          .post("http://10.0.22.236:9889/api/update/UpdateCurrencyid", {
            accountNumber: this.accountNumber,
            currency: this.currency,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.data.status == "success") {
              this.editdata = false;
              this.updatesuccess = true;

              //

              axios
                .post("http://10.0.22.236:9889/api/post/changecurrencyid", {
                  accountNumber: this.accountNumber,
                })
                .then((response) => {
                  if (response.data.status == "success") {
                    this.getdata = response.data.data;
                  }
                });

              //

              console.log(response);
            } else {
              this.validatelimit = true;
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
</style>
