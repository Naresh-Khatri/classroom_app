<template>
  <q-page padding>
    <!-- content -->
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import {api} from 'boot/axios'

const route = useRoute();
const router = useRouter();
const store = useStore();
const $q = useQuasar();

const materialInfo = computed(() => store.state.materials[route.params.id]);

onMounted(() => {
  if(route.query.id == null)
    router.push('/');
  if(materialInfo.value == null)
  {
    $q.notify({
      color: "negative",
      textColor: "white",
      message: "Material not found",
      position: "top",
      timeout: 2000,
    });
    router.push('/');
  }

});
</script>
