<template>
  <div class="window-height q-pa-xl q-ma-xl">
    <h4 class="q-mb-sm">Custom Block Names:</h4>
    <div class="row q-gutter-md">
      <div
        v-for="original_name of Object.keys(customBlockNames)"
        :key="original_name"
        class="col"
      >
        <q-input
          :label="original_name"
          v-model="customBlockNames[original_name]"
          outlined
          dense
        />
      </div>
    </div>
    <div class="row q-mt-md">
      <q-btn
        label="Use saved values from Bay Clock"
        color="blue"
        @click="useSavedValues"
        no-caps
      />
    </div>
    <h4 class="q-mb-sm">Custom Block Colors:</h4>
    <div class="row q-gutter-md">
      <div
        v-for="name of Object.keys(customBlockColors)"
        :key="name"
        class="col-auto q-mx-sm"
      >
        <q-btn
          :label="name"
          icon="palette"
          :color="colorPalette[customBlockColors[name]]"
        >
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-color
              v-model="customBlockColors[name]"
              default-view="palette"
              :palette="Object.keys(colorPalette)"
              no-footer
              no-header-tabs
              style="max-width: 250px"
            />
          </q-popup-proxy>
        </q-btn>
      </div>
    </div>
    <h4 class="q-mb-sm">Other Options:</h4>
    <div class="row q-gutter-md">
      <q-checkbox v-model="center" label="Center Text" />
      <q-checkbox v-model="fullNames" label="Full Day Names" />
    </div>
    <q-btn class="q-my-sm" color="blue" label="Print" v-print="'#schedule'" />
    <div class="bg-red-6 q-pa-sm rounded-borders text-white text-subtitle1">
      <p>Getting the printer to print with color can be a bit difficult. In your print settings, under "More Settings" try enabling "Background Graphics". If you still can't see color in the preview, you can try to save it as a pdf and then print it after that.</p>
    </div>
    <h4 class="q-my-sm">Schedule Preview:</h4>
    <div class="row" id="schedule">
      <div v-for="day in dayNames" :key="day" class="col">
        <div class="q-ma-sm q-mb-md text-center">
          <h4 class="q-my-none">{{ fullNames ? fullDayNames[day] : day }}</h4>
        </div>
        <div class="q-gutter-sm">
          <div
            v-for="(start_end, block) of schedule[day]"
            :key="block"
            color="brand"
            :class="[
              'q-px-sm',
              'q-ma-sm',
              'rounded-borders',
              'overflow-auto',
              'justify-center',
              'column',
              'bg-' + colorPalette[customBlockColors[block]] || 'blue',
              center ? 'text-center' : '',
            ]"
            :style="'height: ' + distance(start_end) + 'px'"
          >
            <div>
              <p class="text-h6 q-mb-none">
                {{
                  block == "Group Advisory/1-on-1s"
                    ? "Advisory"
                    : customBlockNames[block] || block
                }}
              </p>
              <p>
                {{
                  `${start_end["start"]["hour"]}:${
                    start_end["start"]["minute"] < 10
                      ? "0" + start_end["start"]["minute"]
                      : start_end["start"]["minute"]
                  } - ${start_end["end"]["hour"]}:${
                    start_end["end"]["minute"] < 10
                      ? "0" + start_end["end"]["minute"]
                      : start_end["end"]["minute"]
                  }`
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useQuasar } from "quasar";
import colorPalette from "../data/guides/color_palette.json";
import schedule from "../data/schedules/schedule.json";
import vPrint from "vue3-print-nb";

const customBlockNames = ref({
  A: "A",
  B: "B",
  C: "C",
  D: "D",
  E: "E",
  F: "F",
});
const customBlockColors = ref({
  A: "#e57373",
  B: "#f06292",
  C: "#64b5f6",
  D: "#4dd0e1",
  E: "#81c784",
  F: "#ffd54f",
  "Morning Meeting": "#ffb74d",
  "Group Advisory/1-on-1s": "#a1887f",
  Tutorial: "#dce775",
  Lunch: "#ff8a65",
});
const $q = useQuasar();

const center = ref(true);
const fullNames = ref(false);

function useSavedValues() {
  if ($q.localStorage.getItem("custom_blocks")) {
    customBlockNames.value = $q.localStorage.getItem("custom_blocks");
  }
}

function distance(start_end) {
  var minutes = 0;
  minutes += (Number(start_end["end"]["hour"]) - Number(start_end["start"]["hour"])) * 60;
  minutes += Number(start_end["end"]["minute"]) - Number(start_end["start"]["minute"]);

  return minutes > 70 ? minutes : 70;
}

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const fullDayNames = {
  "Mon": "Monday",
  "Tue": "Tuesday",
  "Wed": "Wednesday",
  "Thu": "Thursday",
  "Fri": "Friday"
}
</script>
