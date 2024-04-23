<template>
    <v-card>
      <v-toolbar
      dense
        style="
          background-image: url('https://www.shutterstock.com/image-photo/communication-technology-internet-business-global-260nw-1421446100.jpg');
  
          -webkit-background-size: cover;
          -moz-background-size: cover;
          -o-background-size: cover;
          background-size: cover;
          /* Set rules to fill background */
          min-height: 100%;
          min-width: 1024px;
  
          /* Set up proportionate scaling */
          width: 100%;
          height: auto;
  
          /* Set up positioning */
          position: fixed;
          top: 0;
          left: 0;
          color: white;
        "
      >
        <img src="../assets/new-ldb.png" height="60" />
        <v-spacer></v-spacer>
  
        <v-spacer></v-spacer>
        <!-- <Label style="font-family: phetsarath OT">Development by switching</Label> -->
      </v-toolbar>
      <div class="text-center">
        <v-alert
        dense
          type=""
          style="
            font-family: phetsarath OT;
            color: white;
            background-color: #0b60b0;
          "
          >Check Card Status</v-alert
        >
      </div>
  
      <v-card style="font-family: phetsarath OT; color: blue">
        <v-tabs v-model="tab" style="font-size: 5px">
          &nbsp;&nbsp;
          <v-tab href="#CheckCardStatus">
            <v-icon style="color: #e7b10a">mdi-credit-card</v-icon>&nbsp;&nbsp;
            Card
          </v-tab>
        </v-tabs>
  
        <v-tabs-items v-model="tab">
          <!-- debit card -->
          <v-tab-item :key="1" value="CheckCardStatus">
            <CheckCardStatus />
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-card>
  </template>
  <script>
  import CheckCardStatus from "../card/CheckCardStatus.vue";
  
  export default {
    components: {
        CheckCardStatus,
    },
    data() {
      return {
        tab: "",
      };
    },
  };
  </script>
  