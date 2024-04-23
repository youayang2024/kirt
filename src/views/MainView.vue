<template>
  <v-app>
    <SidebarCom />
    <v-content class="ma-4">
      <router-view class="MainView" name="MainView"></router-view>
    </v-content>
    <FooterCom />
  </v-app>
</template>
<script lang="ts">
import SidebarCom from "../components/SidebarCom.vue";
import FooterCom from "../components/FooterCom.vue";

export default {
  name: "MainView",

  components: {
    SidebarCom,
    FooterCom,
  },
  data() {
    return {
      token: localStorage.getItem("token"),
    };
  },
};
</script>
