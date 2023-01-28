<template>
<div class="window-height	row items-center text-center full-height full-width bg-blue">
  <div class="col items-center">
    <div v-if="tab == 'pomodoro'" class="column justify-center items-center">
      <q-input v-if="pomodoro_state == 'work' || pomodoro_state == 'none'" v-model="course" placeholder="I'm working on..." label-color="white" color="white" input-class="text-h3 text-white text-center" hide-bottom-space borderless />
      <h3 v-else class="q-my-none text-white">Break</h3>
      <h1 class="text-white q-my-md">{{ pomodoro_timer }}</h1>
      <q-btn v-if="pomodoro_state == 'none'" label="start" text-color="blue" color="white" class="q-mb-md" @click="start_pomodoro"/>
    </div>
    <div v-else class="column justify-center items-center">
      <q-input v-model="course" placeholder="I'm working on..." label-color="white" color="white" input-class="text-h3 text-white text-center" hide-bottom-space borderless />
      <div v-if="custom_timer_state == 'off'">
        <h1 class="text-white q-my-md">{{ custom_timer }} minutes</h1>
        <q-slider v-model="custom_timer" :min="0" :max="60"/>
        <q-btn label="start" text-color="blue" color="white" class="q-mb-md" @click="start_custom_timer"/>
      </div>
      <h1 v-else class="text-white q-my-md">{{ custom_timer_text }}</h1>
    </div>
    <q-tabs
      v-if="pomodoro_state == 'none' && custom_timer_state == 'off'"
      v-model="tab"
      class="text-white"
    >
      <q-tab name="pomodoro" icon="timelapse" label="Pomodoro" />
      <q-tab name="custom" icon="timer" label="Custom" />
    </q-tabs>
  </div>

  <div v-if="pomodoro_state == 'none' && custom_timer_state == 'off'" class="fixed-bottom text-white q-pa-md">
    <a @click="creditsModal = true">Credits</a> / <a href="/#/">Back to Bay Clock</a>
  </div>

  <q-dialog v-model="creditsModal">
    <q-card style="width: 965px; max-width: 80vw;">
      <q-card-section class="text-h5">
        Credits
      </q-card-section>
      <q-card-section>
        <p>The original idea for homework timers on Bay Clock was part of Ella Yacubian's creative process project.</p>
        <p> The Pomodoro Technique was developed by Francesco Cirillo. It functions in 30 minute blocks with 25 minutes allotted for work and 5 minutes for a break. Learn more <a href="https://todoist.com/productivity-methods/pomodoro-technique">here</a>.</p>
      </q-card-section>
    </q-card>
  </q-dialog>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tab = ref<string>('pomodoro');
const pomodoro_timer = ref<string>('25:00');
const pomodoro_state = ref<string>('none');
const custom_timer_text = ref<string>('');
const custom_timer = ref<number>(25);
const custom_timer_state = ref<string>('off');
const course = ref<string>('');
const time_left = ref<number>(0);

const creditsModal = ref<boolean>(false);

function start_pomodoro() {
  pomodoro_state.value = 'work';
  time_left.value = 1500
  setInterval(() => {
    time_left.value -= 1
    pomodoro_timer.value = Math.floor(time_left.value/60).toString() + ':' + (Math.floor(time_left.value%60) < 10 ? '0' + Math.floor(time_left.value%60) : Math.floor(time_left.value%60)).toString()
    if (time_left.value <= 0) {
      if (pomodoro_state.value == 'work') {
        time_left.value = 300
        pomodoro_timer.value = '5:00'
        pomodoro_state.value = 'break'
      } else {
        time_left.value = 1500
        pomodoro_timer.value = '25:00'
        pomodoro_state.value = 'work'
      }
    }
  }, 1000);
}

function start_custom_timer() {
  custom_timer_text.value = custom_timer.value.toString() + ':00'
  custom_timer_state.value = 'on';
  time_left.value = custom_timer.value * 60
  let timer = setInterval(() => {
    time_left.value -= 1
    custom_timer_text.value = Math.floor(time_left.value/60).toString() + ':' + (Math.floor(time_left.value%60) < 10 ? '0' + Math.floor(time_left.value%60) : Math.floor(time_left.value%60)).toString()
    if (time_left.value <= 0) {
      custom_timer_state.value = 'off'
      clearInterval(timer)
    }
  }, 1000);
}
</script>
