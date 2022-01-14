<template>
  <!-- <div class="text-white" style="background:#202053">Hello World</div> -->
  <q-page>
    <header class="q-ma-xl">
      <div class="row">
        <div class="col-10 flex items-center">
          <transition
            appear
            enter-active-class="animated slideInLeft"
            leave-active-class="animated fadeOut"
          >
            <div class="text-h6">
              <div class="text-black text-weight-bolder">Hi {{ username }}</div>
              <div class="text-grey-7">Good Morning!</div>
            </div>
          </transition>
        </div>
        <div class="col-2">
          <transition
            appear
            enter-active-class="animated slideInRight"
            leave-active-class="animated fadeOut"
            ><router-link to="/profile">
              <img
                class="shadow-15"
                style="border-radius: 50%; height: 75px"
                :src="profilePic"
              />
            </router-link>
          </transition>
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
    <q-card-section style="padding: 0px">
      <div class="row q-ma-md">
        <div class="col-8">
          <div class="text-black text-bold text-h6">More clubs</div>
        </div>
        <div class="col-4">
          <div class="text-grey text-bold text-right">See all</div>
        </div>
      </div>
      <div class="flex justify-center">
        <q-scroll-area
          style="
            display: flex;
            justify-content: center;
            flex-direction: row;
            height: 200px;
            width: 90vw;
            white-space: nowrap;
          "
        >
          <Card
            v-for="(club, i) in clubs"
            :key="i"
            :title="club.name"
            :image="club.image"
            :btnText="'Join now!'"
          />
        </q-scroll-area>
      </div>
    </q-card-section>
  </q-page>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

import clubsJSON from "../data/clubsInfo";
import Card from "../components/Card.vue";

export default {
  components: {
    Card,
  },
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
</style>
