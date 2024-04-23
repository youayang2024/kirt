<template>
  <v-card class="DetailCard" style="font-family: Saysettha OT">
    <v-alert class="text-center"  style="font-family: Saysettha OT;
     background-image: url('https://www.shutterstock.com/image-photo/communication-technology-internet-business-global-260nw-1421446100.jpg');

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
    
    ">
      ຂໍ້ມູນບັດຫຼາຍກວ່າ 6 ເດືອນ</v-alert
    >
    <v-divider></v-divider>
    <button
      class="download-btn"
      @click="Download_EXCEL()"
      style="font-family: Saysettha OT"
    >
      ດາວໂຫຼດ Excel<i class="mdi mdi-export-variant" aria-hidden="true"></i>
    </button>

    <v-card style="background-color: #dbe4c6" class="scrollmenu">
      <v-card-title>
        <v-btn
          color="primary"
          outlined
          text
          @click="checkuploadafile()"
          style="
            font-size: 12px;
            height: 30px;
            width: 100px;
            font-family: phetsarath OT;
          "
        >
          ອັບໂຫຼດໄຟລ໌</v-btn
        >
        <label style="color: #dbe4c6">*</label>
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
          @click="validateroleforactivecard()"
        >
          run ລັອກບັດ</v-btn
        >
        <label style="color: #dbe4c6">***</label>
        <v-text-field
          style="color: blue"
          v-model="search"
          append-icon="search"
          label="Search Cause"
          single-line
          hide-details
        />
      </v-card-title>

      <v-data-table
        :search="search"
        ref="myTable"
        style="background-color: white"
        :headers="headers"
        :items="getdata"
        :items-per-page="5"
        class="elevation-1"
        :loading="isLoading"
      >
      </v-data-table>
    </v-card>
    <!--  -->
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

    <!--  -->
    <v-dialog
      v-model="this.validateRoleaCTIVEcARD"
      max-width="500px"
      style="font-family: phetsarath OT"
    >
      <v-card>
        <v-alert dense text type="warning" style="font-family: phetsarath OT">
          ເຈົ້າແນ່ໃຈແລ້ວບໍ່ທີ່ເຈົ້າຕ້ອງການ Block ບັດເກີນ6ເດືອນບໍ?
        </v-alert>
        <v-card-text class="text-center" style="font-family: phetsarath OT">
          ຖ້າຫາກວ່າທ່ານແນ່ໃຈແລ້ວກະລຸນາກົດໃສ່ຢືນຢັນການ Block
        </v-card-text>
        <v-card-actions style="font-family: phetsarath OT">
          <v-btn color="primary" text @click="validateRoleaCTIVEcARD = false"
            >ປິດ</v-btn
          >
          <v-btn color="primary" text @click="RunBlockcard()"
            >ຢືນຢັນການ Block</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="this.BlockCardSuccessful"
      max-width="500px"
      style="font-family: phetsarath OT"
    >
      <v-card>
        <v-alert dense text type="success" style="font-family: phetsarath OT">
          Blocked ບັດເກີນ 6 ເດືອນຂອງທ່ານສຳເລັດແລ້ວ
        </v-alert>
        <div class="text-center">
          <img
            src="https://media.tenor.com/0AVbKGY_MxMAAAAM/check-mark-verified.gif"
            height="60"
            width="60"
          />
        </div>
        <v-card-text class="text-center" style="font-family: phetsarath OT">
          ຂອບໃຈຫຼາຍໆ
        </v-card-text>
        <v-card-actions style="font-family: phetsarath OT">
          <v-btn
            color="primary"
            text
            @click="BlockCardSuccessful = false"
            to="/BlockLDBCard"
            >ປິດ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="this.BlockCardFiled"
      max-width="500px"
      style="font-family: phetsarath OT"
    >
      <v-card>
        <v-alert dense text type="error" style="font-family: phetsarath OT">
          Block ບັດຂອງທ່ານບໍ່ສຳເລັດ
        </v-alert>
        <v-card-text class="text-center" style="font-family: phetsarath OT">
          ກະລຸນາລອງອີກຄັ້ງ ...ຂອບໃຈ
        </v-card-text>
        <v-card-actions style="font-family: phetsarath OT">
          <v-btn color="primary" text @click="BlockCardFiled = false"
            >ປິດ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--  -->
  </v-card>
</template>

<script lang="ts">
import axios from "axios";
import { saveExcel } from "@progress/kendo-vue-excel-export";
import "jspdf-autotable";
import moment from "moment";
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export default {
  name: "BlockCZCard",
  data() {
    return {
      user_id: localStorage.getItem("user_id"),
      role: localStorage.getItem("role"),
      isLoading: false,
      validateRole: false,
      validateRoleaCTIVEcARD: false,
      BlockCardSuccessful: false,
      BlockCardFiled: false,
      search: "",
      headers: [
        { text: "ໝາຍເລກບັດ", value: "CARD_NO" },
        { text: "ເລກບັນຊີ", value: "ACCOUNT" },
        { text: "ລະຫັດສະຖານະ", value: "CARD_PLASTIC_CODE" },
        { text: "ສະຖານະຕອບກັບ", value: "CARD_PLASTIC_RESPONSE" },
        { text: "ວັນທີພາດສະຕິກບັດ", value: "CARD_PLASTIC_DATE" },
        { text: "ຜູ້ອັບໂຫຼດ", value: "UPDATED_BY" },
        { text: "ຂໍ້ສັງເກດບັດ", value: "CARD_REMARKS" },
        { text: "C_O_PSTIC_RES", value: "CARD_OLD_PLASTIC_RESPONSE" },
        { text: "C_O_PS_CODE", value: "CARD_OLD_PLASTIC_CODE" },
        { text: "ວັນທີ່ບັດເກົ່າ PLASTIC", value: "CARD_OLD_PLASTIC_DATE" },
        { text: "ວັນທີ່ອັບໂຫຼດ", value: "MOD_DATE" },
      ],
      getdata: [],
      status: "",
      message: "",
      headerCellConfig: { background: "#3468C0", textAlign: "center" },
    };
  },

  mounted() {
    this.isLoading = "red";
    axios
      .get("http://10.0.22.236:9889/api/get/get_blockedczCardbyaccount")
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
    onButtonClick(item) {
      console.log("click on " + item.no);
    },
    Download_EXCEL() {
      const get_today = new Date();
      const formattedDate = moment(get_today).format("YYYY-MM-DD hh:mm ss");

      saveExcel({
        data: this.getdata,
        fileName:
          "Generated_reported_" +
          moment(new Date()).format("YYYYMMDD") +
          ".xlsx",
        columns: [
          {
            title:
              "​ຂໍ້​ມູນລາຍ​ລະ​ອຽດຂອງ​ບັດ​" +
              "_" +
              "Blocked by Account, user blocked: " +
              this.user_id +
              ", ວັນທີ " +
              formattedDate,
            headerCellOptions: this.headerCellConfig,
            children: [
              { field: "CARD_NO", title: "ໝາຍເລກບັດ" },
              { field: "CARD_CRDACCT_NO", title: "ເລກບັນຊີ" },
              { field: "CARD_PLASTIC_CODE", title: "ລະຫັດສະຖານະ" },
              { field: "CARD_PLASTIC_RESPONSE", title: "ສະຖານະຕອບກັບ" },
              { field: "CARD_PLASTIC_DATE", title: "ວັນທີ່ບັດ PLASTIC" },
              { field: "UPDATED_BY", title: "ຜູ້ອັບໂຫຼດ" },
              { field: "CARD_REMARKS", title: "ຂໍ້ສັງເກດບັດ" },
              { field: "CARD_OLD_PLASTIC_RESPONSE", title: "C_O_PSTIC_RES" },
              { field: "CARD_OLD_PLASTIC_CODE", title: "C_O_PS_CODE" },
              {
                field: "CARD_OLD_PLASTIC_DATE",
                title: "ວັນທີ່ບັດເກົ່າ PLASTIC",
              },
              { field: "MOD_DATE", title: "ວັນທີ່ອັບໂຫຼດ" },
            ],
          },
        ],
      });
    },

    RunBlockcard() {
      if (this.role == "0") {
        axios
          .get("http://10.0.22.236:9889/api/update/Block_byaccount")
          .then((response) => {
            if (response.data.status == "success") {
              this.validateRoleaCTIVEcARD = false;
              this.BlockCardSuccessful = true;

              console.log(response);
              this.waiting_data();
            } else {
              (this.message = response.data.message),
                (this.status = response.data.status),
                (this.validateRoleaCTIVEcARD = false);
              this.BlockCardFiled = true;
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
        this.validateRole = true;
      }
    },
    async waiting_data() {
      await pause(600);
      axios
        .get("http://10.0.22.236:9889/api/get/get_blockedczCardbyaccount")
        .then((response) => {
          this.getdata = response.data;
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
    // check if you have uploaded a file
    checkuploadafile() {
      if (this.role == "0") {
        this.$router.push("/UploadblockldbCard");
      } else {
        this.validateRole = true;
      }
    },
    // validate role for active card
    validateroleforactivecard() {
      if (this.role == "0") {
        this.validateRoleaCTIVEcARD = true;
      } else {
        this.validateRole = true;
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
  padding-inline: 8px;
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
