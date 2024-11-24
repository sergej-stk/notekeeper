<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import NoteElement from "./components/NoteElement.vue";
import { Note } from "./types";
import { addNote, loadAllNotes } from "./middleware/NotesManager";
import { io } from "socket.io-client";
import { useMainStore } from "./store/mainStore";
import AuthView from "./views/AuthView.vue";
import { VuetifyTiptap } from "vuetify-pro-tiptap";
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

function toggleTheme() {
  mainStore.theme = mainStore.theme === "dark" ? "light" : "dark";
}

const hasChanges = computed(() => {
  return text.value !== "";
});

function logout() {
  mainStore.token = null;
  mainStore.user = null;
}

const items = computed(() => {
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  const reversed = notes.value.slice().reverse();
  return reversed;
});

const isLoggedIn = computed(() => {
  return mainStore.token !== null && mainStore.user !== null;
});

watch(isLoggedIn, () => {
  if (isLoggedIn.value) {
    loadNotes();
  }
});
</script>

<template>
  <v-app :theme="mainStore.theme">
    <v-app-bar :elevation="2">
      <v-app-bar-title>Application Bar</v-app-bar-title>
      <template v-slot:append v-if="isLoggedIn">
        <v-btn icon="mdi-theme-light-dark" @click="toggleTheme"></v-btn>
        <v-btn icon="mdi-account">
          <v-icon icon="mdi-account"></v-icon>
          <v-menu activator="parent">
            <v-list>
              <v-list-item @click="logout">{{
                $t("general.logout")
              }}</v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <v-container v-if="isLoggedIn">
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
      <v-container class="fill-height" fluid v-else> <AuthView /> </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss">
#app {
  //font-family: Avenir, Helvetica, Arial, sans-serif;
  //-webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  //color: #2c3e50;
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
