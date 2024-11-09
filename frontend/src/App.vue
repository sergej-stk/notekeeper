<script setup lang="ts">
import { onMounted, ref } from "vue";
import NoteElement from "./components/NoteElement.vue";
import { Note } from "./types";
import { addNote, loadAllNotes } from "./middleware/NotesManager";

const notes = ref<Note[]>([]);

const text = ref("");

onMounted(async () => {
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
  notes.value.push(note);
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
