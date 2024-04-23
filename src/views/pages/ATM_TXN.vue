<template>
  <v-card>
    <v-card-title
      style="
        font-family: phetsarath OT;
        background-color: #4f709c;
        color: white;
      "
    >
      ທຸລະກໍາຕູ້ເອທີເອັມ

      <v-spacer></v-spacer>

      <v-progress-circular
        indeterminate
        :rotate="180"
        :size="30"
        :width="5"
        color="green"
      />
    </v-card-title>

    <v-card-text class="pt-4" style="font-family: phetsarath OT">
      <v-form
        color="deep-purple accent-4"
        ref="form"
        lazy-validation
        v-model="valid"
        class="container"
        style="font-family: phetsarath OT"
      >
        <div>
          <v-row>
            <v-text-field
              v-model="atm_id"
              type="number"
              prepend-icon="mdi-message-text"
              label="ID ຕູ້ເອທີເອັມ"
              style="width: 200px"
              clearable
            >
            </v-text-field>
            <v-text-field
              v-model="br_id"
              type="number"
              prepend-icon="mdi-message-text"
              label="Branch ID"
              style="width: 200px"
              clearable
            >
            </v-text-field>
            <v-text-field
              v-model="from_date"
              prepend-icon="mdi-domain"
              type="number"
              label="ເລີ່ມວັນທີ່ (yyyymmdd)"
              style="width: 200px"
              clearable
            >
            </v-text-field>

            <v-text-field
              v-model="end_date"
              type="number"
              prepend-icon="mdi-domain"
              label="ຫາວັນທີ່ (yyyymmdd)"
              style="width: 200px"
              clearable
            >
            </v-text-field>
            <v-btn
              color="primary"
              text
              outlined
              :disabled="!valid"
              @click="searchinfo()"
              style="font-size: 12px; height: 30px; width: 30px"
              ><v-icon color="blue">mdi-magnify</v-icon>ຄົ້ນຫາ</v-btn
            >
          </v-row>
        </div>
      </v-form>
    </v-card-text>

    <template>
      <v-card style="font-family: phetsarath OT" class="scrollmenu">
        <v-card-title>
          <v-row>
            <Label style="color: white">***</Label>

            <v-text-field
              style="color: blue"
              v-model="search"
              append-icon="search"
              label="Search Cause"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>

            <button
              class="download-btn"
              @click="Download_EXCEL()"
              style="font-family: phetsarath OT; color: green; font-size: 12px"
            >
              ດາວໂຫຼດ Excel<i
                class="mdi mdi-export-variant"
                aria-hidden="true"
              ></i>
            </button>
            <!-- <v-spacer></v-spacer> -->
          </v-row></v-card-title
        >

        <v-data-table
          height="260"
          :headers="headers"
          :items="getdata"
          ref="myTable"
          :search="search"
          :item-height="10"
          style="color: blue"
          :loading="isLoading"
        >
          <!-- <template #[`item.actions`]>
            <button
              class="download-btn"
              @click="Download_EXCEL()"
              style="font-family: phetsarath OT; color: green"
            >
              ດາວໂຫຼດ Excel<i
                class="mdi mdi-export-variant"
                aria-hidden="true"
              ></i>
            </button>
          </template> -->
        </v-data-table>
      </v-card>
    </template>
    <!-- dia log -->
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
    <!--  -->
    <v-dialog v-model="this.validate_date" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="error"> ກະລຸນາປ້ອນວັນທີ່ກ່ອນ! </v-alert>
        <v-card-text class="text-center">
          <div class="text-center">
            <img
              src="https://cdn.dribbble.com/users/251873/screenshots/9388228/error-img.gif"
              height="100"
              width="137"
            />
          </div>
          <br /><span> ໃຫ້ແນ່ໃຈວ່າປ້ອນວັນທີແລ້ວບໍ? </span>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" block text @click="validate_date = false"
            >ປິດ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--  -->
    <v-dialog v-model="this.validate_date" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="error"> ກະລຸນາປ້ອນວັນທີ່ກ່ອນ! </v-alert>
        <v-card-text class="text-center">
          <div class="text-center">
            <img
              src="https://cdn.dribbble.com/users/251873/screenshots/9388228/error-img.gif"
              height="100"
              width="137"
            />
          </div>
          <br /><span> ໃຫ້ແນ່ໃຈວ່າປ້ອນວັນທີແລ້ວບໍ? </span>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" block text @click="validate_date = false"
            >ປິດ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script lang="ts">
import axios from "axios";
import exportFromJSON from "export-from-json";
import jsPDF from "jspdf";
import "jspdf-autotable";
export default {
  name: "ViewTrustUserFinal",
  props: ["data"],
  data() {
    return {
      validate_date: false,
      atm_id: "",
      br_id: "",
      from_date: "",
      end_date: "",
      search: "",
      // inputRules: [(v) => v.length >= 1 || "ກະລຸນາປ້ອນວັນທີ່ກ່ອນ"],
      // inputID: [(v) => v.length >= 1 || "ກະລຸນາປ້ອນລະຫັດ"],
      //   to_date: vm.formatDates(new Date().toISOString().substr(0, 10)),
      //   menu2: false,
      //   dates: new Date().toISOString().substr(0, 10),

      //   date: new Date().toISOString().substr(0, 10),
      //   from_date: vm.formatDate(new Date().toISOString().substr(0, 10)),
      //   menu1: false,

      isLoading: false,
      options: {},
      headers: [
        { text: "ລະຫັດສາຂາ", value: "BR_ID", width: 100 },
        { text: "ຊື່​ສາ​ຂາ​", value: "BR_NAME", width: 100 },
        { text: "ID ຕູ້ເອທີເອັມ", value: "ATM_ID", width: 100 },
        { text: "ສະ​ຖານ​ທີ່​ຕູ້ ATM", value: "ATM_LOCATION", width: 100 },
        { text: "ທຸລະກຳຜ່ານ LDB", value: "LDB_TXN", width: 100 },
        { text: "ຄ່າທຳນຽມຜ່ານ LDB", value: "LDB_FEE", width: 100 },
        { text: "ຈຳນວນເງິນຜ່ານ LDB", value: "LDB_AMOUNT", width: 100 },
        { text: "ທຸລະກໍາຜ່ານ Laps", value: "LAPS_TXN", width: 100 },
        { text: "ຄ່າທຳນຽມຜ່ານ Laps", value: "LAPS_FEE", width: 100 },
        { text: "ຈໍາ​ນວນ​ເງິນ​ຜ່ານ Laps", value: "LAPS_AMOUNT", width: 100 },
        { text: "ທຸລະກໍາຜ່ານບັດຕ່າງປະເທດ", value: "OVERSEA_TXN", width: 100 },
        { text: "ຄ່າທໍານຽມຜ່ານບັດຕ່າງປະເທດ", value: "OVERSEA_FEE", width: 100 },
        {
          text: "ຈຳນວນເງິນຜ່ານບັດຕ່າງປະເທດ",
          value: "OVERSEA_AMOUNT",
          width: 100,
        },
        { text: "ທຸລະກຳການໂອນເງິນ LDB", value: "LDB_TRANSFER_TXN", width: 100 },
        {
          text: "ຄ່າທຳນຽມການໂອນເງິນ LDB",
          value: "LDB_TRANSFER_FEE",
          width: 100,
        },
        { text: "ຈຳນວນເງິນໂອນ LDB", value: "LDB_TRANSFER_AMOUNT", width: 100 },
        {
          text: "ທຸລະກຳການໂອນເງິນ Laps",
          value: "LAPS_TRANSFER_TXN",
          width: 100,
        },
        {
          text: "ຄ່າທຳນຽມການໂອນເງິນ Laps",
          value: "LAPS_TRANSFER_FEE",
          width: 100,
        },
        {
          text: "ຈຳນວນເງິນໂອນ Laps",
          value: "LAPS_TRANSFER_AMOUNT",
          width: 100,
        },
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
      if (
        this.atm_id == "" &&
        this.br_id == "" &&
        this.from_date == "" &&
        this.end_date == ""
      ) {
        this.isLoading = "red";
        axios
          .post("http://10.0.22.236:9889/api/post/post_getatm_txn", {
            atm_id: this.atm_id,
            br_id: this.br_id,
            from_date: this.from_date,
            end_date: this.end_date,
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
      } else if (
        this.atm_id !== "" &&
        this.br_id !== "" &&
        this.from_date !== "" &&
        this.end_date !== ""
      ) {
        this.isLoading = "red";
        axios
          .post("http://10.0.22.236:9889/api/post/post_getatm_txnallvalue", {
            atm_id: this.atm_id,
            br_id: this.br_id,
            from_date: this.from_date,
            end_date: this.end_date,
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
      } else if (
        this.atm_id !== "" &&
        this.br_id == "" &&
        this.from_date !== "" &&
        this.end_date !== ""
      ) {
        this.isLoading = "red";
        axios
          .post(
            "http://10.0.22.236:9889/api/post/post_getatm_txnbranchisnull",
            {
              atm_id: this.atm_id,
              from_date: this.from_date,
              end_date: this.end_date,
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
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
      } else if (
        this.atm_id == "" &&
        this.br_id !== "" &&
        this.from_date !== "" &&
        this.end_date !== ""
      ) {
        this.isLoading = "red";
        axios
          .post("http://10.0.22.236:9889/api/post/post_getatm_txnatmidisnull", {
            br_id: this.br_id,
            from_date: this.from_date,
            end_date: this.end_date,
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
      } else if (
        this.atm_id != "" &&
        this.br_id == "" &&
        this.from_date == "" &&
        this.end_date == ""
      ) {
        this.validate_date = true;
      } else if (
        this.atm_id == "" &&
        this.br_id !== "" &&
        this.from_date == "" &&
        this.end_date == ""
      ) {
        this.validate_date = true;
      } else if (
        this.atm_id !== "" &&
        this.br_id !== "" &&
        this.from_date == "" &&
        this.end_date == ""
      ) {
        this.validate_date = true;
      } else if (
        this.atm_id == "" &&
        this.br_id == "" &&
        this.from_date !== "" &&
        this.end_date !== ""
      ) {
        this.isLoading = "red";
        axios
          .post(
            "http://10.0.22.236:9889/api/post/post_getatm_txnatmandbranchidisnull",
            {
              from_date: this.from_date,
              end_date: this.end_date,
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
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
      } else if (
        this.atm_id != "" &&
        this.br_id !== "" &&
        this.from_date !== "" &&
        this.end_date == ""
      ) {
        this.validate_date = true;
      } else if (
        this.atm_id != "" &&
        this.br_id !== "" &&
        this.from_date == "" &&
        this.end_date !== ""
      ) {
        this.validate_date = true;
      }
    },

    Download_EXCEL() {
      const data = this.getdata;
      const fileName = "Generate_report";
      const exportType = exportFromJSON.types.xls;
      exportFromJSON({ data, fileName, exportType });
    },

    Download_PDF() {
      var source = this.$refs["myTable"];
      let rows = [];
      let columnHeader = [
        "WALLET_CUST_ID",
        "WALLET_CARD_NO",
        "WALLET_ACCT",
        "WALLET_NAME",
        "WALLET_MOBILE_NO",
        "WALLET_STATUS",
        "WALLET_DATE",
      ];
      let pdfName = "generated report";
      source.items.forEach((element) => {
        var temp = [
          element.WALLET_CUST_ID,
          element.WALLET_CARD_NO,
          element.WALLET_ACCT,
          element.WALLET_NAME,
          element.WALLET_MOBILE_NO,
          element.WALLET_STATUS,
          element.WALLET_DATE,
        ];
        rows.push(temp);
      });
      var doc = new jsPDF();
      doc.autoTable(columnHeader, rows, { startY: 10 });
      doc.save(pdfName + ".pdf");
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
</style>
