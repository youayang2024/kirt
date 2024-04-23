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
        >ຂໍ້ມູນ Merchant QR</v-card-title
      >
      <!-- dialog data is null -->
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
  
      <v-dialog v-model="this.validate_date" max-width="500px">
        <v-card style="font-family: phetsarath OT">
          <v-alert dense text type="error"> ກະລຸນາປ້ອນຊື່ກ່ອນ! </v-alert>
          <v-card-text class="text-center">
            <div class="text-center">
              <img
                src="https://cdn.dribbble.com/users/251873/screenshots/9388228/error-img.gif"
                height="100"
                width="137"
              />
            </div>
            <br /><span> ໃຫ້ແນ່ໃຈວ່າປ້ອນຊື່ແລ້ວບໍ? </span>
          </v-card-text>
          <v-card-actions>
            <v-btn color="error" block text @click="validate_date = false"
              >ປິດ</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-card style="font-family: phetsarath OT; background-color: #dbe4c6" scrollmenu>
        <v-card-title>
          <!-- <v-spacer></v-spacer> -->
          <v-text-field
            v-model="merchantname"
            prepend-icon="mdi-name"
           
            label="ປ້ອນຊື່ *"
            style="width: 200px; font-family: saysettha-ot;"
            :rules="inputRules"
            clearable
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
          style="background-color: white"
          :headers="headers"
          :items="getdata"
          ref="myTable"
          :search="search"
          class="elevation-1"
          :items-per-page="5"
          :loading="isLoading"
        />
      </v-card>
      <!--  -->
    </v-card>
  </template>
  <script lang="ts">
  import axios from "axios";
 

  import "jspdf-autotable";
  export default {
    name: "CheckMerchantAccount",
    props: ["data"],
  
    data() {
      return {
    
        validate_date: false,
        search: "",
        merchantname: "",
      
        inputRules: [(v) => v.length >= 1 || "ປ້ອນຊື່ Merchant QR*"],
        inputRule: [(v) => v.length >= 1 || "ປ້ອນເລກບັນຊີ 4 ໂຕທາງທ້າຍ*"],
        inputID: [(v) => v.length >= 1 || "ກະລຸນາປ້ອນລະຫັດ"],
        isLoading: false,
        options: {},
        headers: [
          { text: "QR_TYPE", value: "QR_TYPE" },
          { text: "BR_ID", value: "BR_ID" },
          { text: "BR_NAME", value: "BR_NAME" },
           { text: "COCODE", value: "COCODE" },
          { text: "MERCHANT_DATE", value: "MERCHANT_DATE" },
            { text: "MERCHANT_ID", value: "MERCHANT_ID" },
            { text: "ACCOUNT", value: "ACCOUNT" },
            { text: "ACCOUNT_NAME", value: "ACCOUNT_NAME" },
            { text: "MOBILE_NO", value: "MOBILE_NO" },
            { text: "ADDRESS", value: "ADDRESS" },
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
        if (this.merchantname !== "") {
          this.isLoading = "red";
          axios
            .post("http://10.0.22.236:9889/api/post/post_get_merchantaccountnumber", {
                merchantname: this.merchantname,
             
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
          this.validate_date = true;
        }
      },
    
  
    
    },
  };
  </script>
  
  
  <style scoped>
  
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