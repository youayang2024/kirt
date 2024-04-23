<template>
  <v-card class="CustomerList" style="font-family: phetsarath OT">
    <div class="text-center">
      <v-alert dense text style="font-family: phetsarath OT; color: blue"
        >ADD VISA CREDIT CARD</v-alert
      >
    </div>

    <v-card
      style="font-family: phetsarath OT; background-color: white"
      class="scrollmenu"
    >
      <v-card-title>
        <v-text-field
          v-model="cardnumber"
          label="Card number"
          style="width: 250px"
          clearable
          type="number"
        />&nbsp;&nbsp;
        <v-text-field
          v-model="uid"
          label="CardID number"
          style="width: 250px"
          clearable
          type="number"
        />&nbsp;&nbsp;
        <v-text-field
          v-model="ACC"
          label="Account number"
          style="width: 250px"
          clearable
          type="number"
        />&nbsp;&nbsp;

        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          outlined
          @click="addinfo()"
          style="font-size: 12px; height: 30px; width: 30px"
          >Enter</v-btn
        >

        <v-spacer></v-spacer>
        <div>
          <input type="checkbox" v-model="isAuthorized" />
          <label> &nbsp; OCG</label>
        </div>

        <v-spacer></v-spacer>
      </v-card-title>
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
          ກະລຸນາປ້ອນຂໍ້ມູນທີ່ຕ້ອງການເພີ່ມກ່ອນ!
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
    <v-dialog v-model="this.selectcardforclosed" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="error">
          ກະລຸນາເລືອກບັດທີ່ທ່ານຕ້ອງການປິດ!
        </v-alert>
        <v-card-text class="text-center">
          <div class="text-center">
            <img
              src="https://cdn.dribbble.com/users/251873/screenshots/9388228/error-img.gif"
              height="100"
              width="137"
            />
          </div>
          <br /><span> ໃຫ້ແນ່ໃຈວ່າເລືອກບັດແລ້ວບໍ? </span>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" block text @click="selectcardforclosed = false"
            >ປິດ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="this.validateCard" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="error"> ຂໍ້ມູນບັດນີ້ມີຢູ່ແລ້ວ! </v-alert>
        <v-card-text class="text-center">
          <div class="text-center">
            <img
              src="https://cdn.dribbble.com/users/251873/screenshots/9388228/error-img.gif"
              height="100"
              width="137"
            />
          </div>
          <br /><span>
            ຂໍ້ມູນບັດນີ້ {{ this.cardnumber }} ມີຢູ່ໃນຖານຂໍ້ມູນແລ້ວ
          </span>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" block text @click="validateCard = false"
            >ປິດ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="this.validateACC" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="error"> ຂໍ້ມູນບັນຊີນີ້ມີຢູ່ແລ້ວ! </v-alert>
        <v-card-text class="text-center">
          <div class="text-center">
            <img
              src="https://cdn.dribbble.com/users/251873/screenshots/9388228/error-img.gif"
              height="100"
              width="137"
            />
          </div>
          <br /><span>
            ຂໍ້ມູນບັນຊີນີ້ {{ this.ACC }} ມີຢູ່ໃນຖານຂໍ້ມູນແລ້ວ
          </span>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" block text @click="validateACC = false"
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
      v-model="this.AddCardSuccessful"
      max-width="500px"
      style="font-family: phetsarath OT"
    >
      <v-card>
        <v-alert dense text type="success" style="font-family: phetsarath OT">
          Add your card info successfuly!..
        </v-alert>
        <div class="text-center">
          <img
            src="https://media.tenor.com/0AVbKGY_MxMAAAAM/check-mark-verified.gif"
            height="60"
            width="60"
          />
        </div>
        <v-card-text class="text-center" style="font-family: phetsarath OT">
          Thank you!
        </v-card-text>
        <v-card-actions style="font-family: phetsarath OT">
          <v-btn color="primary" text @click="AddCardSuccessful = false"
            >CLOSED</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="this.uploadOCGfiles"
      max-width="500px"
      style="font-family: phetsarath OT"
    >
      <v-card>
        <v-alert dense text type="success" style="font-family: phetsarath OT">
          Upload your OCG file successfuly!..
        </v-alert>
        <div class="text-center">
          <img
            src="https://media.tenor.com/0AVbKGY_MxMAAAAM/check-mark-verified.gif"
            height="60"
            width="60"
          />
        </div>
        <v-card-text class="text-center" style="font-family: phetsarath OT">
          Thank you!
        </v-card-text>
        <v-card-actions style="font-family: phetsarath OT">
          <v-btn color="primary" text @click="uploadOCGfiles = false"
            >CLOSED</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="this.closeCardData"
      max-width="500px"
      style="font-family: phetsarath OT"
    >
      <v-card>
        <v-alert dense text type="success" style="font-family: phetsarath OT">
          Closed your card {{ this.cardno }} info successfuly!..
        </v-alert>
        <div class="text-center">
          <img
            src="https://media.tenor.com/0AVbKGY_MxMAAAAM/check-mark-verified.gif"
            height="60"
            width="60"
          />
        </div>
        <v-card-text class="text-center" style="font-family: phetsarath OT">
          Thank you!
        </v-card-text>
        <v-card-actions style="font-family: phetsarath OT">
          <v-btn color="primary" text @click="closeCardData = false"
            >CLOSED</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-card>
      <v-card-actions v-if="isAuthorized">
        <v-file-input
          v-model="selectedImages"
          max-width="290px"
          multiple
          @change="handleFileUpload"
          min-width="290px"
          label="ກະລຸນາເລືອກໄຟລ໌ OCG"
          placeholder="Select your OCG files"
        ></v-file-input>
        &nbsp; &nbsp;
        <v-btn
          color="green"
          text
          outlined
          @click="uploadImages"
          style="font-size: 12px; height: 30px; width: 100px"
          >ອັບໂຫຼດໄຟລ໌ OCG</v-btn
        >
        &nbsp;

        <v-spacer></v-spacer>
        <v-text-field
          style="color: blue"
          v-model="search"
          append-icon="search"
          label="Search Cause"
          single-line
          hide-details
        ></v-text-field>
      </v-card-actions>
      <v-data-table
        style="background-color: white"
        :headers="headers"
        :items="getdata"
        :items-per-page="5"
        :search="search"
        class="elevation-1"
        :item-height="10"
        :loading="isLoading"
      >
        <template #[`item.CARD_STATUS`]="{ item }">
          <v-chip :color="getColorInfo(item.CARD_STATUS)">
            <v-chip-group :color="getColorInfo(item.CARD_STATUS)" />
            {{ item.CARD_STATUS }}
          </v-chip>
        </template>
        <template #[`item.checkbox`]="{ item }">
          <div>
            <input
              type="radio"
              :value="item.BPC_CARD_NUMBER"
              v-model="cardno"
            />
          </div>
        </template>

        <template #[`item.actions`]>
          <div>
            &nbsp;
            <v-btn color="primary" @click="closeCard('close_card')"
              >ປິດບັດ</v-btn
            >
            &nbsp;
            <v-btn color="red" @click="closeCard('delete')">ລຶບບັດ</v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog
      v-model="this.incorrentfile"
      max-width="500px"
      style="font-family: phetsarath OT"
    >
      <v-card>
        <v-alert dense text type="error" style="font-family: phetsarath OT">
          ກະລຸນາເລືອກ OCG File ກ່ອນ...!
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
  </v-card>
</template>
<script>
import axios from "axios";
import "jspdf-autotable";

export default {
  components: {},
  name: "AddVISACard",
  props: ["data"],
  data() {
    return {
      cardno: "",
      search: "",
      AddCardSuccessful: false,
      incorrentfile: false,
      closeCardData: false,
      validateCard: false,
      validateACC: false,
      uploadOCGfiles: false,
      selectcardforclosed: false,

      user_id: localStorage.getItem("user_id"),

      cardnumber: "",
      uid: "",
      ACC: "",

      validate_date: false,
      loading_icon: false,

      isLoading: false,

      valid: false,
      datanotfound: false,
      selectedImages: [],
      isAuthorized: false,

      getdata: [],
      headers: [
        { text: "", value: "checkbox" },
        { text: "ເລກບັດ:", value: "BPC_CARD_NUMBER" },
        { text: "ໄອດີບັດ:", value: "CARDID" },
        { text: "ສະຖານະ:", value: "CARD_STATUS" },
        { text: "CREATE_DATE:", value: "CREATE_DATE" },
        { text: "MOD_USER:", value: "MOD_USER" },
        { text: "MOD_HOST:", value: "MOD_HOST" },
        { text: "ACTION:", value: "actions" },
      ],
    };
  },
  mounted() {
    this.freshgetdata();
  },
  methods: {
    handleFileUpload(event) {
      this.selectedImages = Array.from(event.target.files);
    },
    getColorInfo(CARD_STATUS) {
      if (CARD_STATUS == "C") return "red";
      else if (CARD_STATUS == "A") return "green";
    },
    addinfo() {
      if (this.ACC !== "" && this.cardnumber !== "" && this.uid !== "") {
        axios
          .post("api/post/post_validateBpc_card", {
            card: this.cardnumber,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.data.validate_card == "1") {
              //
              this.validateCard = true;
            } else {
              axios
                .post("api/post/post_validateBpc_account", {
                  account: this.ACC,
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                })
                .then((response) => {
                  if (response.data.validate_account == "1") {
                    //
                    this.validateACC = true;
                  } else {
                    this.loading_icon = true;
                    axios
                      .post(
                        "http://10.0.22.236:9889/api/post/post_getbpccard",
                        {
                          cardnumber: this.cardnumber,
                          uid: this.uid,
                          ACC: this.ACC,
                          user_id: this.user_id,
                          headers: {
                            "Content-Type": "multipart/form-data",
                          },
                        }
                      )
                      .then((response) => {
                        if (response.data.status == "success") {
                          this.freshgetdata();
                          this.loading_icon = false;
                          this.AddCardSuccessful = true;
                          this.cardnumber = "";
                          this.uid = "";
                          this.ACC = "";

                          console.log(response);
                        } else {
                          this.isLoading = false;
                          console.log(response);
                        }
                      })
                      .catch(function (error) {
                        if (
                          error.response.data.message == "TokenExpiredError"
                        ) {
                          localStorage.removeItem("token");
                          this.$router.push("/Login");
                        } else {
                          console.log(error);
                        }
                      });
                  }
                });
            }
          });
      } else {
        this.validate_date = true;
      }
    },

    closeCard(value) {
      if (this.cardno != "") {
        const checkValue = value;

        this.loading_icon = true;
        axios
          .post("http://10.0.22.236:9889/api/update/update_bpc_cardstatus", {
            cardno: this.cardno,
            user_id: this.user_id,
            checkValue: checkValue,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.closeCardData = true;

            this.getresponse = response.data;
            this.loading_icon = false;
            this.freshgetdata();
            this.echeresult = true;
            console.log(response);
            this.cardno = "";
          });
      } else {
        this.selectcardforclosed = true;
      }
    },
    freshgetdata() {
      this.isLoading = "red";
      axios
        .get("http://10.0.22.236:9889/api/get/getbpcCard")
        .then(({ data }) => {
          this.getdata = data;
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

    uploadImages() {
      if (this.selectedImages.length == 0) {
        this.incorrentfile = true;
      } else {
        const formData = new FormData();
        this.selectedImages.forEach((image) => {
          formData.append("file", image);
        });
        axios
          .post("api/post/post_uploadOCGFile", formData)
          .then((response) => {
            if (response.data == "File uploaded successfully") {
              this.uploadOCGfiles = true;
              console.log(response);
              this.selectedImages == "";
            } else {
              alert("Error");
              console.log(response);
            }
          })
          .catch((error) => {
            console.error("Error uploading images:", error);
          });
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
