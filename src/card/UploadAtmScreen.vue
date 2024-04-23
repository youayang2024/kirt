<template>
  <v-card style="font-family: phetsarath OT">
    <v-alert
      dense
      style="
        font-family: phetsarath OT;
        background-color: #00224d;
        color: white;
      "
      class="text-center"
      >ອັບໂຫຼດ ATM Screen</v-alert
    >
    <!-- <div class="custom-divider">
      <div class="divider-line"></div>
      <div class="divider-text">ອັບໂຫຼດ ATM Screen</div>
      <div class="divider-line"></div>
    </div> -->

    <v-card-actions>
      <v-file-input
        v-model="selectedImages"
        max-width="290px"
        multiple
        @change="handleFileUpload"
        min-width="290px"
        label="ກະລຸນາເລືອກໄຟລ໌ຮູບພາບ"
        placeholder="Select your image files"
      ></v-file-input>

      &nbsp;&nbsp;
      <div>
        <input
          type="radio"
          id="Media"
          value="Media"
          v-model="selectedOption"
        />&nbsp;
        <label for="Media">Media</label>
        &nbsp; &nbsp;
        <input
          type="radio"
          id="LAO"
          value="LAO"
          v-model="selectedOption"
        />&nbsp;
        <label for="LAO">LAO</label>
        &nbsp;
        <input type="radio" id="EN" value="EN" v-model="selectedOption" />&nbsp;
        <label for="EN">EN </label>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        color="green"
        text
        outlined
        @click="uploadImages"
        style="font-size: 12px; height: 30px; width: 30px"
        >ອັບໂຫຼດ</v-btn
      >
    </v-card-actions>
    <v-card>
      <v-card-title>
        <v-checkbox
          v-model="selectAll"
          label="Select All"
          @change="selectAllItems"
        ></v-checkbox>

        &nbsp; &nbsp;

        <v-combobox
          style="font-family: phetsarath OT"
          label="ສາຂາ"
          v-model="branch"
          :items="getAtmGreoupID"
        ></v-combobox>
        &nbsp; &nbsp;
        <v-btn
          color="green"
          text
          outlined
          @click="findATM()"
          style="font-size: 12px; height: 30px; width: 30px"
          >ຄົ້ນຫາ</v-btn
        >
        <v-spacer></v-spacer>
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
        :headers="headers"
        :items="getAtmIP"
        :search="search"
        :items-per-page="5"
      >
        <template #[`item.select`]="{ item }">
          <div>
            <input
              type="checkbox"
              :value="item.HOSTIP"
              v-model="selectedItems"
            />
          </div>
        </template>
      </v-data-table>
    </v-card>
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
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      loading_icon: false,
      user_id: localStorage.getItem("user_id"),
      headers: [
        { text: "ເລືອກ", value: "select", sortable: false },
        { text: "ສາຂາ", value: "BRANCH" },
        { text: "IP", value: "HOSTIP" },
        { text: "ສະຖານະ", value: "STATUS" },
        { text: "ຈຳນວນຮູບທັງໝົດທີ່ສຳເລັດ", value: "C_M" },
        { text: "ອັບໂຫຼດວັນທີ", value: "DATE_UPLOAD" },
        { text: "ຜູ້ອັບໂຫຼດ", value: "MOD_USER" },
        { text: "HOST", value: "MOD_HOST" },
      ],

      selectedItems: [],
      // singleSelect: true,
      selectAll: false,
      getAtmIP: [],
      selectedImages: [],
      selectedOption: null,
      isLoading: false,
      search: "",
      LAO: "/c:/Program Files/NCR APTRA/Advance NDC/Media/LAO",
      ENG: "/c:/Program Files/NCR APTRA/Advance NDC/Media/ENG",
      Media: "/c:/Program Files/NCR APTRA/Advance NDC/Media",
      Media2: "/Program Files/NCR APTRA/Advance NDC/Media",
      getAtmGreoupID: "",
      branch: "",
    };
  },
  mounted() {
    this.getatmip();

    axios
      .get("http://10.0.22.236:9889/api/get/get_branchGroupID")
      .then((response) => {
        this.getAtmGreoupID = response.data;
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
    selectAllItems() {
      if (this.selectAll) {
        this.selectedItems = this.getAtmIP.map((item) => item.HOSTIP);
      } else {
        this.selectedItems = [];
      }
    },

    // upload  images file
    handleFileUpload(event) {
      this.selectedImages = Array.from(event.target.files);
    },
    uploadImages() {
      if (this.selectedImages.length == 0) {
        alert("Please select a file");
      } else {
        if (this.selectedImages.length > 100) {
          alert("your select minimax images <=100");
        } else {
          if (this.selectedOption == null) {
            alert("Please select path for upload images");
          } else {
            if (this.selectedItems == "") {
              alert("Please select your IP for upload images");
            } else {
              if (this.selectedOption == "Media") {
                this.loading_icon = true;
                const formData = new FormData();
                this.selectedImages.forEach((image) => {
                  formData.append("images", image);
                });
                formData.append("selectedItemsIP", this.selectedItems);
                formData.append("path", this.Media);
                formData.append("user_id", this.user_id);
                axios
                  .post(
                    "http://10.0.22.236:9889/api/post/post_uploadAtmScreen",
                    formData
                  )
                  .then((response) => {
                    this.loading_icon = false;

                    this.selectedImages == "";
                    this.getatmip();

                    console.log(response);
                    alert(response.data);
                  })
                  .catch((error) => {
                    console.error("Error uploading images:", error);
                  });
              } else if (this.selectedOption == "LAO") {
                this.loading_icon = true;
                this.unlinkimage();
                const formData = new FormData();
                this.selectedImages.forEach((image) => {
                  formData.append("images", image);
                });
                formData.append("selectedItemsIP", this.selectedItems);
                formData.append("path", this.LAO);
                formData.append("user_id", this.user_id);
                axios
                  .post(
                    "http://10.0.22.236:9889/api/post/post_uploadAtmScreen",
                    formData
                  )
                  .then((response) => {
                    this.loading_icon = false;
                    this.selectedImages == "";
                    this.getatmip();
                    alert(response.data);

                    console.log(response);
                  })
                  .catch((error) => {
                    console.error("Error uploading images:", error);
                  });
              } else {
                this.loading_icon = true;
                this.unlinkimage();
                const formData = new FormData();
                this.selectedImages.forEach((image) => {
                  formData.append("images", image);
                });
                formData.append("selectedItemsIP", this.selectedItems);
                formData.append("path", this.ENG);
                formData.append("user_id", this.user_id);
                axios
                  .post(
                    "http://10.0.22.236:9889/api/post/post_uploadAtmScreen",
                    formData
                  )
                  .then((response) => {
                    this.loading_icon = false;
                    this.selectedImages == "";
                    this.getatmip();
                    alert(response.data);
                    console.log(response);
                  })
                  .catch((error) => {
                    console.error("Error uploading images:", error);
                  });
              }
            }
          }
        }
      }
    },
    // end upload image file

    // delete images
    unlinkimage() {
      axios
        .get("http://10.0.22.236:9889/api/delete/delete_images")
        .then((response) => {
          console.log(response);
        });
    },
    // get atm ip
    getatmip() {
      this.isLoading = "red";
      axios
        .get("http://10.0.22.236:9889/api/get/get_AtmIP")
        .then((response) => {
          this.getAtmIP = response.data;
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

    //

    findATM() {

     
   if(this,this.branch=="ໄຊສົມບູນ"){
    const branch = "022_XSB";
    axios
        .post("http://10.0.22.236:9889/api/post/post_getNewatmip", {
          branch: branch,

          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {

         
          this.getatmip();
          alert(response.data.status);
          console.log(response);
        });
   }
    },
  },
};
</script>

<style scoped>
.table-row-selected {
  background-color: #f5f5f5;
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
</style>
