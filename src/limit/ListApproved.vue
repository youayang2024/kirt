
<template>
  <v-card>
  
    <div class="text-center">
      <v-alert
        dense
        text
        type=""
        style="font-family: phetsarath OT; color: blue"
        >ລາຍການອະນຸມັດສໍາເລັດ</v-alert
      >
    </div>


    <v-card style="font-family: phetsarath OT">
      
      <v-card class="scrollmenu">
        <v-card-title>
        </v-card-title>
        <v-data-table
          :headers="headerlimiteds"
          :items="gethistorylimited"
          class="elevation-1"
          :loading="isLoading"
          :search="search"
          :items-per-page="7"
        >
        <template #[`item.checkbox`]="{ item }">
            <div>
              <input type="radio" :value="item" v-model="itdocs_id" />
            </div>
          </template>


          <template #[`item.actions`] >
          
            

             
              <v-btn
                color="blue"
                outlined
                text
                style="
                  font-size: 10px;
                  height: 25px;
                  width: 80px;
                  font-family: phetsarath OT;
                "
                @click="checkresult()"
                
           
                >ກວດ velo</v-btn
              >
           
          </template>

          <template #[`item.IMAGE`]="{ item }">
            <div>
              <a :href="item.IMAGE" target="_blank">ເອກະສານ</a>
            </div>
          </template>
          <template #[`item.STATUS_DOCS`]="{ item }">
            <v-chip-group :color="getColorInfo(item.STATUS_DOCS)">
          
            <b> <span> {{ item.STATUS_DOCS }}</span></b>
            </v-chip-group>
          </template>
        </v-data-table>
      </v-card>
      <!--  -->
    </v-card>
    <!--  -->
    <v-dialog v-model="this.selectarecord" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="error">
          ກະລຸນາເລືອກລາຍການທີ່ທ່ານຕ້ອງການກວດ Velocity!
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

    <v-dialog v-model="this.displayVelocity" max-width="500px">
      <v-card style="font-family: phetsarath OT">
        <v-alert dense text type="success">
         VELOCITY INFO
        </v-alert>
        <v-data-table
          :headers="HeadersVelo"
          :items="getVelo"
          class="elevation-1"
        
        
         
        >
        <template #[`item.VELOCITY_CHECK`]="{ item }">
            <v-chip :color="getVELOCITYColor(item.VELOCITY_CHECK)">
              {{ item.VELOCITY_CHECK }}
            </v-chip>
          </template>
        </v-data-table>
        <v-card-actions>
          <v-btn color="green" block text @click="displayVelocity = false"
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
  name: "ListApproved",
  props: ["data"],
  data() {
    return {
      itdocs_id:[],
      isLoading: false,
      selectarecord: false,
      displayVelocity:false,
      headerlimiteds: [
        { text: "", value: "checkbox" },
        { text: "Check Velo​", value: "actions" },
        // { text: "ລະຫັດ", value: "ITDOCS_ID" },
        { text: "ສະຖານະ", value: "STATUS_DOCS" },
        { text: "ລະຫັດລູກຄ້າ", value: "CUS_ID" },
        { text: "ເລກບັນຊີ", value: "ACC" },
        { text: "ຈຳນວນເງິນ~Kip", value: "AMOUNT_LIMIT" },
        { text: "ຈຳນວນເງິນ~USD", value: "USD" },
        { text: "ຈຳນວນເງິນ~BATH", value: "BATH" },
        { text: "ຈຳນວນເງິນ~CNY", value: "CNY" },
        { text: "ຈຳນວນເງິນ~VND", value: "VND" },
      
        { text: "ວັນທີຂໍອະນຸມັດ", value: "CREATE_DATE" },
        { text: "ເວລາຂໍອະນຸມັດ", value: "TIME_REQUEST" },
        { text: "ວັນທີອະນຸມັດສໍາເລັດ", value: "APPROVED_DATE" },
        { text: "ເວລາອະນຸມັດສໍາເລັດ", value: "TIME_UPDATED" },
        { text: "ຊື່ລູກຄ້າ", value: "CUS_NAME" },
        { text: "ສາຂາ", value: "BRANCH" },
        { text: "ຜູ້ຂໍອະນຸມັດ", value: "BR_USER" },
        { text: "ຜູ້ອະນຸມັດ", value: "USER_NAME" },
        { text: "ປະເພດຂອງເອກະສານ", value: "TYPE_DOCS" },
        { text: "ໝາຍເຫດ", value: "NOTED" },
        { text: "URL ຂອງ​ເອ​ກະ​ສານ​", value: "IMAGE" },
        
       
      ],
   
  HeadersVelo:[
        { text: "VELOCITY TYPE", value: "VELO_TYPE" },
        { text: "CARD/ACCOUNT/CUST", value: "CARD_NO" },
        { text: "VELOCITY STATUS", value: "VELOCITY_CHECK" },
  ],
      gethistorylimited: [],
    getVelo:[],
    isAuthorized: false,
    role: localStorage.getItem("role"),
    };
  },



  mounted() {
    this.isLoading = "red";
    axios
      .get("http://10.0.22.236:9889/api/get/getListApprovedLimit")
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

  async created() {
      if(this.role==5){
        this.isAuthorized==true
      }
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
    getVELOCITYColor(VELOCITY_CHECK) {
      if (VELOCITY_CHECK == "N-NO") return "green";
      else return "red";
    },
    
    getColorInfoUSERCMS(TYPE) {
      if (TYPE == "Done") return "green";
      else if (TYPE == "New") return "red";
      else return "#068fff";
    },

  // check get customer id 
  checkresult(){
    if(this.itdocs_id.CUS_ID !=null){
      axios
          .post(
            "http://10.0.22.236:9889/api/post/Post_get_Velocity",

            {
              cust_id: this.itdocs_id.CUS_ID,
              
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((response) => {
            if (response.data.status == "success") {
            this.getVelo= response.data.data;
              this.displayVelocity = true;
              console.log(response);
            } else {
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
    }else{
     this.selectarecord =true;
    }
  }
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
</style>
