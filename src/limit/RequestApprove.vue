<template>
  <v-card>
    <div class="text-center">
      <v-alert
        dense
        text
        type=""
        style="font-family: phetsarath OT; color: blue"
        >ລາຍການລໍຖ້າການອະນຸມັດ</v-alert
      >
    </div>

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

    <v-dialog
      v-model="getITDocsInfo"
      max-width="900px"
      style="font-family: phetsarath OT"
    >
      <v-card style="font-family: phetsarath OT">
        <v-alert type="info" style="font-family: phetsarath OT"
          >ອັບເດດເອກະສານ</v-alert
        >
        <v-form>
          <div class="container">
            <v-card class="pa-20" outlined>
              <v-card-title>
                &nbsp;
                <v-file-input
                  v-model="selectedFile"
                  max-width="290px"
                  min-width="290px"
                  label="ກະລຸນາເລືອກໄຟລ໌ ຫຼື ຮູບພາບ"
                  placeholder="Select your files name"
                  @change="onFilesSelectted($event)"
                ></v-file-input>
                &nbsp;&nbsp;&nbsp;
                <v-combobox
                  label="ປະເພດຂອງເອກະສານ"
                  v-model="Edittype_docs"
                  :items="[
                    'Setup_limits',
                    'Add_new_ATM',
                    'System',
                    'Active_Card',
                    'Add_new_User_CMS',
                    'Stop_ATM_CMS',
                    'Add_NEW_BIN',
                    'Others',
                  ]"
                ></v-combobox>

                &nbsp;
                <v-combobox
                  label="ສະຖານະຂອງເອກະສານ"
                  v-model="status_docs"
                  :items="[
                    'Done',
                    'Pending',
                    'Stoped',
                    'New',
                    'Rejected',
                    'Others',
                  ]"
                ></v-combobox> </v-card-title
            ></v-card>
            &nbsp;
            <v-card class="pa-20" outlined>
              <v-card-title>
                &nbsp;
                <v-text-field
                  v-model="amountLimited"
                  label="ຈຳນວນເງິນ Limited"
                  type="number"
                ></v-text-field>
                &nbsp;
                <v-text-field
                  v-model="cus_id"
                  label="ລະຫັດລູກຄ້າ"
                  type="number"
                ></v-text-field>
                &nbsp;
                <v-text-field
                  v-model="cus_name"
                  label="ຊື່ລູກຄ້າ"
                ></v-text-field>
                &nbsp;&nbsp;
                <v-combobox
                  label="ສາຂາ"
                  v-model="branch"
                  :items="getbranch"
                ></v-combobox>
              </v-card-title>
            </v-card>
            &nbsp;
            <v-card class="pa-20" outlined>
              <v-card-title>
                &nbsp;
                <v-combobox
                  label="ຜູ້ອັບໂຫຼດເອກະສານ"
                  v-model="user_id"
                  :items="[
                    'KIMMY',
                    'HOUMPHAN',
                    'ANOUSONE',
                    'KIKEO',
                    'VIETXIONG',
                    'YOUAYANG',
                  ]"
                ></v-combobox>
                &nbsp; &nbsp;
                <v-textarea
                  id="textarea"
                  v-model="edititdocs_noted"
                  placeholder="ໝາຍເຫດ ~ Enter something..."
                  rows="3"
                  max-rows="6"
                ></v-textarea>
              </v-card-title>
            </v-card>
          </div>
        </v-form>
        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="primary" text @click="getITDocsInfo = false">ປິດ</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="conformupdateInfo()"
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
          >ໄຟລ໌ເອກະສານ</v-alert
        >

        <v-card class="container">
          <img :src="selectedFile_imageURL" alt="Image" />
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
          ຂໍ້ມູນຂອງທ່ານຖືກອັບໂຫຼດສຳເລັດແລ້ວ
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
    <v-dialog v-model="this.uploadDone" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="success">
          ຂໍ້ມູນຂອງທ່ານຖືກອັບເດດສຳເລັດແລ້ວ
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
          <v-btn color="primary" block @click="uploadDone = false">ປິດ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="this.approvedone" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="success">
          ຂໍ້ມູນລູກຄ້າໄດ້ອະນຸມັດແລ້ວ
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
          <v-btn color="primary" block @click="approvedone = false">ປິດ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="this.validate_card" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="error">
          ກະລຸນາອັບໂຫຼດເອກະສານ ຫຼື ປ້ອນຂໍ້ມູນໃຫ້ຄົບກ່ອນ!
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
            ໃຫ້ແນ່ໃຈວ່າອັບໂຫຼດເອກະສານ ຫຼື ປ້ອນຂໍ້ມູນຄົບແລ້ວບໍ?
          </span>
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
          ກະລຸນາເລືອກລາຍການທີ່ທ່ານຕ້ອງການອະນຸມັດກ່ອນ!
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
    <v-card style="font-family: phetsarath OT">
      <v-card class="scrollmenu">
        <v-card-title> </v-card-title>
        <v-data-table
          :headers="headerlimiteds"
          :items="gethistorylimited"
          class="elevation-1"
          :loading="isLoading"
          :search="search"
          :items-per-page="7"
        >
          <!-- action button -->
          <template #[`item.actions`]>
            <div>
              <!-- <v-icon
                style="color: green; font-size: 18px"
                @click="validateEditdataInfo()"
                >mdi-pencil</v-icon
              > -->

              <v-btn
                color="blue"
                outlined
                text
                style="
                  font-size: 12px;
                  height: 25px;
                  width: 70px;
                  font-family: phetsarath OT;
                "
              
                @click="checkupdates()"
                >ອະນຸມັດ</v-btn
              >
            </div>
          </template>

          <template #[`item.checkbox`]="{ item }">
            <div>
              <input type="radio" :value="item" v-model="itdocs_id" />
            </div>
          </template>
          <template #[`item.IMAGE`]="{ item }">
            <div>
              <a :href="item.IMAGE" target="_blank">ເອກະສານ</a>
            </div>
          </template>
          <template #[`item.STATUS_DOCS`]="{ item }">
            <v-chip :color="getColorInfo(item.STATUS_DOCS)">
              {{ item.STATUS_DOCS }}
            </v-chip>
          </template>
        </v-data-table>
      </v-card>
      <!--  -->
    </v-card>
    <!--  -->
    <v-dialog
      v-model="this.confirmApproveLimit"
      max-width="500px"
      style="font-family: phetsarath OT"
    >
      <v-card>
        <v-alert dense text type="warning" style="font-family: phetsarath OT">
          ເຈົ້າແນ່ໃຈແລ້ວບໍ່ທີ່ເຈົ້າຕ້ອງການອະນຸມັດ
        </v-alert>
        <v-card-text class="text-center" style="font-family: phetsarath OT">
         CUSTOMER ID: {{ this.itdocs_id.CUS_ID }} &nbsp; , CARD NUMBER: {{  this.itdocs_id.CARD_NO}} <br/>
          ຖ້າຫາກວ່າທ່ານແນ່ໃຈແລ້ວກະລຸນາກົດໃສ່ຢືນຢັນການອະນຸມັດ
        </v-card-text>
        <v-card-actions style="font-family: phetsarath OT">
          <v-btn color="primary" text @click="confirmApproveLimit = false"
            >ຍົກເລີກ</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="approvelimit()"
            >ຢືນຢັນການອະນຸມັດ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-dialog v-model="this.updatefailed" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="error">  ອັບເດດຂໍ້ມູນຂອງທ່ານບໍ່ສຳເລັດ </v-alert>
        <div class="text-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/e/eb/Blinking_warning.gif"
              height="80"
              width="100"
            />
          </div>
        <v-card-text class="text-center"> ກະລຸນາລອງອີກຄັ້ງ.... </v-card-text>
        <v-card-actions>
          <v-btn color="error" block text @click="updatefailed = false"
            >ປິດ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>




    <v-dialog v-model="this.Pleaseinputamount" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="error"> ກະລຸນາປ້ອນຈຳນວນເງິນໃດໜຶ່ງທີ່ຕ້ອງການປັບວົງເງິນກ່ອນ </v-alert>
        <div class="text-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/e/eb/Blinking_warning.gif"
              height="80"
              width="100"
            />
          </div>
        <v-card-text class="text-center"> ກະລຸນາລອງອີກຄັ້ງ.... </v-card-text>
        <v-card-actions>
          <v-btn color="error" block text @click="Pleaseinputamount = false"
            >ປິດ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>


  </v-card>
</template>
<script lang="ts">
import axios from "axios";

export default {
  name: "RequestApprove",
  props: ["data"],
  data() {
    return {
      amountLimited: "",
      cus_name: "",
      branch: "",
      cus_id: "",
      uploadDone: false,
      confirmApproveLimit: false,
      updatefailed: false,
      Pleaseinputamount: false,

      Edittype_docs: "",
      status_docs: "",
      edititdocs_noted: "",
      getITDocsInfo: false,
      type_docs: "",

      approvedone: false,
      search: "",
      itdocs_noted: "",
      display_image: false,
      itdocs_id: "",
      selectedFile_imageURL: "",
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
      DOcs_name: "",

      cmsid: "",
      passcms: "",
      headerlimiteds: [
        { text: "", value: "checkbox" },
        // { text: "ລະຫັດ", value: "ITDOCS_ID" },
        { text: "ລະຫັດລູກຄ້າ", value: "CUS_ID" },
        { text: "ເລກບັດ", value: "CARD_NO" },
        { text: "ເລກບັນຊີ", value: "ACCT" },
        { text: "ຊື່ລູກຄ້າ", value: "CUS_NAME" },
        { text: "ຈຳນວນເງິນ~Kip", value: "AMOUNT_LIMIT" },
        { text: "ຈຳນວນເງິນ~USD", value: "USD" },
        { text: "ຈຳນວນເງິນ~BATH", value: "BATH" },
        { text: "ຈຳນວນເງິນ~CNY", value: "CNY" },
        { text: "ຈຳນວນເງິນ~VND", value: "VND" },
        { text: "ສະຖານະ", value: "STATUS_DOCS" },
        { text: "URL ​ເອ​ກະ​ສານ​", value: "IMAGE" },
        { text: "Actions", value: "actions", width: 100 },
      ],

      getdata: [],
      gethistorylimited: [],
      cardno: "",
      currency: "",
      valid: false,
      datanotfound: false,
      message: "",
      status: "",
      acc: "ACCOUNT",
      cus: "CUSTOMER",
      getbranch: "",
    };
  },

  created() {
    this.selected[0] = this.card_no;
  },

  mounted() {
    this.isLoading = "red";
    axios
      .get("http://10.0.22.236:9889/api/get/getRequestApproveLimit")
      .then(({ data }) => {
        this.gethistorylimited = data;
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
    axios
      .get("http://10.0.22.236:9889/api/get/getbranchname")
      .then(({ data }) => {
        this.getbranch = data;
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
    getColorInfo(STATUS_DOCS) {
      if (STATUS_DOCS == "Done") return "green";
      else if (STATUS_DOCS == "Pending") return "#FFBB5C";
      else if (STATUS_DOCS == "Stoped") return "red";
      else if (STATUS_DOCS == "New") return "blue";
      else if (STATUS_DOCS == "Others") return "#F8DE22";
      else if (STATUS_DOCS == "Rejected") return "#C70039";
      else return "#068fff";
    },

    getColorInfoUSERCMS(TYPE) {
      if (TYPE == "Done") return "green";
      else if (TYPE == "New") return "red";
      else return "#068fff";
    },

    // uploaditdocs() {
    //   if (
    //     this.itdocs_noted !== "" &&
    //     this.selectedFile !== "" &&
    //     this.type_docs !== "" &&
    //     this.status_docs_docs !== ""
    //   ) {
    //     const formData = new FormData();
    //     formData.append("itdocs_noted", this.itdocs_noted);
    //     formData.append("user_id", this.user_id);
    //     formData.append("type_docs", this.type_docs);
    //     formData.append("status_docs", this.status_docs);
    //     formData.append("amountLimited", this.amountLimited);
    //     formData.append("cus_id", this.cus_id);
    //     formData.append("cus_name", this.cus_name);
    //     formData.append("branch", this.branch);
    //     formData.append("myFile", this.selectedFile, this.selectedFile.name);
    //     axios
    //       .post("http://10.0.22.236:9889/api/update/uploadITDOCS", formData, {
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //         },
    //       })
    //       .then((response) => {
    //         if (response.data.status == "success") {
    //           this.selectedFile = "";
    //           this.type_docs = "";
    //           this.status_docs = "";
    //           this.amountLimited = "";
    //           this.cus_id = "";
    //           this.cus_name = "";
    //           this.branch = "";
    //           this.user_id = "";
    //           this.itdocs_noted = "";

    //           this.updatesuccess = true;

    //           console.log(response);

    //           axios
    //             .get("http://10.0.22.236:9889/api/get/gethistory_ITdocs")
    //             .then(({ data }) => {
    //               this.gethistorylimited = data;
    //             })
    //             .catch(function (error) {
    //               if (error.response.data.message == "TokenExpiredError") {
    //                 localStorage.removeItem("token");
    //                 this.$router.push("/LoginPage");
    //               } else {
    //                 console.log(error);
    //               }
    //             });
    //           //
    //         } else {
    //           (this.message = response.data.message),
    //             (this.status = response.data.status);
    //           this.isLoading = false;
    //           console.log(response);
    //         }
    //       })
    //       .catch(function (error) {
    //         if (error.response.data.message == "TokenExpiredError") {
    //           localStorage.removeItem("token");
    //           this.$router.push("/LoginPage");
    //         } else {
    //           console.log(error);
    //         }
    //       });
    //   } else {
    //     this.validate_card = true;
    //   }
    // },

    checkupdates() {
      if (this.itdocs_id.CARD_NO !=null) {
        this.confirmApproveLimit=true
      } else {
        this.selectarecord = true;
      }
    },

    validateEditdataInfo() {
      if (this.itdocs_id != "") {
        axios
          .post("http://10.0.22.236:9889/api/post/postgetInfo_ITdocs", {
            itdocs_id: this.itdocs_id,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.data.status == "success") {
              this.DOcs_name = response.data.file_name.FILE_NAME;
              this.Edittype_docs = response.data.file_name.TYPE_DOCS;
              this.edititdocs_noted = response.data.file_name.NOTED;
              this.edititdocs_noted = response.data.file_name.NOTED;
              this.status_docs = response.data.file_name.STATUS_DOCS;
              this.amountLimited = response.data.file_name.AMOUNT_LIMIT;
              this.cus_id = response.data.file_name.CUS_ID;
              this.cus_name = response.data.file_name.CUS_NAME;
              this.branch = response.data.file_name.BRANCH;

              this.getITDocsInfo = true;
              console.log(response);
            } else {
              (this.message = response.data.message),
                (this.status = response.data.status);
              this.isLoading = false;
              console.log(response);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        this.selectarecord = true;
      }
      //
    },
    onFilesSelectted(event) {
      console.log(event);
      this.selectedFile = event.target.files[0];
    },

    conformupdateInfo() {
      //

      if (
        this.Edittype_docs !== "" &&
        this.edititdocs_noted !== "" &&
        this.user_id !== "" &&
        this.status_docs_docs !== ""
      ) {
        const formData = new FormData();
        formData.append("user_id", this.user_id);
        formData.append("Edittype_docs", this.Edittype_docs);
        formData.append("status_docs", this.status_docs);
        formData.append("edititdocs_noted", this.edititdocs_noted);
        formData.append("amountLimited", this.amountLimited);
        formData.append("cus_id", this.cus_id);
        formData.append("cus_name", this.cus_name);
        formData.append("branch", this.branch);
        formData.append("itdocs_id", this.itdocs_id);

        axios
          .post("http://10.0.22.236:9889/api/update/updateITDOcsINFO", {
            user_id: this.user_id,
            Edittype_docs: this.Edittype_docs,
            status_docs: this.status_docs,
            edititdocs_noted: this.edititdocs_noted,
            amountLimited: this.amountLimited,
            cus_id: this.cus_id,
            cus_name: this.cus_name,
            branch: this.branch,
            itdocs_id: this.itdocs_id,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.data.status == "success") {
              this.edititdocs_noted = "";
              this.user_id = "";
              this.branch = "";
              this.cus_name = "";
              this.cus_id = "";
              this.amountLimited = "";
              this.status_docs = "";
              this.Edittype_docs = "";
              this.selectedFile = "";
              this.itdocs_id = "";

              this.getITDocsInfo = false;
              this.uploadDone = true;
              console.log(response);
              //
              axios
                .get("http://10.0.22.236:9889/api/get/gethistory_ITdocs")
                .then(({ data }) => {
                  this.gethistorylimited = data;
                })
                .catch(function (error) {
                  if (error.response.data.message == "TokenExpiredError") {
                    localStorage.removeItem("token");
                    this.$router.push("/LoginPage");
                  } else {
                    console.log(error);
                  }
                });
              //
            } else {
              console.log(response);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        this.validate_card = true;
      }
    },

    approvelimit() {
    
      if (this.itdocs_id != "") {

        // if(this.itdocs_id.AMOUNT_LIMIT !=null || this.itdocs_id.USD !=null || this.itdocs_id.BATH != null || this.itdocs_id.CNY !=null || this.itdocs_id.VND !=null){
         
       

        axios
          .post(
            "http://10.0.22.236:9889/api/update/update_limitRequestApprove",
            {
              itdocs_id: this.itdocs_id.ITDOCS_ID,
              card_no: this.itdocs_id.CARD_NO,
              user_id: this.user_id,
              amount: String(this.itdocs_id.AMOUNT_LIMIT).replace(/,/g, ""),
              usd:  String(this.itdocs_id.USD).replace(/,/g, ""),
              bath: String(this.itdocs_id.BATH).replace(/,/g, ""),
              cny: String(this.itdocs_id.CNY).replace(/,/g, ""),
              vnd: String(this.itdocs_id.VND).replace(/,/g, ""),
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((response) => {
            if (response.data.status == "success") {
              this.itdocs_id = "";

              this.approvedone = true;
              this.confirmApproveLimit= false;
              console.log(response);
              //
              axios
                .get("http://10.0.22.236:9889/api/get/getRequestApproveLimit")
                .then(({ data }) => {
                  this.gethistorylimited = data;
                })
                .catch(function (error) {
                  if (error.response.data.message == "TokenExpiredError") {
                    localStorage.removeItem("token");
                    this.$router.push("/LoginPage");
                  } else {
                    console.log(error);
                  }
                });
              //
            } else {
              this.confirmApproveLimit=false;
              this.updatefailed=true;
              console.log(response);
            }
          })
          .catch(function (error) {
            console.log(error);
          });



        // }else{
        //   this.confirmApproveLimit=false;
        //   this.Pleaseinputamount=true;
        // }


      } else {
        this.selectarecord = true;
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
  /* color: white; */
  text-align: center;
  padding: 2px;
  /* text-decoration: none; */
}

/* .scrollmenu a:hover {
  background-color: #777; 
} */
</style>
