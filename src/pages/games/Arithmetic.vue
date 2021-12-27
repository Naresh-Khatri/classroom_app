<template>
  <q-page>
    <div style="display: flex; flex-direction: row-reverse">
      <div
        class="ba ckground-image"
        :style="
          'position:absolute; background: lightgray; height: 100vh; z-index: -10; width: ' +
          timerPercent +
          'vw;'
        "
      ></div>
    </div>
    <header>
      <div class="text-h6 text-black text-center q-pt-lg">Calculate</div>
    </header>
    <div
      class="q-mt-lg"
      style="display: flex; flex-direction: row-reverse; align-items: center"
    >
      <div
        :style="
          'display: flex; flex-direction: row; align-items: center;height:2px;  background: black;width: ' +
          timerPercent +
          'vw;'
        "
      >
        <span
          class="fire-emoji"
          style="font-size: 24px; position: relative; left: -12px"
          >🔥</span
        >
      </div>
    </div>
    <q-card-section class="flex flex-center" style="margin-top: 100px">
      <div class="row text-h3 q-mt-xl">4 + 5 = __</div>
    </q-card-section>
    <q-card-section style="margin-top: 150px">
      <div class="flex justify-center" style="flex-wrap: wrap; gap: 10px">
        <q-btn
          class="bg-grey"
          color="white"
          v-for="i in 4"
          :key="i"
          round
          style="flex-basis: 35%; height: 135px; font-size: 20px"
          flat
          :label="i"
        >
        </q-btn></div
    ></q-card-section>
  </q-page>
</template>

<script>
import { ref, computed, watchEffect } from "vue";

export default {
  setup() {
    const timer = ref(5000);
    const answer = ref(0);
    const timerPercent = computed(() => {
      return (timer.value / 5000) * 100;
    });

    watchEffect(() => {
      if (timer.value > 0) {
        setTimeout(() => {
          timer.value -= 10;
        }, 10);
      }
    });
    return { timer, timerPercent };
  },
};
</script>
<style scoped>
.fire-emoji {
  animation-name: fire;
  animation-duration: 2s;
  animation-iteration-count: infinite;
}
@keyframes fire {
  0% {
    transform: scale(1.2);
  }
  10% {
    transform: scale(1.03);
  }
  20% {
    transform: scale(1.45);
  }
  30% {
    transform: scale(1.34);
  }
  40% {
    transform: scale(1.43);
  }
  50% {
    transform: scale(1.36);
  }
  60% {
    transform: scale(1);
  }
  70% {
    transform: scale(1.3);
  }
  80% {
    transform: scale(0.9);
  }
  90% {
    transform: scale(1.17);
  }
  100% {
    transform: scale(1.3);
  }
}
.background-image {
  width: 100vw;
  animation-name: slide;
  animation-timing-function: linear;
  animation-duration: 5s;
}
@keyframes slide {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
