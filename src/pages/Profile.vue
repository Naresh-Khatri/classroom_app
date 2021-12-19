<template>
  <q-page class="bg-white q-pa-md f lex flex-cen ter">
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
        <q-btn flat color="black" icon="edit" />
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
    <div class="row q-mt-xl">
      <div class="text-grey-7 text-subtitle">My Badges</div>
      <div v-for="(badge, i) in badges" :key="i">
        <q-icon color="green" :name="badge" />
      </div>
    </div>
    <div class="row q-mt-xl">
      <div class="text-grey-7 text-subtitle">My interests</div>
    </div>
  </q-page>
</template>

<script>
import statuses from "../data/profileStatuses";
export default {
  data() {
    return {
      statuses: statuses,
      activeStatus: "online",
      badges: ["fas fa-certificate"],
    };
  },
  computed: {
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
  },
};
</script>

<style></style>
