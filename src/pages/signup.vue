<template>
  <q-page padding class="bg-dak">
    <div class="q-my-xl">
      <div class="text-grey text-center q-ma-sm">
        Sign up with one of the option
      </div>
      <div class="row text-white q-mb-lg">
        <div class="col flex flex-center">
          <q-btn color="primary" @click="googleLogin">
            <q-icon name="fab fa-google" size="xl" />
          </q-btn>
        </div>
        <div class="col flex flex-center">
          <q-btn color="primary">
            <q-icon name="fab fa-facebook" size="xl" />
          </q-btn>
        </div>
      </div>
    </div>
    <!-- <q-input
      outlined
      dark
      class="q-ma-sm"
      label="First Name"
      color="secondary"
      v-model="firstName"
    />
    <q-input
      outlined
      dark
      class="q-ma-sm"
      label="Last Name"
      color="primary"
      v-model="lastName"
    />
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
        label="Username"
        color="primary"
        type="email"
        v-model="username"
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
        class="q-ma-md"
        style="width:100%"
        size="lg"
        label="Sign up"
        color="primary"
        @click="googleSignup"
      />
    </div>
    <div class="flex flex-center">
      <span class="text-grey">Already have an account?</span>
      <router-link
        class="text-bold text-grey-5 q-mx-sm"
        style="text-decoration:none; color: inherit"
        to="login"
        >Log in</router-link
      >
    </div> -->
  </q-page>
</template>

<script>
import axios from "axios";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// import { registration } from "../apiendpoints.js";
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
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
          console.log(credential);
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
          this.$q.localStorage.set('loggedUser', userInfo)
          this.$router.push("/");
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
    signup() {
      axios
        .post(registration, payload)
        .then((res) => {
          localStorage.setItem("accountInfo", JSON.stringify(res.data));
          this.$store.state.accountInfo = res.data;
          console.log(res.data);
          this.$router.push("/");
          this.$q.notify({
            type: "positive",
            message: `Signup successful!`,
          });
        })
        .catch((err) => {
          console.log(err);
          this.$q.notify({
            type: "negative",
            message: `Something went wrong. Try again later!`,
          });
        });
    },
  },
};
</script>
<style scoped></style>
