<template>
  <div class="q-pa-lg">
    <q-tabs v-model="tab" active-color="primary" no-caps>
      <q-tab name="Login" label="Login" />
      <q-tab name="Register" label="Register" />
    </q-tabs>
    <q-separator />
    <q-card class="auth-form q-my-xl q-mx-auto q-pa-md">
      <auth-form :tab="tab" />
    </q-card>
  </div>
</template>

<script setup>
/* imports */
import { ref } from 'vue'
import AuthForm from 'src/components/auth/AuthForm.vue'

const tab = ref('Login')
</script>
<style>
.auth-form {
  max-width: 400px;
}
</style>
