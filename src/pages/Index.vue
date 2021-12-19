<template>
  <q-page class="text-white">
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="home" class="q-pa-xm" style="padding: 0px">
        <!-- <div class='text-black'>home</div> -->
        <Home />
      </q-tab-panel>
      <q-tab-panel name="profile" class="q-pa-xm" style="padding: 0px">
        <!-- <div class='text-black'>home</div> -->
        <Profile />
      </q-tab-panel>
    </q-tab-panels>
    <q-tabs v-model="tab" class="bg-primary bottom-nav">
      <q-tab name="home" icon="fas fa-home" />
      <q-tab name="book" icon="fas fa-book-open" />
      <q-tab name="chat" icon="fas fa-comments" />
      <q-tab name="profile" icon="fas fa-user" />
    </q-tabs>
  </q-page>
</template>

<script>
import axios from "axios";
import { meetings, calender } from "../apiendpoints.js";

import Home from "./Home.vue";
import Profile from "./Profile.vue";

export default {
  components: { Home, Profile },
  data() {
    return {
      meetingsList: [
        {
          starting_at: "12:00",
          ending_at: "13:00",
          subject: "Javascript",
          topic: "JS Debouncing",
          link: "https://loremsdlfj.com/asdf",
          instructor: "DR. okay prasad",
        },
        {
          starting_at: "12:00",
          ending_at: "13:00",
          subject: "Javascript",
          topic: "JS Debouncing",
          link: "https://loremsdlfj.com/asdf",
          instructor: "DR. okay prasad",
        },
        {
          starting_at: "12:00",
          ending_at: "13:00",
          subject: "Javascript",
          topic: "JS Debouncing",
          link: "https://loremsdlfj.com/asdf",
          instructor: "DR. okay prasad",
        },
        {
          starting_at: "12:00",
          ending_at: "13:00",
          subject: "Javascript",
          topic: "JS Debouncing",
          link: "https://loremsdlfj.com/asdf",
          instructor: "DR. okay prasad",
        },
      ],
      newMeetingDialog: false,
      meetingDetailsDialog: false,
      selectedMeeting: [],
      tab: "profile",
      date: "",
      startingAt: "",
      endignAt: "",
      subject: "",
      topic: "",
      link: "",
      instructor: "",
    };
  },
  mounted() {
    this.refresh();
  },
  computed: {
    isStaff() {
      if (this.$store.state.accountInfo) {
        return this.$store.state.accountInfo.is_staff;
      }
      return false;
    },
  },
  methods: {
    refresh() {
      axios
        .get(meetings + "?date=" + new Date().toISOString().slice(0, 10))
        .then((res) => {
          this.meetingsList = res.data;
        });
    },
    addNewMeeting() {
      var date = this.date.replaceAll("/", "-");
      var payload = {
        date: date,
        starting_at: this.startingAt,
        ending_at: this.endignAt,
        subject: this.subject,
        topic: this.topic,
        link: this.link,
        instructor: 2,
      };
      var config = {
        method: "post",
        url: meetings,
        headers: {
          Authorization: `Bearer ${this.$store.state.accountInfo.access_token}`,
        },
        data: payload,
      };
      axios(config)
        .then(() => {
          this.refresh();
          //this.$router.go();
          this.$q.notify({
            type: "positive",
            message: `Meeting added!`,
          });
        })
        .catch((err) => {
          console.log(err);
          this.$q.notify({
            type: "negative",
            message: `Something went wrong. Try again later!`,
          });
        });
      console.log(payload);
    },
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
    deleteMeeting(id) {
      var config = {
        method: "delete",
        url: meetings + id + "/",
        headers: {
          Authorization: `Bearer ${this.$store.state.accountInfo.access_token}`,
        },
      };
      axios(config)
        .then((res) => {
          this.refresh();
          this.$q.notify({
            type: "positive",
            message: `Meeting deleted!`,
          });
          this.meetingDetailsDialog = false;
        })
        .catch((err) => {
          console.log(err);
          this.$q.notify({
            type: "negative",
            message: `Something went wrong. Try again later!`,
          });
        });
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
  bottom: 0;
  height: 10vh;
  width: 100%;
}
</style>
