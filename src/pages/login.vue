<template>
  <q-page padding class="bg-dak">
    <div>
      <div style="margin: 150px 0px">
        <div class="text-grey text-center q-ma-sm">
          Sign up with one of the option
        </div>
        <div class="row text-white q-mb-lg">
          <div class="col flex flex-center">
            <q-btn color="blue">
              <q-icon class="q-mx-lg" name="google" size="xl" />
            </q-btn>
          </div>
          <div class="col flex flex-center">
            <q-btn color="primary" disable>
              <q-icon class="q-mx-lg" name="facebook" size="xl" />
            </q-btn>
          </div>
        </div>
      </div>
      <div class="q-mt-lg">
        <q-input
          outlined
          dark
          class="q-ma-sm"
          label="Email"
          color="primary"
          type="email"
          v-model="email"
        />
        <q-input
          outlined
          dark
          class="q-ma-sm"
          label="Password"
          color="primary"
          type="password"
          v-model="password"
        />
      </div>
      <div class="flex flex-center">
        <q-btn
          class="q-my-md q-px-xl"
          size="lg"
          label="Login"
          color="primary"
          @click="googleLogin"
        />
      </div>
      <div class="flex flex-center">
        <span class="text-grey">Dont have an account?</span>
        <router-link
          class="text-bold text-grey-5 q-mx-sm"
          style="text-decoration: none; color: inherit"
          to="signup"
          >Sign up</router-link
        >
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { login } from "../apiendpoints.js";

export default {
  data() {
    return {
      // email: "natesh.khatri31@gmail.com",
      email: "",
      password: "",
    };
  },
  methods: {
    googleLogin() {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      signInWithPopup(auth, provider)
        .then((res) => {
          console.log(res);
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(res);
          const additionalUserInfo = GoogleAuthProvider.additionalUserInfoFromResult(res);
          console.log(credential, additionalUserInfo)
          const user = res.user;
          const userInfo = {
            uid: user.uid,
            email: user.email,
            phone: user.phoneNumber,
            name: user.displayName,
            emailVerified: user.emailVerified,
            photoURL: user.photoURL,
            metadata: user.metadata,
            reloadUserInfo: user.reloadUserInfo,
          };
          this.$q.notify({
            color: "positive",
            message: "Login successful🍭",
          });
          //store userInfo obj in localstorage
          // this.$q.localStorage.set('loggedUser', userInfo)

          //TODO: store userInfo obj in backend
        })
        .catch((error) => {
          console.log(error);
          this.$q.notify({
            color: "negative",
            message: "Couldn't login 👀",
          });
        });
    },
  },
};
</script>
