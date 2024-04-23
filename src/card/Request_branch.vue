<template>
  <v-card>
    <v-toolbar
      dense
      style="
        background-image: url('https://t3.ftcdn.net/jpg/05/14/95/12/360_F_514951224_2dxMLbIw5qNRdPGD003chpbVcxWtcp7K.jpg');

        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;

        color: white;
        border-radius: 0px;
      "
    >
      <img src="../assets/new-ldb.png" height="60" />
      <v-spacer></v-spacer>
      <v-text-field
        class="rounded"
        style="color: blue; background-color: #cee6f3"
        v-model="search"
        append-icon="search"
        label="Search your information"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <Label style="font-family: phetsarath OT">Development by switching</Label>
    </v-toolbar>
    <div class="text-center">
      <v-alert
        dense
        style="
          font-family: phetsarath OT;
          color: white;
          background-color: #0b60b0;
          width: auto;
        "
        >ລາຍການສໍາລັບເອກະສານຕ່າງໆ</v-alert
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
      v-model="uploaddocument"
      max-width="900px"
      style="font-family: phetsarath OT"
    >
      <v-card style="font-family: phetsarath OT">
        <v-alert
          dense
          type=""
          style="
            font-family: phetsarath OT;

            background-image: url('https://t4.ftcdn.net/jpg/01/25/11/91/360_F_125119191_0WOSeVJHJuFgUw7cInjG6gTYHx35hxzX.jpg');

            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;

            width: auto;
            height: auto;

            /* Set up positioning */
            position: fixed;
            top: 0;
            left: 0;
            color: white;
          "
          class="text-center"
          >ອັບໂຫຼດເອກະສານ</v-alert
        >
        <v-form>
          <div class="container">
            <v-card class="pa-20" outlined>
              <v-card-title>
                &nbsp;
                <v-file-input
                  v-model="selectedFile"
                  label="ໄຟລ໌ ຫຼື ຮູບພາບ"
                  placeholder="Select your files name"
                  @change="onFilesSelectted($event)"
                ></v-file-input>
                &nbsp;&nbsp;
                <v-combobox
                  label="ປະເພດຂອງເອກະສານ"
                  v-model="type_docs"
                  :items="[
                    'Block_Card',
                    'Add_new_ATM',
                    'System',
                    'Active_Card',
                    'Add_new_User_CMS',
                    'Stop_ATM_CMS',
                    'Add_NEW_BIN',
                    'Others',
                  ]"
                ></v-combobox>
                &nbsp;&nbsp;&nbsp;
                <v-combobox
                  label="ສະຖານະຂອງເອກະສານ"
                  v-model="status_docs"
                  :items="['Done', 'Pending', 'Stoped', 'New', 'Others']"
                ></v-combobox>
              </v-card-title>
            </v-card>
            &nbsp;
            <v-card class="pa-20" outlined>
              <v-card-title>
                <v-text-field
                  v-model="cus_name"
                  label="ເບີໂທລະສັບຂອງພະນັກງານ"
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
                &nbsp; &nbsp; &nbsp;
                <v-textarea
                  id="textarea"
                  v-model="itdocs_noted"
                  placeholder="ໝາຍເຫດ ~ Enter something..."
                  rows="3"
                  max-rows="6"
                ></v-textarea></v-card-title
            ></v-card>
          </div>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="primary" text @click="uploaddocument = false"
            >ປິດ</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="uploaditdocs()"
            >ຢືນຢັນການອັບໂຫຼດ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="checkUsercms"
      max-width="2000px"
      style="font-family: phetsarath OT"
    >
      <v-card style="font-family: phetsarath OT">
        <v-alert
          dense
          type=""
          style="
            font-family: phetsarath OT;

            background-image: url('https://t4.ftcdn.net/jpg/01/25/11/91/360_F_125119191_0WOSeVJHJuFgUw7cInjG6gTYHx35hxzX.jpg');

            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;

            width: auto;
            height: auto;

            /* Set up positioning */
            position: fixed;
            top: 0;
            left: 0;
            color: white;
          "
          class="text-center"
          >User CMS ທີຕ້ອງການ Reset</v-alert
        >

        <v-card class="scrollmenu">
          <v-card-title>
            <!-- {{ this.cmsid }} -->
            <v-text-field
              v-model="passcms"
              prepend-icon="mdi-money"
              label="Please enter new password cms "
              style="width: 200px"
              clearable
            >
            </v-text-field>
            &nbsp;&nbsp;
            <v-btn color="primary" text @click="updateusercms()">CONFIRM</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="checkUsercms = false">Close</v-btn>
          </v-card-title>
          <v-data-table
            :headers="headerusercms"
            :items="getusercms"
            class="elevation-1"
            :loading="isLoading"
            :search="search"
            :items-per-page="5"
          >
            <template #[`item.actions`]>
              <div>
                <v-icon color="error" @click="validatedeleteusercms()"
                  >mdi-delete</v-icon
                >
              </div>
            </template>
            <template #[`item.checkbox`]="{ item }">
              <div>
                <input type="radio" :value="item.ID" v-model="cmsid" />
              </div>
            </template>
            <template #[`item.TYPE`]="{ item }">
              <v-chip :color="getColorInfoUSERCMS(item.TYPE)">
                {{ item.TYPE }}
              </v-chip>
            </template>
          </v-data-table>
        </v-card>
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
    <v-dialog v-model="this.deletedone" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="success">
          ຂໍ້ມູນຂອງທ່ານຖືກ DELETED ສຳເລັດແລ້ວ
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
          <v-btn color="primary" block @click="deletedone = false">ປິດ</v-btn>
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
      <!-- <v-data-table
        :headers="headers"
        :items="getdata"
        :items-per-page="15"
        class="elevation-1"
        :loading="isLoading"
      >
       
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
      </v-data-table> -->
      <!--history for limited  -->
      <!-- <v-card-title class="center">
        <label style="color: rgba(0, 0, 255, 0.671); font-size: 16px"
          >ລາຍການສໍາລັບເອກະສານອື່ນໆ</label
        >
      </v-card-title> -->
      <v-card class="scrollmenu">
        <v-card-title>
          <!-- <v-spacer></v-spacer> -->
          <v-btn
            :disabled="uploaddocument"
            :loading="uploaddocument"
            @click="uploaddocument = true"
            color="primary"
            text
            outlined
            style="font-size: 12px; height: 30px; width: 100px"
            ><v-icon color="blue">mdi-</v-icon>ອັບໂຫຼດເອກະສານ</v-btn
          >

          <!-- <v-spacer></v-spacer> -->
          <!-- <v-text-field
            style="color: blue"
            v-model="search"
            append-icon="search"
            label="Search Cause"
            single-line
            hide-details
          ></v-text-field> -->
        </v-card-title>
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
             
              &nbsp; &nbsp;
              <v-icon color="error" @click="validatedelete()"
                >mdi-delete</v-icon
              >
            </div>
          </template>

          <template #[`item.checkbox`]="{ item }">
            <div>
              <input
                type="radio"
                :value="item.ITDOCS_ID"
                v-model="selectedFile_image"
              />
            </div>
          </template>
          <template #[`item.IMAGE`]="{ item }">
            <div>
              <a :href="item.IMAGE" target="_blank">ເອກະສານ</a>
            </div>
          </template>
          <template #[`item.STATUS_DOCS`]="{ item }">
            <v-chip :color="getColorInfo(item.STATUS_DOCS)">
              <!-- <v-chip-group :color="getColorInfo(item.STATUS_DOCS)"> -->
              {{ item.STATUS_DOCS }}
            </v-chip>
          </template>
        </v-data-table>
      </v-card>
      <!--  -->
    </v-card>
    <!--  -->
  </v-card>
</template>
<script lang="ts">
import axios from "axios";
// const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export default {
  name: "Request_branch",
  props: ["data"],
  data() {
    return {
      amountLimited: "",
      cus_name: "",
      branch: "",
      cus_id: "",
      uploadDone: false,
      checkUsercms: false,
      Edittype_docs: "",
      status_docs: "",
      edititdocs_noted: "",
      getITDocsInfo: false,
      type_docs: "",
      uploaddocument: false,
      deletedone: false,
      search: "",
      itdocs_noted: "",
      display_image: false,
      selectedFile_image: "",
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
      getusercms: [],
      cmsid: "",
      passcms: "",
      headerlimiteds: [
        { text: "", value: "checkbox" },
        { text: "ລະຫັດ", value: "ITDOCS_ID" },
        
       
        { text: "ສະຖານະ", value: "STATUS_DOCS" },

        { text: "ສາຂາ", value: "BRANCH" },
        { text: "ຜູ້ອັບໂຫຼດ​ເອ​ກະ​ສານ", value: "BR_USER" },
        { text: "ຜູ້ອັບເດດ​ເອ​ກະ​ສານ", value: "USER_NAME" },
        { text: "ປະເພດຂອງເອກະສານ", value: "TYPE_DOCS" },
        { text: "ໝາຍເຫດ", value: "NOTED" },
        { text: "ວັນທີອັບໂຫຼດ", value: "CREATE_DATE" },
        { text: "ເວລາອັບໂຫຼດ", value: "TIME_REQUEST" },
        { text: "ວັນທີອັບເດດສໍາເລັດ", value: "APPROVED_DATE" },
        { text: "ເວລາອັບເດດສໍາເລັດ", value: "TIME_UPDATED" },
       
        { text: "URL ຂອງ​ເອ​ກະ​ສານ​", value: "IMAGE" },
        { text: "Actions", value: "actions" },
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
      .get("http://10.0.22.236:9889/api/get/get_request_branch")
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

    this.fetchDataFromServer();
    setInterval(this.fetchDataFromServer, 30);
  },

  methods: {
    fetchDataFromServer() {
      axios
        .get("http://10.0.22.236:9889/api/get/get_request_branch")
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
    },
    getColorInfo(STATUS_DOCS) {
      if (STATUS_DOCS == "Done") return "green";
      else if (STATUS_DOCS == "Pending") return "#FFBB5C";
      else if (STATUS_DOCS == "Stoped") return "red";
      else if (STATUS_DOCS == "New") return "blue";
      else if (STATUS_DOCS == "Others") return "#F8DE22";
      else if (STATUS_DOCS == "Rejected") return "#C70039";
      else return "#068fff";
    },
    uploadfiles() {
      this.uploaddocument = true;
    },
    getColorInfoUSERCMS(TYPE) {
      if (TYPE == "Done") return "green";
      else if (TYPE == "New") return "red";
      else return "#068fff";
    },
    // getUserCMS() {
    //   axios
    //     .get("http://10.0.22.236:9889/api/get/getusercms")
    //     .then(({ data }) => {
    //       this.getusercms = data;
    //       this.isLoading = false;
    //     })
    //     .catch(function (error) {
    //       if (error.response.data.message == "TokenExpiredError") {
    //         localStorage.removeItem("token");
    //         this.$router.push("/LoginPage");
    //       } else {
    //         console.log(error);
    //       }
    //     });
    // },
    uploaditdocs() {
      if (
        this.itdocs_noted !== "" &&
        this.selectedFile !== "" &&
        this.type_docs !== "" &&
        this.cus_name !== "" &&
        this.status_docs_docs !== ""
      ) {
        const formData = new FormData();
        formData.append("itdocs_noted", this.itdocs_noted);
        // formData.append("user_id", this.user_id);
        formData.append("type_docs", this.type_docs);
        formData.append("status_docs", this.status_docs);
        // formData.append("amountLimited", this.amountLimited);
        // formData.append("cus_id", this.cus_id);
        formData.append("cus_name", this.cus_name);
        formData.append("branch", this.branch);
        formData.append("myFile", this.selectedFile, this.selectedFile.name);
        axios
          .post("http://10.0.22.236:9889/api/update/update_request_branch", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.data.status == "success") {
              this.selectedFile = "";
              this.type_docs = "";
              this.status_docs = "";
              this.amountLimited = "";
              this.cus_id = "";
              this.cus_name = "";
              this.branch = "";
              this.user_id = "";
              this.itdocs_noted = "";

              this.uploaddocument = false;
              this.updatesuccess = true;

              //  pause(1500);
              // window.location.reload();
              // window.location.reload();
              console.log(response);

              //
              axios
                .get("http://10.0.22.236:9889/api/get/get_request_branch")
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
        this.validate_card = true;
      }
    },

    checkupdates() {
      if (this.selected.length - 1 > 0) {
        (this.card_no = this.selected[1]),
          (this.fund_mob = this.selected[2]),
          (this.currency_id = this.selected[3]),
          (this.amount = this.selected[5]),
          (this.editdata = true);
        //
      } else {
        this.selectarecord = true;
      }
    },
    checkupdates_imageurl() {
      if (this.selectedFile_image != "") {
        // (this.card_no = this.selected[1]), (this.display_image = true);

        //

        axios
          .post("http://10.0.22.236:9889/api/post/postgethistory_ITdocsURL", {
            itdocs_id: this.selectedFile_image,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.data.status == "success") {
              this.selectedFile_imageURL = response.data.url_image.IMAGE;
              this.display_image = true;
              // window.location.reload();
              console.log(response);
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
        this.selectarecord = true;
      }
    },
    validateEditdataInfo() {
      if (this.selectedFile_image != "") {
        // this.card_no = this.selected[1];
        // this.display_image = true;
        axios
          .post("http://10.0.22.236:9889/api/post/postgetInfo_ITdocs", {
            itdocs_id: this.selectedFile_image,
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
        formData.append("itdocs_id", this.selectedFile_image);

        // formData.append("myFile", this.selectedFile, this.selectedFile.name);

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
            itdocs_id: this.selectedFile_image,
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
              this.selectedFile_image = "";

              this.getITDocsInfo = false;
              this.uploadDone = true;
              console.log(response);
              //
              axios
                .get("http://10.0.22.236:9889/api/get/get_request_branch")
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
    updateusercms() {
      if (this.passcms !== "" && this.cmsid !== "") {
        axios
          .post("http://10.0.22.236:9889/api/update/updatedcmsuser", {
            passcms: this.passcms,
            cmsid: this.cmsid,

            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.data.status == "success") {
              this.cmsid = "";
              this.passcms = "";
              this.uploadDone = true;
              console.log(response);
              //
              axios
                .get("http://10.0.22.236:9889/api/get/getusercms")
                .then(({ data }) => {
                  this.getusercms = data;
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
    validatedelete() {
      if (this.selectedFile_image != "") {
        //
        axios
          .post("http://10.0.22.236:9889/api/delete/deleteitdocsid", {
            itdocs_id: this.selectedFile_image,

            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.data.status == "success") {
              this.selectedFile_image = "";

              this.deletedone = true;
              console.log(response);
              //
              axios
                .get("http://10.0.22.236:9889/api/get/get_request_branch")
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
        this.selectarecord = true;
      }
    },
    validatedeleteusercms() {
      if (this.cmsid != "") {
        //
        axios
          .post("http://10.0.22.236:9889/api/delete/deletecmsuser", {
            id: this.cmsid,

            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.data.status == "success") {
              this.cmsid = "";

              this.deletedone = true;
              console.log(response);
              //
              axios
                .get("http://10.0.22.236:9889/api/get/getusercms")
                .then(({ data }) => {
                  this.getusercms = data;
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
