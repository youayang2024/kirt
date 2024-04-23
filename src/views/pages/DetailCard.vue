<template>
  <v-card class="DetailCard" style="font-family: Saysettha OT">
    <v-alert dense text type="success" style="font-family: Saysettha OT">
      ລາຍລະອຽດສະຖານະຂອງບັດເອທີເອັມທີ່ແອັບຕິແລ້ວກ່ອນໜ້ານີ້</v-alert
    >
    <v-divider></v-divider>
    <button
      class="download-btn"
      @click="Download_EXCEL()"
      style="font-family: Saysettha OT"
    >
      ດາວໂຫຼດ Excel<i class="mdi mdi-export-variant" aria-hidden="true"></i>
    </button>

    <button
      class="download-btn"
      @click="Download_PDF()"
      style="font-family: Saysettha OT"
    >
      ດາວໂຫຼດ PDF<i class="mdi mdi-export-variant" aria-hidden="true"></i>
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
          run ແອັບຕິບັດ</v-btn
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
          ເຈົ້າແນ່ໃຈແລ້ວບໍ່ທີ່ເຈົ້າຕ້ອງການ Active ບັດໃໝ່
        </v-alert>
        <v-card-text class="text-center" style="font-family: phetsarath OT">
          ຖ້າຫາກວ່າທ່ານແນ່ໃຈແລ້ວກະລຸນາກົດໃສ່ຢືນຢັນການ ACTIVE
        </v-card-text>
        <v-card-actions style="font-family: phetsarath OT">
          <v-btn color="primary" text @click="validateRoleaCTIVEcARD = false"
            >ປິດ</v-btn
          >
          <v-btn color="primary" text @click="Runactivecard()"
            >ຢືນຢັນການ ACTIVE</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="this.ActiveCardSuccessful"
      max-width="500px"
      style="font-family: phetsarath OT"
    >
      <v-card>
        <v-alert dense text type="success" style="font-family: phetsarath OT">
          Active ບັດໃໝ່ຂອງທ່ານສຳເລັດແລ້ວ
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
            @click="ActiveCardSuccessful = false"
            to="/DetailCard"
            >ປິດ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="this.ActiveCardFiled"
      max-width="500px"
      style="font-family: phetsarath OT"
    >
      <v-card>
        <v-alert dense text type="error" style="font-family: phetsarath OT">
          Active ບັດໃໝ່ຂອງທ່ານບໍ່ສຳເລັດ
        </v-alert>
        <v-card-text class="text-center" style="font-family: phetsarath OT">
          ກະລຸນາລອງອີກຄັ້ງ ...ຂອບໃຈ
        </v-card-text>
        <v-card-actions style="font-family: phetsarath OT">
          <v-btn color="primary" text @click="ActiveCardFiled = false"
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
// import exportFromJSON from "export-from-json";
import { saveExcel } from "@progress/kendo-vue-excel-export";
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";
 const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export default {
  name: "DetailCard",
  data() {
    return {
      user_id: localStorage.getItem("user_id"),
      role: localStorage.getItem("role"),
      isLoading: false,
      validateRole: false,
      validateRoleaCTIVEcARD: false,
      ActiveCardSuccessful: false,
      ActiveCardFiled: false,
      search: "",
      headers: [
        { text: "ໝາຍເລກບັດ", value: "CARD_NO" },
        { text: "ເລກບັນຊີ", value: "CARD_CRDACCT_NO" },
        { text: "ລະຫັດສະຖານະ", value: "CARD_PLASTIC_CODE" },
        { text: "ສະຖານະຕອບກັບ", value: "CARD_PLASTIC_RESPONSE" },
        { text: "ວັນທີ່ບັດ PLASTIC", value: "CARD_PLASTIC_DATE" },
        { text: "ຜູ້ອັບໂຫຼດ", value: "CARD_PLASTIC_UPDATED_BY" },
        { text: "ຂໍ້ສັງເກດບັດ", value: "CARD_REMARKS", width: 160 },
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
      .get("http://10.0.1.108:9889/api/get/getdedailactivecard")
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
              "Actived by user: " +
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
              { field: "CARD_PLASTIC_UPDATED_BY", title: "ຜູ້ອັບໂຫຼດ" },
              { field: "CARD_REMARKS", title: "ຂໍ້ສັງເກດບັດ" },
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

    Runactivecard() {
      if (this.role == "0") {
        axios
          .get("http://10.0.1.108:9889/api/update/update_active_newcard")
          .then((response) => {
            if (response.data.status == "success") {
            
              this.validateRoleaCTIVEcARD = false;
              this.ActiveCardSuccessful = true;
              
              console.log(response);
              this.waiting_data();
            } else {
              (this.message = response.data.message),
                (this.status = response.data.status),
                (this.validateRoleaCTIVEcARD = false);
              this.ActiveCardFiled = true;
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
        .get("http://10.0.1.108:9889/api/get/getdedailactivecard")
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
        this.$router.push("/ImportCard");
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
    Download_PDF() {
      var source = this.$refs["myTable"];
      let rows = [];
      let columnHeader = [
        "Card_no",
        "Acc_no",
        "Plastic_code",
        "Plastic_response",
        "Plastic_date",
        "Upload_by",
        "Remarks",
        "Card_OPLSDATE",
        "Mob_date",
      ];
      let pdfName = "generated report";
      source.items.forEach((element) => {
        var temp = [
          element.CARD_NO,
          element.CARD_CRDACCT_NO,
          element.CARD_PLASTIC_CODE,
          element.CARD_PLASTIC_RESPONSE,
          element.CARD_PLASTIC_DATE,
          element.CARD_PLASTIC_UPDATED_BY,
          element.CARD_REMARKS,
          element.CARD_OLD_PLASTIC_DATE,
          element.MOD_DATE,
        ];
        rows.push(temp);
      });
      var doc = new jsPDF();
      doc.autoTable(columnHeader, rows, { startY: 5 });
      doc.save(pdfName + ".pdf");
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
