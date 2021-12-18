<template>
  <q-page>
    <div
      class="date"
      style="width:100vw;position:absolute; display:flex;
       justify-content:center; align-items:center; z-index:10;
        margin-top:15px"
    >
      <!-- <div
        class="text-white"
        style="background:#4646ad; display:inline; padding:10px 30px;
               border-radius:20px;margin-top:15px"
      >
        19 September
      </div> -->
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
      style="height:90%"
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
        avatar="https://cdn.quasar.dev/img/avatar1.jpg"
        :key="index"
        :name="msg.username"
        :text="[msg.text]"
        :bg-color="isOwner(msg) ? 'white' : 'primary'"
        :text-color="isOwner(msg) ? 'black' : 'white'"
        :sent="isOwner(msg)"
        :stamp="getTimespamp(msg.timestamp)"
      />
    </q-scroll-area>
    <!-- Scroll bottom button -->
    <q-page-sticky position="bottom-right" :offset="[18, 88]">
      <q-btn v-if="unreadChatCount" round icon="expand_more" color="primary">
        <q-badge rounded color="orange" floating @click="scrollBottom()">{{
          unreadChatCount
        }}</q-badge>
      </q-btn>
    </q-page-sticky>
    <!-- Text Input box -->
    <q-input
      rounded
      filled
      v-model="msgText"
      bg-color="white"
      placeholder="Type a message"
      @keydown.enter="sendMsg"
      class="absolute-bottom q-mb-md"
    >
      <template v-slot:before>
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
        </q-avatar>
      </template>

      <template v-slot:after>
        <q-btn round dense flat color="white" icon="send" @click="sendMsg" />
      </template>
    </q-input>
  </q-page>
</template>

<script>
import io from "socket.io-client";

export default {
  data() {
    return {
      socket: null,
      msgText: "",
      unreadChatCount: 0,
      topMsgDate: "",
      canShowTopDate: true,
      timer: null
    };
  },
  computed: {
    getMsgsData() {
      return this.$store.state.msgsData;
    }
  },
  mounted() {
    this.canShowTopDate = true;
    this.socket = io("http://localhost:3000");
    // this.socket = io("http://147.139.72.188:4000");
    // this.socket = io("wss://classroomchat.plasmatch.in");
    this.socket.on("connect", () => {
      console.log("conneted to ws - " + this.socket.id);
      this.$store.commit("updateSocket", this.socket);
    });
    this.socket.on("receivePrevMsgsData", data => {
      // console.log(data);
      this.$store.commit("updateMsgsData", data);
      setTimeout(() => {
        this.scrollBottom();
      }, 500);
    });
    this.socket.on("receiveMsg", data => {
      console.log(data);
      this.$store.commit("appendNewMsgData", data);
      this.animateScroll();
    });
  },
  methods: {
    isOwner(msg) {
      return msg.username == this.socket.id;
    },
    sendMsg() {
      this.canShowTopDate = !this.canShowTopDate;
      if (this.msgText == "") return;
      const payload = {
        username: this.socket.id,
        text: [this.msgText]
      };
      this.socket.emit("sendMsg", payload);
      this.msgText = "";
    },
    scrollBottom() {
      this.$refs.scrollArea.setScrollPosition(
        this.$refs.scrollArea.scrollSize,
        400
      );
      this.unreadChatCount = 0;
    },
    animateScroll() {
      //when scroll is not in bottom
      if (
        this.$refs.scrollArea.getScrollPosition() +
          this.$refs.scrollArea.containerHeight <
        this.$refs.scrollArea.scrollSize
      ) {
        this.unreadChatCount++;
        return;
      }
      // console.log(
      //   this.$refs.scrollArea.getScrollPosition() +
      //     this.$refs.scrollArea.containerHeight,
      //   this.$refs.scrollArea.scrollSize
      // );
      this.$refs.scrollArea.setScrollPosition(
        this.$refs.scrollArea.scrollSize,
        400
      );
    },
    showTopDate() {
      //make a disappearing logic when idle and appear when scrolled up
      //debouce this method since scroll
      this.canShowTopDate = true;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.canShowTopDate = false;
      }, 1500);
    },
    setTopMsgDate(e) {
      // this.$refs.DateBox.style
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
        "December"
      ];
      this.topMsgDate =
        new Date(this.getMsgsData[e.target.dataset.id].timestamp).getDate() +
        " " +
        monthNames[
          new Date(this.getMsgsData[e.target.dataset.id].timestamp).getMonth()
        ];

      // console.log(new Date(this.getMsgsData[e.target.dataset.id].timestamp).getDate(),
      //   monthNames[
      //     new Date(this.getMsgsData[e.target.dataset.id].timestamp).getMonth()
      //   ]
      // );
    },
    getTimespamp(time) {
      const currentTime = Date.now();
      const unixTime = new Date(time).getTime();
      const timeDiff = currentTime - unixTime;
      const secs = Math.ceil(timeDiff / 1000);
      // console.log(new Date(unixTime).getHours())
      const mins = new Date(unixTime).getMinutes();
      const hours = new Date(unixTime).getHours();

      return `${this.formatNumber(
        hours > 12 ? hours - 12 : hours
      )}:${this.formatNumber(mins)} ${hours >= 12 ? "PM" : "AM"}`;
      // if (secs > 86400) return `${Math.ceil(secs / 86400)}d ago`;
      // else if (secs > 3600) return `${Math.ceil(secs / 3600)}h ago`;
      // else if (secs > 60) return `${Math.ceil(secs / 60)}m ago`;
      // else return `${secs}s ago`;
    },
    formatNumber(str) {
      return `${String(str).length == 1 ? "0" : ""}${String(str)}`;
    }
  }
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
</style>
