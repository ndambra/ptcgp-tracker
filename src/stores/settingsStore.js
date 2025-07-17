import { defineStore } from "pinia";
import { reactive, watch } from "vue";
import { Dark, LocalStorage } from "quasar";

export const useSettingsStore = defineStore("settings", () => {
  /* state */
  const settings = reactive({
    darkMode: true,
  });

  // watch darkMode
  watch(
    () => settings.darkMode,
    (value) => Dark.set(value),
    { immediate: true },
  );

  // watch settings
  watch(settings, () => {
    saveSettings();
  });

  /* getters */

  /* actions */
  const saveSettings = () => {
    LocalStorage.set("settings", settings);
  };

  const loadSettings = () => {
    console.log("load settings");
    const savedSettings = LocalStorage.getItem("settings");
    if (savedSettings) Object.assign(settings, savedSettings);
  };

  /* return */
  return {
    /* state */
    settings,
    /* getters */
    /* actions */
    loadSettings,
  };
});
