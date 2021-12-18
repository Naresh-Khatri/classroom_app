<template>
  <q-page>
    <div>
      <q-dialog v-model="newEventDialog">
        <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section>
            <div class="text-h6">New Event</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              class="q-my-sm"
              outlined
              v-model="newTitle"
              label="Title"
            />
            <q-input
              class="q-my-sm"
              color="primary"
              outlined
              v-model="newDesc"
              autogrow
              label="Description (optional)"
            >
            </q-input>
            <q-input
              class="q-my-sm q-mt-lg"
              outlined
              bottom-slots
              label="Date"
              v-model="newDate"
              mask="date"
              :rules="['date']"
            >
              <template v-slot:hint>
                YYYY/MM/DD
              </template>
              <template v-slot:prepend>
                <q-icon
                  name="event"
                  color="primary"
                  @click="selectDateDialog = true"
                />
              </template>
            </q-input>
            <q-dialog v-model="selectDateDialog">
              <q-date v-model="newDate" />
            </q-dialog>
            <q-input
              outlined
              v-model="newTime"
              bottom-slots
              mask="time"
              label="Time (Optional)"
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
                    <q-time v-model="newTime">
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
          </q-card-section>

          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn
              round
              size="lg"
              color="primary"
              icon="add"
              v-close-popup
              @click="addNewEvent()"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <div class="flex flex-center" v-if="$store.getters.isStaff">
        <q-btn
          class="q-pt-lg"
          icon="add"
          label="Add new event"
          color="primary"
          @click="newEventDialog = true"
        />
      </div>
      <div class="flex justify-center q-pt-lg">
        <q-date
          v-model="selectedDate"
          :events="eventsDates"
          event-color="orange"
        />
      </div>
      <q-scroll-area class="scroll-area">
        <q-card
          v-if="!getEvents(selectedDate).length"
          class="my-card q-my-md"
          flat
          bordered
        >
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class="text-overline">{{ selectedDate }}</div>
              <div class="text-h5 q-mt-sm q-mb-xs">No Event 😌</div>
              <div class="text-caption text-grey">
                Theres nothing special about this day
              </div>
            </q-card-section>

            <q-card-section class="col-5 flex flex-center"> </q-card-section>
          </q-card-section>

          <q-separator />
        </q-card>

        <q-card
          class="my-card q-my-md"
          v-for="(event, index) in getEvents(selectedDate)"
          :key="index"
          flat
          bordered
        >
          <q-card-section horizontal class="flex justify-between">
            <q-card-section class="q-pt-xs">
              <div class="text-overline">{{ event.date }}</div>
              <div class="text-h5 q-mt-sm q-mb-xs">{{ event.title }}</div>
              <div class="text-caption text-grey">
                {{ event.desc }}
              </div>
            </q-card-section>

            <q-card-section class="col-5">
              <q-img
                class="rounded-borders"
                src="https://cdn.quasar.dev/img/parallax2.jpg"
              />
            </q-card-section>
          </q-card-section>
          <div class="row justify-end" v-if="$store.getters.isStaff">
            <q-btn
              flat
              class="text-bold"
              color="negative"
              icon="delete"
              @click="deleteEventDialog = true"
            >
              Delete
            </q-btn>
            <q-dialog v-model="deleteEventDialog">
              <q-card>
                <q-card-section>
                  <div class="text-h6">Alert</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  You are about to delete an event from the calender. Are you
                  sure?
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn
                    label="Delete"
                    color="negative"
                    v-close-popup
                    @click="deleteEvent(event.id)"
                  />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>
          <q-separator />

          <q-card-actions v-if="event.time">
            <q-btn flat round icon="schedule" />
            <q-btn flat>
              {{ getTimeinHHMM(event.time) }}
            </q-btn>
          </q-card-actions>
        </q-card>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script>
import moment from "moment";
import axios from "axios";
import { calender } from "../apiendpoints.js";

export default {
  data() {
    return {
      splitterModel: 50,
      selectedDate: "2019/02/01",
      events: [],
      eventsDates: [],
      newEventDialog: false,
      selectDateDialog: false,
      deleteEventDialog: false,
      newTitle: "",
      newDesc: "",
      newDate: "",
      newTime: ""
    };
  },
  created() {
    this.selectedDate = moment(Date.now()).format("YYYY/MM/DD");
    this.refresh();
  },
  computed: {},
  methods: {
    refresh() {
      axios.get(calender).then(res => {
        this.events = res.data;
        res.data.forEach(ele => {
          this.eventsDates.push(ele.date.replaceAll("-", "/"));
        });
        for (let i = 0; i < this.events.length; i++) {
          this.events[i].date = this.events[i].date.replaceAll("-", "/");
        }
      });
    },
    addNewEvent() {
      var date = this.newDate.replaceAll("/", "-");
      var payload = {
        date: date,
        title: this.newTitle,
        desc: this.newDesc
      };
      if (this.newTime != "") {
        payload.time = this.newTime;
        console.log("time is provided " + payload.time);
      }
      console.log("payload = " + payload);
      var config = {
        method: "post",
        url: calender,
        headers: {
          Authorization: `Bearer ${this.$store.state.accountInfo.access_token}`
          //"Content-Type": "application/json",
          // Cookie:
          //   "csrftoken=fhvD3S7PqoktMnAyS5NeFzuScWi8VAf2sVz1OTUQr230wcZ1bprBTyG5RbYzYrGa; sessionid=2jeo3kjf5n08r0hc60xcmrgsimaoxziz"
        },
        data: payload
      };
      axios(config)
        .then(res => {
          this.selectedDate = this.newDate;
          this.newDate = "";
          this.newTime = "";
          this.newTitle = "";
          this.newDesc = "";
          this.refresh();
          this.$q.notify({
            type: "positive",
            message: `Event added!`
          });
        })
        .catch(err => {
          console.log(err);
          this.$q.notify({
            type: "negative",
            message: `Something went wrong. Try again later!`
          });
        });
    },
    getTimeinHHMM(time) {
      return time.split(":")[0] + ":" + time.split(":")[1];
    },
    getEvents(date) {
      let dataList = [];
      this.events.forEach(ele => {
        if (ele.date == this.selectedDate) {
          dataList.push(ele);
        }
      });
      return dataList;
    },
    deleteEvent(id) {
      var config = {
        method: "delete",
        url: calender + id + "/",
        headers: {
          Authorization: `Bearer ${this.$store.state.accountInfo.access_token}`
        }
      };
      axios(config)
        .then(res => {
          this.refresh();
          this.$q.notify({
            type: "positive",
            message: `Event deleted!`
          });
        })
        .catch(err => {
          console.log(err);
          this.$q.notify({
            type: "negative",
            message: `Something went wrong. Try again later!`
          });
        });
    }
  }
};
</script>
<style scoped>
.scroll-area {
  margin: 0 auto;
  margin-top: 10px;
  height: 40vh;
  width: 90%;
}
</style>
