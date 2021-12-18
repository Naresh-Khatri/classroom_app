<template>
  <q-page padding class="text-white" >
    <!-- content -->
    <!-- <q-btn label="Maximized" color="primary" @click="dialog = true" /> -->
    <div v-for="(course, index) in courses" :key="index">
      <q-item clickable v-ripple @click="showMaterials(index)">
        <q-item-section avatar>
          <q-avatar
            color="primary"
            text-color="white"
            size="xl"
            :icon="course.icon"
          >
            <!-- {{ course.name }} -->
          </q-avatar>
        </q-item-section>
        <q-item-section
          ><span style="font-size:18px">{{
            course.fullName
          }}</span></q-item-section
        >
      </q-item>
      <q-separator />
    </div>

    <q-dialog
      v-model="dialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-space />

          <q-btn
            dense
            flat
            icon="minimize"
            @click="maximizedToggle = false"
            :disable="!maximizedToggle"
          >
            <q-tooltip
              v-if="maximizedToggle"
              content-class="bg-white text-primary"
              >Minimize</q-tooltip
            >
          </q-btn>
          <q-btn
            dense
            flat
            icon="crop_square"
            @click="maximizedToggle = true"
            :disable="maximizedToggle"
          >
            <q-tooltip
              v-if="!maximizedToggle"
              content-class="bg-white text-primary"
              >Maximize</q-tooltip
            >
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">
            Materials for {{ courses[selectedIndex].fullName }}
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <!-- <a
            href="https://drive.google.com/open?id=1lxfvUgsglrZHiJRXL2_BnEOQV6k9lcdF&authuser=0"
            >DOWNLOAD</a
          > -->
          <q-item
            clickable
            v-ripple
            v-for="(linkinfo, index) in courses[selectedIndex].linksinfo"
            :key="index"
          >
            <q-item-section>
              <a :href="linkinfo.link" style="text-decoration:none">
                <q-btn
                  align="center"
                  style="width:100%;color:white"
                  color='secondary'
                  :label="linkinfo.name"
                  icon="launch"
                />
              </a>
              <!-- <q-item-label>{{linkinfo.link}}</q-item-label> -->
              <q-separator dark />
            </q-item-section>
          </q-item>
          <!-- Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
          repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis
          perferendis totam, ea at omnis vel numquam exercitationem aut, natus
          minima, porro labore. -->
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import courses from "./courses";

export default {
  data() {
    return {
      dialog: false,
      maximizedToggle: true,
      courses: courses,
      selectedIndex: 0
    };
  },
  methods: {
    showMaterials(courseIndex) {
      console.log(courseIndex);
      this.selectedIndex = courseIndex;
      this.dialog = true;
      console.log(this.courses[this.selectedIndex]);
    }
  }
};
</script>
