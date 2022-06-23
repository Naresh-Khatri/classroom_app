<template>
  <q-page padding>
    <q-list dense>
      <q-item clickable v-ripple v-for="i in 50" :key="i">
        <q-item-section>
          <q-item-label>Item with caption</q-item-label>
          <q-item-label caption>Caption</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
};
</script>
