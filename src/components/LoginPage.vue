<template>
  <v-app class="inspire" style="font-family: Saysettha OT">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12" :loading="isLoading">
              <v-toolbar dense dark color="primary">
                <v-toolbar-title> ເຂົ້າສູ່ລະບົບ </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      href="https://www.ldblao.la/"
                      icon
                      large
                      target="_blank"
                      v-on="on"
                    >
                      <v-icon large  style="font-size: 18px;">LDB</v-icon>
                    </v-btn>
                  </template>
                
                  <span>LDB Bank</span>
                </v-tooltip>
                &nbsp;
                  
                <v-tooltip right>
                 
                  <template v-slot:activator="{ on }">
                    <v-btn
                      icon
                      large
                      href="https://www.ldblao.la/"
                      target="_blank"
                      v-on="on"
                    >
                      <img src="../assets/logo150.png" width="35px" />
                    </v-btn>
                  </template>
                  <span>ldb bank</span>
                </v-tooltip>
              </v-toolbar>

              <v-card-text>
                <v-form
                  class="form"
                  color="deep-purple accent-4"
                  ref="form"
                  v-model="valid"
                  lazy-validation
                >
                  <v-text-field
                    v-model="email"
                    prepend-icon="mdi-email"
                    label="ອີເມວ"
                    style="width: 300px"
                    :rules="email_Rules"
                    clearable
                  />

                  <v-text-field
                    v-model="password"
                    prepend-icon="mdi-lock"
                    style="width: 300px"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    label="ລະຫັດຜ່ານ"
                    @click:append="show1 = !show1"
                    @keyup.enter="LoginPage()"
                  ></v-text-field>
                </v-form>

                <v-alert style="color: red" v-model="this.loginPageerroremty">
                  <h5>Email and password should not be empty</h5>
                </v-alert>

                <v-alert v-model="this.loginPageerror" style="color: red">{{
                  message
                }}</v-alert>

                <v-alert v-model="this.errconnectionrefused" style="color: red"
                  ><h5>ERR_CONNECTION_REFUSED</h5></v-alert
                >
              </v-card-text>

             
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  :disabled="!valid"
                  color="primary"
                  @click="LoginPage()"
                  @keyup.enter="LoginPage()"
                  >ເຂົ້າສູ່ລະບົບ</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
// const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
import axios from "axios";
export default {
  name: "LoginPage",
  data() {
    return {
      show1: false,
      password: "",
      rules: {
        required: (value) => !!value || "ກະລຸນາປ້ອນລະຫັດຜ່ານກ່ອນ.",
        min: (v) => v.length >= 6 || "ລະຫັດຕ້ອງຫຼາຍກວ່າ 6 ໂຕຂື້ນໄປ",
        emailMatch: () => "The email and password don't match",
      },
      isLoading: false,
      drawer: null,
      email: "",

      loginPageerroremty: false,
      loginPageerror: false,
      errconnectionrefused: false,

      valid: true,
      pass_Rules: [(v) => v.length >= 1 || "ກະລຸນາປ້ອນລະຫັດຜ່ານກ່ອນ"],
      // email_Rules: [(v) => v.length >= 1 || "ກະລຸນາປ້ອນອິເມວກ່ອນ...ຂອບໃຈ"],
      email_Rules: [
  v => !!v || 'E-mail is required',
  v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
 ],
      message: "",
      status: "",
    };
  },
  props: {
    source: String,
  },
  // method
  methods: {
    async LoginPage() {
      this.isLoading = "red";
      // await pause(1500);
      if (this.email !== "" && this.password !== "") {
        let result = await axios
          .post("http://10.0.22.236:9889/api/post/Login", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            if (response.data.status == "success") {
              const token = response.data.token;
              const role = response.data.role;
              const user_id = response.data.user_id;
              const image = response.data.image;
              localStorage.setItem("token", token);
              localStorage.setItem("role", role);
              localStorage.setItem("user_id", user_id);
              localStorage.setItem("image", image);
              (this.message = response.data.message),
                (this.status = response.data.status),
                this.$router.push("/MainView");
              console.log(response);
            } else {
              (this.message = response.data.message),
                (this.status = response.data.status),
                (this.loginPageerror = true);
              console.log(response);
            }
          })
          .catch(function (error) {
            console.log(error);
          })
          .finally(() => {
            this.isLoading = false;
            this.message = "Email or password is incorrect";
          });

        console.warn(result);
        this.loginPageerror = true;
      } else {
        this.loginPageerroremty = true;
      }
    },
  },
  // wacth
  watch: {
    loginPageerroremty(val) {
      if (!val) return;
      setTimeout(() => (this.loginPageerroremty = false), 4000);
    },
    loginPageerror(val) {
      if (!val) return;
      setTimeout(() => (this.loginPageerror = false), 4000);
    },
    errconnectionrefused(val) {
      if (!val) return;
      setTimeout(() => (this.errconnectionrefused = false), 4000);
    },
    isLoading(val) {
      if (!val) return;
      setTimeout(() => (this.isLoading = false), 4000);
    },
  },
};
</script>

<style scoped>
.inspire {
  /* background-color: #00235b; */
  background-image: url('https://media.istockphoto.com/id/843300416/photo/blue-particles-particles-background-stock-image.jpg?s=612x612&w=0&k=20&c=uqmJaS6nkWnZ0vsAJUcqyDLP_R2v5QifR48AabhTvKg=');

-webkit-background-size: cover;
-moz-background-size: cover;
-o-background-size: cover;
background-size: cover;

width: auto;
height: auto;


}
</style>
