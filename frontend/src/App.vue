<script setup lang="ts">
import { onMounted, ref } from "vue";
import NoteElement from "./components/NoteElement.vue";
import { Note } from "./types";
import { addNote, loadAllNotes } from "./middleware/NotesManager";
import { io } from "socket.io-client";

const notes = ref<Note[]>([]);

const text = ref("");

const dialog = ref(true);

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
  const note = await addNote({ text: text.value });
  if (note === null) {
    return;
  }
}
</script>

<template>
  <!--<nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />-->
  <div>
    <input type="text" v-model="text" />
    <input @click="performSave" type="submit" />
  </div>
  <br />
  <div v-for="note of notes" :key="note.id" class="element">
    <NoteElement :note="note" />
  </div>
  <v-dialog v-model="dialog">
    <v-card>
      <v-card-title>asd</v-card-title>
    </v-card>
  </v-dialog>
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
