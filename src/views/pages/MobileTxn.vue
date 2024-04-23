<template>
  <v-card class="CustomerList" style="font-family: phetsarath OT" height="475">
    <v-card-title
      dense
      text
      style="font-family: phetsarath OT; background-color: #4f709c;color: white;"
     
      ><span>{{ title }}</span></v-card-title>

    <button
      class="download-btn"
      @click="Download_EXCEL()"
      style="font-family: phetsarath OT"
    >
      ດາວໂຫຼດ Excel<i class="mdi mdi-export-variant" aria-hidden="true"></i>
    </button>
    <label style="color: white">***</label>
    <button
      class="download-btn"
      @click="Download_PDF()"
      style="font-family: phetsarath OT"
    >
      ດາວໂຫຼດ PDF<i class="mdi mdi-export-variant" aria-hidden="true"></i>
    </button>
    <v-card style="font-family: phetsarath OT; background-color: white">
      <v-card-title>
        <v-text-field
          v-model="from_date"
          prepend-icon="mdi-domain"
          type="number"
          label="ເລີ່ມວັນທີ່ (yyyymmdd)"
          style="width: 200px"
          :rules="inputRules"
          clearable
        >
        </v-text-field>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="to_date"
          type="number"
          prepend-icon="mdi-domain"
          label="ຫາວັນທີ່ (yyyymmdd)"
          style="width: 200px"
          :rules="inputRules"
          clearable
        >
        </v-text-field>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          outlined
          @click="searchinfo()"
          style="font-size: 12px; height: 30px; width: 30px"
          ><v-icon color="blue">mdi-magnify</v-icon>ຄົ້ນຫາ</v-btn
        >
        <v-spacer></v-spacer>
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
        style="background-color: white"
        :headers="headers"
        :items="getdata"
        ref="myTable"
        :items-per-page="5"
        :search="search"
        class="elevation-1"
        height="230"
        :item-height="10"
        :loading="isLoading"
      >
        <!-- <template v-slot:footer>
      <td :colspan="headers.length">
        <strong>Toatal </strong>
      </td>
    </template> -->
      </v-data-table>
    </v-card>
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
  </v-card>
</template>
<script lang="ts">
import axios from "axios";
import exportFromJSON from "export-from-json";
import jsPDF from "jspdf";
import "jspdf-autotable";
export default {
  name: "MobileTxn",
  props: ["data"],
  data() {
    return {
      title: "ທຸລະກໍາ Mobile LDB Trust ສະເພາະພາຍໃນ",
      validate_date:false,
      search: "",
      from_date: "",
      to_date: "",
      inputRules: [(v) => v.length >= 1 || "ກະລຸນາປ້ອນວັນທີ່ກ່ອນ"],
      inputID: [(v) => v.length >= 1 || "ກະລຸນາປ້ອນລະຫັດ"],
      isLoading: false,
      options: {},
      headers: [
        { text: "ວັນທີ", value: "AUTHTXN_REQUEST_DATE" },
        { text: "ສະກຸນເງິນກີບ", value: "TOTAL_AMOUNT_418" },
        { text: "ສະເລ່ຍ/ເງິນກີບ", value: "AVERAGE_AMOUNT_418" },
        { text: "ສະກຸນເງິນໂດລາສະຫະລັດ", value: "TOTAL_AMOUNT_840" },
        { text: "ສະເລ່ຍ/ເງິນໂດລາສະຫະລັດ", value: "AVERAGE_AMOUNT_840" },
        { text: "ສະກຸນເງິນບາດ", value: "TOTAL_AMOUNT_764" },
        { text: "ສະເລ່ຍ/ເງິນບາດ", value: "AVERAGE_AMOUNT_764" },
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
      if (this.from_date !== "" && this.to_date !=="") {
        this.isLoading = "red";
        axios
          .post("http://10.0.22.236:9889/api/post/post_getmobiletxn_onlyldb", {
            from_date: this.from_date,
            to_date: this.to_date,
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
      } else {
       this.validate_date = true;
      }
    },

    // formatted from date

    // formatDate(date) {
    //   if (!date) return null;

    //   const [year, month, day] = date.split("-");

    //   return `${year}-${month}-${day}`;
    // },
    // parseDate(date) {
    //   if (!date) return null;

    //   const [year, month, day] = date.split("/");
    //   return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    // },
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
        "AUTHTXN_REQUEST_DATE",
        "TOTAL_AMOUNT_418",
        "AVERAGE_AMOUNT_418",
        "TOTAL_AMOUNT_840",
        "AVERAGE_AMOUNT_840",
        "TOTAL_AMOUNT_764",
        "AVERAGE_AMOUNT_764",
      ];
      let pdfName = "generated report";
      source.items.forEach((element) => {
        var temp = [
          element.AUTHTXN_REQUEST_DATE,
          element.TOTAL_AMOUNT_418,
          element.AVERAGE_AMOUNT_418,
          element.TOTAL_AMOUNT_840,
          element.AVERAGE_AMOUNT_840,
          element.TOTAL_AMOUNT_764,
          element.AVERAGE_AMOUNT_764,
        ];
        rows.push(temp);
      });
      var doc = new jsPDF();
      doc.autoTable(columnHeader, rows, { startY: 10 });
      doc.save(pdfName + ".pdf");
    },
  },
  //   watch: {
  //     date() {
  //       this.from_date = this.formatDate(this.date);
  //       this.to_date = this.formatDates(this.dates);

  //     },
  //   },
  // end formatted date
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
</style>
