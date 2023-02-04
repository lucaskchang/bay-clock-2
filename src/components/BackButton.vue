<template>
  <div class="fixed-bottom-left q-ma-md">
    <q-btn
      color="primary"
      label="Back to Bay Clock"
      icon="arrow_back"
      size="md"
      to="/"
      rounded
      no-caps
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BackButton",
});
</script>
