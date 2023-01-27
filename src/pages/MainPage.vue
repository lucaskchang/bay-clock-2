<template>
<div class="q-ma-md">
  <div :class="['row', 'justify-between', 'text-h3', darkMode ? 'text-grey-4' : 'text-dark']">
    <div v-if="toggles['Clock']" class="col-auto">
      {{ timeAsClock }}
    </div>
    <div v-if="toggles['Time Left']" class="col-auto">
      {{ currentBlock }}
    </div>
  </div>
  <div :class="['row', 'justify-between', 'text-h4', darkMode ? 'text-grey-5' : 'text-grey-7']">
    <div v-if="toggles['Date']" class="col-auto">
      {{ timeAsDate }}
    </div>
    <div v-if="special_schedule && toggles['Special Schedule Indicator']" class="col-auto">
      SPECIAL SCHEDULE
    </div>
    <div v-else-if="immersive && toggles['Special Schedule Indicator']" class="col-auto">
      IMMERSIVE
    </div>
  </div>

  <div
    v-for="(start_end, block) of scheduleDictionary"
    :key="block"
    class="row q-ma-xl"
  >
      <q-linear-progress :class="[darkMode ? 'bg-dark' : 'bg-grey-3']" size="25px" :color="getColorCode(barColor)" :value="getProgress(block)" style="border-radius: 50px">
        <div :class="['row', 'justify-between', 'text-subtitle1', 'absolute-full', darkMode ? 'text-grey-4' : 'text-dark']">
          <div class="col-auto q-ml-sm">
            {{ getCustomName(block) }}
          </div>
          <div class="col-auto q-mr-sm">
            {{ formatTime(start_end['start']) }} - {{ formatTime(start_end['end']) }}
          </div>
        </div>
      </q-linear-progress>
  </div>

  <div class="row q-ma-lg">
    <div class="col">
      <div class="q-gutter-md">
        <q-btn :color="getColorCode(buttonColors['Links'])" label="Useful Links" @click="linksModal = true" rounded no-caps />
        <q-btn :color="getColorCode(buttonColors['Menu'])" label="Lunch Menu" @click="lunchModal = true" rounded no-caps />
        <q-btn :color="getColorCode(buttonColors['Schedule'])" label="Custom Schedule" @click="scheduleModal = true" rounded no-caps />
        <q-btn :color="getColorCode(buttonColors['Styles'])" label="Customize" @click="styleModal = true" rounded no-caps />
      </div>
    </div>
    <div class="column justify-end">
      <div class="col">
        <q-btn :color="getColorCode(buttonColors['Weekly'])" label="Weekly Schedule" @click="weekModal = true" rounded no-caps />
      </div>
    </div>
  </div>

  <q-dialog v-model="lunchModal">
    <q-card style="width: 900px; max-width: 80vw; height: 80vh;">
    <embed
      src="menu\menu.pdf#toolbar=0"
      type="application/pdf"
      frameBorder="0"
      height="100%"
      width="100%"
    />
    </q-card>
  </q-dialog>

  <q-dialog
    v-model="scheduleModal"
    @shake="scheduleShake"
    persistent
  >
    <q-card style="width: 900px; max-width: 80vw;">
      <q-card-section class="text-h5">
        Custom Schedule
      </q-card-section>
      <q-card-section>
        <q-form
          @submit="setSchedule"
          @reset="resetSchedule"
          class="q-gutter-md"
        >
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
            >
            </q-input>
            <q-btn
              class="q-mb-lg"
              label="Sports/Activities Schedule"
              color="primary"
              @click="activityModal = true"
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
            >
            </q-input>
          </div>
          <div>
            <q-btn label="Save" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            <q-btn label="Cancel" @click="scheduleModal = false" color="negative" flat class="float-right" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog
    v-model="activityModal"
  >
    <q-card style="width: 900px; max-width: 80vw;">
      <q-card-section>
        <div class="row text-center q-ma-sm">
          <div
            v-for="day of dayNames"
            :key="day"
            class="col"
          >
            <h6 class="q-my-sm">{{ day }}</h6>
            <q-input filled v-model="tempActivitySchedule[day]['start']" mask="time">
              <template v-slot:append>
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
              <template v-slot:append>
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
        <q-btn label="Done" @click="activityModal = false" color="primary"/>
      </div>
    </q-card>
  </q-dialog>

  <q-dialog
    v-model="styleModal"
    @shake="stylesShake"
    persistent
  >
    <q-card style="width: 900px; max-width: 80vw;">
      <q-card-section class="text-h5">
        Custom Styles - {{ styleTab.charAt(0).toUpperCase() + styleTab.slice(1) }}
      </q-card-section>
      <q-card-section>
        <q-splitter v-model="styleSplitter" disable>
          <template v-slot:before>
            <q-tabs v-model="styleTab" vertical no-caps class="text-h6">
              <q-tab name="colors" label="Colors" />
              <q-tab name="toggles" label="Toggles" />
              <q-tab name="other" label="Other" />
            </q-tabs>
          </template>

          <template v-slot:after>
            <q-tab-panels
              v-model="styleTab"
              animated
              vertical
              transition-prev="jump-up"
              transition-next="jump-up"
            >
              <q-tab-panel name="colors" class="q-pt-none">
                <div>
                  <h6 class="q-mb-none">Progress Bar Color</h6>
                  <div class="col-auto q-gutter-sm">
                    <q-btn
                      v-for="(color, hex) of colorPalette"
                      :key="color"
                      :color="color"
                      @click="tempBarColor = hex"
                      :icon="_.isEqual(tempBarColor, hex) ? 'check' : ''"
                      push
                    />
                    <q-btn icon="palette" paddig="md" push>
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-color
                          v-model="tempBarColor"
                          default-view="palette"
                          :palette="Object.keys(customColorPalette)"
                          no-footer
                          no-header-tabs
                          style="max-width:250px"
                        />
                      </q-popup-proxy>
                    </q-btn>
                  </div>
                </div>
                <div>
                  <h6 class="q-mb-none">Button Colors</h6>
                  <div class="row q-gutter-sm">
                    <div class="col-auto">
                      <q-select v-model="colorBeingChosen" :options="Object.keys(buttonColors)" dense />
                    </div>
                    <div class="col-auto q-gutter-sm">
                      <q-btn
                        v-for="(color, hex) of colorPalette"
                        :key="color"
                        :color="color"
                        @click="tempButtonColors[colorBeingChosen] = hex"
                        :icon="_.isEqual(tempButtonColors[colorBeingChosen], hex) ? 'check' : ''"
                        push
                      />
                      <q-btn icon="palette" paddig="md" push>
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-color
                            v-model="tempButtonColors[colorBeingChosen]"
                            default-view="palette"
                            :palette="Object.keys(customColorPalette)"
                            no-footer
                            no-header-tabs
                            style="max-width:250px"
                          />
                        </q-popup-proxy>
                      </q-btn>
                    </div>
                  </div>
                </div>
                <div>
                  <h6 class="q-mb-none">Dark Mode</h6>
                  <div class="col-auto">
                    <q-toggle
                      v-model="tempDarkMode"
                      color="primary"
                      label="Dark Mode"
                    />
                  </div>
                </div>
              </q-tab-panel>

              <q-tab-panel name="toggles">
                <div class="q-gutter-md">
                  <q-toggle
                    v-for="(state, name) of tempToggles"
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
        <q-btn label="Save" @click="setStyles" color="primary"/>
        <q-btn label="Reset" @click="resetStyles" color="primary" flat class="q-ml-sm" />
        <q-btn label="Cancel" @click="styleModal = false" color="negative" flat class="float-right" />
      </div>
    </q-card>
  </q-dialog>

  <q-dialog v-model="weekModal">
    <q-card style="width: 1300px; max-width: 80vw;">
      <div class="row q-ma-sm">
        <div
          v-for="day in dayNames"
          :key="day"
          class="col"
        >
          <div class="q-ma-sm text-center">
            <h4 class="q-my-none">{{ day }}</h4>
          </div>
          <div
            v-for="(start_end, block) of getDaySchedule(dayNames.indexOf(day) + 1)"
            :key="block"
            :class="['q-px-sm', 'q-ma-sm', 'rounded-borders', 'overflow-auto', 'bg-' + (colorGuide[block] || 'blue-4') ]"
          >
            <p class="text-h6 q-mb-none">
              {{ getCustomName(block) }}
            </p>
            <p v-if="formatTime(start_end['start']) != '0:00'">
              {{ formatTime(start_end['start']) + ' - ' + formatTime(start_end['end']) }}
            </p>
            <p v-else>
              All Day
            </p>
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>

  <q-dialog v-model="linksModal">
    <q-card style="width: 965px; max-width: 80vw;">
      <q-card-section class="text-h5">
        Useful Links
      </q-card-section>
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
            <q-card
              class="useful-links-card text-weight-thin"
            >
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

  <q-dialog v-model="toolsModal">
    <q-card style="width: 965px; max-width: 80vw;">
      <q-card-section class="text-h5">
        Tools
      </q-card-section>
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
            <q-card
              class="useful-links-card text-weight-thin"
            >
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

  <div class="float-bottom text-subtitle1 text-center q-pt-xl q-mt-xl">
    <p class="q-ma-none">Created by <a href="https://lucaskchang.com" target="_blank">Lucas Chang</a></p>
    <p class="q-mt-sm"><a href="https://github.com/lukajaa/bay-clock-2" target="_blank">Source</a> / <a @click="toolsModal = true">Tools</a> / <a @click="bugReport">Bug Report</a></p>
  </div>
</div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useQuasar, colors } from 'quasar';
import schedule from '../data/schedule.json';
import immersives from '../data/immersives.json';
import specialSchedules from '../data/special_schedules.json';
import activities from '../data/activity_schedule.json';
import holidays from '../data/holidays.json';
import colorArray from '../data/colors.json';
import _ from 'lodash';

// types
type ScheduleType = {
  [index: string]: string;
  A: string,
  B: string,
  C: string,
  D: string,
  E: string,
  F: string
}

type OtherScheduleType = {
  [index: string]: {
    start: Date,
    end: Date
  };
}

type StringString = {
  [index: string]: string;
}


const activitySchedule = ref(activities);
const tempActivitySchedule = ref({})
const $q = useQuasar(); // Quasar instance
const darkMode = ref<boolean>(false) // Dark mode state
const special_schedule = computed<boolean>(function() { // Special schedule state
  let now = time.value
  for (const date of Object.keys(specialSchedules)) {
    let date_object = new Date(date);
    if (date_object.getFullYear() == now.getFullYear() && date_object.getMonth() == now.getMonth() && now.getDate() == date_object.getDate()) {
      return true
    }
  }
  return false
});
const holiday = computed<string>(function() { // Holiday state
  let now = time.value
  for (const [name, start_end] of Object.entries(holidays)) {
    if (now >= new Date(start_end['start']) && now <= new Date(start_end['end'])) {
      return name
    }
  }
  return ''
});
const immersive = computed<boolean>(function() { // Special schedule state
  let now = time.value
  if ((now > new Date(immersives['Immersive1']['start']) && now < new Date(immersives['Immersive1']['end'])) || (now > new Date(immersives['Immersive2']['start']) && now < new Date(immersives['Immersive2']['end']))) {
    return true
  }
  return false
});
const time = ref<Date>(new Date()); // Current date

const customSchedule = ref<ScheduleType>({
  A: 'A',
  B: 'B',
  C: 'C',
  D: 'D',
  E: 'E',
  F: 'F'
})
const tempSchedule = ref<ScheduleType>(customSchedule.value) // Temporary schedule for unsaved changes
const customImmersiveName = ref<string>('Immersive')
const tempCustomImmersiveName = ref<string>('Immersive')

const colorGuide = ref<StringString>({
  A: 'red-4',
  B: 'pink-4',
  C: 'purple-4',
  D: 'blue-4',
  E: 'green-4',
  F: 'yellow-4',
  'Morning Meeting': 'teal-4',
  'Group Advisory/1-on-1s': 'indigo-4',
  'Tutorial': 'orange-4',
  'Lunch': 'brown-4',
  'Immersive Morning': 'blue-4',
  'Immersive Afternoon': 'blue-4',
  'Break': 'green-4'
})

const lunchModal = ref<boolean>(false); // Lunch menu modal state
const toolsModal = ref<boolean>(false); // Tools modal state
const welcomeModal = ref<boolean>(true); // Welcome message modal state
const scheduleModal = ref<boolean>(false); // Custom schedule modal state
const styleModal = ref<boolean>(false); // Style modal state
const styleTab = ref<string>('colors'); // Style tab
const styleSplitter = ref<number>(25); // Style splitter
const activityModal = ref<boolean>(false); // Activity Modal State
const weekModal  = ref<boolean>(false); // Weekly schedule modal state
const linksModal = ref<boolean>(false); // Useful links modal state

const colorPalette = ref<StringString>({ // Basic color palette
  '#58a5dd': 'primary',
  '#f14e9d': 'secondary',
  '#48b646': 'positive',
  '#f34933': 'negative',
  '#f36e22': 'warning'
})

const tempBarColor = ref<string>('');
const barColor = ref<string>(colors.getPaletteColor('primary'));

const tempButtonColors = ref<StringString>({});
const buttonColors = ref<StringString>({
      'Links': '',
      'Menu': '',
      'Schedule': '',
      'Styles': '',
      'Weekly': ''
    }
);

const colorBeingChosen = ref<string>('Links')
const toggles = ref({ // Toggles for top bar
  'Clock': true,
  'Date': true,
  'Time Left': true,
  'Special Schedule Indicator': true
})
const tempToggles = ref(toggles.value);
const tempDetailedTime = ref<boolean>(false);
const detailedTime = ref<boolean>(false);
const tempDarkMode = ref<boolean>(false)

// Useful Links
const usefulLinks = {
  'Bay Site': {'link': 'https://www.bayschoolsf.org/', 'image': 'images\\bay_site.jpg'},
  'Canvas': {'link': 'https://bayschoolsf.instructure.com/', 'image': 'images\\canvas.jpg'},
  'My Bay': {'link': 'https://bayschoolsf.myschoolapp.com/', 'image': 'images\\my_bay.jpg'},
  'Announcment Digest': {'link': 'https://docs.google.com/document/d/1c5YzT06GTn5CdX_7X7jZ2Ghhd5pK1aHhRRbOY78cr2M/', 'image': 'images\\announcements.jpg'},
  'Bay Map': {'link': 'https://www.google.com/maps/d/edit?mid=1tBNv0IhwXTfDMeIaAX3SkCWVZGjSq5w', 'image': 'images\\bay_map.jpg'},
  'Bay Riptide': {'link': 'https://sites.google.com/bayschoolsf.org/the-bay-riptide/', 'image': 'images\\riptide.jpg'}
}
// Tools
const toolLinks = {
  'Homework Timers': {'link': '/#/timer', 'image': 'images\\timers.jpg'}
}
const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

function bugReport() {
  $q.dialog({
    title: 'Found a bug or have a suggestion?',
    message: 'Email: lchang24@bayschoolsf.org'
  })
}

// Return the current day's schedule
const scheduleDictionary = computed<OtherScheduleType>(function() {
  let now = time.value;
  let unparsedDaySchedule = {}

  if (holiday.value.length > 0) {
    return {}
  } else if (now.getDay() == 0 || now.getDay() == 6) {
    return {}
  } else if (special_schedule.value) {
    for (const [date, schedule] of Object.entries(specialSchedules)) {
      let date_object = new Date(date);
      if (date_object.getFullYear() == now.getFullYear() && date_object.getMonth() == now.getMonth() && now.getDate() == date_object.getDate()) {
        unparsedDaySchedule = schedule
      }
    }
  } else if ((now > new Date(immersives['Immersive1']['start']) && now < new Date(immersives['Immersive1']['end'])) || (now > new Date(immersives['Immersive2']['start']) && now < new Date(immersives['Immersive2']['end']))) {
    unparsedDaySchedule = immersives['Schedule']
  } else {
    unparsedDaySchedule = schedule[now.getDay()]
    var activity_start = activitySchedule.value[dayNames[now.getDay() - 1]]['start']
    var activity_end = activitySchedule.value[dayNames[now.getDay() - 1]]['end']
    unparsedDaySchedule['Activities + Sports/Drama'] = {
      'start': {'hour': Number(activity_start.split(':')[0]), 'minute': Number(activity_start.split(':')[1])},
      'end': {'hour': Number(activity_end.split(':')[0]), 'minute': Number(activity_end.split(':')[1])}
    }
  }

  return parseScheduleDict(unparsedDaySchedule);
});

// Returns color palette
const customColorPalette = computed(function() {
  let color_palette : StringString = {};
  for (let color of colorArray) {
    color_palette[colors.getPaletteColor(color)] = color;
  }
  return color_palette
})

// Get the current time in the format HH:MM:SS
const timeAsClock = computed(function() {
  let now = time.value;
  let hours = now.getHours();
  let minutes = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
  let seconds = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();
  let meridiem = 'AM';
  if (hours > 11) {
    if (hours != 12){
      hours -=12
    }
    meridiem = 'PM';
  }

  return `${hours}:${minutes}:${seconds}${meridiem}`;
});
// Get the current date
const timeAsDate = computed(function() {
  return time.value.toDateString();
});

// Get the current block
const currentBlock = computed(function() {
  if (holiday.value.length > 0) {
    return holiday.value
  }
  if (Object.keys(scheduleDictionary.value).length == 0) { // Weekend
    return 'Weekend';
  }
  let now = time.value;
  if (scheduleDictionary.value[Object.keys(scheduleDictionary.value)[0]]['start'] > now) { // start time of first block
    return 'Before School';
  } else if (scheduleDictionary.value[Object.keys(scheduleDictionary.value)[Object.keys(scheduleDictionary.value).length - 1]]['end'] < now) { // end time of last block
    return 'School is over'
  }
  for (const start_end of Object.values(scheduleDictionary.value)) {
    if (now >= start_end['start'] && now <= start_end['end']) {
      // Return time left in block
      let time_left= start_end['end'].getTime() - now.getTime()
      if (detailedTime.value) {
        let hours = Math.floor(time_left/3600000) == 0 ? '' : Math.floor(time_left/3600000) + ':'
        let minutes = Math.floor(time_left%3600000/60000) < 10 ? '0' + Math.floor(time_left%3600000/60000) : Math.floor(time_left%3600000/60000)
        let seconds = Math.floor(time_left%3600000%60000/1000) + 1 < 10 ? '0' + (Math.floor(time_left%3600000%60000/1000) + 1) : Math.floor(time_left%3600000%60000/1000) + 1
        return `${hours}${minutes}:${seconds} left`
      } else {
        let minutes = Math.floor(time_left / 60000) + 1;
        return `${minutes} minutes left`;
      }
    }
  }
  return 'Passing';
});

// Return input in HH:MM format
function formatTime(date: Date): string {
  let hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  return `${hour}:${minute}`;
}

// Return value between 0 and 1 as progress for given block
function getProgress(block: string): number {
  const now = time.value;
  var start = scheduleDictionary.value[block]['start'];
  var end = scheduleDictionary.value[block]['end'];
  if (now < start) {
    return 0
  } else if (now > end) {
    console.log(end)
    return 1
  } else {
    return (now.getTime() - start.getTime()) / (end.getTime() - start.getTime());
  }
}

// Return custom name of block if available
function getCustomName(block: string) : string {
  if (immersive.value) {
    if (block.includes('Morning')) {
      return customImmersiveName.value + ' Morning'
    } else if (block.includes('Afternoon')) {
      return customImmersiveName.value + ' Afternoon'
    }
  }
  return customSchedule.value[block] || block;
}

function getColorCode(color: string): string {
  if (Object.keys(colorPalette.value).includes(color)) {
    return colorPalette.value[color];
  } else {
    return customColorPalette.value[color];
  }
}

// Get schedule given day
function getDaySchedule(day_input : number) : OtherScheduleType {
  let now = new Date(time.value.getTime());
  var day = now.getDay(),
      diff = now.getDate() - day + (day == 0 ? -6:day_input);
  now.setDate(diff)

  let unparsedDaySchedule = {}
  let done = false;

  for (const start_end of Object.values(holidays)) {
    if (now >= new Date(start_end['start']) && now < new Date(start_end['end'])) {
      unparsedDaySchedule = {
        'Break': {
            'start': {'hour': 0, 'minute': 0},
            'end': {'hour': 23, 'minute': 59}
        }
      }
      done = true
    }
  }

  for (const [date, schedule] of Object.entries(specialSchedules)) {
    let date_object = new Date(date);
    if (date_object.getFullYear() == now.getFullYear() && date_object.getMonth() == now.getMonth() && now.getDate() == date_object.getDate()) {
      unparsedDaySchedule = schedule
      done = true
    }
  }
  if (!done) {
    if ((now > new Date(immersives['Immersive1']['start']) && now < new Date(immersives['Immersive1']['end'])) || (now > new Date(immersives['Immersive2']['start']) && now < new Date(immersives['Immersive2']['end']))) {
      unparsedDaySchedule = immersives['Schedule']
    } else {
      unparsedDaySchedule = schedule[time.value.getDay()];
    }
  }

  return parseScheduleDict(unparsedDaySchedule);
};

function parseScheduleDict(dict) {
  let now = time.value
  let parsedDaySchedule = {}
  for (const [block, start_end] of Object.entries(dict)) {;
    parsedDaySchedule[block] = {
      start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), start_end['start']['hour'], start_end['start']['minute']),
      end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), start_end['end']['hour'], start_end['end']['minute'])
    };
  }
  return parsedDaySchedule
}

// Create a copy schedule to preserve original
watch(scheduleModal, function(val) {
  if (val) {
    tempSchedule.value = {
      'A': customSchedule.value['A'],
      'B': customSchedule.value['B'],
      'C': customSchedule.value['C'],
      'D': customSchedule.value['D'],
      'E': customSchedule.value['E'],
      'F': customSchedule.value['F']
    }
    tempCustomImmersiveName.value = customImmersiveName.value
    tempActivitySchedule.value = JSON.parse(JSON.stringify(activitySchedule.value))
  }
})

// Set the custom schedule
function setSchedule() {
  $q.localStorage.set('custom_blocks', tempSchedule.value)
  customSchedule.value = tempSchedule.value
  $q.localStorage.set('custom_immersive_name', tempCustomImmersiveName.value)
  customImmersiveName.value = tempCustomImmersiveName.value
  $q.localStorage.set('custom_activity_schedule', tempActivitySchedule.value)
  activitySchedule.value = tempActivitySchedule.value
  scheduleModal.value = false;
}

// Reset the schedule
function resetSchedule() {
  $q.dialog({
    title: 'Confirm',
    message: 'Are you sure you want to reset all settings to their defaults?',
    cancel: true
  }).onOk(() => {
    tempSchedule.value = {
      'A': 'A',
      'B': 'B',
      'C': 'C',
      'D': 'D',
      'E': 'E',
      'F': 'F',
    }
    tempCustomImmersiveName.value = 'Immersive'
    tempActivitySchedule.value = {
      'Mon': {
        'start': '15:45',
        'end': '17:00'
      },
      'Tue': {
        'start': '15:45',
        'end': '17:00'
      },
      'Wed': {
        'start': '15:45',
        'end': '17:00'
      },
      'Thu': {
        'start': '15:00',
        'end': '16:30'
      },
      'Fri': {
        'start': '14:35',
        'end': '16:00'
      }
    }
  })
}

function scheduleShake() {
  if (_.isEqual(tempSchedule.value, customSchedule.value) && _.isEqual(tempCustomImmersiveName.value, customImmersiveName.value) && _.isEqual(tempActivitySchedule.value, activitySchedule.value)) {
    scheduleModal.value = false;
  } else {
    $q.notify({
      message: 'You have unsaved changes!',
      color: 'negative',
      position: 'bottom-right',
      icon: 'close',
      timeout: 1000,
      group: false
    })
  }
}

watch(styleModal, function(val) {
  if (val) {
    tempBarColor.value = barColor.value
    tempButtonColors.value = {
      'Links': buttonColors.value['Links'],
      'Menu': buttonColors.value['Menu'],
      'Schedule': buttonColors.value['Schedule'],
      'Styles': buttonColors.value['Styles'],
      'Weekly': buttonColors.value['Weekly']
    }
  }
  tempToggles.value = {
    'Clock': toggles.value['Clock'],
    'Date': toggles.value['Date'],
    'Time Left': toggles.value['Time Left'],
    'Special Schedule Indicator': toggles.value['Special Schedule Indicator']
  }
  tempDetailedTime.value = detailedTime.value
  tempDarkMode.value = darkMode.value
})

function setStyles() {
  $q.localStorage.set('bar_color', tempBarColor.value)
  $q.localStorage.set('button_colors', tempButtonColors.value)
  $q.localStorage.set('toggles', tempToggles.value)
  $q.localStorage.set('detailed_time', tempDetailedTime.value)
  $q.localStorage.set('dark_mode', tempDarkMode.value)
  barColor.value = tempBarColor.value
  buttonColors.value = tempButtonColors.value
  toggles.value = tempToggles.value
  detailedTime.value = tempDetailedTime.value
  darkMode.value = tempDarkMode.value
  $q.dark.set(darkMode.value)
  styleModal.value = false
}

function resetStyles() {
  $q.dialog({
    title: 'Confirm',
    message: 'Are you sure you want to reset all settings to their defaults?',
    cancel: true
  }).onOk(() => {
    tempBarColor.value = colors.getPaletteColor('primary');
    tempButtonColors.value = {
      'Links': '',
      'Menu': '',
      'Schedule': '',
      'Styles': '',
      'Weekly': ''
    }
    tempToggles.value = {
      'Clock': true,
      'Date': true,
      'Time Left': true,
      'Special Schedule Indicator': true
    }
    tempDetailedTime.value = false
    tempDarkMode.value = false
    $q.dark.set(false)
  })
}

function stylesShake() {
  if (_.isEqual(tempBarColor.value, barColor.value) && _.isEqual(tempButtonColors.value, buttonColors.value) && _.isEqual(tempToggles.value, toggles.value) && _.isEqual(tempDetailedTime.value, detailedTime.value) && tempDarkMode.value == darkMode.value) {
    styleModal.value = false;
  } else {
    $q.notify({
      message: 'You have unsaved changes!',
      color: 'negative',
      position: 'bottom-right',
      icon: 'close',
      timeout: 1000,
      group: false
    })
  }
}

// load local storage
onMounted(() => {
  if ($q.localStorage.getItem('custom_blocks')) {
    customSchedule.value = $q.localStorage.getItem('custom_blocks')
  }
  if ($q.localStorage.getItem('bar_color')) {
    barColor.value = $q.localStorage.getItem('bar_color')
  }
  if ($q.localStorage.getItem('button_colors')) {
    buttonColors.value = $q.localStorage.getItem('button_colors')
  }
  if ($q.localStorage.getItem('toggles')) {
    toggles.value = $q.localStorage.getItem('toggles')
  }
  if ($q.localStorage.getItem('detailed_time')) {
    detailedTime.value = $q.localStorage.getItem('detailed_time')
  }
  if ($q.localStorage.getItem('dark_mode')) {
    darkMode.value = $q.localStorage.getItem('dark_mode')
    $q.dark.set(darkMode.value)
  }
  if ($q.localStorage.getItem('custom_immersive_name')) {
    customImmersiveName.value = $q.localStorage.getItem('custom_immersive_name')
  }
  if ($q.localStorage.getItem('custom_activity_schedule')) {
    activitySchedule.value = $q.localStorage.getItem('custom_activity_schedule')
  }
})

// Update the time every second
setInterval(() => {
  time.value = new Date();
  document.title = currentBlock.value
}, 1000);
</script>
