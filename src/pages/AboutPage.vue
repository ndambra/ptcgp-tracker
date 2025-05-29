<template>
  <q-page class="q-ma-md">
    <q-card class="q-my-md q-mx-auto q-pa-sm" style="width: 90%">
      <q-card-section>
        <p class="text-center text-h6">About</p>
        <p>
          This little web app was created to improve my skills with Vue.js and Quasar Framework.
          There are probably some issues and bugs as I am learning the ins and outs. Send me a
          message with the contact form below (WIP) with any bugs or feedback!
        </p>
        <br />
        <p>
          Pokemon Trading Card Game Pocket (PTCGP) Tracker was created so I could determine which
          cards I needed out of which packs. As the game continuously releases new expansion packs I
          wanted to have one, easy to read location that would tell me how many cards I'm missing
          from each pack.
        </p>
      </q-card-section>
    </q-card>
    <contact-form />
  </q-page>
</template>

<script setup>
import ContactForm from 'src/components/contact/ContactForm.vue'
</script>
