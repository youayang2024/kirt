<template>
  <v-card class="CustomerList" style="font-family: phetsarath OT">
    <div class="text-center">
      <v-alert dense text style="font-family: phetsarath OT; color: blue"
        >ກວດສອບຂໍ້ມູນບັນຊີຕົ້ນທາງ ແລະ ປາຍທາງ</v-alert
      >
    </div>

    <v-card
      style="font-family: phetsarath OT; background-color: white"
      class="scrollmenu"
    >
      <v-card-title>
        <v-text-field
          v-model="fromAcct"
          label="From Account number"
          style="width: 250px"
          clearable
          type="number"
        />&nbsp;&nbsp;
        <v-text-field
          v-model="toAcct"
          label="To Account number"
          style="width: 250px"
          clearable
          type="number"
        />&nbsp;&nbsp;

        <v-text-field
          v-model="from_date"
          :format="YYYYMMDD"
          type="date"
          label="ວັນທີ່"
          style="width: 250px"
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

      <div class="custom-divider" v-if="isAuthorized">
        <div class="divider-line"></div>
        <!-- <div class="divider-text">ຜົນໄດ້ຮັບ</div> -->
        <div class="divider-line"></div>
      </div>
      <v-data-table
        v-if="isAuthorized"
        style="background-color: white"
        :headers="headers"
        :items="getdata"
        :items-per-page="10"
        :search="search"
        class="elevation-1"
        :item-height="10"
        :loading="isLoading"
      >
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
        <v-alert dense text type="error">
          ກະລຸນາປ້ອນຂໍ້ມູນທີ່ຕ້ອງການຄົ້ນຫາກ່ອນ!
        </v-alert>
        <v-card-text class="text-center">
          <div class="text-center">
            <img
              src="https://cdn.dribbble.com/users/251873/screenshots/9388228/error-img.gif"
              height="100"
              width="137"
            />
          </div>
          <br /><span> ໃຫ້ແນ່ໃຈວ່າປ້ອນຂໍ້ມູນແລ້ວບໍ? </span>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" block text @click="validate_date = false"
            >ປິດ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="this.loading_icon" max-width="200px">
      <v-card style="font-family: phetsarath OT">
        <v-alert> </v-alert>
        <v-card-text class="text-center">
          <div class="text-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
              height="100"
              width="150"
            />
          </div>
          <br /><span> ກະລຸນາລໍຖ້າ... </span>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="viewdata"
      max-width="800px"
      style="font-family: phetsarath OT"
    >
      <v-card height="90" class="text-center">
        <v-card-title>
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
    </v-dialog>
    <v-dialog
      v-model="viewdata_ACC"
      max-width="800px"
      style="font-family: phetsarath OT"
    >
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
                    src="../../src/assets/new-ldb.png"
                    height="100"
                    width="270"
                  />
                </div>

                <div class="text-center">
                  <h6>LAO DEVELOPMENT BANK</h6>
                  <h6 style="font-size: 12px">VISA CREDIT</h6>
                </div>

                <hr />

                <div class="table-responsive p-2">
                  <table class="table table-borderless">
                    <tbody>
                      <tr class="content">
                        <td class="font-weight-bold">
                          ID: {{ this.user_id }}
                          <br />
                          From Date: {{ this.from_date }}
                        </td>
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <td class="font-weight-bold">
                          Date: &nbsp;{{ this.date }} <br />
                          To Date:
                          {{ this.to_date }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <hr />
                <div class="products p-2">
                  <table class="table table-borderless" style="border: 1px">
                    <tbody>
                      <tr class="" style="font-size: 14px">
                        <td><b>NO</b></td>
                        <td><b>AUTHORIZATIONDATE</b></td>
                        <td><b>ACCOUNTNUMBER</b></td>
                        <td><b>TXN_AMOUNT</b></td>
                        <td><b>USD_AMOUNT</b></td>
                      </tr>
                      <tr
                        class="content"
                        v-for="(item, index) in getdataACC"
                        v-bind:key="item.id"
                        style="font-size: 12px"
                      >
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.AUTHORIZATIONDATE }}</td>
                        <td>{{ item.ACCOUNTNUMBER }}</td>
                        <td>${{ item.TXN_AMOUNT.toLocaleString() }}</td>
                        <td>${{ item.USD_AMOUNT.toLocaleString() }}</td>
                      </tr>
                      <tr style="font-size: 14px; bold">
                        <td colspan="3"></td>
                        <td><b>TOTAL AMOUNT: </b></td>
                        <td>
                          <b>${{ cartTotalAmount }}</b>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </VueHtml2pdf>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-btn
          @click="viewdata_ACC = false"
          style="font-family: phetsarath OT; color: red"
        >
          CLOSE
        </v-btn>

        <v-spacer></v-spacer>
      </v-card-title>
    </v-dialog>
   
  </v-card>
</template>
<script>
import axios from "axios";
import "jspdf-autotable";
import moment from "moment";

export default {
  components: {},
  name: "FromAcctToAcct",
  props: ["data"],
  data() {
    return {
      search: "",
      user_id: localStorage.getItem("user_id"),
      fromAcct: "",
      toAcct: "",
      validate_date: false,
      loading_icon: false,
      viewdata: false,
      viewdata_ACC: false,
      tran_type: "",

      from_date: "",
      to_date: "",
      inputRules: [(v) => v.length >= 1 || "ກະລຸນາປ້ອນວັນທີ່ກ່ອນ"],
      inputID: [(v) => v.length >= 1 || "ກະລຸນາປ້ອນລະຫັດ"],
      isLoading: false,
      options: {},
      headers: [
        { text: "CARD_NO:", value: "CARD_NO" },
        { text: "TXNTYPE:", value: "TXNTYPE" },
        { text: "REQUEST_AMT:", value: "REQUEST_AMT" },
        { text: "APPROVED_AMT:", value: "APPROVED_AMT" },
        { text: "REQUEST_DATE:", value: "REQUEST_DATE" },
        { text: "RRN:", value: "RRN" },
        { text: "RES_CODE:", value: "RES_CODE" },
        { text: "ACCT_FROM:", value: "ACCT_FROM" },
        { text: "ACCT_TO:", value: "ACCT_TO" },
        { text: "DEST:", value: "DEST" },
        { text: "SOURCE:", value: "SOURCE" },
        { text: "CONTENTS_57:", value: "CONTENTS_57" },
        { text: "CONTENTS_58:", value: "CONTENTS_58" },
      ],
      getdata: [],
      getdataACC: [],
      valid: false,
      datanotfound: false,

      date: moment(new Date()).format("DD-MM-YYYY"),
      date_time: moment(new Date()).format("MMDDYYYYHHMSS"),
      isAuthorized: false,

      formattedDate_from: "",
    };
  },
  computed: {
    cartTotalAmount() {
      let total = 0;
      for (let item in this.getdataACC) {
        total = total + this.getdataACC[item].TXN_AMOUNT;
      }
      return total.toLocaleString();
    },
    TotalAmount() {
      let total = 0;
      for (let item in this.getdata) {
        total = total + this.getdata[item].TXN_AMOUNT;
      }
      return total.toLocaleString();
    },
  },
  methods: {
    valdatefromdate() {
      if (this.from_date == "" || this.to_date == "") {
        this.validate_date = true;
      } else if (this.getdata.length == 0) {
        this.datanotfound = true;
      } else {
        this.viewdata = true;
      }
    },

    searchinfo() {
      this.formattedDate_from = moment(this.from_date).format("YYYYMMDD");

      if (this.from_date !== "") {
        if (this.fromAcct != "" ) {
       
        
            this.isLoading = "red";
          this.loading_icon = true;

          axios
            .post("api/post/post_getfromacct", {
              fromAcct: this.fromAcct,
              requestDate: this.formattedDate_from,
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
              if (response.data.status == "success") {
                this.getdata = response.data.data;
                this.loading_icon = false;
                console.log(response.data.data);
                if (response.data.data.length - 1 == -1) {
                  this.datanotfound = true;
                  this.isLoading = false;

                  return;
                } else {
                    this.isAuthorized = true;
                  this.getdata = response.data.data;
                //   if (this.getdataACC != "") {
                //     this.viewdata_ACC = true;
                //   }
                }
                this.isLoading = false;
              } else {
                this.isLoading = false;
                console.log(response);
              }
            })
            .catch(function (error) {
              if (error.response.data.message == "TokenExpiredError") {
                localStorage.removeItem("token");
                this.$router.push("/Login");
              } else {
                console.log(error);
              }
            });
        } else if(this.toAcct != "") {
          
          this.isLoading = "red";
          this.loading_icon = true;
          axios
            .post("api/post/post_gettoacct", {
              requestDate: this.formattedDate_from,
              toAcct: this.toAcct,

              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
              if (response.data.status == "success") {
                this.loading_icon = false;
                console.log(response);
                if (response.data.data.length - 1 == -1) {
                  this.datanotfound = true;
                  this.isLoading = false;

                  return;
                } else {
                  this.isAuthorized = true;
                  this.getdata = response.data.data;
                }
                this.isLoading = false;
              } else {
                this.isLoading = false;
                console.log(response);
              }
            })
            .catch(function (error) {
              if (error.response.data.message == "TokenExpiredError") {
                localStorage.removeItem("token");
                this.$router.push("/Login");
              } else {
                console.log(error);
              }
            });
        }
      } else {
        this.validate_date = true;
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
}
.custom-divider {
  display: flex;
  align-items: center;
}

.divider-line {
  flex: 1;
  height: 2px;
  background-color: #333a73; /* Adjust the color as needed */
}

.divider-text {
  margin: 0 10px; /* Adjust the spacing as needed */
  font-weight: bold;
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
