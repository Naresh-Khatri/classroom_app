<template>
  <q-page>
    <header class="bg-cyan flex flex-center relative" style="height: 150px">
      <div
        class="bg-white rounded"
        style="border-radius: 30px; position: absolute; top: 100px"
      >
        <q-img src="~/assets/club/code.png" width="100px" />
      </div>
    </header>
    <q-card-section class="q-mt-xl">
      <div class="text-h5 text-bold text-white text-center">
        Programing Club
      </div>
      <div class="q-ma-sm flex justify-evenly">
        <div class="text-subtitle text-grey">
          <q-icon name="fas fa-map-marker-alt" color="grey" />
          Dupadu
        </div>
        <!-- <q-icon name="fas fa-circle" color="grey"/> -->
        <div class="text-subtitle text-grey">
          <q-icon name="fas fa-university" color="grey" />
          KVSRIT
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="text-h4 text-white q-mb-md">About</div>
      <p class="text-subtitle text-grey-5">
        lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in
      </p>
    </q-card-section>
    <q-card-section>
      <div class="text-h4 text-white q-mb-md">Members</div>
      <div>
        <q-avatar
          style="border-radius: 50%"
          v-for="i in 10"
          :key="i"
          size="50px"
          class="q-ma-sm bg-white"
        >
          <q-icon name="fas fa-user" color="grey" />
        </q-avatar>
      </div>
    </q-card-section>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
};
</script>
