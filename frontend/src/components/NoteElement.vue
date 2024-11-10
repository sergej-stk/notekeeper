<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { Note } from "@/types";
import { defineProps } from "vue";

const props = defineProps<{ note: Note }>();
</script>
<template>
  <div>
    <div class="d-flex flex-row justify-space-between">
      <div>{{ props.note.id }}</div>
      <div class="d-flex flex-row">
        <v-icon icon="mdi-pencil" />
        <v-icon icon="mdi-close" />
      </div>
    </div>
    <div>{{ props.note.text }}</div>
    <div>{{ props.note.timestamp }}</div>
  </div>
</template>
<style lang="scss" scoped>
div {
  text-align: left;
}
</style>
