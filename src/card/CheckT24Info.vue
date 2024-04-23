<template>
  <v-card style="font-family: phetsarath OT">
    <v-card-title style="background-color: ">
      <v-text-field
        v-model="account_number"
        prepend-icon="mdi-chevron-right"
        type="number"
        label="ເລກບັນຊີ"
        style="width: 200px; color: blue"
        clearable
        @keyup.enter="searchinfo()"
      >
      </v-text-field>

      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        text
        outlined
        @click="searchinfo()"
        @keyup.enter="searchinfo()"
        style="font-size: 12px; height: 30px; width: 30px; color: blue"
        ><v-icon>mdi-magnify</v-icon>ຄົ້ນຫາ</v-btn
      >
      <v-spacer></v-spacer>
      <v-text-field
        style="color: blue"
        v-model="search"
        label="Search Information"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      style="
        background-color: white;
        color: blue;
        font-family: phetsarath OT;
        color: #068fff;
      "
      :headers="headers"
      :items="getdata"
      :items-per-page="5"
      :search="search"
      class="elevation-1"
      height="320"
      :item-height="10"
      :loading="isLoading"
    >
       <template #[`item.BALANCE`]="{ item }">
        {{   formattedNumber(item.BALANCE) }}

        </template>
    </v-data-table>
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
    <v-dialog
      v-model="this.validateRole"
      max-width="500px"
      style="font-family: phetsarath OT"
    >
      <v-card>
        <v-alert dense text type="error" style="font-family: phetsarath OT">
          ລະບົບບໍ່ອະນຸຍາດໃຫ້ທ່ານໃນເມນູນີ້!...ກະລຸນາຕິດຕໍ່ຜູ້ເບິ່ງແຍງລະບົບຂອງທ່ານ
        </v-alert>
        <div class="text-center">
          <img
            src="https://cdn.dribbble.com/users/251873/screenshots/9388228/error-img.gif"
            height="100"
            width="137"
          />
        </div>
        <v-card-text class="text-center" style="font-family: phetsarath OT">
          ຂໍໂທດຫຼາຍໆ ສິດຂອງທ່ານບໍ່ພຽງພໍ
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="error"
            block
            @click="validateRole = false"
            style="font-family: phetsarath OT"
            >ປິດ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="this.datanotfound" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="warning"> ຄົ້ນຫາບໍ່ພົບຂໍ້ມູນຂອງທ່ານ </v-alert>
        <div class="text-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/eb/Blinking_warning.gif"
            height="80"
            width="100"
          />
        </div>
        <v-card-text class="text-center"> ກະລຸນາລອງອີກຄັ້ງ.... </v-card-text>
        <v-card-actions>
          <v-btn color="error" block text @click="datanotfound = false"
            >ປິດ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tab: "",
      role: localStorage.getItem("role"),
      user_id: localStorage.getItem("user_id"),
      validate_date: false,
      validateRole: false,
      isLoading: false,
      datanotfound: false,
      search: "",
      account_number: "",
      headers: [
        { text: "ເລກບັນຊີ", value: "ACC", header: "center" },
        { text: "ໝາຍເລກລູກຄ້າ", value: "CUS_ID" },
        { text: "ຍອດເງິນ", value: "BALANCE" },
        { text: "ເງິນຕາ", value: "CURRENCY" },
        { text: "ຊື່ລູກຄ້າ", value: "CUS_NAME" },
      ],
      getdata: [],
      amount_balance: "",
    };
  },

  methods: {
      formattedNumber(BALANCE) {
         return BALANCE.toLocaleString()
      },
    searchinfo() {
      if (this.role == "0" && this.user_id == "KIRT") {
        if (this.account_number !== "") {
          this.isLoading = "red";
          axios
            .post("http://10.0.22.236:9889/api/get/T24_info", {
              account_number: this.account_number,
              user_id: this.user_id,
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
              } else if (response.data.status == "error_permission") {
                this.validateRole = true;
                console.log(response);
                return;
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
      } else {
        this.validateRole = true;
      }
    },
  },
};
</script>
