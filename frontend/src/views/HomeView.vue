<script setup lang="ts">
import { loadAllNotes, addNote } from "@/middleware/NotesManager";
import { useMainStore } from "@/store/mainStore";
import { Note } from "@/types";
import { io } from "socket.io-client";
import { ref, onMounted, computed } from "vue";
import { VuetifyTiptap } from "vuetify-pro-tiptap";
import NoteElement from "@/components/NoteElement.vue";

const notes = ref<Note[]>([]);

const text = ref("");

const sendLoading = ref(false);

const mainStore = useMainStore();

onMounted(async () => {
  const socket = io("/notes", {
    secure: process.env.NODE_ENV === "development" ? false : true,
    extraHeaders: {
      Authorization: "Bearer:" + mainStore.token,
    },
  });

  socket.on("addNote", (note: Note) => {
    notes.value.push(note);
  });
  socket.on("removeNote", (id: number) => {
    notes.value = notes.value.filter((note) => note.id !== id);
  });
  socket.on("editNote", (note: Note) => {
    const foundNote = notes.value.find(
      (searchNote: Note) => searchNote.id === note.id
    );
    if (foundNote === undefined) {
      return;
    }
    foundNote.text = note.text;
    foundNote.timestamp = note.timestamp;
  });
  loadNotes();
});

async function loadNotes() {
  const allNotes = await loadAllNotes();
  if (allNotes === null) {
    return;
  }
  notes.value = allNotes;
}

async function performSave() {
  sendLoading.value = true;
  const note = await addNote({ text: text.value });
  text.value = "";
  setTimeout(() => {
    sendLoading.value = false;
  }, 1000);

  if (note === null) {
    return;
  }
}

const items = computed(() => {
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  const reversed = notes.value.slice().reverse();
  return reversed;
});

const hasChanges = computed(() => {
  return text.value !== "";
});
</script>

<template>
  <v-container>
    <v-layout row wrap align-center class="justify-center">
      <div class="w-75">
        <v-card justify="center" class="mb-3">
          <v-card-title class="text-left">Note erstellen</v-card-title>
          <v-card-text>
            <VuetifyTiptap v-model="text" markdown-theme="github" />
          </v-card-text>
          <v-card-actions
            ><v-btn @click="text = ''" :disabled="!hasChanges">Reset</v-btn>
            <v-btn
              @click="performSave"
              :disabled="!hasChanges"
              :loading="sendLoading"
              >Senden</v-btn
            ></v-card-actions
          >
        </v-card>
        <div class="d-flex flex-column">
          <NoteElement
            :note="note"
            v-for="note of items"
            :key="note.id"
            class="element"
          />
        </div>
      </div>
    </v-layout>
  </v-container>
</template>
