<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { Note } from "@/types";
import { defineProps } from "vue";

const props = defineProps<{
  note: Note;
}>();
</script>
<template>
  <div style="display: flex; flex-flow: row">
    <div>{{ props.note.id }}</div>
    <div>{{ props.note.text }}</div>
    <div>{{ props.note.timestamp }}</div>
  </div>
</template>
<style lang="scss" scoped></style>
