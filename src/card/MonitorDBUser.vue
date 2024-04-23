<template>
  <v-card>
    <v-card-title style="background-color: #0a6ebd; color: white"
      ><span>Monitoring User DB </span></v-card-title
    >
    <v-card>
      <v-card-title>
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
        v-model="expanded"
        :expanded="expanded"
        :headers="dessertHeaders"
        style="font-family: phetsarath OT; color: #068fff"
        :items="desserts"
        item-value="name"
        :search="search"
        :items-per-page="15"
        class="elevation-1"
        :loading="isLoading"
      >
        <template #[`item.checkbox`]="{ item }">
          <div>
            <input type="radio" :value="item" v-model="selected" />
          </div>
        </template>
        <template #[`item.Operator`]>
          <div>
            <v-icon
              @click="checkupdates()"
              style="color: green; font-size: 18px"
              >mdi-pencil</v-icon
            >
          </div>
        </template>
      </v-data-table>
    </v-card>
    <!--  -->
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
    <!--  -->
    <v-dialog
      v-model="editdata"
      max-width="800px"
      style="font-family: phetsarath OT"
    >
      <v-card style="font-family: phetsarath OT">
        <v-alert type="info" style="font-family: phetsarath OT"
          >ປົດລັອກຜູ້ໃຊ້ DB</v-alert
        >

        <div class="text-center">
          <Label style="color: blue">USER: </Label>{{ selected.USERNAME }},
          &nbsp;&nbsp;&nbsp; <Label style="color: blue">IP: </Label
          >{{ selected.IP }}, &nbsp;<Label style="color: blue">DB Name: </Label
          >{{ selected.NAME }}
        </div>

        <div class="text-align">
          <v-text-field
            v-model="input_password"
            prepend-icon="mdi-lock"
            label="Enter password"
            style="width: 200px; color: blue"
            clearable
            @keyup.enter="unlockuser()"
          />
        </div>
        <div class="text-center" style="font-family: phetsarath OT; color: red">
          <Label>Are you sure want to unlock this user?</Label>
        </div>

        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="primary" text @click="editdata = false">ປິດ</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="unlockuser()"
            @keyup.enter="unlockuser()"
            >ຢືນຢັນການ Unlock</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--  -->
    <v-dialog v-model="this.updatesuccess" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="success">
          ຂໍ້ມູນຂອງທ່ານຖືກ Unlocked ສຳເລັດແລ້ວ
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
    <v-dialog v-model="this.validatetext" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="error">
          ກະລຸນາປ້ອນລະຫັດທີ່ຕ້ອງການ Unlock!
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
            ກະລຸນາປ້ອນລະຫັດທີ່ຕ້ອງການ Unlock User ນັ້ນກ່ອນ...ຂອບໃຈ</span
          >
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" block text @click="validatetext = false"
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
          ລະບົບບໍ່ອະນຸຍາດໃຫ້ທ່ານ Unlock!...ກະລຸນາຕິດຕໍ່ຜູ້ເບິ່ງແຍງລະບົບຂອງທ່ານ
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
    <!--  -->
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      search: "",
      selectarecord: false,
      editdata: false,
      isLoading: false,
      input_password: "",
      updatesuccess: false,
      validatetext: false,
      validateRole: false,
      selected: [],
      expanded: [],
      role: localStorage.getItem("role"),
      dessertHeaders: [
        { text: "", value: "checkbox", width: 10 },
        { text: "ໄອພີ", value: "IP" },
        { text: "ຊື່ຖານຂໍ້ມູນ", value: "NAME" },
        { text: "ຊື່ ", value: "USERNAME" },
        { text: "ລະຫັດ", value: "USER_ID" },
        { text: "ສະຖະນະ", value: "ACCOUNT_STATUS" },
        { text: "ວັນທີສ້າງ", value: "CREATED" },
        { text: "ວັນທີໝົດອາຍຸ", value: "EXPIRY_DATE" },
        { text: "Operator", value: "Operator" },
      ],
      desserts: [],
    };
  },

  mounted() {
    this.isLoading = "red";
    axios
      .get("http://10.0.22.236:9889/api/get/get_monitoringdbuser")
      .then(({ data }) => {
        this.desserts = data;
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
    checkupdates() {
      if (this.selected.USER_ID > 0) {
        this.editdata = true;
      } else {
        this.selectarecord = true;
      }
    },
    unlockuser() {
      if (this.input_password == "") {
        this.validatetext = true;
      } else {
        if (this.role == "0") {
          if (this.selected.IP == "10.0.4.173") {
            axios
              .post("http://10.0.22.236:9889/api/post/unlockdbuser173", {
                input_password: this.input_password,
                username: this.selected.USERNAME,

                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((response) => {
                if (response.data.status == "success") {
                  this.editdata = false;
                  this.updatesuccess = true;
                  console.log(response);
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
          } else if (this.selected.IP == "10.0.1.42") {
            axios
              .post("http://10.0.22.236:9889/api/post/unlockdbuser42", {
                input_password: this.input_password,
                username: this.selected.USERNAME,

                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((response) => {
                if (response.data.status == "success") {
                  this.editdata = false;
                  this.updatesuccess = true;
                  console.log(response);
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
          } else if (this.selected.IP == "10.0.4.181") {
            axios
              .post("http://10.0.22.236:9889/api/post/unlockdbuser181", {
                input_password: this.input_password,
                username: this.selected.USERNAME,

                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((response) => {
                if (response.data.status == "success") {
                  this.editdata = false;
                  this.updatesuccess = true;
                  console.log(response);
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
          } else if (this.selected.IP == "10.0.3.24") {
            axios
              .post("http://10.0.22.236:9889/api/post/unlockdbuser24", {
                input_password: this.input_password,
                username: this.selected.USERNAME,
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((response) => {
                if (response.data.status == "success") {
                  this.editdata = false;
                  this.updatesuccess = true;
                  console.log(response);
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
            axios
              .post("http://10.0.22.236:9889/api/post/unlockdbuser183", {
                input_password: this.input_password,
                username: this.selected.USERNAME,

                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((response) => {
                if (response.data.status == "success") {
                  this.editdata = false;
                  this.updatesuccess = true;
                  console.log(response);
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
          }
        } else {
          this.validateRole = true;
        }
      }
    },
  },
};
</script>
