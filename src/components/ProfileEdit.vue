<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        profile
        <q-img :src="user.photoURL" />
        <q-btn icon="edit" flat @click="uploadProfilePic"/>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useStore } from "vuex";
import { ref, computed } from "vue";
import axios from 'axios';

export default {
  emits: [
    // REQUIRED
    "ok",
    "hide",
  ],
  setup() {
    const store = useStore();
    const dialog = ref(null);

    const user = computed(() => store.state.userData);

    const show = () => {
      dialog.value.show();
    };

    const uploadProfilePic = () =>{
      axios.post('http://localhost:4000/user/uploadProfilePic', {
        uid: user.value.uid,
        profilePic: user.value.photoURL
      })
    }

    //dialog stuff
    const hide = () => {
      dialog.value.hide();
    };
    const onDialogHide = () => {
      $emit("hide");
    };
    const onOKClick = () => {
      $emit("ok");
      hide();
    };
    const onCancelClick = () => {
      hide();
    };
    return {
      show,
      hide,
      user,
      dialog,
      onDialogHide,
      onOKClick,
      onCancelClick,
    };
  },
};
</script>
