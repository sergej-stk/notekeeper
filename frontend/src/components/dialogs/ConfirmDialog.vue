<script setup lang="ts">
import { ref, defineExpose } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";

type Return = {
  accept: boolean;
};

const { mobile } = useDisplay();

const title = ref("");
const text = ref("");

const resolver = ref<(value: Return) => void>();

async function open(_title: string, _text: string): Promise<Return> {
  title.value = _title;
  text.value = _text;
  dialog.value = true;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return await new Promise<Return>((resolve, reject) => {
    resolver.value = resolve;
  });
}

function resolve(accept: boolean) {
  dialog.value = false;
  if (resolver.value === undefined) {
    return;
  }

  resolver.value({ accept });
}

const dialog = ref(false);

defineExpose<{ open: typeof open }>({ open });
</script>

<template>
  <v-dialog
    :class="{ 'w-50': !mobile, 'w-100 h-100': mobile }"
    v-model="dialog"
    persistent
  >
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>{{ text }}</v-card-text>
      <v-card-actions class="d-flex flex-row justify-space-between">
        <v-btn @click="resolve(true)">{{ $t("general.yes") }}</v-btn
        ><v-btn @click="resolve(false)">{{
          $t("general.no")
        }}</v-btn></v-card-actions
      >
    </v-card>
  </v-dialog>
</template>
