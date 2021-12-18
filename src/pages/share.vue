<template>
  <q-page padding>
    <!-- content -->
    <q-img src="../assets/shareQR.png" />
  </q-page>
</template>

<script>
import { Plugins } from "@capacitor/core";
const { Share } = Plugins;

export default {
  // name: 'PageName',
  created() {
    Share.share({
      title: "See cool stuff",
      text: "Really awesome thing you need to see right meow",
      url: "http://ionicframework.com/",
      dialogTitle: "Share with buddies"
    })
  }
};
</script>
