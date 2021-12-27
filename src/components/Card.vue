<template>
  <div class="q-mr-md row inline card bg-dark shadow-15" style="width: 275px">
    <div class="col-8 flex">
      <div class="text-bold self-start" style="font-size: 16px">
        {{ title }}
      </div>
      <div class="self-end">
        <div v-if="link">
          <router-link :to="link">
            <q-btn
              :label="btnText"
              flat
              rounded
              color="black"
              style="background: white"
          /></router-link>
        </div>
        <div v-else>
          <q-btn
            :label="btnText"
            flat
            rounded
            color="black"
            style="background: white"
          />
        </div>
      </div>
    </div>
    <div class="col-4">
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <q-img :src="image" width="75" />
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    btnText: {
      type: String,
      default: "",
    },
    link: {
      type: String,
    },
  },
  setup(props) {
    return {};
  },
};
</script>

<style>
a {
  text-decoration: none;
}
</style>
