<template>
  <q-page v-if="user" class="bg-white q-pa-md f lex flex-cen ter">
    <div class="row" style="margin-top: 100px">
      <div class="col-3">
        <div>
          <img :src="user.photoURL" style="border-radius: 50%; width: 100%" />
        </div>
      </div>
      <div class="col-7">
        <div class="text-white q-pa-md">
          <div class="text-black text-bold text-h5">{{ user.name }}</div>
          <div class="text-grey-7 text-subtitle">{{ user.email }}</div>
        </div>
      </div>
      <div class="col-1 align-center">
        <q-btn flat color="black" icon="edit" @click="editProfile" />
      </div>
    </div>
    <div class="row q-mt-xl">
      <div class="col-12">
        <div class="text-grey-7 text-subtitle">My status</div>
        <q-scroll-area
          style="height: 50px; max-width: 90vw; white-space: nowrap"
        >
          <span
            @click="setActiveStatus(status.id)"
            v-for="(status, i) in statuses"
            :key="i"
          >
            <q-chip
              :label="status.text"
              :color="status.color"
              :text-color="status.textColor"
              size="17px"
              :style="{ background: status.color, color: status.textColor }"
              class="q-mr-sm"
              :class="activeStatus == status.id ? 'shadow-10' : 'disabled'"
            />
          </span>
        </q-scroll-area>
      </div>
    </div>
    <div class="q-mt-xl">
      <div class="text-grey-7 text-subtitle">My Badges</div>
      <q-separator class="q-ma-md" />
      <div class="q-gutter-xs text-black">
        <img
          v-for="(badge, i) in getRandomBadges"
          :key="i"
          :src="badge"
          width="75"
        />
      </div>
    </div>
    <div class="q-mt-xl">
      <div class="text-grey-7 text-subtitle">My interests</div>
      <q-separator class="q-ma-md" />
      <div class="q-gutter-xs text-black">
        <q-chip
          v-for="(interest, i) in getRandomInterests"
          :key="i"
          :label="interest.text"
          :color="interest.color"
          :text-color="interest.textColor"
          size="17px"
          :style="{ background: interest.color, color: interest.textColor }"
          class="q-mr-sm"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import statuses from "../data/profileStatuses";
import interests from "../data/profileInterests";
export default {
  data() {
    return {
      statuses: statuses,
      interests: interests,
      activeStatus: "online",
      badges: [
        require("../assets/badges/new.svg"),
        require("../assets/badges/best.svg"),
        require("../assets/badges/diamond.svg"),
        require("../assets/badges/fast.svg"),
        require("../assets/badges/heart.svg"),
        require("../assets/badges/mostLiked.svg"),
        require("../assets/badges/verified.svg"),
      ],
    };
  },
  computed: {
    getRandomInterests() {
      const interests = this.interests;
      return interests.sort(() => 0.5 - Math.random()).slice(0, 4);
    },
    getRandomBadges() {
      const badges = this.badges;
      return badges
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.random() * badges.length + 1);
    },
    user() {
      console.log(this.$q.localStorage.getItem("loggedUser"));
      return this.$q.localStorage.getItem("loggedUser");
    },
  },
  methods: {
    setActiveStatus(id) {
      console.log("setting");
      this.activeStatus = id;
    },
    editProfile() {
      this.$q
        .dialog({
          title: "Edit Profile",
          message: "This feature is not implemented yet 😢",
        })
        .onOk(() => {
          // console.log('OK')
        })
        .onCancel(() => {
          // console.log('Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
      // this.$q.dialog({
      //   title: "Edit Profile",
      //   component: "edit-profile",
      //   width: "500px",
      // });
    },
  },
};
</script>

<style></style>
