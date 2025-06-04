<template>
  <q-layout view="lHh lpR lFf">
    <q-header :elevated="useLightOrDark(true, false)">
      <q-toolbar class="justify-between">
        <q-btn @click="toggleLeftDrawer" aria-label="Menu" icon="menu" dense flat round />
        <q-toolbar-title shrink class="q-pr-none" style="padding-left: 90px">
          PTCGP Tracker
        </q-toolbar-title>
        <div>
          <q-btn
            v-if="authStore.user.id"
            flat
            color="white"
            label="Logout"
            no-caps
            @click="authStore.logoutUser"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      show-if-above
      :width="200"
      :breakpoint="400"
      class="bg-primary text-grey-4"
    >
      <div
        class="absolute-top"
        style="height: 150px; border-bottom: 1px solid rgba(255, 255, 255, 0.28)"
      >
        <div v-if="authStore.user.id" class="q-pa-md absolute-bottom bg-transparent">
          <q-avatar v-if="authStore.user.photoURL" size="56px" class="q-mb-sm">
            <img :src="authStore.user.photoURL" />
          </q-avatar>
          <q-avatar v-else size="56px" class="q-mb-sm" color="secondary">
            {{ shorthand }}
          </q-avatar>
          <div class="text-weight-bold">{{ authStore.user.email }}</div>
          <div>@{{ authStore.user.displayName }}</div>
        </div>
        <div v-else>
          <q-btn flat color="white" label="Login" no-caps />
        </div>
      </div>

      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px">
        <q-list>
          <NavLinks v-for="link in linksList" :key="link.title" v-bind="link" />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
/* imports */
import { computed, ref } from 'vue'
import NavLinks from 'components/nav/NavLinks.vue'
import { useLightOrDark } from 'src/use/useLightOrDark'
import { useAuthStore } from 'src/stores/authStore'

/* navlist */
const linksList = [
  {
    title: 'Dashboard',
    icon: 'dashboard',
    link: '/',
    separator: true,
  },
  {
    title: 'Card Tracker',
    icon: 'leaderboard',
    link: '/card-tracker',
  },
  {
    title: 'Card Database',
    icon: 'storage',
    link: '/card-db',
  },
  {
    title: 'Deck Builder',
    icon: 'construction',
    link: '/decks',
    separator: true,
  },
  {
    title: 'About',
    icon: 'info',
    link: '/about',
  },
  {
    title: 'Settings',
    icon: 'settings',
    link: '/settings',
  },
]

/* user */
const authStore = useAuthStore()

const shorthand = computed(() => {
  if (authStore.user.displayName) {
    return authStore.user.displayName[0]
  } else {
    return authStore.user.email[0].toUpperCase()
  }
})

/* drawer */
const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
