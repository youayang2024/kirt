<template>
  <v-card>
    <v-card style="font-family: phetsarath OT; color: blue">
      <v-tabs v-model="tab" style="font-size: 5px">
        &nbsp;&nbsp;
        <v-tab href="#debitcard">
          <v-icon style="color: #e7b10a">mdi-credit-card</v-icon>&nbsp;&nbsp;
          ບັດເດບິດ DEBIT
        </v-tab>

        <v-tab href="#preparecard">
          <v-icon style="color: #e7b10a">mdi-credit-card</v-icon>&nbsp;&nbsp;
          ບັດ PREPARE
        </v-tab>
        <v-tab href="#virtualcard">
          <v-icon style="color: #e7b10a">mdi-credit-card</v-icon>&nbsp;&nbsp;
          ບັດ VIRTUAL
        </v-tab>
        <v-tab href="#studentcard">
          <v-icon style="color: #e7b10a">mdi-credit-card</v-icon>&nbsp;&nbsp;
          ບັດນັກສຶກສາ
        </v-tab>
        <v-tab href="#Civilservantcard">
          <v-icon style="color: #e7b10a">mdi-credit-card</v-icon>&nbsp;&nbsp;
          ບັດລັດຖະກອນ
        </v-tab>
        <v-tab href="#CheckT24Info">
          <v-icon style="color: #164b60">mdi-cash-100</v-icon>&nbsp;&nbsp;
          ກວດສອບຂໍ້ມູນຈາກ T24
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <!-- debit card -->
        <v-tab-item :key="1" value="debitcard">
          <DebitCard />
        </v-tab-item>

        <!-- repare card -->
        <v-tab-item :key="2" value="preparecard">
          <v-card flat>
            <PrepareCard />
          </v-card>
        </v-tab-item>
        <!--  -->
        <!--  -->
        <v-tab-item :key="3" value="virtualcard">
          <v-card flat>
            <VirtualCard />
          </v-card>
        </v-tab-item>
        <!--  -->
        <!--  -->
        <v-tab-item :key="4" value="studentcard">
          <v-card flat>
            <Studentcard />
          </v-card>
        </v-tab-item>
        <!--  -->
        <v-tab-item :key="5" value="Civilservantcard">
          <v-card flat>
            <CivilservantCard />
          </v-card>
        </v-tab-item>
        <!--  -->

        <v-tab-item :key="6" value="CheckT24Info">
          <v-card flat>
            <CheckT24Info />
          </v-card>
        </v-tab-item>
        <!--  -->
      </v-tabs-items>
    </v-card>
  </v-card>
</template>
<script>
import PrepareCard from "../../card/PrepareCard.vue";
import DebitCard from "../../card/DebitCard.vue";
import VirtualCard from "../../card/VirtualCard.vue";
import Studentcard from "../../card/StudentCard.vue";
import CivilservantCard from "../../card/CivilServantCard.vue";
import CheckT24Info from "../../card/CheckT24Info.vue";
export default {
  components: {
    PrepareCard,
    DebitCard,
    VirtualCard,
    Studentcard,
    CivilservantCard,
    CheckT24Info,
  },
  data() {
    return {
      tab: "",
    };
  },
};
</script>
