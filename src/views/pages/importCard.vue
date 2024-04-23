<template>
  <div class="container">
    <v-alert dense text type="" style="font-family: phetsarath OT">
      ກະລຸນາເລືອກໄຟລ໌ທີ່ທ່ານຕ້ອງການທີ່ຈະເປີດບັດນໍາໃຊ້
    </v-alert>
    <div class="container" style=" height: 420px;">
      <v-form style="font-family: phetsarath OT;">
        <v-title style="color: fuchsia">ອັບໂຫຼດໄຟລ໌ >> </v-title>


        <!-- <input type="file" accept=".csv" @change="handleFileUpload($event)" /> -->

        <v-file-input
          v-model="file"
          accept=".txt"
          label="Please upload a csv file"
          placeholder="Select your CSV files"
          @change="handleFileUpload($event)"
        ></v-file-input>

        <br />
        <br />
       <!-- <label class="col-sm-3 control-label">Click here >> <a href="../../assets/tempate/import_file.csv" download> Download template</a></label> -->
        <div><v-divider></v-divider></div>
        <br />

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            outlined
            text
            style="
              font-size: 12px;
              height: 30px;
              width: 100px;
              font-family: phetsarath OT;
            "
            @click="check_file()"
          >
            ອັບໂຫຼດ</v-btn
          >

          <v-btn
            color="primary"
            outlined
            text
            style="
              font-size: 12px;
              height: 30px;
              width: 100px;
              font-family: phetsarath OT;
            "
            to="/DetailCard"
          >
            ກັບຄືນ</v-btn
          >
        </v-card-actions>
      </v-form>
    </div>
    <v-dialog
      v-model="this.incorrentfile"
      max-width="500px"
      style="font-family: phetsarath OT"
    >
      <v-card>
        <v-alert dense text type="error" style="font-family: phetsarath OT">
          ກະລຸນາເລືອກ File ກ່ອນ...!
        </v-alert>
        <div class="text-center">
            <img
              src="https://cdn.dribbble.com/users/251873/screenshots/9388228/error-img.gif"
              height="100"
              width="137"
            />
          </div>
        <v-card-text class="text-center" style="font-family: phetsarath OT">
          ຂໍໂທດຫຼາຍໆ ຂອບໃຈ
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="error"
            block
            @click="incorrentfile = false"
            style="font-family: phetsarath OT"
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
      v-model="this.confirm"
      max-width="500px"
      style="font-family: phetsarath OT"
    >
      <v-card>
        <v-alert dense text type="warning" style="font-family: phetsarath OT">
          ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການອັບໂຫລດໄຟລ໌ນີ້
        </v-alert>
        <v-card-text class="text-center" style="font-family: phetsarath OT">
          ຖ້າທ່ານແນ່ໃຈແລ້ວກະລຸນາກົດຢືນຢັນການອັບໂຫລດ
        </v-card-text>
        <v-card-actions style="font-family: phetsarath OT">
          <v-card-actions>
            <v-btn color="primary" text @click="confirm = false">ປິດ</v-btn>
            <v-btn color="primary" text @click="uploadFile()"
              >ຢືນຢັນການອັບໂຫລດ</v-btn
            >
          </v-card-actions>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="this.confirmimport"
      max-width="500px"
      style="font-family: phetsarath OT"
    >
      <v-card>
        <v-alert dense text type="success" style="font-family: phetsarath OT">
          ການອັບໂຫລດໄຟລ໌ຂອງທ່ານສຳເລັດແລ້ວ
        </v-alert>
        <div class="text-center">
            <img
              src="https://media.tenor.com/0AVbKGY_MxMAAAAM/check-mark-verified.gif"
              height="60"
              width="60"
            />
          </div>
        <v-card-text class="text-center" style="font-family: phetsarath OT">
          ຂອບໃຈ
        </v-card-text>
        <v-card-actions style="font-family: phetsarath OT">
          <!-- <v-card-actions> -->
          <!-- <v-btn color="primary" text to="/DetailCard">ປິດ</v-btn> -->
          <v-btn
            color="primary"
            block
            to="/DetailCard"
            style="font-family: phetsarath OT"
            >ປິດ</v-btn
          >
          <!-- </v-card-actions> -->
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--  -->
  </div>
</template>

<script lang="ts">
import axios from "axios";

export default {
  name: "ImportCard",
  data() {
    return {
      incorrentfile: false,
      role: localStorage.getItem("role"),
      confirmimport: false,
      validateRole: false,
      confirm: false,
      file: "",
      
    };
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
      console.log(this.file);
    },

    uploadFile() {
      if (this.file !== "") {
        const formData = new FormData();
        formData.append("myFile", this.file, this.file.name);
        axios
          .post(
            "http://10.0.22.236:9889/api/post/import_cardno",
            formData,

            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then(function (response) {
            if (!response.data) {
              alert("ເກີດຂໍ້ຜິດພາດອັບໂຫຼດໄຟລ໌ບໍ່ສໍາເລັດ....ກະລຸນາລອງໃຫມ່");
            } else {
              alert("ອັບໂຫຼດໄຟລ໌ສຳເລັດ....!");
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
        this.confirm = false;
        this.confirmimport = true;
      } else {
        this.incorrentfile = true;
      }
    
    },
    check_file() {
      if (this.file !== "") {
        if (this.role == "0") {
          this.confirm = true;
        } else {
          this.validateRole = true;
        }
      } else {
        this.incorrentfile = true;
      }
    },
    cancel_file() {
      this.file = "";
    },
  },
};
</script>

<style></style>
