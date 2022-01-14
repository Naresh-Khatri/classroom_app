<template>
  <q-page v-if="user" class="bg-white q-pa-md q-mb-md">
    <div class="row" style="margin-top: 100px">
      <div class="col-3">
        <div>
          <q-img
            class="shadow-10"
            :src="user.photoURL"
            style="border-radius: 50%; width: 100%"
          />
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
          style="height: 60px; max-width: 90vw; white-space: nowrap"
        >
          <span
            @click="setActiveStatus(status.id)"
            v-for="(status, i) in statuses"
            :key="i"
          >
            <q-chip
              v-if="status.id == user.status"
              :label="status.text"
              :color="status.color"
              :text-color="status.textColor"
              size="17px"
              :style="{ background: status.color, color: status.textColor }"
              class="q-mr-sm"
              :class="user.status == status.id ? 'shadow-10' : 'disabled'"
            />
          </span>
          <span
            @click="setActiveStatus(status.id)"
            v-for="(status, i) in statuses"
            :key="i"
          >
            <q-chip
              v-if="status.id !== user.status"
              :label="status.text"
              :color="status.color"
              :text-color="status.textColor"
              size="17px"
              :style="{ background: status.color, color: status.textColor }"
              class="q-mr-sm"
              :class="user.status == status.id ? 'shadow-10' : 'disabled'"
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
      <div class="text-grey-7 text-subtitle">
        My interests

        <q-btn flat color="black" icon="edit" @click="editInterests" />
      </div>
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
          class="q-mr-sm shadow-10"
        />
      </div>
    </div>
    <q-card-section>
      <div class="row q-mt-xl">
        <div class="col-12 flex justify-between items-center">
          <div class="text-grey-7 text-subtitle">My performance</div>
          <a
            href="https://naresh-khatri.github.io/JNTUA-result-analyser-spa/#/"
          >
            <q-chip
              class="q-pa-lg text-center flex items-center shadow-10"
              style="
                background: #ff4d01;
                color: white;
                font-size: 12px;
                height: 40px;
              "
            >
              Powered by<br />
              <img src="../assets/JRA.png" width="30" />
            </q-chip>
          </a>
        </div>
      </div>
      <div class="row flex items-center q-mt-xl" style="flex-direction: column">
        <q-knob
          readonly
          v-model="sgpa"
          show-value
          size="120px"
          :thickness="0.22"
          :max="10"
          color="green"
          track-color="grey-3"
          class="q-ma-md"
        ></q-knob>
        <div class="text-grey-7 text-subtitle">last sem SGPA</div>
      </div>
    </q-card-section>
  </q-page>
</template>

<script>
import axios from "axios";
import { api } from "boot/axios";

import ProfileEdit from "../components/ProfileEdit.vue";

import statusesJSON from "../data/profileStatuses";
import interestsJSON from "../data/profileInterests";
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

export default {
  components: {},
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
    // const photoURL = computed(()=> store.state.userData.photoURL);
    // const photoURL = ref("");
    // photoURL.value = "http://localhost:4000/user/getPhotoURL/ipZVQgDR5Wdixl5EfR48I6rPtkG3"
    // photoURL.value = computed(() =>
    // store.state.userData.customProfilePic
    //   ? "http://localhost:4000/user/getPhotoURL/ipZVQgDR5Wdixl5EfR48I6rPtkG3"
    //   : store.state.userData.photoURL
    // );

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
    const sgpa = ref(0);
    onMounted(async () => {
      // setInterval(() => {
      // photoURL.value += "?";
      // console.log("updating profile pic", photoURL.value);
      // }, 1000);
      try {
        setTimeout(() => {
          editProfile();
        }, 0);
        // const res = await axios.get(
        //   "https://jntua.plasmatch.in/singleResultv2/19fh1a0546/R19/B.TECH/II/II"
        // );
        // sgpa.value = res.data.sgpa;
      } catch (e) {
        console.log(e);
      }
    });

    const setActiveStatus = (id) => {
      console.log("setting");
      activeStatus.value = id;
      store.commit("setUserStatus", id);
      api
        .post("/user/changeStatus", {
          status: id,
          uid: user.value.uid,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    const editProfile = () => {
      $q.dialog({
        component: ProfileEdit,
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
    const editInterests = () => {
      $q.dialog({
        title: "Edit Interests",
        message: "This feature is not implemented yet 😢",
        width: "500px",
      });
    };
    return {
      user,
      // photoURL,
      statuses,
      interests,
      activeStatus,
      badges,
      sgpa,
      getRandomBadges,
      getRandomInterests,
      setActiveStatus,
      editProfile,
      editInterests,
    };
  },
};
</script>

<style></style>
