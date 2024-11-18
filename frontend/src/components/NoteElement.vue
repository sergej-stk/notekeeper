<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { Note } from "@/types";
import { computed, defineProps, ref } from "vue";
import ConfirmDialog from "./dialogs/ConfirmDialog.vue";
import { removeNote, updateNote } from "@/middleware/NotesManager";

const props = defineProps<{ note: Note }>();

const confirmDialog = ref<typeof ConfirmDialog | null>(null);

const editing = ref<boolean>(false);
const editValue = ref("");

async function performRemove() {
  if (confirmDialog.value === null) {
    return;
  }
  const result = await confirmDialog.value.open(
    "Note löschen",
    "Wollen Sie die Note löschen?"
  );
  if (result.accept) {
    removeNote(props.note.id);
  }
}

function performEdit() {
  editValue.value = props.note.text;
  editing.value = true;
}

function stopEditing() {
  // editRef.value.innerText = props.note.text;
  editing.value = false;
}

function performSave() {
  const newNote = { ...props.note };
  newNote.text = editValue.value;
  updateNote(newNote);
  stopEditing();
}

function performResetEditing() {
  editValue.value = props.note.text;
}

const hasChanges = computed(() => {
  return props.note.text !== editValue.value;
});
</script>
<template>
  <v-card class="mb-4">
    <v-card-title>
      <div class="d-flex flex-row justify-space-between">
        <div class="mb-2">Anaonym {{ $d(props.note.timestamp, "long") }}</div>
        <div class="d-flex flex-row">
          <v-icon icon="mdi-check-bold" v-if="editing" @click="performSave" />
          <v-icon icon="mdi-pencil" v-if="!editing" @click="performEdit" />
          <v-icon
            icon="mdi-close"
            v-if="editing && !hasChanges"
            @click="stopEditing"
          />
          <v-icon
            icon="mdi-reload"
            v-else-if="editing && hasChanges"
            @click="performResetEditing"
          />
          <v-icon icon="mdi-close" v-else @click="performRemove" />
        </div></div
    ></v-card-title>
    <v-card-text>
      <VuetifyViewer
        v-if="!editing"
        :value="props.note.text.replace(/\n/g, '<br />')"
        markdown-theme="github"
      />
      <VuetifyTiptap v-else v-model="editValue" markdown-theme="github" />
    </v-card-text>
  </v-card>
  <!-- <div
      ref="editRef"
      :contenteditable="editing"
      @keydown="handleKeydown"
      v-html="props.note.text.replace(/\n/g, '<br />')"
    ></div>-->

  <confirm-dialog ref="confirmDialog" />
</template>
<style lang="scss" scoped>
div {
  text-align: left;
}
div[contenteditable="true"] {
  outline: 1px solid black;
}
</style>
