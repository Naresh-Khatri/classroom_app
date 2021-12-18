<template>
  <q-page padding>
    
  </q-page>
</template>

<script>
import courses from "./courses";

export default {
  data() {
    return {
      dialog: false,
      maximizedToggle: true,
    };
  },
  created() {
    window.open('https://drive.google.com/open?id=1bx-R4FeNuSLpCoEoLgrsgwPk2_ENUZST&authuser=0');
    this.$router.push('/')
  }
};
</script>
