<template>
  <v-card class="CustomerList" style="font-family: phetsarath OT">
    <v-alert dense text type="" style="font-family: phetsarath OT"
      >ລາຍລະອຽດລົງທະບຽນຂໍ້ມູນຜູ້ໃຊ້</v-alert
    >
    <!-- deletedata -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert type="warning"
          >ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບຂໍ້ມູນຂອງທ່ານ?</v-alert
        >
        <v-card-text>
          ຖ້າແນ່ໃຈວ່າຂໍ້ມູນຂອງທ່ານຖືກຕ້ອງ, ກະລຸນາກົດຢືນຢັນການລຶບ</v-card-text
        >
        <v-card-actions>
          <v-btn color="primary" text @click="dialog = false">ຍົກເລີກ</v-btn>
          <v-btn color="primary" text @click="drop()">ຢືນຢັນການລຶບ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- end deletedata -->
    <v-dialog v-model="this.deletesuccess" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="success">
          ຂໍ້ມູນຂອງທ່ານຖືກລຶບສຳເລັດແລ້ວ
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
            @click="deletesuccess = false"
            to="/ListResgisterUser"
            >ປິດ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- edit -->
    <v-dialog
      v-model="editdata"
      max-width="800px"
      style="font-family: phetsarath OT"
    >
      <v-card style="font-family: phetsarath OT">
        <v-alert type="info" style="font-family: phetsarath OT"
          >ອັບເດດຂໍ້ມູນຂອງທ່ານ</v-alert
        >

        <v-form>
          <div class="text-center">
            <Label style="color: red"
              >ທຸກໆຄັ້ງທີ່ຕ້ອງການອັບແດດຂໍ້ມູນແມ່ນໃຫ້ປ່ຽນລະຫັດນຳ ຫຼື
              ຖ້າບໍ່ຕ້ອງການປ່ຽນລະຫັດແມ່ນໃຫ້ປ້ອນລະຫັດເກົ່າຄືນ</Label
            >
          </div>
          <div class="container">
            <v-card-title>
              <v-text-field
                v-model="user_name"
                prepend-icon="mdi-account"
                label="ຊື່ຜູ້ໃຊ້"
                style="width: 200px"
                clearable
              />
              <v-text-field
                v-model="last_name"
                prepend-icon="mdi-money"
                label="ນາມສະກຸນ"
                style="width: 200px"
                clearable
              />
              <v-text-field
                v-model="user_id"
                prepend-icon="mdi-money"
                label="ລະຫັດຜູ້ໃຊ້"
                style="width: 200px"
                clearable
              />
              <v-text-field
                v-model="tel"
                prepend-icon="mdi-money"
                label="ເບີໂທ"
                style="width: 200px"
                clearable
              />
              <v-text-field
                v-model="password"
                prepend-icon="mdi-money"
                label="ລະຫັດຜ່ານ"
                type="password"
                style="width: 200px"
                clearable
              />
              <v-file-input
                v-model="selectedFile"
                max-width="290px"
                min-width="290px"
                label="ກະລຸນາເລືອກໄຟລ໌ຮູບພາບ"
                placeholder="Select your image files"
                @change="onFilesSelectted($event)"
              />
            </v-card-title>
          </div>
          <!--  @change="onFilesSelectted($event)" -->
        </v-form>
        <v-card-actions>
          <v-btn color="primary" text @click="editdata = false">ປິດ</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="Editdata()"
            >ຢືນຢັນການອັບເດດ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- end edit -->
    <v-dialog
      v-model="viewdata"
      max-width="800px"
      style="font-family: phetsarath OT"
    >
      <v-card>
        <v-alert type="success" style="font-family: phetsarath OT"
          >ລາຍລະອຽດຂອງຂໍ້ມູນຜູ້ໃຊ້</v-alert
        >
        <div class="container" style="font-family: phetsarath OT">
          <v-card class="pt-4 mx-auto" flat max-width="800">
            <v-layout tag="v-card-text" text-xs-left wrap>
              <v-card-actions v-for="row in viewinfo" v-bind:key="row.id">
                <div class="text-center">
                  <img :src="`${row.IMAGE}`" height="100px" width="100px" />
                </div>
                &nbsp; &nbsp;

                <v-spacer></v-spacer>
                <row>
                  <v-flex tag="strong" xs2 text-xs-right mr-3 mb-2>ຊື່:</v-flex
                  ><v-flex>{{ row.USER_NAME }} </v-flex>
                </row>
                &nbsp; &nbsp;
                <row>
                  <v-flex tag="strong" xs2 text-xs-right mr-3 mb-2
                    >ນາມສະກຸນ:</v-flex
                  >
                  <v-flex>{{ row.LAST_NAME }}</v-flex>
                </row>
                &nbsp; &nbsp;
                <row>
                  <v-flex tag="strong" xs2 text-xs-right mr-3 mb-2
                    >ລະຫັດຜູ້ໃຊ້:</v-flex
                  >
                  <v-flex>{{ row.USER_ID }}</v-flex>
                </row>
                &nbsp; &nbsp;
                <row>
                  <v-flex tag="strong" xs2 text-xs-right mr-3 mb-2
                    >ເບີໂທ:</v-flex
                  >
                  <v-flex>{{ row.TEL }}</v-flex>
                </row>
                &nbsp; &nbsp;
                <row>
                  <v-flex tag="strong" xs2 text-xs-right mr-3 mb-2
                    >ອິເມວ:</v-flex
                  >
                  <v-flex>{{ row.EMAIL }}</v-flex>
                </row>
                &nbsp; &nbsp;

                <row>
                  <v-flex tag="strong" xs2 text-xs-right mr-3 mb-2
                    >ວັນທີ່:</v-flex
                  >
                  <v-flex>{{ row.CREATE_DATE }}</v-flex>
                </row>
              </v-card-actions>
            </v-layout>
          </v-card>
        </div>

        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            color="primary"
            text
            @click="viewdata = false"
            style="font-family: phetsarath OT"
            >ປິດ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- end viewdata -->
    <!-- dropdataincorrect -->
    <v-dialog v-model="this.dropdataincorrect" max-width="500px">
      <v-card>
        <v-alert dense text type="error">
          Please select record your want to drop first
        </v-alert>
        <v-card-text class="text-center">
          Make sure your information correct?
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" block text @click="dropdataincorrect = false"
            >ປິດ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- end dropdataincorrect -->
    <v-dialog v-model="this.selectarecord" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="error">
          ກະລຸນາເລືອກລາຍການທີ່ທ່ານຕ້ອງການ!
        </v-alert>
        <div class="text-center">
          <img
            src="https://cdn.dribbble.com/users/251873/screenshots/9388228/error-img.gif"
            height="100"
            width="137"
          />
        </div>
        <v-card-text class="text-center">
          ໃຫ້ແນ່ໃຈວ່າທ່ານເລືອກຂໍ້ມູນຖືກຕ້ອງບໍ?
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" block text @click="selectarecord = false"
            >ປິດ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="this.selectarecorddele" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="error">
          ກະລຸນາເລືອກລາຍການທີ່ທ່ານຕ້ອງການ!
        </v-alert>
        <div class="text-center">
          <img
            src="https://cdn.dribbble.com/users/251873/screenshots/9388228/error-img.gif"
            height="100"
            width="137"
          />
        </div>
        <v-card-text class="text-center">
          ໃຫ້ແນ່ໃຈວ່າຂໍ້ມູນຂອງທ່ານຖືກຕ້ອງບໍ?
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" block text @click="selectarecorddele = false"
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
          ລະບົບບໍ່ອະນຸຍາດໃຫ້ທ່ານອະນຸມັດ...ກະລຸນາຕິດຕໍ່ຜູ້ເບິ່ງແຍງລະບົບຂອງທ່ານ
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
    <v-dialog
      v-model="this.validate_image"
      max-width="500px"
      style="font-family: phetsarath OT"
    >
      <v-card>
        <v-alert dense text type="error" style="font-family: phetsarath OT">
          ກະລຸນາເລືອກຮູບກ່ອນ
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
    <v-dialog v-model="this.popupdatasuccess" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="success">
          ຂໍ້ມູນຂອງທ່ານອັບເດດສຳເລັດແລ້ວ
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
    <v-card style="font-family: phetsarath OT; background-color: #dbe4c6">
      <v-card-title>
        <!-- <v-spacer></v-spacer> -->

        <v-btn
          v-if="isAuthorized"
          color="primary"
          outlined
          text
          @click="ValidateAdd()"
          style="
            font-size: 12px;
            height: 30px;
            width: 30px;
            font-family: phetsarath OT;
          "
        >
          ເພີ່ມ</v-btn
        >
        &nbsp; &nbsp; &nbsp;
        <v-text-field
          style="color: blue"
          v-model="search"
          append-icon="search"
          label="Search Cause"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>

      <v-data-table
        style="background-color: white-space: nowrap;"
        :headers="headers"
        :items="getdata"
        :search="search"
        :items-per-page="5"
        class="elevation-1"
        :loading="isLoading"
      >
        <!-- action button -->
        <template #[`item.actions`]>
          <div>
            <v-icon
              style="color: green; font-size: 18px"
              @click="updateinfo()"
              v-if="isAuthorized"
              >mdi-pencil</v-icon
            >
            &nbsp;
            <v-icon
              color="error"
              @click="ValidateDeleteUser()"
              v-if="isAuthorized"
              >mdi-delete</v-icon
            >
            &nbsp;
            <v-icon color="green" @click="displayrecord()">mdi-eye</v-icon>
          </div>
        </template>

        <template #[`item.checkbox`]="{ item }">
          <div>
            <input type="radio" :value="item.EMAIL" v-model="selected" />
          </div>
        </template>
        <template #[`item.IMAGE`]="{ item }">
          <v-img
            :src="item.IMAGE"
            alt=""
            width="40"
            height="40"
            class="rounded-circle"
          ></v-img>
        </template>
      </v-data-table>
    </v-card>
    <!--  -->
  </v-card>
</template>
<script lang="ts">
import axios from "axios";
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export default {
  name: "ListResgisterUser",
  props: ["data"],
  data() {
    return {
      isAuthorized: false,
      errorfailed: "",
      user_name: "",
      last_name: "",
      user_id: "",
      tel: "",
      password: "",
      selectedFile: "",

      token: localStorage.getItem("token"),
      role: localStorage.getItem("role"),
      Validate_token: "",
      isLoading: false,
      validateRole: false,
      validate_image: false,
      popupdatasuccess: false,
      search: "",
      options: {},
      headers: [
        { text: "", value: "checkbox" },
        { text: "ຮູບ", value: "IMAGE" },
        { text: "ຊື່", value: "USER_NAME", width: 100 },
        { text: "ນາມສະກຸນ", value: "LAST_NAME", width: 100 },
        { text: "ລະຫັດຜູ້ໃຊ້", value: "USER_ID", width: 100 },
        { text: "ເບີໂທ", value: "TEL" },
        { text: "ອິເມວ", value: "EMAIL" },
        { text: "ວັນທີ່", value: "CREATE_DATE", width: 150 },
        { text: "ການກະທໍາ", value: "actions", width: 150 },
      ],
      getdata: [],
      getUpdateinfo: [],

      selected: "",
      dropdataincorrect: false,
      deletesuccess: false,
      selectarecord: false,
      selectarecorddele: false,
      dialog: false,
      editdata: false,
      viewdata: false,
      message: "",
      status: "success",
      viewinfo: [],
      checking_token: localStorage.getItem("token"),

      access: localStorage.getItem("user_id"),
    };
  },
  async created() {
    // this.user_name = this.getUpdateinfo[0].USER_NAME;

    if (this.access == "KIRT") {
      this.isAuthorized = true;
    } else {
      this.isAuthorized = false;
    }
  },
  watch: {
    error(val) {
      if (!val) return;
      setTimeout(() => (this.error = false), 4000);
    },
    success(val) {
      if (!val) return;

      setTimeout(() => (this.success = false), 4000);
    },
  },
  mounted() {
    this.isLoading = "red";
    axios
      .get("http://10.0.22.236:9889/api/get/getuserresgisterlist")
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
  methods: {
    drop() {
      if (this.selected[this.selected.length - 1]) {
        axios
          .delete(
            "http://10.0.22.236:9889/api/delete/api/deleteresgisteruser/" +
              this.selected
          )
          .then(function (response) {
            if (!response.data) {
              // delete failed

              console.log(response);
            } else {
              // delete successfully
              console.log(response);
            }
          })
          .catch(function (error) {
            console.log(error);
          });

        if (this.status == "success") {
          this.dialog = false;
          this.deletesuccess = true;
          pause(1500);
          window.location.reload();
        } else {
          this.dropdataincorrect = true;
        }
      } else {
        this.dialog = false;
        this.dropdataincorrect = true;
      }
    },
    check_reconrd() {
      if (this.selected[this.selected.length - 1]) {
        this.viewdata = true;
      } else {
        this.selectarecord = true;
      }
    },
    check_reconrddelete() {
      if (this.selected[this.selected.length - 1]) {
        this.dialog = true;
      } else {
        this.selectarecorddele = true;
      }
    },
    // get deatil from database
    displayrecord() {
      if (this.selected == "") {
        this.selectarecord = true;
      } else {
        axios
          .post("http://10.0.22.236:9889/api/post/postgetUserinfo", {
            email_id: this.selected,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (!response) {
              // gte data failed

              console.log(response);
            } else {
              this.viewinfo = response.data;
              this.viewdata = true;
              // get data successfully
              console.log(response);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    updateinfo() {
      if (this.selected == "") {
        this.selectarecord = true;
      } else {
        axios
          .post("http://10.0.22.236:9889/api/post/postgetUserinfoupdate", {
            email_id: this.selected,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (!response) {
              // gte data failed

              console.log(response);
            } else {
              this.user_name = response.data.user_name;
              this.last_name = response.data.last_name;
              this.user_id = response.data.user_id;
              this.tel = response.data.tel;
              this.password = response.data.password;

              this.getUpdateinfo = response.data;
              this.editdata = true;
              // get data successfully

              console.log(response);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    onFilesSelectted(event) {
      console.log(event);
      this.selectedFile = event.target.files[0];
    },
    Editdata() {
      if (
        this.user_name !== null &&
        this.last_name !== null &&
        this.UsreID !== null &&
        this.tel !== null &&
        this.selected !== null &&
        this.password !== null &&
        this.selectedFile !== ""
      ) {
        //

        const formData = new FormData();
        formData.append("user_name", this.user_name);
        formData.append("last_name", this.last_name);
        formData.append("user_id", this.user_id);
        formData.append("tel", this.tel);
        formData.append("email", this.selected);
        formData.append("password", this.password);
        formData.append("myFile", this.selectedFile, this.selectedFile.name);
        axios
          .post("http://10.0.22.236:9889/api/update/updateuserinfo", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.data.status == "success") {
              this.editdata = false;
              this.popupdatasuccess = true;
              console.log(response);
            } else {
              console.log(response);
              this.dialog = false;
              this.popupdatasuccess = true;
            }
          })
          .catch((err) => console.log(err.response))
          .finally(() => {
            this.errorfailed = "Update your info failed";
          });
      } else {
        this.validate_image = true;
      }
    },
    ValidateAdd() {
      if (this.role == "0") {
        this.$router.push("/RegisterUser");
      } else {
        this.validateRole = true;
      }
    },
    ValidateDeleteUser() {
      if (this.selected !== "") {
        if (this.role == "0") {
          this.dialog = true;
        } else {
          this.validateRole = true;
        }
      } else {
        this.selectarecord = true;
      }
    },
  },
};
</script>
