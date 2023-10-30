<template>
  <div class="q-pa-md">
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
      :class="['q-my-xl', isMobile ? 'q-mx-xs' : 'q-mx-xl']"
    >
      <q-linear-progress
        :class="[darkMode ? 'bg-dark' : 'bg-grey-3']"
        size="25px"
        :color="colorPalette[barColor] || barColor"
        :value="getProgress(block)"
        style="border-radius: 50px"
      >
        <div
          :class="[
            'row',
            'justify-between',
            'text-subtitle1',
            'absolute-full',
            'text-' + getFontColor('bar'),
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
          :color="getButtonColor('Links')"
          label="Useful Links"
          @click="linksMenu = true"
          :text-color="getFontColor('buttons')"
          rounded
          no-caps
        />
        <q-btn
          class="q-ma-sm"
          :color="getButtonColor('Menu')"
          label="Lunch Menu"
          @click="lunchMenu = true"
          :text-color="getFontColor('buttons')"
          rounded
          no-caps
        />
        <q-btn
          class="q-ma-sm"
          :color="getButtonColor('Schedule')"
          label="Custom Schedule"
          @click="scheduleMenu = true"
          :text-color="getFontColor('buttons')"
          rounded
          no-caps
        />
        <q-btn
          class="q-ma-sm"
          :color="getButtonColor('Styles')"
          label="Customize"
          @click="styleMenu = true"
          :text-color="getFontColor('buttons')"
          rounded
          no-caps
        />
      </div>
      <div class="row">
        <q-btn
          class="q-ma-sm"
          :color="getButtonColor('Weekly')"
          label="Weekly Schedule"
          @click="weekMenu = true"
          :text-color="getFontColor('buttons')"
          rounded
          no-caps
        />
        <q-toggle
          v-if="holiday != ''"
          class="q-ma-sm"
          v-model="holidayBool"
          :label="holiday"
          :color="holidays[holiday]['color']"
        />
      </div>
    </div>

    <!-- lunch menu -->
    <q-dialog v-model="lunchMenu">
      <h1 style="color: white">I DON"T HAVE THE LUNCH MENU. PLEASE DON"T ASK ME FOR IT. I WILL UPDATE THIS AS SOON AS I GET IT.</h1>
    </q-dialog>

    <!-- custom schedule menu -->
    <q-dialog v-model="scheduleMenu" @shake="scheduleShake" persistent>
      <q-card style="width: 900px; max-width: 80vw">
        <q-card-section class="text-h5">
          Custom Schedule -
          {{ scheduleTab.charAt(0).toUpperCase() + scheduleTab.slice(1) }}</q-card-section
        >
        <q-card-section>
          <q-splitter v-model="menuSplitter" disable>
            <template #before>
              <q-tabs v-model="scheduleTab" vertical no-caps class="text-h6">
                <q-tab name="schedule" label="Schedule" />
                <q-tab name="activites" label="Activities" />
              </q-tabs>
            </template>

            <template #after>
              <q-tab-panels
                v-model="scheduleTab"
                animated
                vertical
                transition-prev="jump-up"
                transition-next="jump-up"
              >
                <q-tab-panel name="schedule" class="q-pt-none">
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
                </q-tab-panel>
                <q-tab-panel name="activites">
                  <q-input
                      label="Activity Name"
                      v-model="tempCustomActivityName"
                      class="q-mb-lg"
                      dense
                      rounded
                      outlined
                    />
                  <div class="row text-center q-ma-sm">
                    <div
                      v-for="day of dayNames.slice(1, 6)"
                      :key="day"
                      :class="[
                        tempActivityDays.includes(day) ? '' : 'no-pointer-events',
                        tempActivityDays.includes(day) ? '' : 'bg-grey',
                        'col',
                      ]"
                    >
                      <h6 class="q-my-sm">{{ day }}</h6>
                      <q-input
                        filled
                        v-model="tempActivitySchedule[day]['start']"
                        mask="time"
                        :rules="[(value) => isValidTime(value) || 'Not a valid time']"
                      >
                        <template #append>
                          <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-time v-model="tempActivitySchedule[day]['start']">
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
                      <p>to</p>
                      <q-input
                        filled
                        v-model="tempActivitySchedule[day]['end']"
                        mask="time"
                        :rules="[(value) => isValidTime(value) || 'Not a valid time']"
                      >
                        <template #append>
                          <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-time v-model="tempActivitySchedule[day]['end']">
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
                  </div>
                  <div>
                    <h6 class="q-mb-none">Toggle Days</h6>

                    <div class="row">
                      <q-toggle label="Monday" v-model="tempActivityDays" val="Mon" />
                      <q-toggle label="Tuesday" v-model="tempActivityDays" val="Tue" />
                      <q-toggle label="Wednesday" v-model="tempActivityDays" val="Wed" />
                      <q-toggle label="Thursday" v-model="tempActivityDays" val="Thu" />
                      <q-toggle label="Friday" v-model="tempActivityDays" val="Fri" />
                      <q-btn
                        color="red"
                        label="Disable All"
                        @click="tempActivityDays = []"
                        class="q-ma-sm"
                        no-caps
                      />
                    </div>
                  </div>
                </q-tab-panel>
              </q-tab-panels>
            </template>
          </q-splitter>
        </q-card-section>
        <div class="q-pa-lg">
          <q-btn label="Save" @click="setSchedule" color="primary" />
          <q-btn
            label="Reset"
            @click="resetSchedule"
            color="primary"
            flat
            class="q-ml-sm"
          />
          <q-btn
            label="Cancel"
            @click="scheduleMenu = false"
            color="negative"
            flat
            class="float-right"
          />
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
          <q-splitter v-model="menuSplitter" disable>
            <template #before>
              <q-tabs v-model="styleTab" vertical no-caps class="text-h6">
                <q-tab name="colors" label="Colors" />
                <q-tab name="toggles" label="Toggles" />
                <q-tab name="presets" label="Presets" />
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
                <q-tab-panel name="colors">
                  <h6 class="q-my-none">Progress Bar Color</h6>
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
                  <q-select
                    v-model="tempFontColors['bar']"
                    :options="['Auto', 'Dark', 'Light']"
                    label="Font Color"
                    style="max-width: 150px"
                  />
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
                  <q-select
                    v-model="tempFontColors['buttons']"
                    :options="['Auto', 'Dark', 'Light']"
                    label="Font Color"
                    style="max-width: 150px"
                  />
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
                <q-tab-panel name="presets">
                  <q-btn
                    v-for="(color, preset_name) of presets"
                    :color="color + '-2'"
                    text-color="black"
                    :key="preset_name"
                    class="shadow-1 rounded-borders q-pa-sm q-ma-sm"
                    @click="applyPreset(preset_name, color)"
                    no-caps
                  >
                    <p class="q-my-none q-mx-sm text-subtitle1">{{ preset_name }}</p>
                    <q-btn
                      :color="color + '-4'"
                      class="no-border-radius inherit-pointer"
                      push
                    />
                    <q-btn
                      :color="color + '-8'"
                      class="no-border-radius inherit-pointer"
                      push
                    />
                  </q-btn>
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
          <div v-for="day in dayNames.slice(1, 6)" :key="day" class="col">
            <div class="q-ma-sm text-center">
              <h4 class="q-my-none">{{ day }}</h4>
            </div>
            <div
              v-for="(start_end, block) of getDaySchedule(dayNames.indexOf(day))"
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

    <!-- code + changelog message -->
    <q-dialog v-model="codeMenu">
      <q-card style="width: 750px; max-width: 80vw">
        <q-card-section class="text-h4"> Changelog </q-card-section>
        <q-card-section class="text-body1">
          <p>
            Full Source Code:
            <a href="https://github.com/lukajaa/bay-clock-2"
              >https://github.com/lukajaa/bay-clock-2</a
            >
          </p>
          <div v-for="(info, version) of changelog" :key="version">
            <h5 class="q-my-sm">{{ version }} - {{ info["date"] }}</h5>
            <p v-for="change of info['changes']" :key="change" class="q-my-none">
              - {{ change }}
            </p>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- credits message -->
    <q-dialog v-model="creditsMenu">
      <q-card style="width: 500px; max-width: 90vw">
        <q-card-section class="text-h4"> Credits </q-card-section>
        <q-card-section class="text-body1">
          <p>Aidan Brown and Jude Swagel: Original idea and design</p>
          <p>
            Sean Kuwamoto, Tate Rowney, and Jaiden Grimminck: Making fun of my code so I
            remade it
          </p>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- footer -->
    <div
      v-if="toggles['Footer']"
      class="float-bottom text-subtitle1 text-center q-pt-xl q-mt-xl"
    >
      <p
        :class="[
          'q-ma-none',
          'q-mt-xl',
          'q-mp-xl',
          darkMode ? 'text-grey-4' : 'text-dark',
        ]"
      >
        Created by <a href="https://lucaskchang.com" target="_blank">Lucas Chang</a>
      </p>
      <p :class="['q-mt-sm', darkMode ? 'text-grey-4' : 'text-dark']">
        <a class="cursor-pointer" @click="codeMenu = true" target="_blank">Code</a>
        / <a class="cursor-pointer" @click="toolsMenu = true">Tools</a> /
        <a
          :class="['cursor-pointer', darkMode ? 'text-grey-4' : 'text-dark']"
          href="https://forms.gle/tRtEr65ubHiMVZN36"
          target="_blank"
          style="text-decoration: none"
          >Feedback</a
        >
        /
        <a class="cursor-pointer" @click="creditsMenu = true">Credits</a>
      </p>
    </div>

    <!-- holiday floating icons -->
    <div v-if="holiday != '' && holidayBool" class="aboslute-center">
      <img
        v-for="index in isMobile ? 15 : 50"
        :key="index"
        class="holiday-icon"
        :src="'images/icons/' + icons[index]"
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
import presets_json from "../data/guides/presets.json";
import changelog_json from "../data/changelog.json";
// schedules
const immersives: ImmersiveScheduleType = immersives_json;
const schedule: ScheduleJsonType = schedule_json;
const activities: SimpleScheduleType = activities_schedule;
const specialSchedules: ScheduleJsonType = special_schedules;
const breaks: SimpleScheduleType = breaks_json;
// guides
const colorGuide: StringString = color_guide;
const colorPalette: StringString = color_palette;
const holidays: HolidayType = holidays_json;
const usefulLinks: LinksType = useful_links;
const toolLinks: LinksType = tool_links;
const presets: StringString = presets_json;
const changelog: ChangelogType = changelog_json;

// VARS
const $q = useQuasar(); // quasar instance
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const isMobile = $q.platform.is.mobile;

// REFS
const time = ref<Date>(new Date()); // current time
const holidayBool = ref<boolean>(false); // holiday preference

// menu states
const lunchMenu = ref<boolean>(false);
const toolsMenu = ref<boolean>(false);
const scheduleMenu = ref<boolean>(false);
const styleMenu = ref<boolean>(false);
const styleTab = ref<string>("colors");
const scheduleTab = ref<string>("schedule");
const menuSplitter = ref<number>(25);
const weekMenu = ref<boolean>(false);
const linksMenu = ref<boolean>(false);
const creditsMenu = ref<boolean>(false);
const codeMenu = ref<boolean>(false);

// custom schedule menu values and temp values
const activitySchedule = ref<ActivitySchedule>(activities);
const tempActivitySchedule = ref<ActivitySchedule>({});
const activityDays = ref<Array<string>>([...dayNames]);
const tempActivityDays = ref<Array<string>>([]);
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
const customActivityName = ref<string>("Activities + Sports/Drama");
const tempCustomActivityName = ref<string>("");

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
const fontColors = ref<StringString>({
  bar: "Auto",
  buttons: "Auto",
});
const tempFontColors = ref<StringString>({});
const toggles = ref<ToggleDict>({
  Clock: true,
  Date: true,
  "Time Left": true,
  "Special Schedule Indicator": true,
  Footer: true,
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
    unparsedDaySchedule = appendActivities(
      Object.values(schedule)[now.getDay()],
      now.getDay()
    );
  }

  return parseScheduleDict(unparsedDaySchedule);
});

// computes the current time in HH:MM:SS format
const timeAsClock = computed<string>(function () {
  var now = time.value;
  var hours = now.getHours();
  var minutes = pad(now.getMinutes());
  var seconds = pad(now.getSeconds());
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
        let minutes = pad(Math.floor((time_left % 3600000) / 60000));
        let seconds = pad(Math.floor(((time_left % 3600000) % 60000) / 1000));
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

// returns schedule with activities appended
function appendActivities(
  schedule: UnparsedScheduleType,
  day: number
): UnparsedScheduleType {
  if (activityDays.value.includes(dayNames[day])) {
    var activity_start = activitySchedule.value[dayNames[day]]["start"];
    var activity_end = activitySchedule.value[dayNames[day]]["end"];
    schedule["Activities + Sports/Drama"] = {
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
  return schedule;
}

// returns date in HH:MM format
function formatTime(date: Date): string {
  var hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  var minute = pad(date.getMinutes());
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
  if (block == "Activities + Sports/Drama") {
    return customActivityName.value;
  }
  return customSchedule.value[block] || block;
}

// return color for given button
function getButtonColor(button: string) {
  if (Object.keys(colorPalette).includes(buttonColors.value[button])) {
    return colorPalette[buttonColors.value[button]];
  } else if (buttonColors.value[button] != "") {
    return buttonColors.value[button];
  } else {
    return;
  }
}

// returns correct color for component
function getFontColor(component: string) {
  if (fontColors.value[component] == "Auto") {
    if (component == "bar") {
      return darkMode.value ? "grey-4" : "dark";
    }
  } else if (fontColors.value[component] == "Dark") {
    return "dark";
  } else {
    return "grey-4";
  }
}

// returns the schedule of a day given the day
function getDaySchedule(day_input: number): ParsedScheduleType {
  var now = new Date(time.value.getTime());
  var day = now.getDay(),
    diff = now.getDate() - day + day_input;
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
      unparsedDaySchedule = appendActivities(
        Object.values(schedule)[now.getDay()],
        now.getDay()
      );
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

// checks whether a user inputted HH:MM is valid
function isValidTime(time: string) {
  var hours = time.split(":")[0];
  var minutes = time.split(":")[1];
  if (Number(hours) > 23 || Number(minutes) > 59) {
    return false;
  }
  if (hours.length < 1 || minutes.length < 2) {
    return false;
  }
  return true;
}

// returns padded number
function pad(number: number) {
  return number < 10 ? "0" + number : number;
}

// sets the custom schedule
function setSchedule() {
  var valid = true;
  for (const start_end of Object.values(tempActivitySchedule.value)) {
    if (!isValidTime(start_end["start"]) || !isValidTime(start_end["end"])) {
      valid = false;
      break;
    }
  }
  if (!valid) {
    $q.notify({
      message: "You have inputted invalid times!",
      color: "negative",
      position: "bottom-right",
      icon: "close",
      timeout: 1000,
      group: false,
    });
    return;
  }
  $q.localStorage.set("custom_blocks", tempSchedule.value);
  customSchedule.value = tempSchedule.value;
  $q.localStorage.set("custom_immersive_name", tempCustomImmersiveName.value);
  customImmersiveName.value = tempCustomImmersiveName.value;
  $q.localStorage.set("custom_activity_schedule", tempActivitySchedule.value);
  activitySchedule.value = tempActivitySchedule.value;
  $q.localStorage.set("active_activity_days", tempActivityDays.value);
  activityDays.value = tempActivityDays.value;
  $q.localStorage.set("custom_activity_name", tempCustomActivityName.value);
  customActivityName.value = tempCustomActivityName.value;
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
    tempActivityDays.value = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    tempCustomActivityName.value = "Activities + Sports/Drama";
    setSchedule();
  });
}

// prevents closing custom schedule menu with unsaved changes
function scheduleShake() {
  if (
    _.isEqual(tempSchedule.value, customSchedule.value) &&
    _.isEqual(tempCustomImmersiveName.value, customImmersiveName.value) &&
    _.isEqual(tempActivitySchedule.value, activitySchedule.value) &&
    _.isEqual(tempActivityDays.value, activityDays.value)&&
    _.isEqual(tempCustomActivityName.value, customActivityName.value)
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
  $q.localStorage.set("font_colors", tempFontColors.value);
  barColor.value = tempBarColor.value;
  buttonColors.value = tempButtonColors.value;
  toggles.value = tempToggles.value;
  detailedTime.value = tempDetailedTime.value;
  darkMode.value = tempDarkMode.value;
  fontColors.value = tempFontColors.value;
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
      Footer: true,
    };
    tempFontColors.value = {
      bar: "Auto",
      buttons: "Auto",
    };
    tempDetailedTime.value = false;
    tempDarkMode.value = false;
    setStyles();
  });
}

// prevents closing custom styles menu with unsaved changes
function stylesShake() {
  if (
    _.isEqual(tempBarColor.value, barColor.value) &&
    _.isEqual(tempButtonColors.value, buttonColors.value) &&
    _.isEqual(tempToggles.value, toggles.value) &&
    _.isEqual(tempDetailedTime.value, detailedTime.value) &&
    _.isEqual(tempFontColors.value, fontColors.value) &&
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

function applyPreset(preset_name: string, color: string) {
  $q.dialog({
    title: "Confirm",
    message: "Are you sure you want to apply the " + preset_name + " preset?",
    cancel: true,
  }).onOk(() => {
    tempBarColor.value = color + "-4";
    tempButtonColors.value = {
      Links: color + "-8",
      Menu: color + "-8",
      Schedule: color + "-8",
      Styles: color + "-8",
      Weekly: color + "-8",
    };
    setStyles();
  });
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
    tempActivityDays.value = [...activityDays.value];
    tempCustomActivityName.value = customActivityName.value;
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
    Footer: toggles.value["Footer"],
  };
  tempFontColors.value = {
    bar: fontColors.value["bar"],
    buttons: fontColors.value["buttons"],
  };
  tempDetailedTime.value = detailedTime.value;
  tempDarkMode.value = darkMode.value;
});

// saves holiday icon preferenecs to local storage when changed
watch(holidayBool, (state: boolean) => {
  $q.localStorage.set("holiday_bool", state);
});

// load local storage once mounted
// HOLIDAY STUFF
const icons = []
for (let i = 0; i < 51; i++) {
  icons.push(holidays[holiday.value]["icons"][Math.floor(Math.random() * holidays[holiday.value]["icons"].length)])
}
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
  var check_font_colors = <StringString>$q.localStorage.getItem("font_colors");
  if (check_font_colors) {
    fontColors.value = check_font_colors;
  }
  var check_activity_days = <string[]>$q.localStorage.getItem("active_activity_days");
  if (check_activity_days) {
    activityDays.value = check_activity_days;
  }
  var check_custom_activity_name = <string>$q.localStorage.getItem("custom_activity_name");
  if (check_custom_activity_name) {
    customActivityName.value = check_custom_activity_name;
  }
});

// update time and title every second
setInterval(() => {
  time.value = new Date();
  document.title = currentBlock.value;
}, 1000);
</script>
