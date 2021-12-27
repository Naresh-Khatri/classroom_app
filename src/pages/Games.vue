<template>
  <q-page>
    <header class="q-my-xl q-mx-md">
      <div class="row flex justify-end">
        <div class="flex items-center">
          <span class="text-h6 text-black"> 1,233 </span>
          <img src="../assets/coin.png" width="30" />
          <img
            class="shadow-15 q-ml-md"
            style="border-radius: 50%; height: 75px"
            :src="profilePic"
          />
        </div>
      </div>
    </header>
    <q-card-section>
      <Card
        title="Tetris"
        btnText="join"
        :image="require('../assets/gamepad.png')"
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
