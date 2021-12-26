<template>
  <!-- <div class="text-white" style="background:#202053">Hello World</div> -->
  <q-page class="q-pa-md">
    <header class="q-ma-xl">
      <div class="row">
        <div class="col-10 flex items-center">
          <div class="text-h6">
            <div class="text-black text-weight-bolder">Hi {{ username }}</div>
            <div class="text-grey-7">Good Morning!</div>
          </div>
        </div>
        <div class="col-2">
          <img
            class="shadow-15"
            style="border-radius: 50%; height: 75px"
            :src="profilePic"
          />
        </div>
      </div>
    </header>
    <q-card-section>
      <router-link to="club">
        <div class="card bg-primary shadow-15">
          <div class="row">
            <div class="col-8 flex col justify-between">
              <div class="self-start text-bold" style="font-size: 16px">
                join our programming club community
              </div>
              <div class="self-end">
                <q-btn
                  label="join now!"
                  flat
                  rounded
                  color="black"
                  style="background: white"
                />
              </div>
            </div>
            <div class="col-4">
              <div style="font-size: 75px">👩‍💻</div>
            </div>
          </div>
        </div>
      </router-link>
    </q-card-section>
    <q-card-section>
      <div class="row q-my-md">
        <div class="col-8">
          <div class="text-black text-bold text-h6">More clubs</div>
        </div>
        <div class="col-4">
          <div class="text-grey text-bold text-right">See all</div>
        </div>
      </div>
      <q-scroll-area
        style="
          display: flex;
          flex-direction: row;
          height: 160px;
          max-width: 90vw;
          white-space: nowrap;
        "
      >
        <div
          class="q-mr-md row inline card bg-dark shadow-15 "
          style="width: 275px"
          v-for="(club, i) in clubs"
          :key="i"
        >
          <div class="col-8 flex">
            <div class="text-bold self-start" style="font-size: 16px">
              {{ club.name }}
            </div>
            <div class="self-end">
              <q-btn
                label="join now!"
                flat
                rounded
                color="black"
                style="background: white"
              />
            </div>
          </div>
          <div class="col-4">
            <q-img :src="club.image" width="75" />
          </div>
        </div>
      </q-scroll-area>
    </q-card-section>
  </q-page>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

import clubsJSON from "../data/clubsInfo";

export default {
  setup() {
    const store = useStore();

    const clubs = ref(clubsJSON);
    const username = computed(() => store.state.userData.name);
    const profilePic = computed(() => store.state.userData.photoURL);
    return { username, profilePic, clubs };
  },
};
</script>

<style>
.card {
  height: 150px;
  color: #fff;
  padding: 20px;
  border-radius: 25px;
}
</style>
