<template>
  <q-page class="text-white">
    <div class="flex flex-center text-h4 q-pt-lg">Todays Meetings</div>
    <div class="flex flex-center">
      <q-btn
        v-if="$store.getters.isStaff"
        class="q-ma-md"
        color="primary"
        label="New Meeting"
        icon="add"
        @click="newMeetingDialog = true"
      />
    </div>
    <q-dialog v-model="newMeetingDialog">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">New Meeting</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input class="q-my-sm" outlined v-model="topic" label="Topic" />
          <q-input class="q-my-sm" outlined v-model="subject" label="Subject" />
          <q-input
            class="q-my-sm"
            outlined
            v-model="instructor"
            label="Instructor Name"
          />

          <q-input
            class="q-my-sm q-mt-lg"
            outlined
            bottom-slots
            label="Date"
            v-model="date"
            mask="date"
            :rules="['date']"
          >
            <template v-slot:hint>
              YYYY/MM/DD
            </template>
            <!-- <template v-slot:prepend>
              <q-icon
                name="event"
                color="primary"
                @click="selectDateDialog = true"
              />
            </template> -->
            <template v-slot:prepend>
              <q-icon name="event" color="primary" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date v-model="date">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <div class="row">
            <q-input
              class="col"
              outlined
              v-model="startingAt"
              bottom-slots
              mask="time"
              label="Starting"
            >
              <template v-slot:hint>
                HH/MM
              </template>
              <template v-slot:prepend>
                <q-icon
                  name="access_time"
                  color="primary"
                  class="cursor-pointer"
                >
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time v-model="startingAt">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input
              class="col"
              outlined
              v-model="endignAt"
              bottom-slots
              mask="time"
              label="Ending"
            >
              <template v-slot:hint>
                HH/MM
              </template>
              <template v-slot:prepend>
                <q-icon
                  name="access_time"
                  color="primary"
                  class="cursor-pointer"
                >
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time v-model="endignAt">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <q-input
            class="q-my-sm"
            outlined
            v-model="link"
            label="Meeting link"
          />
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn
            round
            size="lg"
            color="primary"
            icon="add"
            v-close-popup
            @click="addNewMeeting()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="meetingDetailsDialog">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Meeting Detials</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            class="q-my-sm"
            outlined
            readonly
            :value="selectedMeeting.topic"
            label="Topic"
          />
          <q-input
            class="q-my-sm"
            outlined
            readonly
            :value="selectedMeeting.subject"
            label="Subject"
          />
          <q-input
            class="q-my-sm"
            outlined
            readonly
            :value="selectedMeeting.instructor_name"
            label="Instructor Name"
          />

          <q-input
            class="q-my-sm q-mt-lg"
            outlined
            readonly
            bottom-slots
            label="Date"
            :value="selectedMeeting.date"
          >
          </q-input>
          <div class="row">
            <q-input
              class="col"
              outlined
              readonly
              v-if="selectedMeeting.starting_at"
              :value="getTimeinHHMM(selectedMeeting.starting_at)"
              bottom-slots
              mask="time"
              label="Starting"
            >
            </q-input>
            <q-input
              class="col"
              outlined
              readonly
              v-if="selectedMeeting.ending_at"
              :value="getTimeinHHMM(selectedMeeting.ending_at)"
              bottom-slots
              mask="time"
              label="Ending"
            >
            </q-input>
          </div>
          <div class="flex flex-center">
            <q-input
              style="width:50%"
              outlined
              readonly
              v-if="selectedMeeting.starting_at"
              :value="
                getDuration(
                  selectedMeeting.starting_at,
                  selectedMeeting.ending_at
                )
              "
              bottom-slots
              label="Duration"
            >
            </q-input>
          </div>
          <q-input
            class="q-my-sm"
            outlined
            readonly
            :value="selectedMeeting.link"
            label="Meeting link"
          />
          <div class="flex justify-end" v-show="isStaff">
            <!-- <q-btn
              label="Update"
              color="primary"
              @click="updateMeeting(selectedMeeting.id)"
            /> -->
            <q-btn
              label="Delete"
              color="negative"
              @click="deleteMeeting(selectedMeeting.id)"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <div>
      <div
        v-for="(meeting, index) in meetingsList"
        :key="index"
        class="row q-pa-md rounded q-mx-md"
      >
        <div class="col-3 text-grey-9 q-mt-sm">
          {{ getTimeinHHMM(meeting.starting_at) }} -
          {{ getTimeinHHMM(meeting.ending_at) }}
        </div>
        <div
          class="col-9 container shadow-10 bg-primary text-white q-pa-md"
          @click="showDetails(index)"
        >
          <div class="row">
            <div class="col-8">
              <div class="row text-bold">{{ meeting.subject }}</div>
              <div class="row text-grey-4 q-mt-sm" style="width:100px">
                {{ meeting.instructor }}
              </div>
            </div>
            <div class="col-4 row justify-end items-center">
              <q-icon
                v-if="$store.getters.isStaff"
                class="q-mx-sm"
                color="white"
                size="sm"
                name="edit"
                @click="showDetails(index)"
              />
              <a
                :href="selectedMeeting.link"
                style="text-decoration:none; z-index:1000"
              >
                <q-icon
                  color="white"
                  size="sm"
                  :name="meeting.link ? 'open_in_new' : 'open_in_new_off'"
              /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";
import { meetings, calender } from "../apiendpoints.js";
export default {
  data() {
    return {
      meetingsList: [
        {
          starting_at: '12:00',
          ending_at: '13:00',
          subject: 'Javascript',
          topic: 'JS Debouncing',
          link: 'https://loremsdlfj.com/asdf',
          instructor: 'DR. okay prasad'
        },{
          starting_at: '12:00',
          ending_at: '13:00',
          subject: 'Javascript',
          topic: 'JS Debouncing',
          link: 'https://loremsdlfj.com/asdf',
          instructor: 'DR. okay prasad'
        },{
          starting_at: '12:00',
          ending_at: '13:00',
          subject: 'Javascript',
          topic: 'JS Debouncing',
          link: 'https://loremsdlfj.com/asdf',
          instructor: 'DR. okay prasad'
        },{
          starting_at: '12:00',
          ending_at: '13:00',
          subject: 'Javascript',
          topic: 'JS Debouncing',
          link: 'https://loremsdlfj.com/asdf',
          instructor: 'DR. okay prasad'
        }
      ],
      newMeetingDialog: false,
      meetingDetailsDialog: false,
      selectedMeeting: [],
      date: "",
      startingAt: "",
      endignAt: "",
      subject: "",
      topic: "",
      link: "",
      instructor: ""
    };
  },
  mounted() {
    this.refresh();
  },
  computed: {
    isStaff() {
      if (this.$store.state.accountInfo) {
        return this.$store.state.accountInfo.is_staff;
      }
      return false;
    }
  },
  methods: {
    refresh() {
      axios
        .get(meetings + "?date=" + new Date().toISOString().slice(0, 10))
        .then(res => {
          this.meetingsList = res.data;
        });
    },
    addNewMeeting() {
      var date = this.date.replaceAll("/", "-");
      var payload = {
        date: date,
        starting_at: this.startingAt,
        ending_at: this.endignAt,
        subject: this.subject,
        topic: this.topic,
        link: this.link,
        instructor: 2
      };
      var config = {
        method: "post",
        url: meetings,
        headers: {
          Authorization: `Bearer ${this.$store.state.accountInfo.access_token}`
        },
        data: payload
      };
      axios(config)
        .then(() => {
          this.refresh();
          //this.$router.go();
          this.$q.notify({
            type: "positive",
            message: `Meeting added!`
          });
        })
        .catch(err => {
          console.log(err);
          this.$q.notify({
            type: "negative",
            message: `Something went wrong. Try again later!`
          });
        });
      console.log(payload);
    },
    showDetails(index) {
      this.meetingDetailsDialog = true;
      this.selectedMeeting = this.meetingsList[index];
    },
    formateDate(date) {
      return date.replaceAll("/", "-");
    },
    getTimeinHHMM(time) {
      return time.split(":")[0] + ":" + time.split(":")[1];
    },
    getDuration(starting_at, ending_at) {
      let MIN_IN_HOUR = 60;
      let duration =
        Number(ending_at.split(":")[0]) * MIN_IN_HOUR +
        Number(ending_at.split(":")[1]) -
        Number(starting_at.split(":")[0]) * MIN_IN_HOUR -
        Number(starting_at.split(":")[1]);
      return `${duration} mins`;
    },
    deleteMeeting(id) {
      var config = {
        method: "delete",
        url: meetings + id + "/",
        headers: {
          Authorization: `Bearer ${this.$store.state.accountInfo.access_token}`
        }
      };
      axios(config)
        .then(res => {
          this.refresh();
          this.$q.notify({
            type: "positive",
            message: `Meeting deleted!`
          });
          this.meetingDetailsDialog = false;
        })
        .catch(err => {
          console.log(err);
          this.$q.notify({
            type: "negative",
            message: `Something went wrong. Try again later!`
          });
        });
    },
    updateMeeting(id) {
      // var config = {
      //   method: "put",
      //   url: meetings + id + "/",
      //   headers: {
      //     Authorization: `Bearer ${this.$store.state.accountInfo.access_token}`
      //   },
      //   data: {
      //     starting_at: this.selectedMeeting.starting_at,
      //     ending_at: this.selectedMeeting.ending_at,
      //     subject: this.selectedMeeting.subject,
      //     topic: this.selectedMeeting.topic,
      //     link: this.selectedMeeting.link,
      //     instructor: 2
      //   }
      // };
      // console.log("payload = " + config.data.ending_at);
      // axios(config)
      //   .then(res => {
      //     this.refresh();
      //     this.$q.notify({
      //       type: "positive",
      //       message: `Meeting updated!`
      //     });
      //     this.meetingDetailsDialog = false;
      //   })
      //   .catch(err => {
      //     console.log(err);
      //     this.$q.notify({
      //       type: "negative",
      //       message: `Something went wrong. Try again later!`
      //     });
      //   });
    }
  }
};
</script>
<style scoped>
.container {
  border-radius: 15px;
  background: white;
}
.rounded {
  border-radius: 15px;
}
</style>
