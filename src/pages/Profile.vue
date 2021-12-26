<template>
  <q-page v-if="user" class="bg-white q-pa-md q-mb-md">
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
import statusesJSON from "../data/profileStatuses";
import interestsJSON from "../data/profileInterests";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

export default {
  setup() {
    const store = useStore();
    const $q = useQuasar();

    const statuses = ref(statusesJSON);
    const interests = ref(interestsJSON);
    const activeStatus = ref("online");
    const badges = ref([
      require("../assets/badges/new.svg"),
      require("../assets/badges/best.svg"),
      require("../assets/badges/diamond.svg"),
      require("../assets/badges/fast.svg"),
      require("../assets/badges/heart.svg"),
      require("../assets/badges/mostLiked.svg"),
      require("../assets/badges/verified.svg"),
    ]);

    // const statuses = store.state.profileStatuses;
    // const interests = store.state.profileInterests;

    const user = computed(() => store.state.userData);
    const getRandomInterests = computed(() => {
      const interestsCopy = interests;
      return interestsCopy.value.sort(() => 0.5 - Math.random()).slice(0, 4);
    });
    const getRandomBadges = computed(() => {
      const badgesCopy = badges;
      return badgesCopy.value
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.random() * badges.value.length + 1);
    });

    const setActiveStatus = (id) => {
      console.log("setting");
      activeStatus = id;
    };
    const editProfile = () => {
      $q.dialog({
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
      // $q.dialog({
      //   title: "Edit Profile",
      //   component: "edit-profile",
      //   width: "500px",
      // });
    };

    return {
      user,
      statuses,
      interests,
      activeStatus,
      badges,
      getRandomBadges,
      getRandomInterests,
      setActiveStatus,
      editProfile,
    };
  },
};
</script>

<style></style>
