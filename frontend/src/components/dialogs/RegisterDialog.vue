<script setup lang="ts">
import { register } from "@/middleware/UserManager";
import { ref, defineExpose, computed } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";

type Return = {
  accept: boolean;
};

const { mobile } = useDisplay();

const username = ref("");
const fullName = ref("");
const password = ref("");

const loginError = ref(false);

const resolver = ref<(value: Return) => void>();

async function open(): Promise<Return> {
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

async function performLogin() {
  const success = register(username.value, password.value, fullName.value);

  if (!success) {
    loginError.value = true;
    return;
  }
  resolve(true);
}

const dialog = ref(false);

const canLogin = computed(() => {
  return username.value !== "" && password.value !== "";
});

defineExpose<{ open: typeof open }>({ open });
</script>

<template>
  <v-dialog
    :class="{ 'w-50': !mobile, 'w-100 h-100': mobile }"
    v-model="dialog"
    persistent
  >
    <v-card>
      <v-card-title>{{ $t("loginDialog.login") }}</v-card-title>
      <v-card-text>
        <p v-if="loginError">
          {{ $t("loginDialog.errorMessage") }}
        </p>
        <v-text-field
          type="username"
          v-model="username"
          :placeholder="$t('loginDialog.username')"
        />
        <v-text-field
          type="username"
          v-model="fullName"
          :placeholder="$t('loginDialog.fullName')"
        />
        <v-text-field
          type="password"
          v-model="password"
          :placeholder="$t('loginDialog.password')"
        />
      </v-card-text>
      <v-card-actions class="d-flex flex-row justify-space-between">
        <v-btn @click="resolve(false)">{{ $t("general.abort") }}</v-btn
        ><v-btn @click="performLogin" :disabled="!canLogin">{{
          $t("loginDialog.login")
        }}</v-btn></v-card-actions
      >
    </v-card>
  </v-dialog>
</template>
