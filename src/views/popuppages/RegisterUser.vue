<template>
  <div class="PopupCustomerCom" style="font-family: phetsarath OT">
    <v-alert dense text type="success" style="font-family: phetsarath OT">
      ລົງທະບຽນຜູ້ໃຊ້
    </v-alert>
    <!--  -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert type="warning"
          >ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການບັນທຶກຂໍ້ມູນຂອງທ່ານ?</v-alert
        >

        <v-card-text
          >ຖ້າຫາກວ່າທ່ານແນ່ໃຈວ່າຖືກຕ້ອງ,ກະລຸນາກົດທີ່ຢືນຢັນການເພີ່ມ</v-card-text
        >
        <v-card-actions>
          <v-btn color="primary" text @click="dialog = false">ຍົກເລີກ</v-btn>
          <v-btn color="primary" text @click="add()">ຢືນຢັນການເພີ່ມ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--  -->
    <!-- dialog popupdataincorrect-->

    <v-dialog v-model="this.popupdataincorrect" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="error">
          ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບກ່ອນ...ຂອບໃຈ!
        </v-alert>
        <v-card-text class="text-center">
          Please check your information correct?
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="popupdataincorrect = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--  -->
    <!-- dialog popupdatasuccess-->

    <v-dialog v-model="this.popupdatasuccess" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="success">
          ຂໍ້ມູນຂອງທ່ານບັນທຶກສຳເລັດແລ້ວ
        </v-alert>

        <div class="text-center">
          <img
            src="https://media.tenor.com/0AVbKGY_MxMAAAAM/check-mark-verified.gif"
            height="60"
            width="60"
          />
        </div>
        <v-card-text class="text-center"> ຂອບໃຈ </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            block
            @click="popupdatasuccess = false"
            to="/ListResgisterUser"
            >ປິດ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--  -->
    <!-- dialog popupdataincorrectfailed-->

    <v-dialog v-model="this.popupdataincorrectfailed" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="error"> Wrong </v-alert>
        <v-card-text class="text-center">
          Insert Failed...try again
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="popupdataincorrectfailed = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--  -->
    <v-dialog v-model="this.dataisnull" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="error">
          ກະລຸນາປ້ອນຂໍ້ມູນຂອງທ່ານຖືກຕ້ອງກ່ອນ
        </v-alert>
        <div class="text-center">
          <img
            src="https://cdn.dribbble.com/users/251873/screenshots/9388228/error-img.gif"
            height="100"
            width="137"
          />
        </div>
        <v-card-text class="text-center">
          ຂໍ້ມູນຂອງທ່ານຍັງບໍ່ຄົບ ແລະ ບໍ່ຖືກຕ້ອງ
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" block text @click="dataisnull = false"
            >ປິດ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="this.check_email_before" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="error">
          Email ທີ່ທ່ານປ້ອນໄປນັ້ນມີແລ້ວ
        </v-alert>
        <div class="text-center">
          <img
            src="https://cdn.dribbble.com/users/251873/screenshots/9388228/error-img.gif"
            height="100"
            width="137"
          />
        </div>
        <v-card-text class="text-center">
          ກະລຸນາແກ້ໄຂຂໍ້ມູນຂອງທ່ານແລ້ວລອງໃໝ່
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" block text @click="check_email_before = false"
            >ປິດ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--  -->
    <v-form
      class="container"
      color="deep-purple accent-4"
      ref="form"
      lazy-validation
      v-model="valid"
      @reset="resetData"
      style="font-family: phetsarath OT; height: 430px"
    >
      <div>
        <v-card-title>
          <v-text-field
            v-model="user_name"
            prepend-icon="mdi-account"
            label="ຊື່ຜູ້ໃຊ້"
            style="width: 200px"
            :rules="inputRules"
            clearable
          >
          </v-text-field>

          <v-text-field
            v-model="last_name"
            prepend-icon="mdi-money"
            label="ນາມສະກຸນ"
            style="width: 200px"
            :rules="inputRules"
            clearable
          >
          </v-text-field>
          <v-text-field
            v-model="user_id"
            prepend-icon="mdi-money"
            label="ລະຫັດຜູ້ໃຊ້"
            style="width: 200px"
            :rules="inputRules"
            clearable
          >
          </v-text-field>
          <v-text-field
            v-model="tel"
            prepend-icon="mdi-money"
            label="ເບີໂທ"
            style="width: 200px"
            :rules="inputRules"
            clearable
          >
          </v-text-field>
          <v-text-field
            v-model="email"
            prepend-icon="mdi-money"
            label="ອິເມວ"
            style="width: 200px"
            :rules="inputRules"
            clearable
          >
          </v-text-field>
          <v-text-field
            v-model="password"
            prepend-icon="mdi-money"
            label="ລະຫັດຜ່ານ"
            type="password"
            style="width: 200px"
            :rules="inputRules"
            clearable
          >
          </v-text-field>
          <!-- date -->

          <v-col cols="12" lg="6">
            <v-menu
              ref="menu1"
              v-model="menu1"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="create_date"
                  label="ວັນທີ່"
                  persistent-hint
                  prepend-icon="event"
                  @blur="date = parseDate(create_date)"
                  v-on="on"
                  max-width="290px"
                  min-width="290px"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                no-title
                @input="menu1 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-file-input
            v-model="selectedFile"
            max-width="290px"
            min-width="290px"
            label="ກະລຸນາເລືອກໄຟລ໌ຮູບພາບ"
            placeholder="Select your image files"
            @change="onFilesSelectted($event)"
          ></v-file-input>
        </v-card-title>
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          :disabled="!valid"
          color="green"
          text
          outlined
          @click="validate()"
          style="font-size: 12px; height: 30px; width: 30px"
          >ເພີ່ມ</v-btn
        >
        <v-btn
          color="primary"
          text
          outlined
          to="/ListResgisterUser"
          style="font-size: 12px; height: 30px; width: 30px"
          >ກັບຄືນ</v-btn
        >
        <v-btn
          color="red"
          text
          outlined
          @click="resetData()"
          style="font-size: 12px; height: 30px; width: 30px"
          >ຍົກເລິກ</v-btn
        >
      </v-card-actions>
    </v-form>
    <!--  -->
  </div>
</template>

<script lang="ts">
import axios from "axios";
export default {
  name: "RegisterUser",
  data(vm) {
    return {
      date: new Date().toISOString().substr(0, 10),
      create_date: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,
      valid: true,
      selectedFile: "",
      myFile: "",
      dataisnull: false,
      dialog: false,
      popupdataincorrect: false,
      popupdatasuccess: false,
      popupdataincorrectfailed: false,
      check_email_before: false,
      user_name: "",
      last_name: "",
      user_id: "",
      tel: "",
      email: "",
      password: "",

      inputRules: [(v) => v.length >= 1 || "Minimum lenght is 1 charachters"],

      message: "",
      status: "",
      check_email: "",
    };
  },

  methods: {
    // formatted date
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${year}-${month}-${day}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    // end formatted date

    onFilesSelectted(event) {
      console.log(event);
      this.selectedFile = event.target.files[0];
    },

    async add() {
      if (
        this.user_name !== "" &&
        this.last_name !== "" &&
        this.UsreID !== "" &&
        this.tel !== "" &&
        this.email !== "" &&
        this.password !== ""
      ) {
        //

        axios
          .post("http://10.0.22.236:9889/api/post/postgetemail", {
            email: this.email,
          })
          .then((response) => {
            if (response.data.validate_email == "1") {
              this.dialog = false;

              this.check_email_before = true;
              console.log(response);
            } else {
              const formData = new FormData();
              formData.append("user_name", this.user_name);
              formData.append("last_name", this.last_name);
              formData.append("user_id", this.user_id);
              formData.append("tel", this.tel);
              formData.append("email", this.email);
              formData.append("password", this.password);
              formData.append("create_date", this.create_date);
              formData.append(
                "myFile",
                this.selectedFile,
                this.selectedFile.name
              );
              axios
                .post(
                  "http://10.0.22.236:9889/api/post/resgisteruser",
                  formData,
                  {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  }
                )
                .then((response) => {
                  if (!response.data) {
                    console.log(response);
                    this.dialog = false;
                    this.popupdataincorrectfailed = true;
                  } else {
                    console.log(response);
                    this.dialog = false;
                    this.popupdatasuccess = true;
                  }
                })
                .catch((err) => console.log(err.response));
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
        this.dialog = false;
        this.popupdataincorrect = true;
      }
    },
    resetData() {
      this.user_name = "";
      this.last_name = "";
      this.user_id = "";
      this.tel = "";
      this.email = "";
      this.password = "";
      this.file = "";
    },

    validate() {
      if (
        (this.user_name == "",
        this.last_name == "",
        this.user_id == "",
        this.tel == "",
        this.email == "",
        this.password == "",
        this.selectedFile == "")
      ) {
        this.dataisnull = true;
      } else {
        this.dialog = true;
      }
    },
  },
  watch: {
    date() {
      this.create_date = this.formatDate(this.date);
    },
  },
};
</script>
