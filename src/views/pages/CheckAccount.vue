<template>
  <v-card class="CustomerList" style="font-family: phetsarath OT">
    <v-card-title
      dense
      text
      type="info"
      style="
        font-family: phetsarath OT;
        background-color: #4f709c;
        color: white;
      "
      >ຄົ້ນຫາເລກບັນຊີ</v-card-title
    >
    <!-- dialog data is null -->
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

    <v-dialog v-model="this.validate_date" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="error"> ກະລຸນາປ້ອນເລກບັນຊີກ່ອນ! </v-alert>
        <v-card-text class="text-center">
          <div class="text-center">
            <img
              src="https://cdn.dribbble.com/users/251873/screenshots/9388228/error-img.gif"
              height="100"
              width="137"
            />
          </div>
          <br /><span> ໃຫ້ແນ່ໃຈວ່າປ້ອນເລກບັນຊີແລ້ວບໍ? </span>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" block text @click="validate_date = false"
            >ປິດ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="viewdata"
      max-width="800px"
      style="font-family: phetsarath OT"
    >

      <v-card height="90" class="text-center">
     
        <v-card-title >
          <v-spacer></v-spacer>
          <v-btn
            @click="viewdata = false"
            style="font-family: phetsarath OT; color: red"
          >
            ຍົກເລີກ
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            @click="printDocument()"
            style="font-family: phetsarath OT; color: red"
          >
            ຢືນຢັນການໂຫຼດ<i
              class="mdi mdi-export-variant"
              aria-hidden="true"
            ></i>
          </v-btn>
        
          <v-spacer></v-spacer>
      </v-card-title>
      </v-card>
      <VueHtml2pdf
        :manual-pagination="true"
        :enable-download="true"
        ref="DownloadComp"
      >
        <section slot="pdf-content">
          <div
            class="row d-flex justify-content-center"
            style="font-family: phetsarath OT"
          >
            <div class="col-md-10">
              <div class="card">
                <br />
                <br />

                <div class="text-center">
                  <img
                    src="../../assets/new-ldb.png"
                    height="100"
                    width="270"
                  />
                </div>
                <div class="text-center">
                  <h6>LAO DEVELOPMENT BANK</h6>
                  <h6 style="font-size: 12px">CUSTOMER INFO</h6>
                </div>

                <!-- <hr /> -->

                <!-- <div class="table-responsive p-2">
                  <table class="table table-borderless">
                    <tbody>
                      <tr>
                        <td><b>HOSPITAL DETILS</b></td>
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <td><b>INVOICE INFO</b></td>
                      </tr>
                      <tr class="content">
                        <td class="font-weight-bold">
                          Name: Mittaphab hospital <br />

                          ID: {{ this.user_id }}
                        </td>
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <td class="font-weight-bold">
                          Invoice NO: &nbsp;{{ this.date_time }} <br />
                          Invoice date: &nbsp;{{ this.date }} <br />
                          From date: {{ this.from_date }} To date:
                          {{ this.to_date }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div> -->

                <hr />
                <div class="products p-2"  scrollmenu>
                  <table class="table table-borderless" style="border: 1px">
                    <tbody>
                      <tr class="" style="font-size: 14px">
                        <td><b>ລຳດັບ</b></td>
                        <td style="width: 15%;"><b>ລະຫັດລູກຄ້າ</b></td>
                        <td><b>ເລກບັດ</b></td>
                        <td><b>ຊື່ລູກຄ້າ</b></td>
                        <td><b>ເລກບັນຊີ</b></td>
                        <td><b>ເບີໂທ</b></td>
                      </tr>
                      <tr
                        class="content"
                        v-for="(item, index) in getdata"
                        v-bind:key="item.id"
                        style="font-size: 12px"
                      >
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.CARD_BASIC_CUST_ID }}</td>
                        <td>{{ item.CARD_NO }}</td>
                        <td>{{ item.CRDLINK_RBS_ACC_NAME }}</td>
                        <td>{{ item.CARD_CRDACCT_NO }}</td>
                        <td> {{ item.CONTACT_MOBILE }}  </td>
                      </tr>
                     
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </VueHtml2pdf>
    </v-dialog>
    <button
      class="download-btn"
      @click="Download_EXCEL()"
      style="font-family: phetsarath OT; color: blue"
    >
      ດາວໂຫຼດ Excel<i class="mdi mdi-export-variant" aria-hidden="true"></i>
    </button>
    <label style="color: white">***</label>
    <button
      class="download-btn"
      v-on:click="viewdata = true"
      style="font-family: phetsarath OT; color: red"
    >
      ດາວໂຫຼດ PDF<i class="mdi mdi-export-variant" aria-hidden="true"></i>
    </button>
    <v-card style="font-family: phetsarath OT; background-color: #dbe4c6">
      <v-card-title>
        <!-- <v-spacer></v-spacer> -->
        <v-text-field
          v-model="startAccount"
          prepend-icon="mdi-domain"
          type="number"
          label="ປ້ອນເລກບັນຊີ 3 ໂຕທາງໜ້າ*"
          style="width: 200px"
          :rules="inputRules"
          clearable
        />

        <v-spacer></v-spacer>
        <v-text-field
          v-model="endAccount"
          type="number"
          prepend-icon="mdi-domain"
          label="ປ້ອນເລກບັນຊີ 4 ໂຕທາງທ້າຍ*"
          style="width: 200px"
          :rules="inputRule"
          clearable
          @keyup.enter="searchinfo()"
        />
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          outlined
          @click="searchinfo()"
          style="font-size: 12px; height: 30px; width: 30px"
          @keyup.enter="searchinfo()"
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
          clearable
        ></v-text-field>
      </v-card-title>

      <v-data-table
        style="background-color: white"
        :headers="headers"
        :items="getdata"
        ref="myTable"
        :search="search"
        class="elevation-1"
        :items-per-page="5"
        :loading="isLoading"
      />
    </v-card>
    <!--  -->
  </v-card>
</template>
<script lang="ts">
import axios from "axios";
import exportFromJSON from "export-from-json";
import jsPDF from "jspdf";
import VueHtml2pdf from "vue-html2pdf";
import "jspdf-autotable";
export default {
  name: "CheckAccount",
  props: ["data"],
  components: {
    VueHtml2pdf,
  },
  data() {
    return {
      viewdata: false,
      validate_date: false,
      search: "",
      startAccount: "",
      endAccount: "",
      inputRules: [(v) => v.length >= 1 || "ປ້ອນເລກບັນຊີ 3 ໂຕທາງໜ້າ*"],
      inputRule: [(v) => v.length >= 1 || "ປ້ອນເລກບັນຊີ 4 ໂຕທາງທ້າຍ*"],
      inputID: [(v) => v.length >= 1 || "ກະລຸນາປ້ອນລະຫັດ"],
      isLoading: false,
      options: {},
      headers: [
        { text: "ລະ​ຫັດ​ລູກ​ຄ້າ​", value: "CARD_BASIC_CUST_ID" },
        { text: "ເລກບັດ", value: "CARD_NO" },
        { text: "ຊື່ embossed", value: "CARD_EMBOSSED_NAME" },
         { text: "ຊື່ CRDLINK_RBS_ACC_NAME", value: "CRDLINK_RBS_ACC_NAME" },
        { text: "ເລກບັນຊີ", value: "CARD_CRDACCT_NO" },
          { text: "CONTACT_MOBILE", value: "CONTACT_MOBILE" },
      ],
      getdata: [],

      valid: false,
      datanotfound: false,
      message: "",
      status: "",
    };
  },
  methods: {
    printDocument() {
      this.$refs.DownloadComp.generatePdf();
    },
    searchinfo() {
      if (this.startAccount !== "" && this.endAccount !== "") {
        this.isLoading = "red";
        axios
          .post("http://10.0.22.236:9889/api/post/postgetcheckaccount", {
            startAccount: this.startAccount,
            endAccount: this.endAccount,
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
        "CARD_BASIC_CUST_ID",
        "CARD_NO",
        "CARD_EMBOSSED_NAME",
        "CARD_CRDACCT_NO",
      ];
      let pdfName = "generated report";
      source.items.forEach((element) => {
        var temp = [
          element.CARD_BASIC_CUST_ID,
          element.CARD_NO,
          element.CARD_EMBOSSED_NAME,
          element.CARD_CRDACCT_NO,
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