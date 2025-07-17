<template>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "./stores/authStore";
import { useSettingsStore } from "src/stores/settingsStore";
const settingsStore = useSettingsStore();
const authStore = useAuthStore();

onMounted(() => {
  authStore.init();
  settingsStore.loadSettings();
});
</script>
