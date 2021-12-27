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
      /><q-btn
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
        </q-toolbar-title> -->

    <!-- <div>Quasar v</div> -->

    <q-drawer v-model="leftDrawerOpen" show-if-above>
      <!-- content-class="bg-grey-1" -->
      <q-list>
        <div class="q-pa-md q-pb-lg bg-primary">
          <q-icon
            size="100px"
            color="white"
            style="border-radius: 50%"
            rounded
            :name="isLoggedIn ? 'img:' + getPhotoURL : 'person_off'"
          />
          <div v-if="!isLoggedIn">
            <div class="text-h6 text-white">Unknown user</div>
            <q-btn
              class="q-mr-sm"
              color="secondary"
              label="Sign up/login"
              to="signup"
            />
            <!-- <q-btn color="secondary" label="login" to="login" /> -->
          </div>
          <div v-else>
            <div>
              <span class="text-h4 text-white">{{ firstName }} </span>
              <span class="text-h6  text-white"> {{ lastName }}</span>
            </div>
            <q-btn
              color="secondary"
              label="Logout"
              @click="logoutDialog = true"
            />
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
      <transition name="router-anim">
        <router-view style="background: #202053" />
      </transition>
      <!-- </q-pull-to-refresh> -->
    </q-page-container>
  </q-layout>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";

import EssentialLink from "components/EssentialLink.vue";
import drawerLinksData from "../data/drawerLinksData.js";
import { Plugins, statusBarStyle } from "@capacitor/core";

const { StatusBar } = Plugins;

export default {
  name: "MainLayout",
  components: { EssentialLink },
  data() {
    return {
      link: "home",
      leftDrawerOpen: false,
      essentialLinks: drawerLinksData,
      // accountInfo: this.$store.state.accountInfo,
      userName: "",
      userEmail: "",
      logoutDialog: false,
    };
  },
  computed: {
    firstName() {
      return this.$store.state.userData.name.split(" ")[0];
    },
    lastName() {
      return this.$store.state.userData.name.split(" ")[1] || "";
    },
    getPhotoURL() {
      return this.$store.state.userData.photoURL;
    },
    isLoggedIn() {
      return !!this.$store.state.userData.name;
    },
  },
  watch: {
    $route(to, from) {
      // console.log(to, from);
      // console.log(this.$q.platform.is.mobile);
      // if (this.$q.platform.is.mobile)
      //   StatusBar.setBackgroundColor(to.meta.statusBarStyle);
    },
  },
  created() {
    this.checkStorage();
    // console.log(this.$q.platform.is.mobile);
    // if (this.$q.platform.is.mobile)
    //   StatusBar.setBackgroundColor(this.$route.meta.statusBarStyle);
  },
  updated() {
    //console.log(this.$store.getters.isLoggedIn);
  },
  methods: {
    checkStorage() {
      const user = this.$q.localStorage.getItem("loggedUser");
      if (user) {
        this.$store.commit("setUserData", user);
      }
    },
    refresh(done) {
      setTimeout(() => {
        done();
      }, 1000);
    },
    logout() {
      localStorage.removeItem("loggedUser");
      this.$store.commit("setUserData", {});
      // this.$store.state.accountInfo = {};
      // console.log(this.$store.state.accountInfo);
      this.logoutDialog = false;
      // this.$router.go();

      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.$q.notify({
            type: "positive",
            message: `Logged out Successfully!`,
          });
        })
        .catch((error) => {
          this.$q.notify({
            type: "negatice",
            message: `could not logout!`,
          });
        });
    },
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
.q-drawer__backdrop {
  backdrop-filter: blur(2px);
}
.top-left-btn {
  position: fixed;
  color: white;
  z-index: 10;
  top: 25px;
  left: 25px;
}
a{
  text-decoration: none;

}
</style>
