<template>
  <q-layout view="lHh lpR lFf">
    <q-header :elevated="useLightOrDark(true, false)">
      <q-toolbar class="justify-between">
        <q-btn @click="toggleLeftDrawer" aria-label="Menu" icon="menu" dense flat round />
        <q-toolbar-title shrink class="q-pr-none" style="padding-left: 90px">
          PTCGP Tracker
        </q-toolbar-title>
        <div>Welcome, {{ user.username }}!</div>
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
        <div class="q-pa-md absolute-bottom bg-transparent">
          <q-avatar v-if="user.icon" size="56px" class="q-mb-sm">
            <img :src="user.icon" />
          </q-avatar>
          <q-avatar v-else size="56px" class="q-mb-sm" color="secondary">
            {{ user.shorthand }}
          </q-avatar>
          <div class="text-weight-bold">{{ user.name }}</div>
          <div>@{{ user.username }}</div>
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
import { reactive, ref } from 'vue'
import NavLinks from 'components/nav/NavLinks.vue'
import { useLightOrDark } from 'src/use/useLightOrDark'

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
const user = reactive({
  name: "Nikki D'Ambra",
  shorthand: 'ND',
  username: 'ndambra',
  icon: '',
})

/* drawer */
const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
