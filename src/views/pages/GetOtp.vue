<template>
  <v-card class="CustomerList" style="font-family: phetsarath OT">
    <v-card-title
      dense
      text
      type="info"
      style="
        font-family: phetsarath OT;
        background-color: #4f709c;
        color: white;
      "
      >ຄົ້ນຫາ OTP ຕາມດ້ວຍເບີໂທ</v-card-title
    >
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

    <!--  -->
    <v-dialog v-model="this.validateOTP" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="error"> ກະລຸນາປ້ອນເບີໂທລະສັບກອ່ນ! </v-alert>
        <v-card-text class="text-center">
          <div class="text-center">
            <img
              src="https://cdn.dribbble.com/users/251873/screenshots/9388228/error-img.gif"
              height="100"
              width="137"
            />
          </div>
          <br /><span> ໃຫ້ແນ່ໃຈວ່າໃສ່ເບີໂທລະສັບຂອງທ່ານແລ້ວບໍ? </span>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" block text @click="validateOTP = false"
            >ປິດ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--  -->

    <v-card style="font-family: phetsarath OT; background-color: #dbe4c6">
      <v-card-title>
        <v-text-field
          v-model="phoneNumber"
          prepend-icon="mdi-domain"
          type="number"
          label="ກະລຸນາປ້ອນເບີໂທລະສັບ (20 xx xx xx)"
          style="width: 200px"
          :rules="inputRules"
          clearable
            @keyup.enter="searchinfo()"
        />

        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          outlined
          @click="searchinfo()"
          style="font-size: 12px; height: 30px; width: 30px"  
          @keyup.enter="searchinfo()"
          ><v-icon color="blue">mdi-magnify</v-icon>ຄົ້ນຫາ</v-btn
        >
        <v-spacer></v-spacer>
        <v-text-field
          style="color: blue"
          v-model="search"
          append-icon="search"
          label="Search Cause"
          single-line
          hide-details
          clearable
        ></v-text-field>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="getdata"
        ref="myTable"
        :search="search"
        :items-per-page="5"
        class="elevation-1"
        :loading="isLoading"
        height="230"
        :item-height="10"
      />
    </v-card>
    <!--  -->
  </v-card>
</template>
<script lang="ts">
import axios from "axios";
export default {
  name: "GetOtp",
  props: ["data"],
  data() {
    return {
      validateOTP: false,
      search: "",
      phoneNumber: "",
      inputRules: [(v) => v.length >= 1 || "ກະລຸນາປ້ອນເບີໂທລະສັບຂອງເຈົ້າ*"],
      isLoading: false,
      options: {},
      headers: [
        { text: "ລະ​ຫັດ​​", value: "ID" },
        { text: "ຜູ້ຮັບ", value: "RECIPIENT" },
        { text: "ວັນທີ", value: "CREATE_DATE" },
        { text: "ຂໍ້ຄວາມ", value: "TEXT" },
      ],
      getdata: [],

      valid: false,
      datanotfound: false,
      message: "",
      status: "",
    };
  },
  methods: {
    searchinfo() {
      if (this.phoneNumber !== "") {
        this.isLoading = "red";
        axios
          .post("http://10.0.22.236:9889/api/post/postgetmobileotp", {
            phoneNumber: this.phoneNumber,
            headers: {
              "Content-Type": "multipart/form-data",
            },
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
        this.validateOTP = true;
      }
    },
  },
};
</script>
