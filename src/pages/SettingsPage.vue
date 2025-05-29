<template>
  <q-page class="q-ma-md">
    <div class="text-h6 text-center">Settings</div>
    <q-list bordered padding>
      <!-- Card Table -->
      <q-item-label header>Table</q-item-label>

      <q-separator spaced />

      <!-- Appearance/Look and Feel -->
      <q-item-label header>Appearance</q-item-label>
      <q-item tag="label" v-ripple>
        <q-item-section avatar>
          <q-radio v-model="settingsStore.settings.darkMode" :val="false" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Light</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section avatar>
          <q-radio v-model="settingsStore.settings.darkMode" :val="true" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Dark</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section avatar top>
          <q-radio v-model="settingsStore.settings.darkMode" val="auto" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Auto</q-item-label>
          <q-item-label caption>Follow the preference of your system</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup>
/* imports */
import { useSettingsStore } from 'src/stores/settingsStore'

const settingsStore = useSettingsStore()
</script>
