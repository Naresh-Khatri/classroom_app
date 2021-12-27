<template>
  <q-page>
    <div class="top-left-btn">
      <q-btn
        class="absolute"
        color="primary"
        style="background: white; width: 60px; height: 60px; z-index: 10"
        flat
        dense
        round
        icon="arrow_back_ios"
        aria-label="Menu"
        @click="$router.go(-1)"
      />
    </div>
    <!-- <q-btn
      color="primary"
      style="
        background: white;
        width: 60px;
        height: 60px;
        z-index: 10;
        left: 200px;
      "
      flat
      dense
      round
      icon="download"
      aria-label="Menu"
      @click="scrollBottom"
    /> -->
    <div
      class="date"
      style="
        width: 100vw;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10;
        margin-top: 15px;
      "
    >
      <transition name="slide-fade">
        <div v-if="canShowTopDate">
          <q-chip
            color="secondary"
            ref="DateBox"
            text-color="white"
            size="17px"
          >
            {{ topMsgDate }}
          </q-chip>
        </div>
      </transition>
    </div>
    <q-scroll-area
      @scroll="showTopDate"
      ref="scrollArea"
      class="absolute-full"
      style="height: 90%"
    >
      <!--       
      <q-chat-message
        bg-color="primary"
        text-color="white"
        class="q-mx-md text-white"
        name="Server"
        :text="['hey', 'how are you?']"
      /> -->
      <!-- Chat msgs -->
      <q-chat-message
        v-intersection="setTopMsgDate"
        :data-id="index"
        class="q-mx-sm text-white"
        v-for="(msg, index) in getMsgsData"
        :avatar="msg.photoURL||'https://cdn.quasar.dev/img/avatar1.jpg'"
        :key="index"
        :name="msg.username"
        :text="[msg.text]"
        :stamp="getTimespamp(msg.timestamp)"
      />
    </q-scroll-area>
    <!-- Scroll bottom button -->
    <q-page-sticky position="bottom-right" :offset="[18, 88]">
      <q-btn v-if="unreadChatCount" @click="scrollBottom" round icon="expand_more" color="primary">
        <q-badge rounded color="orange" floating>{{ unreadChatCount }}</q-badge>
      </q-btn>
    </q-page-sticky>
    <!-- Text Input box -->
    <q-input
      filled
      v-model="msgText"
      placeholder="Type a message"
      @keydown.enter="sendMsg"
      class="absolute-bottom q-ma-md"
    >
      <!-- <template v-slot:before>
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
        </q-avatar>
      </template> -->

      <template v-slot:after>
        <q-btn round dense flat color="green" icon="send" @click="sendMsg" />
      </template>
    </q-input>
  </q-page>
</template>

<script>
import io from "socket.io-client";
import { useStore } from "vuex";
import { ref, computed, onMounted } from "vue";

export default {
  setup() {
    const store = useStore();

    const msgText = ref("");
    const unreadChatCount = ref(3);
    const socket = ref(null);
    const topMsgDate = ref(null);
    const canShowTopDate = ref(false);
    const timer = ref(null);
    const getMsgsData = computed(() => store.state.msgsData);
    const scrollArea = ref(null);

    onMounted(() => {
      canShowTopDate.value = true;
      socket.value = io("http://localhost:4000");
      // socket.value = io("http://147.139.72.188:4000");
      // socket.value = io("wss://classroomchat.plasmatch.in");
      socket.value.on("connect", () => {
        console.log("conneted to ws - " + socket.value.id);
        // store.commit("updateSocket", socket.value);
      });
      socket.value.on("receivePrevMsgsData", (data) => {
        // console.log(data);
        store.commit("updateMsgsData", data);
        setTimeout(() => {
          scrollBottom();
        }, 500);
      });
      socket.value.on("receiveMsg", (data) => {
        console.log(data);
        store.commit("appendNewMsgData", data);
        unreadChatCount.value++;
        animateScroll();
      });
    });
    const isOwner = (msg) => {
      return msg.username == socket.value.id;
    };
    const sendMsg = () => {
      canShowTopDate.value = !canShowTopDate.value;
      if (msgText.value == "") return;
      const payload = {
        username: socket.value.id,
        photoURL: store.state.userData.photoURL,
        text: [msgText.value],
      };

      scrollBottom();
      socket.value.emit("sendMsg", payload);
      msgText.value = "";
    };
    const scrollBottom = () => {
      // console.log(scrollArea.value.);
      scrollArea.value.setScrollPosition(
        "vertical",
        scrollArea.value.getScroll().verticalSize,
        400
      );
      unreadChatCount.value = 0;
    };
    const animateScroll = () => {
      //when scroll is not in bottom
      if (
        // scrollArea.value.getScrollPosition() +
        getMsgsData.value.length * 71.9 <
        scrollArea.value.getScroll().verticalSize
      ) {
        unreadChatCount.value++;
        return;
      }
      // console.log(
      //   scrollArea.value.getScrollPosition() +
      //     scrollArea.value.containerHeight,
      //   scrollArea.value.scrollSize
      // );
      scrollArea.value.setScrollPosition(
        "vertical",
        scrollArea.value.scrollSize,
        400
      );
    };
    const showTopDate = () => {
      //make a disappearing logic when idle and appear when scrolled up
      //debouce method since scroll
      canShowTopDate.value = true;
      clearTimeout(timer.value);
      timer.value = setTimeout(() => {
        canShowTopDate.value = false;
      }, 1500);
    };
    const setTopMsgDate = (e) => {
      // DateBox.style
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      topMsgDate.value =
        new Date(getMsgsData.value[e.target.dataset.id].timestamp).getDate() +
        " " +
        monthNames[
          new Date(getMsgsData.value[e.target.dataset.id].timestamp).getMonth()
        ];

      // console.log(new Date(getMsgsData.value[e.target.dataset.id].timestamp).getDate(),
      //   monthNames[
      //     new Date(getMsgsData.value[e.target.dataset.id].timestamp).getMonth()
      //   ]
      // );
    };
    const getTimespamp = (time) => {
      const currentTime = Date.now();
      const unixTime = new Date(time).getTime();
      const timeDiff = currentTime - unixTime;
      const secs = Math.ceil(timeDiff / 1000);
      // console.log(new Date(unixTime).getHours())
      const mins = new Date(unixTime).getMinutes();
      const hours = new Date(unixTime).getHours();

      return `${formatNumber(hours > 12 ? hours - 12 : hours)}:${formatNumber(
        mins
      )} ${hours >= 12 ? "PM" : "AM"}`;
      // if (secs > 86400) return `${Math.ceil(secs / 86400)}d ago`;
      // else if (secs > 3600) return `${Math.ceil(secs / 3600)}h ago`;
      // else if (secs > 60) return `${Math.ceil(secs / 60)}m ago`;
      // else return `${secs}s ago`;
    };
    const formatNumber = (str) => {
      return `${String(str).length == 1 ? "0" : ""}${String(str)}`;
    };
    return {
      msgText,
      unreadChatCount,
      socket,
      topMsgDate,
      canShowTopDate,
      getMsgsData,
      scrollArea,
      isOwner,
      sendMsg,
      scrollBottom,
      animateScroll,
      showTopDate,
      setTopMsgDate,
      getTimespamp,
      formatNumber,
    };
  },
};
</script>
<style scoped>
.slide-fade-enter-from {
  transform: translateY(-30px);
  opacity: 0;
}
.slide-fade-enter-to {
  transform: translateY(0px);
  opacity: 1;
}
.slide-fade-leave-from {
  transform: translateY(0px);
  opacity: 1;
}
.slide-fade-leave-to {
  transform: translateY(-30px);
  opacity: 0;
}
.slide-fade-leave-active {
  transition: all 1s ease;
}
.slide-fade-enter-active {
  transition: all 1s ease;
}
.top-left-btn {
  position: fixed;
  color: white;
  z-index: 10;
  top: 25px;
  left: 25px;
}
</style>
