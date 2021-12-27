<template>
  <q-page class="text-white page">
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="home" class="q-pa-xm" style="padding: 0px">
        <!-- <div class='text-black'>home</div> -->
        <Home />
      </q-tab-panel>
      <q-tab-panel name="games" class="q-pa-xm" style="padding: 0px">
        <!-- <div class='text-black'>home</div> -->
        <Games />
      </q-tab-panel>
        <q-tab-panel name="forum" class="q-pa-xm" style="padding: 0px">
        <!-- <div class='text-black'>home</div> -->
        <Forum />
      </q-tab-panel>
      <q-tab-panel name="profile" class="q-pa-xm" style="padding: 0px">
        <!-- <div class='text-black'>home</div> -->
        <Profile />
      </q-tab-panel>
    </q-tab-panels>
    <q-footer class="text-white">
      <q-toolbar style="padding:0;">
        <q-toolbar-title>
          <q-tabs v-model="tab" class="bg-primary bottom-nav">
            <q-tab name="home" icon="fas fa-home" />
            <q-tab name="games" icon="fas fa-book-open" />
            <q-tab name="forum" icon="fas fa-comments" />
            <q-tab name="profile" icon="fas fa-user" />
          </q-tabs>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import axios from "axios";

import Home from "./Home.vue";
import Profile from "./Profile.vue";
import Forum from "./Forum.vue";
import Games from "./Games.vue";

export default {
  components: { Home, Profile, Forum, Games },
  data() {
    return {
      tab: "games",
      date: "",
      startingAt: "",
      endignAt: "",
      subject: "",
      topic: "",
      link: "",
      instructor: "",
    };
  },
  methods: {
    showDetails(index) {
      this.meetingDetailsDialog = true;
      this.selectedMeeting = this.meetingsList[index];
    },
    formateDate(date) {
      return date.replaceAll("/", "-");
    },
    getTimeinHHMM(time) {
      return time.split(":")[0] + ":" + time.split(":")[1];
    },
    getDuration(starting_at, ending_at) {
      let MIN_IN_HOUR = 60;
      let duration =
        Number(ending_at.split(":")[0]) * MIN_IN_HOUR +
        Number(ending_at.split(":")[1]) -
        Number(starting_at.split(":")[0]) * MIN_IN_HOUR -
        Number(starting_at.split(":")[1]);
      return `${duration} mins`;
    },
  },
};
</script>
<style scoped>
.container {
  border-radius: 15px;
  background: white;
}
.rounded {
  border-radius: 15px;
}
.bottom-nav {
  border-radius: 20px 20px 0px 0px;
  position: absolute;
  display: flex;
  justify-content: space-evenly;
  bottom: 0;
  height: 10vh;
  width: 100%;
}
</style>
