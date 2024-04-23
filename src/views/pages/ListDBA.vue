<template>
  <v-card>
    <v-card style="font-family: phetsarath OT; color: blue">
      <v-tabs v-model="tab" style="font-size: 5px">
        &nbsp;&nbsp;
        <v-tab href="#atmdb">
          <v-icon style="color: chocolate">mdi-database</v-icon>&nbsp;&nbsp;
          ຖານຂໍ້ມູນ ATM
        </v-tab>
        <v-tab href="#mdb">
          <v-icon style="color: chocolate">mdi-database</v-icon>&nbsp;&nbsp;
          ຖານຂໍ້ມູນ Mobile
        </v-tab>

        <v-tab href="#monitor">
          <v-icon style="color: chocolate">mdi-database</v-icon>&nbsp;&nbsp;
          Monitoring User DB
        </v-tab>
        <v-tab href="#ATMTableSpacePROD">
          <v-icon style="color: chocolate">mdi-database</v-icon>&nbsp;&nbsp;
          ATM Table Space PROD
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item :key="1" value="atmdb">
          <atmdb />
        </v-tab-item>

        <v-tab-item :key="2" value="mdb">
          <v-card flat>
            <mdb />
          </v-card>
        </v-tab-item>
        <v-tab-item :key="3" value="monitor">
          <v-card flat>
            <MonitorDBUser />
          </v-card>
        </v-tab-item>
        <v-tab-item :key="4" value="ATMTableSpacePROD">
          <v-card flat>
            <ATMTableSpacePROD/>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-card>
</template>
<script>
import atmdb from "../../views/pages/ATMDbaView.vue";
import mdb from "../../views/pages/MobileDbaView.vue";
import MonitorDBUser from "../../card/MonitorDBUser.vue";
import ATMTableSpacePROD from "../../card/ATMTableSpacePROD.vue";
export default {
  components: {
    atmdb,
    mdb,
    MonitorDBUser,
    ATMTableSpacePROD,
  },
  data() {
    return {
      tab: "",
    };
  },
};
</script>
