<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { Note } from "@/types";
import { computed, defineProps, ref } from "vue";
import ConfirmDialog from "./dialogs/ConfirmDialog.vue";
import { removeNote, updateNote } from "@/middleware/NotesManager";

const props = defineProps<{ note: Note }>();

const confirmDialog = ref<typeof ConfirmDialog | null>(null);

const editRef = ref<HTMLElement | null>(null);
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

function handleKeydown() {
  setTimeout(() => {
    if (editRef.value === null) {
      return;
    }
    editValue.value = editRef.value.innerText;
  });
}

function performEdit() {
  if (editRef.value === null) {
    return;
  }
  editValue.value = editRef.value.innerText;
  editing.value = true;
}

function stopEditing() {
  if (editRef.value === null) {
    return;
  }

  editRef.value.innerText = props.note.text;
  editing.value = false;
}

function performSave() {
  if (editRef.value === null) {
    return;
  }

  const newNote = { ...props.note };
  newNote.text = editRef.value.innerText;
  updateNote(newNote);
  stopEditing();
}

function performResetEditing() {
  if (editRef.value === null) {
    return;
  }

  editRef.value.innerText = props.note.text;
}

const hasChanges = computed(() => {
  if (editRef.value === null) {
    return false;
  }

  return props.note.text !== editValue.value;
});
</script>
<template>
  <v-list-item class="mb-2">
    <v-list-item-title
      >Anaonym {{ $d(props.note.timestamp, "long") }}</v-list-item-title
    >
    <div class="d-flex flex-row justify-space-between">
      <div>{{ props.note.id }}</div>
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
      </div>
    </div>
    <div
      ref="editRef"
      :contenteditable="editing"
      @keydown="handleKeydown"
      v-html="props.note.text.replace(/\n/g, '<br />')"
    ></div>
  </v-list-item>
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
