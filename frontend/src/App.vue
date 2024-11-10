<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import NoteElement from "./components/NoteElement.vue";
import { Note } from "./types";
import { addNote, loadAllNotes } from "./middleware/NotesManager";
import { io } from "socket.io-client";
import { useTheme } from "vuetify";

const theme = useTheme();

const notes = ref<Note[]>([]);

const text = ref("");

const sendLoading = ref(false);

onMounted(async () => {
  const socket = io("ws://localhost:8086/notes");

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
  const allNotes = await loadAllNotes();
  if (allNotes === null) {
    return;
  }
  notes.value = allNotes;
});

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

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}

const hasChanges = computed(() => {
  return text.value !== "";
});
</script>

<template>
  <!--<nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />-->
  <v-app>
    <v-app-bar :elevation="2">
      <v-app-bar-title>Application Bar</v-app-bar-title>
      <template v-slot:append>
        <v-btn icon="mdi-theme-light-dark" @click="toggleTheme"></v-btn>
        <v-btn icon="mdi-account">
          <v-icon icon="mdi-account"></v-icon>
          <v-menu activator="parent">
            <v-list>
              <v-list-item>{{ $t("general.login") }}</v-list-item>
              <v-list-item>{{ $t("general.logout") }}</v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-layout row wrap align-center class="justify-center">
          <div class="w-75">
            <v-card justify="center" class="mb-3">
              <v-card-title class="text-left">Note erstellen</v-card-title>
              <v-card-text>
                <v-textarea v-model="text"></v-textarea>
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

            <div v-for="note of notes" :key="note.id" class="element">
              <NoteElement :note="note" />
            </div>
          </div>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.element {
  border: 1px solid black;
  margin-bottom: 5px;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
