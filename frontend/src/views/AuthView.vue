<script setup lang="ts">
import { login, register } from "@/middleware/UserManager";
import { useMainStore } from "@/store/mainStore";
import { isEmail } from "@/validators/validators";
import { ref } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";

const { mobile } = useDisplay();
const registerMode = ref(false);

const mainStore = useMainStore();

const error = ref(false);
const username = ref("");
const password = ref("");
const fullName = ref("");

function setRegisterMode(value: boolean) {
  registerMode.value = value;
}

async function performLogin() {
  const success = await login(username.value, password.value);

  if (success === null) {
    error.value = true;
    return;
  }

  mainStore.setToken(success);
}

async function performRegister() {
  const success = await register(
    username.value,
    password.value,
    fullName.value
  );
  error.value = false;

  if (!success) {
    error.value = true;
    return;
  }
  registerMode.value = false;
}
</script>
<template>
  <v-row align="center" justify="center">
    <v-col class="d-flex justify-center">
      <v-card :class="{ 'w-50': !mobile, 'w-100 h-100': mobile }">
        <v-card-title v-if="registerMode">{{
          $t("authView.register")
        }}</v-card-title>
        <v-card-title v-else>{{ $t("authView.login") }}</v-card-title>
        <v-card-text>
          <p v-if="error && registerMode">
            {{ $t("authView.registerError") }}
          </p>
          <p v-else-if="error">
            {{ $t("authView.loginError") }}
          </p>
          <v-text-field
            type="email"
            v-model="username"
            :placeholder="$t('authView.username')"
            :rules="[(value) => (isEmail(value) ? true : 'Must be a email')]"
          />
          <v-text-field
            type="password"
            v-model="password"
            :placeholder="$t('authView.password')"
          />
          <v-text-field
            v-if="registerMode"
            type="text"
            v-model="fullName"
            :placeholder="$t('authView.fullName')"
          />
        </v-card-text>
        <v-card-actions class="d-flex flex-row justify-space-between">
          <v-btn v-if="registerMode" @click="setRegisterMode(false)">{{
            $t("authView.login")
          }}</v-btn>
          <v-btn v-else @click="setRegisterMode(true)">{{
            $t("authView.register")
          }}</v-btn>
          <v-btn v-if="registerMode" @click="performRegister">{{
            $t("authView.register")
          }}</v-btn>
          <v-btn v-else @click="performLogin">{{ $t("authView.login") }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
