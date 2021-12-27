<template>
  <q-page>
    <header class="q-my-xl q-mx-md">
      <div class="row flex justify-end">
        <div class="flex items-center">
          <span class="text-h6 text-black"> 1,233 </span>
          <img src="../assets/game/coin.png" width="30" />
          <img
            class="shadow-15 q-ml-md"
            style="border-radius: 50%; height: 75px"
            :src="profilePic"
          />
        </div>
      </div>
    </header>

    <q-card-section class="flex flex-center">
      <div class="row q-my-md" style="width: 100%">
        <div class="col-8">
          <div class="text-black text-bold text-h6">Trending games</div>
        </div>
        <div class="col-4">
          <div class="text-grey text-bold text-right">See all</div>
        </div>
      </div>
      <Card
        title="Arithmetic"
        btnText="Play now!"
        :link="'arithmetic-game'"
        :image="require('../assets/game/gamepad.png')"
      />
    </q-card-section>
  </q-page>
</template>

<script>
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import { useStore } from "vuex";

import Card from "../components/Card.vue";
export default {
  components: {
    Card,
  },
  setup() {
    const $q = useQuasar();
    const store = useStore();

    const username = computed(() => store.state.userData.name);
    const profilePic = computed(() => store.state.userData.photoURL);
    return { username, profilePic };
  },
};
</script>
