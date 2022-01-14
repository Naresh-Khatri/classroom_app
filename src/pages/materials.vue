<template>
  <q-page padding class="f lex flex -center">
    <div>
      <!-- input for a pdf document -->
      <input
        ref="fileInputEl"
        type="file"
        accept="application/pdf,application/vnd.ms-excel"
        @change="onFileChange"
      />
      <q-btn label="Upload" @click="uploadFile" />
    </div>
    <q-card-section class="flex justify-center">
      <div v-for="(material, i) in materials" :key="i">
          <MaterialCard
            :title="material.title"
            :description="material.description"
            :image="material.image"
            :link="material.link"
            fileType="PDF"
            btnText="view"
            btnIcons="download"
            @click="getMaterial(material._id)"
          />
        <!-- <q-btn @click="getMaterial(material._id)" label="view" /> -->
      </div>
    </q-card-section>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { api } from "boot/axios";

import MaterialCard from "../components/MaterialCard.vue";

const store = useStore();
const $q = useQuasar();

const user = computed(() => store.state.userData);

const materials = computed(() => store.state.materials);

onMounted(() => {
  store.dispatch("getMaterials", "1234");
});

const fileInputEl = ref(null);
const file = ref(null);

const onFileChange = (e) => {
  console.log(e.target.files);
  if (e.target.files[0].size > 30_000_000) {
    $q.dialog({
      title: "File too large 😳",
      message: "File size should be less than 30MB",
    });
    fileInputEl.value.value = "";
    return;
  }
  file.value = e.target.files[0];
};
const uploadFile = async () => {
  const formData = new FormData();
  formData.append("uid", user.value.uid);
  formData.append("classroomID", "1234");
  formData.append("title", "cse syllabus");
  formData.append("description", "this is a pdf file, please download");
  formData.append("subject", "Data Structures and Algorithms");

  formData.append("fileName", file.value.name);
  formData.append("file", file.value);
  const res = await api.post("/upload/pdf", formData);
  console.log(res);
};

const getMaterial = async (id) => {
  const res = await api.get(`/upload/material/${id}`);
  const a = document.createElement("a");
  a.href = res.data.url;
  a.download = res.data.name;
  a.click();

  console.log(res);
};
</script>
