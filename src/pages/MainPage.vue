<template>
  <div class="q-ma-md">
    <!-- top bar -->
    <div
      :class="[
        'row',
        'justify-between',
        'text-h3',
        darkMode ? 'text-grey-4' : 'text-dark',
      ]"
    >
      <div v-if="toggles['Clock']" class="col-auto">
        {{ timeAsClock }}
      </div>
      <div v-if="toggles['Time Left']" class="col-auto">
        {{ currentBlock }}
      </div>
    </div>
    <div
      :class="[
        'row',
        'justify-between',
        'text-h4',
        darkMode ? 'text-grey-5' : 'text-grey-7',
      ]"
    >
      <div v-if="toggles['Date']" class="col-auto">
        {{ time.toDateString() }}
      </div>
      <div
        v-if="special_schedule && toggles['Special Schedule Indicator']"
        class="col-auto"
      >
        SPECIAL SCHEDULE
      </div>
      <div
        v-else-if="immersive && toggles['Special Schedule Indicator']"
        class="col-auto"
      >
        IMMERSIVE
      </div>
    </div>

    <!-- progress bars -->
    <div
      v-for="(start_end, block) of scheduleDictionary"
      :key="block"
      :class="['q-my-xl', $q.platform.is.mobile ? 'q-mx-xs' : 'q-mx-xl']"
    >
      <q-linear-progress
        :class="[darkMode ? 'bg-dark' : 'bg-grey-3']"
        size="25px"
        :color="colorPalette[barColor]"
        :value="getProgress(block)"
        style="border-radius: 50px"
      >
        <div
          :class="[
            'row',
            'justify-between',
            'text-subtitle1',
            'absolute-full',
            darkMode ? 'text-grey-4' : 'text-dark',
          ]"
        >
          <div class="col-auto q-ml-sm">
            {{ getCustomName(block) }}
          </div>
          <div class="col-auto q-mr-sm">
            {{ formatTime(start_end["start"]) }} - {{ formatTime(start_end["end"]) }}
          </div>
        </div>
      </q-linear-progress>
    </div>

    <!-- buttons -->
    <div class="row justify-between q-ma-lg">
      <div class="row">
        <q-btn
          class="q-ma-sm"
          :color="colorPalette[buttonColors['Links']]"
          label="Useful Links"
          @click="linksMenu = true"
          rounded
          no-caps
        />
        <q-btn
          class="q-ma-sm"
          :color="colorPalette[buttonColors['Menu']]"
          label="Lunch Menu"
          @click="lunchMenu = true"
          rounded
          no-caps
        />
        <q-btn
          class="q-ma-sm"
          :color="colorPalette[buttonColors['Schedule']]"
          label="Custom Schedule"
          @click="scheduleMenu = true"
          rounded
          no-caps
        />
        <q-btn
          class="q-ma-sm"
          :color="colorPalette[buttonColors['Styles']]"
          label="Customize"
          @click="styleMenu = true"
          rounded
          no-caps
        />
      </div>
      <div class="row">
        <q-btn
          class="q-ma-sm"
          :color="colorPalette[buttonColors['Weekly']]"
          label="Weekly Schedule"
          @click="weekMenu = true"
          rounded
          no-caps
        />
        <q-toggle
          v-if="holiday != ''"
          class="q-ma-sm"
          v-model="holidayBool"
          :label="holiday"
        />
      </div>
    </div>

    <!-- lunch menu -->
    <q-dialog v-model="lunchMenu">
      <q-img style="min-width: 40vw; overflow-y: hidden" src="menu/1.jpg" />
    </q-dialog>

    <!-- custom schedule menu -->
    <q-dialog v-model="scheduleMenu" @shake="scheduleShake" persistent>
      <q-card style="width: 900px; max-width: 80vw">
        <q-card-section class="text-h5"> Custom Schedule </q-card-section>
        <q-card-section>
          <q-form @submit="setSchedule" @reset="resetSchedule" class="q-gutter-md">
            <div v-if="!immersive">
              <q-input
                v-for="block of Object.keys(tempSchedule)"
                :key="block"
                :label="block"
                v-model="tempSchedule[block]"
                class="q-my-lg"
                dense
                rounded
                outlined
              />
              <q-btn
                class="q-mb-lg"
                label="Sports/Activities Schedule"
                color="primary"
                @click="activityMenu = true"
                push
              />
            </div>
            <div v-else>
              <q-input
                label="Immersive"
                v-model="tempCustomImmersiveName"
                class="q-mb-lg"
                dense
                rounded
                outlined
              />
            </div>
            <div>
              <q-btn label="Save" type="submit" color="primary" />
              <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
              <q-btn
                label="Cancel"
                @click="scheduleMenu = false"
                color="negative"
                flat
                class="float-right"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- custom activity menu (within schedule menu) -->
    <q-dialog v-model="activityMenu">
      <q-card class="modal-card">
        <q-card-section>
          <div class="row text-center q-ma-sm">
            <div v-for="day of dayNames" :key="day" class="col">
              <h6 class="q-my-sm">{{ day }}</h6>
              <q-input filled v-model="tempActivitySchedule[day]['start']" mask="time">
                <template #append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-time v-model="tempActivitySchedule[day]['start']">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-time>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <p>to</p>
              <q-input filled v-model="tempActivitySchedule[day]['end']" mask="time">
                <template #append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-time v-model="tempActivitySchedule[day]['end']">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-time>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
        </q-card-section>
        <div class="q-pa-lg">
          <q-btn label="Done" @click="activityMenu = false" color="primary" />
        </div>
      </q-card>
    </q-dialog>

    <!-- custom styles menu -->
    <q-dialog v-model="styleMenu" @shake="stylesShake" persistent>
      <q-card style="width: 900px; max-width: 80vw">
        <q-card-section class="text-h5">
          Custom Styles - {{ styleTab.charAt(0).toUpperCase() + styleTab.slice(1) }}
        </q-card-section>
        <q-card-section>
          <q-splitter v-model="styleSplitter" disable>
            <template #before>
              <q-tabs v-model="styleTab" vertical no-caps class="text-h6">
                <q-tab name="colors" label="Colors" />
                <q-tab name="toggles" label="Toggles" />
                <q-tab name="other" label="Other" />
              </q-tabs>
            </template>

            <template #after>
              <q-tab-panels
                v-model="styleTab"
                animated
                vertical
                transition-prev="jump-up"
                transition-next="jump-up"
              >
                <q-tab-panel name="colors" class="q-pt-none">
                  <h6 class="q-mb-none">Progress Bar Color</h6>
                  <div class="q-gutter-sm">
                    <q-btn
                      v-for="(color, hex) of Object.fromEntries(
                        Object.entries(colorPalette).slice(0, 5)
                      )"
                      :key="color"
                      :color="color"
                      @click="tempBarColor = hex"
                      :icon="tempBarColor == hex ? 'check' : ''"
                      push
                    />
                    <q-btn icon="palette" push>
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-color
                          v-model="tempBarColor"
                          default-view="palette"
                          :palette="Object.keys(colorPalette).slice(5)"
                          no-footer
                          no-header-tabs
                          style="max-width: 250px"
                        />
                      </q-popup-proxy>
                    </q-btn>
                  </div>
                  <h6 class="q-mb-none">Button Colors</h6>
                  <div class="row q-gutter-sm">
                    <div class="col-auto">
                      <q-select
                        v-model="colorBeingChosen"
                        :options="Object.keys(buttonColors)"
                        dense
                      />
                    </div>
                    <div class="col-auto q-gutter-sm">
                      <q-btn
                        v-for="(color, hex) of Object.fromEntries(
                          Object.entries(colorPalette).slice(0, 5)
                        )"
                        :key="color"
                        :color="color"
                        @click="tempButtonColors[colorBeingChosen] = hex"
                        :icon="tempButtonColors[colorBeingChosen] == hex ? 'check' : ''"
                        push
                      />
                      <q-btn icon="palette" push>
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-color
                            v-model="tempButtonColors[colorBeingChosen]"
                            default-view="palette"
                            :palette="Object.keys(colorPalette).slice(5)"
                            no-footer
                            no-header-tabs
                            style="max-width: 250px"
                          />
                        </q-popup-proxy>
                      </q-btn>
                    </div>
                  </div>
                  <h6 class="q-mb-none">Dark Mode</h6>
                  <q-toggle v-model="tempDarkMode" color="primary" label="Dark Mode" />
                </q-tab-panel>
                <q-tab-panel name="toggles">
                  <div class="q-gutter-md">
                    <q-toggle
                      v-for="name of Object.keys(tempToggles)"
                      :key="name"
                      v-model="tempToggles[name]"
                      color="primary"
                      :label="name"
                    />
                  </div>
                </q-tab-panel>
                <q-tab-panel name="other">
                  <q-toggle
                    v-model="tempDetailedTime"
                    color="primary"
                    label="Detailed Time Left"
                  />
                </q-tab-panel>
              </q-tab-panels>
            </template>
          </q-splitter>
        </q-card-section>
        <div class="q-pa-lg">
          <q-btn label="Save" @click="setStyles" color="primary" />
          <q-btn
            label="Reset"
            @click="resetStyles"
            color="primary"
            flat
            class="q-ml-sm"
          />
          <q-btn
            label="Cancel"
            @click="styleMenu = false"
            color="negative"
            flat
            class="float-right"
          />
        </div>
      </q-card>
    </q-dialog>

    <!-- weekly schedule view -->
    <q-dialog v-model="weekMenu">
      <q-card style="width: 1300px; max-width: 80vw">
        <div class="row q-ma-sm">
          <div v-for="day in dayNames" :key="day" class="col">
            <div class="q-ma-sm text-center">
              <h4 class="q-my-none">{{ day }}</h4>
            </div>
            <div
              v-for="(start_end, block) of getDaySchedule(dayNames.indexOf(day) + 1)"
              :key="block"
              :class="[
                'q-px-sm',
                'q-ma-sm',
                'rounded-borders',
                'overflow-auto',
                'bg-' + (colorGuide[block] || 'blue-4'),
              ]"
            >
              <p class="text-h6 q-mb-none">
                {{ getCustomName(block) }}
              </p>
              <p v-if="formatTime(start_end['start']) != '0:00'">
                {{
                  formatTime(start_end["start"]) + " - " + formatTime(start_end["end"])
                }}
              </p>
              <p v-else>All Day</p>
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>

    <!-- useful links dashboard -->
    <q-dialog v-model="linksMenu">
      <q-card style="width: 965px; max-width: 80vw">
        <q-card-section class="text-h5"> Useful Links </q-card-section>
        <q-card-section>
          <div
            v-for="index in Math.ceil(Object.keys(usefulLinks).length / 3)"
            :key="index"
            class="row q-my-md"
          >
            <div
              v-for="name of Object.keys(usefulLinks).slice((index - 1) * 3, index * 3)"
              :key="name"
              class="col"
            >
              <q-card class="useful-links-card text-weight-thin">
                <a :href="usefulLinks[name]['link']" target="_blank">
                  <q-img :src="usefulLinks[name]['image']">
                    <div class="absolute-bottom text-subtitle2 text-center">
                      {{ name }}
                    </div>
                  </q-img>
                </a>
              </q-card>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- tools dashboard -->
    <q-dialog v-model="toolsMenu">
      <q-card style="width: 965px; max-width: 80vw">
        <q-card-section class="text-h5"> Tools </q-card-section>
        <q-card-section>
          <div
            v-for="index in Math.ceil(Object.keys(toolLinks).length / 3)"
            :key="index"
            class="row q-my-md"
          >
            <div
              v-for="name of Object.keys(toolLinks).slice((index - 1) * 3, index * 3)"
              :key="name"
              class="col"
            >
              <q-card class="useful-links-card text-weight-thin">
                <a :href="toolLinks[name]['link']">
                  <q-img :src="toolLinks[name]['image']">
                    <div class="absolute-bottom text-subtitle2 text-center">
                      {{ name }}
                    </div>
                  </q-img>
                </a>
              </q-card>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- footer -->
    <div class="float-bottom text-subtitle1 text-center q-pt-xl q-mt-xl">
      <p class="q-ma-none q-mt-xl q-mp-xl">
        Created by <a href="https://lucaskchang.com" target="_blank">Lucas Chang</a>
      </p>
      <p class="q-mt-sm">
        <a
          class="footer-link"
          href="https://github.com/lukajaa/bay-clock-2"
          target="_blank"
          >Source Code</a
        >
        / <a class="cursor-pointer" @click="toolsMenu = true">Tools</a> /
        <a class="cursor-pointer" @click="bugReport">Bug Report</a>
      </p>
    </div>

    <div v-if="holiday != '' && holidayBool" class="aboslute-center">
      <img
        v-for="index in 50"
        :key="index"
        class="holiday-icon"
        :src="'images/icons/' + holidays[holiday]['icon']"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// IMPORTS
import { ref, computed, watch, onMounted } from "vue";
import { useQuasar, colors } from "quasar";
import _ from "lodash";
import immersives_json from "../data/schedules/immersives.json";
import special_schedules from "../data/schedules/special_schedules.json";
import activities_schedule from "../data/schedules/activity_schedule.json";
import schedule_json from "../data/schedules/schedule.json";
import breaks_json from "../data/schedules/breaks.json";
import color_guide from "../data/guides/color_guide.json";
import color_palette from "../data/guides/color_palette.json";
import holidays_json from "../data/schedules/holidays.json";
import useful_links from "../data/guides/useful_links.json";
import tool_links from "../data/guides/tool_links.json";
// schedules
const immersives: ImmersiveScheduleType = immersives_json;
const schedule: ScheduleJsonType = schedule_json;
const activities: SimpleScheduleType = activities_schedule;
const specialSchedules: ScheduleJsonType = special_schedules;
const breaks: SimpleScheduleType = breaks_json;
// guides
const colorGuide: StringString = color_guide;
const colorPalette: StringString = color_palette;
const holidays: SimpleScheduleType = holidays_json;
const usefulLinks: LinksType = useful_links;
const toolLinks: LinksType = tool_links;

// TYPES
type ScheduleJsonType = {
  [index: string]: UnparsedScheduleType;
};

type ImmersiveScheduleType = {
  Immersive1: {
    start: string;
    end: string;
  };
  Immersive2: {
    start: string;
    end: string;
  };
  Schedule: UnparsedScheduleType;
};
type SimpleScheduleType = {
  [index: string]: {
    start: string;
    end: string;
    icon?: string;
  };
};
type LinksType = {
  [index: string]: {
    link: string;
    image: string;
  };
};
type ScheduleType = {
  [index: string]: string;
  A: string;
  B: string;
  C: string;
  D: string;
  E: string;
  F: string;
};
type UnparsedScheduleType = {
  [index: string]: {
    start: { hour: number; minute: number };
    end: { hour: number; minute: number };
  };
};
type ParsedScheduleType = {
  [index: string]: {
    start: Date;
    end: Date;
  };
};
type ActivitySchedule = {
  [index: string]: {
    start: string;
    end: string;
  };
};
type ToggleDict = {
  [index: string]: boolean;
};
type StringString = {
  [index: string]: string;
};

// VARS
const $q = useQuasar(); // quasar instance
const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri"];

// REFS
const time = ref<Date>(new Date()); // current time
const holidayBool = ref<boolean>(false); // holiday preference

// menu states
const lunchMenu = ref<boolean>(false);
const toolsMenu = ref<boolean>(false);
const welcomeMenu = ref<boolean>(true);
const scheduleMenu = ref<boolean>(false);
const styleMenu = ref<boolean>(false);
const styleTab = ref<string>("colors");
const styleSplitter = ref<number>(25);
const activityMenu = ref<boolean>(false);
const weekMenu = ref<boolean>(false);
const linksMenu = ref<boolean>(false);

// custom schedule menu values and temp values
const activitySchedule = ref<ActivitySchedule>(activities);
const tempActivitySchedule = ref<ActivitySchedule>({});
const customSchedule = ref<ScheduleType>({
  A: "A",
  B: "B",
  C: "C",
  D: "D",
  E: "E",
  F: "F",
});
const tempSchedule = ref<ScheduleType>(customSchedule.value);
const customImmersiveName = ref<string>("Immersive");
const tempCustomImmersiveName = ref<string>("Immersive");

// custom styles menu values and temp values
const tempBarColor = ref<string>("");
const barColor = ref<string>(colors.getPaletteColor("primary"));
const tempButtonColors = ref<StringString>({});
const buttonColors = ref<StringString>({
  Links: "",
  Menu: "",
  Schedule: "",
  Styles: "",
  Weekly: "",
});
const colorBeingChosen = ref<string>("Links");
const toggles = ref<ToggleDict>({
  Clock: true,
  Date: true,
  "Time Left": true,
  "Special Schedule Indicator": true,
});
const tempToggles = ref<ToggleDict>({});
const tempDetailedTime = ref<boolean>(false);
const detailedTime = ref<boolean>(false);
const tempDarkMode = ref<boolean>(false);
const darkMode = ref<boolean>(false);

// COMPUTED PROPERTIES

// computes whether today is a special schedule or not
const special_schedule = computed<boolean>(function () {
  var now = time.value;
  for (const date of Object.keys(specialSchedules)) {
    const date_object = new Date(date);
    if (
      date_object.getFullYear() == now.getFullYear() &&
      date_object.getMonth() == now.getMonth() &&
      now.getDate() == date_object.getDate()
    ) {
      return true;
    }
  }
  return false;
});

// computes whether today is in a break and returns break name if so
const currentBreak = computed<string>(function () {
  var now = time.value;
  for (const [name, start_end] of Object.entries(breaks)) {
    if (now >= new Date(start_end["start"]) && now <= new Date(start_end["end"])) {
      return name;
    }
  }
  return "";
});

// computes whether today is during an immersive or not
const immersive = computed<boolean>(function () {
  var now = time.value;
  if (
    (now > new Date(immersives["Immersive1"]["start"]) &&
      now < new Date(immersives["Immersive1"]["end"])) ||
    (now > new Date(immersives["Immersive2"]["start"]) &&
      now < new Date(immersives["Immersive2"]["end"]))
  ) {
    return true;
  }
  return false;
});

// computes whether today is in a holiday and returns name if so
const holiday = computed<string>(function () {
  var now = time.value;
  for (const [name, info] of Object.entries(holidays)) {
    if (
      now > new Date(now.getFullYear() + "/" + info["start"]) &&
      now < new Date(now.getFullYear() + "/" + info["end"])
    ) {
      return name;
    }
  }
  return "";
});

// computes the current day's schedule
const scheduleDictionary = computed<ParsedScheduleType>(function () {
  var now = time.value;
  var unparsedDaySchedule = <UnparsedScheduleType>{};

  if (currentBreak.value.length > 0) {
    return {};
  } else if (now.getDay() == 0 || now.getDay() == 6) {
    return {};
  } else if (special_schedule.value) {
    for (const [date, schedule] of Object.entries(specialSchedules)) {
      let date_object = new Date(date);
      if (
        date_object.getFullYear() == now.getFullYear() &&
        date_object.getMonth() == now.getMonth() &&
        now.getDate() == date_object.getDate()
      ) {
        unparsedDaySchedule = schedule;
      }
    }
  } else if (
    (now > new Date(immersives["Immersive1"]["start"]) &&
      now < new Date(immersives["Immersive1"]["end"])) ||
    (now > new Date(immersives["Immersive2"]["start"]) &&
      now < new Date(immersives["Immersive2"]["end"]))
  ) {
    unparsedDaySchedule = immersives["Schedule"];
  } else {
    unparsedDaySchedule = Object.values(schedule)[now.getDay()];
    var activity_start = activitySchedule.value[dayNames[now.getDay() - 1]]["start"];
    var activity_end = activitySchedule.value[dayNames[now.getDay() - 1]]["end"];
    unparsedDaySchedule["Activities + Sports/Drama"] = {
      start: {
        hour: Number(activity_start.split(":")[0]),
        minute: Number(activity_start.split(":")[1]),
      },
      end: {
        hour: Number(activity_end.split(":")[0]),
        minute: Number(activity_end.split(":")[1]),
      },
    };
  }

  return parseScheduleDict(unparsedDaySchedule);
});

// computes the current time in HH:MM:SS format
const timeAsClock = computed<string>(function () {
  var now = time.value;
  var hours = now.getHours();
  var minutes = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
  var seconds = now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
  var meridiem = "AM";
  if (hours > 11) {
    if (hours != 12) {
      hours -= 12;
    }
    meridiem = "PM";
  }
  return `${hours}:${minutes}:${seconds}${meridiem}`;
});

// computes the time left in block/break/weekend
const currentBlock = computed<string>(function () {
  if (currentBreak.value.length > 0) {
    return currentBreak.value;
  }
  if (Object.keys(scheduleDictionary.value).length == 0) {
    return "Weekend";
  }
  let now = time.value;
  if (scheduleDictionary.value[Object.keys(scheduleDictionary.value)[0]]["start"] > now) {
    // start time of first block
    return "Before School";
  } else if (
    scheduleDictionary.value[
      Object.keys(scheduleDictionary.value)[
        Object.keys(scheduleDictionary.value).length - 1
      ]
    ]["end"] < now
  ) {
    // end time of last block
    return "School is over";
  }
  for (const start_end of Object.values(scheduleDictionary.value)) {
    if (now >= start_end["start"] && now <= start_end["end"]) {
      let time_left = start_end["end"].getTime() - now.getTime();
      if (detailedTime.value) {
        let hours =
          Math.floor(time_left / 3600000) == 0
            ? ""
            : Math.floor(time_left / 3600000) + ":";
        let minutes =
          Math.floor((time_left % 3600000) / 60000) < 10
            ? "0" + Math.floor((time_left % 3600000) / 60000)
            : Math.floor((time_left % 3600000) / 60000);
        let seconds =
          Math.floor(((time_left % 3600000) % 60000) / 1000) + 1 < 10
            ? "0" + (Math.floor(((time_left % 3600000) % 60000) / 1000) + 1)
            : Math.floor(((time_left % 3600000) % 60000) / 1000) + 1;
        return `${hours}${minutes}:${seconds} left`;
      } else {
        let minutes = Math.floor(time_left / 60000) + 1;
        return `${minutes} minutes left`;
      }
    }
  }
  return "Passing";
});

// FUNCTIONS

// returns date in HH:MM format
function formatTime(date: Date): string {
  var hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  return `${hour}:${minute}`;
}

// returns progress for the given block
function getProgress(block: string): number {
  const now = time.value;
  var start = scheduleDictionary.value[block]["start"];
  var end = scheduleDictionary.value[block]["end"];
  if (now < start) {
    return 0;
  } else if (now > end) {
    console.log(end);
    return 1;
  } else {
    return (now.getTime() - start.getTime()) / (end.getTime() - start.getTime());
  }
}

// returns the custom name for the given block
function getCustomName(block: string): string {
  if (immersive.value) {
    if (block.includes("Morning")) {
      return customImmersiveName.value + " Morning";
    } else if (block.includes("Afternoon")) {
      return customImmersiveName.value + " Afternoon";
    }
  }
  return customSchedule.value[block] || block;
}

// returns the schedule of a day given the day
function getDaySchedule(day_input: number): ParsedScheduleType {
  var now = new Date(time.value.getTime());
  var day = now.getDay(),
    diff = now.getDate() - day + (day == 0 ? -6 : day_input);
  now.setDate(diff);

  var unparsedDaySchedule = <UnparsedScheduleType>{};
  var done = false;

  for (const start_end of Object.values(breaks)) {
    if (now >= new Date(start_end["start"]) && now < new Date(start_end["end"])) {
      unparsedDaySchedule = {
        Break: {
          start: { hour: 0, minute: 0 },
          end: { hour: 23, minute: 59 },
        },
      };
      done = true;
    }
  }
  for (const [date, schedule] of Object.entries(specialSchedules)) {
    let date_object = new Date(date);
    if (
      date_object.getFullYear() == now.getFullYear() &&
      date_object.getMonth() == now.getMonth() &&
      now.getDate() == date_object.getDate()
    ) {
      unparsedDaySchedule = schedule;
      done = true;
    }
  }
  if (!done) {
    if (
      (now > new Date(immersives["Immersive1"]["start"]) &&
        now < new Date(immersives["Immersive1"]["end"])) ||
      (now > new Date(immersives["Immersive2"]["start"]) &&
        now < new Date(immersives["Immersive2"]["end"]))
    ) {
      unparsedDaySchedule = immersives["Schedule"];
    } else {
      unparsedDaySchedule = Object.values(schedule)[time.value.getDay()];
    }
  }

  return parseScheduleDict(unparsedDaySchedule);
}

// returns a schedule dictionary with dates given one with numbers
function parseScheduleDict(dict: UnparsedScheduleType) {
  let now = time.value;
  let parsedDaySchedule = <ParsedScheduleType>{};
  for (const [block, start_end] of Object.entries(dict)) {
    parsedDaySchedule[block] = {
      start: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        start_end["start"]["hour"],
        start_end["start"]["minute"]
      ),
      end: new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        start_end["end"]["hour"],
        start_end["end"]["minute"]
      ),
    };
  }
  return parsedDaySchedule;
}

// bug report popup
function bugReport() {
  $q.dialog({
    title: "Found a bug or have a suggestion?",
    message: "Email: lchang24@bayschoolsf.org",
  });
}

// sets the custom schedule
function setSchedule() {
  $q.localStorage.set("custom_blocks", tempSchedule.value);
  customSchedule.value = tempSchedule.value;
  $q.localStorage.set("custom_immersive_name", tempCustomImmersiveName.value);
  customImmersiveName.value = tempCustomImmersiveName.value;
  $q.localStorage.set("custom_activity_schedule", tempActivitySchedule.value);
  activitySchedule.value = tempActivitySchedule.value;
  scheduleMenu.value = false;
}

// resets the custom schedule
function resetSchedule() {
  $q.dialog({
    title: "Confirm",
    message: "Are you sure you want to reset all settings to their defaults?",
    cancel: true,
  }).onOk(() => {
    tempSchedule.value = {
      A: "A",
      B: "B",
      C: "C",
      D: "D",
      E: "E",
      F: "F",
    };
    tempCustomImmersiveName.value = "Immersive";
    tempActivitySchedule.value = {
      Mon: {
        start: "15:45",
        end: "17:00",
      },
      Tue: {
        start: "15:45",
        end: "17:00",
      },
      Wed: {
        start: "15:45",
        end: "17:00",
      },
      Thu: {
        start: "15:00",
        end: "16:30",
      },
      Fri: {
        start: "14:35",
        end: "16:00",
      },
    };
  });
}

// prevents closing custom schedule menu with unsaved changes
function scheduleShake() {
  if (
    _.isEqual(tempSchedule.value, customSchedule.value) &&
    _.isEqual(tempCustomImmersiveName.value, customImmersiveName.value) &&
    _.isEqual(tempActivitySchedule.value, activitySchedule.value)
  ) {
    scheduleMenu.value = false;
  } else {
    $q.notify({
      message: "You have unsaved changes!",
      color: "negative",
      position: "bottom-right",
      icon: "close",
      timeout: 1000,
      group: false,
    });
  }
}

// sets the custom styles
function setStyles() {
  $q.localStorage.set("bar_color", tempBarColor.value);
  $q.localStorage.set("button_colors", tempButtonColors.value);
  $q.localStorage.set("toggles", tempToggles.value);
  $q.localStorage.set("detailed_time", tempDetailedTime.value);
  $q.localStorage.set("dark_mode", tempDarkMode.value);
  barColor.value = tempBarColor.value;
  buttonColors.value = tempButtonColors.value;
  toggles.value = tempToggles.value;
  detailedTime.value = tempDetailedTime.value;
  darkMode.value = tempDarkMode.value;
  $q.dark.set(darkMode.value);
  styleMenu.value = false;
}

// resets the custom styles
function resetStyles() {
  $q.dialog({
    title: "Confirm",
    message: "Are you sure you want to reset all settings to their defaults?",
    cancel: true,
  }).onOk(() => {
    tempBarColor.value = colors.getPaletteColor("primary");
    tempButtonColors.value = {
      Links: "",
      Menu: "",
      Schedule: "",
      Styles: "",
      Weekly: "",
    };
    tempToggles.value = {
      Clock: true,
      Date: true,
      "Time Left": true,
      "Special Schedule Indicator": true,
    };
    tempDetailedTime.value = false;
    tempDarkMode.value = false;
    $q.dark.set(false);
  });
}

// prevents closing custom styles menu with unsaved changes
function stylesShake() {
  if (
    _.isEqual(tempBarColor.value, barColor.value) &&
    _.isEqual(tempButtonColors.value, buttonColors.value) &&
    _.isEqual(tempToggles.value, toggles.value) &&
    _.isEqual(tempDetailedTime.value, detailedTime.value) &&
    tempDarkMode.value == darkMode.value
  ) {
    styleMenu.value = false;
  } else {
    $q.notify({
      message: "You have unsaved changes!",
      color: "negative",
      position: "bottom-right",
      icon: "close",
      timeout: 1000,
      group: false,
    });
  }
}

// WATCHERS

// create a copy of the custom schedule to preserve original
watch(scheduleMenu, function (val) {
  if (val) {
    tempSchedule.value = {
      A: customSchedule.value["A"],
      B: customSchedule.value["B"],
      C: customSchedule.value["C"],
      D: customSchedule.value["D"],
      E: customSchedule.value["E"],
      F: customSchedule.value["F"],
    };
    tempCustomImmersiveName.value = customImmersiveName.value;
    tempActivitySchedule.value = JSON.parse(JSON.stringify(activitySchedule.value));
  }
});

// create a copy of the custom styles to preserve original
watch(styleMenu, function (val) {
  if (val) {
    tempBarColor.value = barColor.value;
    tempButtonColors.value = {
      Links: buttonColors.value["Links"],
      Menu: buttonColors.value["Menu"],
      Schedule: buttonColors.value["Schedule"],
      Styles: buttonColors.value["Styles"],
      Weekly: buttonColors.value["Weekly"],
    };
  }
  tempToggles.value = {
    Clock: toggles.value["Clock"],
    Date: toggles.value["Date"],
    "Time Left": toggles.value["Time Left"],
    "Special Schedule Indicator": toggles.value["Special Schedule Indicator"],
  };
  tempDetailedTime.value = detailedTime.value;
  tempDarkMode.value = darkMode.value;
});

// saves holiday icon preferenecs to local storage when changed
watch(holidayBool, (state: boolean) => {
  $q.localStorage.set("holiday_bool", state);
});

// load local storage once mounted
onMounted(() => {
  var check_custom_blocks = <ScheduleType>$q.localStorage.getItem("custom_blocks");
  if (check_custom_blocks) {
    customSchedule.value = check_custom_blocks;
  }
  var check_bar_color = <string>$q.localStorage.getItem("bar_color");
  if (check_bar_color) {
    barColor.value = check_bar_color;
  }
  var check_button_colors = <StringString>$q.localStorage.getItem("button_colors");
  if (check_button_colors) {
    buttonColors.value = check_button_colors;
  }
  var check_toggles = <ToggleDict>$q.localStorage.getItem("toggles");
  if (check_toggles) {
    toggles.value = check_toggles;
  }
  var check_detailed_time = <boolean>$q.localStorage.getItem("detailed_time");
  if (check_detailed_time) {
    detailedTime.value = check_detailed_time;
  }
  var check_dark_mode = <boolean>$q.localStorage.getItem("dark_mode");
  if (check_dark_mode) {
    darkMode.value = check_dark_mode;
    $q.dark.set(darkMode.value);
  }
  var check_custom_immersive_name = <string>(
    $q.localStorage.getItem("custom_immersive_name")
  );
  if (check_custom_immersive_name) {
    customImmersiveName.value = check_custom_immersive_name;
  }
  var check_custom_activity_schedule = <ActivitySchedule>(
    $q.localStorage.getItem("custom_activity_schedule")
  );
  if (check_custom_activity_schedule) {
    activitySchedule.value = check_custom_activity_schedule;
  }
  var check_holiday_bool = <boolean>$q.localStorage.getItem("holiday_bool");
  if (check_holiday_bool) {
    holidayBool.value = check_holiday_bool;
  }
});

// update time and title every second
setInterval(() => {
  time.value = new Date();
  document.title = currentBlock.value;
}, 1000);
</script>
