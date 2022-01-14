<template>
  <q-page class="text-white page">
    <!-- <div class="text-black">{{tab}}</div> -->

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="home" class="q-pa-xm" style="padding: 0px">
        <!-- <div class='text-black'>home</div> -->
        <Home />
      </q-tab-panel>
      <q-tab-panel name="materials" class="q-pa-xm" style="padding: 0px">
        <!-- <div class='text-black'>home</div> -->
        <Materials />
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
    <!-- <q-footer class="text-white" v-if="tab != 'forum'">
      <q-toolbar style="padding: 0">
        <q-toolbar-title>
          <q-tabs v-model="tab" class="bg-primary bottom-nav">
            <q-route-tab to="/" icon="fas fa-home" />
            <q-route-tab to="/games" icon="fas fa-book-open" />
            <q-route-tab to="/forum" icon="fas fa-comments" />
            <q-route-tab to="/profile" icon="fas fa-user" />
          </q-tabs>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer> -->
  </q-page>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

import axios from "axios";

import Home from "./Home.vue";
import Profile from "./Profile.vue";
import Forum from "./Forum.vue";
import Games from "./Games.vue";
import Materials from "./Materials.vue";

export default {
  components: { Home, Profile, Forum, Games, Materials },
  setup(props) {
    const store = useStore();
    // const tab = ref(store.state.tab);
    // const tab = ref("home");
    const tab = computed(() => store.state.tab);

    return {
      tab,
    };
  },
  methods: {},
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
