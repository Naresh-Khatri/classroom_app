<template>
  <q-layout view="lHh Lpr lFf" class="relative">
    <div class="top-left-btn">
      <q-btn
        v-if="$route.meta.showMenu"
        class="absolute"
        color="primary"
        dense
        flat
        size="lg"
        round
        icon="menu"
        aria-label="Menu"
        @click="leftDrawerOpen = !leftDrawerOpen"
      />
      <q-btn
        v-else
        class="absolute"
        color="primary"
        size="lg"
        flat
        dense
        round
        icon="arrow_back_ios"
        aria-label="Menu"
        to="/"
      />
    </div>
    <!-- <q-toolbar-title class="text-bold">
          {{ $route.name }}
    </q-toolbar-title>-->

    <!-- <div>Quasar v</div> -->

    <q-drawer v-model="leftDrawerOpen" show-if-above>
      <!-- content-class="bg-grey-1" -->
      <q-list>
        <div class="q-pa-md q-pb-lg bg-primary">
          <router-link to="/profile">
            <q-icon
              size="100px"
              color="white"
              style="border-radius: 50%"
              rounded
              :name="isLoggedIn ? 'img:' + getPhotoURL : 'person_off'"
            />
          </router-link>
          <div v-if="!isLoggedIn">
            <div class="text-h6 text-white">Unknown user</div>
            <q-btn class="q-mr-sm" color="secondary" label="Sign up/login" to="signup" />
            <!-- <q-btn color="secondary" label="login" to="login" /> -->
          </div>
          <div v-else>
            <div>
              <span class="text-h4 text-white">{{ firstName }}</span>
              <span class="text-h6 text-white">{{ lastName }}</span>
            </div>
            <q-btn color="secondary" label="Logout" @click="logoutDialog = true" />
            <q-dialog v-model="logoutDialog" persistent>
              <q-card>
                <q-card-section class="row items-center">
                  <span>
                    <q-avatar icon="logout" color="red" text-color="white" />
                  </span>
                  <span class="q-ml-sm">You are about to log out.</span>
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn flat label="Cancel" color="primary" v-close-popup />
                  <q-btn flat label="Confirm" color="red" @click="logout()" />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>
        </div>
      </q-list>
      <q-list
        v-for="(elink, index) in essentialLinks"
        :key="index"
        :active="elink.title == link"
        @click="link = elink.title"
        active-class="active-class"
      >
        <EssentialLink :key="elink.title" v-bind="elink" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <!-- <q-pull-to-refresh @refresh="refresh"> -->
      <router-view />
      <q-footer class="text-white" v-if="$route.name != 'Forum'">
        <q-toolbar style="padding: 0">
          <q-toolbar-title>
            <q-tabs v-model="tab" class="bg-primary bottom-nav">
              <q-route-tab to="/" icon="fas fa-home" />
              <q-route-tab to="/materials" icon="fas fa-book-open" />
              <q-route-tab to="/games" icon="fas fa-gamepad" />
              <q-route-tab to="/forum" icon="fas fa-comments" />
              <q-route-tab to="/profile" icon="fas fa-user" />
            </q-tabs>
          </q-toolbar-title>
        </q-toolbar>
      </q-footer>
      <!-- </q-pull-to-refresh> -->
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, computed, onMounted, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { getAuth, signOut } from "firebase/auth";

import EssentialLink from "components/EssentialLink.vue";
import drawerLinksData from "../data/drawerLinksData.js";
import { Plugins, statusBarStyle } from "@capacitor/core";

const { StatusBar } = Plugins;

export default {
  name: "MainLayout",
  components: { EssentialLink },

  setup() {
    const store = useStore();
    const $q = useQuasar();
    const $router = useRouter();

    const tab = ref("home");
    const link = ref("home");
    const leftDrawerOpen = ref(false);
    const essentialLinks = ref(drawerLinksData);
    const logoutDialog = ref(false);

    const firstName = computed(() => store.state.userData.name.split(" ")[0]);
    const lastName = computed(
      () => store.state.userData.name.split(" ")[1] || ""
    );
    const getPhotoURL = computed(() => store.state.userData.photoURL);
    const isLoggedIn = computed(() => !!store.state.userData.name);

    onMounted(() => {
      checkLogin();
      checkStorage();
      // if ($q.platform.is.mobile)
      //   StatusBar.setBackgroundColor(this.$route.meta.statusBarStyle);
    });
    watchEffect(() => {
      // if ($q.platform.is.mobile)
      //   StatusBar.setBackgroundColor(to.meta.statusBarStyle);
    });
    const checkLogin = () => {
      getAuth().onAuthStateChanged((user) => {
        if (user) {
          store.dispatch("getUserData", user);
          console.log(user)
        } else {
          $q.dialog({
            title: "Login",
            message: "You are not logged in. Please login to continue.",
            persistent: true,
            ok: "Login",
          }).onOk(() => {
            $router.push("/signup");
          });
          // store.commit("setUserData", {
          //   uid: null,
          //   name: null,
          //   email: null,
          //   photoURL: null,
          // });
        }
      });
    };
    const checkStorage = () => {
      const user = $q.localStorage.getItem("loggedUser");
      if (user) {
        store.commit("setUserData", user);
      }
    };
    const refresh = (done) => {
      setTimeout(() => {
        done();
      }, 1000);
    };
    const logout = () => {
      console.log("logout");
      localStorage.removeItem("loggedUser");
      store.commit("setUserData", {});
      // store.state.accountInfo = {};
      // console.log(store.state.accountInfo);
      logoutDialog.value = false;
      // this.$router.go();

      const auth = getAuth();
      signOut(auth)
        .then(() => {
          $q.notify({
            type: "positive",
            message: `Logged out Successfully!`,
          });
        })
        .catch((error) => {
          $q.notify({
            type: "negatice",
            message: `could not logout!`,
          });
        });
    };
    return {
      tab,
      link,
      leftDrawerOpen,
      essentialLinks,
      logoutDialog,
      firstName,
      lastName,
      getPhotoURL,
      isLoggedIn,
      checkStorage,
      refresh,
      logout,
    };
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Comfortaa:wght@500&display=swap");
* {
  font-family: "Comfortaa";
}
.menu-title {
  /* font-family: "Lobster", cursive; */
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  display: flex;
  justify-content: center;
  padding: 10px;
  font-size: 2em;
}
.router-anim-enter-active {
  transition: all 0.3s ease-in-out;
}
.router-anim-leave-active {
  transform: scale(1);
}
.router-anim-enter,
.router-anim-leave-to {
  /* transform: translateX(100px); */
  transform: scale(1.1);
  opacity: 0;
}
.active-class {
  color: white;
  background: #8cc26b;
}

.q-drawer__content,
.q-drawer__backdrop,
.q-dialog__backdrop,
.q-loading__backdrop,
.q-loading__backdrop {
  backdrop-filter: blur(2px);
}
.top-left-btn {
  position: fixed;
  color: white;
  z-index: 10;
  top: 25px;
  left: 25px;
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
a {
  text-decoration: none;
}
</style>
