<template>
  <div class="q-px-md" style="max-width: 400px">
    <q-form @submit.prevent="onSubmit" class="q-gutter-md">
      <div class="text-h6 text-center">{{ tab }}</div>
      <q-input
        filled
        v-model="credentials.email"
        label="Email"
        placeholder="e.g. johnsmith@gmail.com"
      />
      <q-input
        filled
        type="password"
        v-model="credentials.password"
        label="Password"
        placeholder="Enter a password"
      />
      <div class="row justify-end">
        <q-btn :label="tab" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>

<script setup>
/* imports */
import { reactive } from 'vue'
import { useAuthStore } from 'src/stores/authStore'

const authStore = useAuthStore()

/* props */
const props = defineProps({
  tab: {
    type: String,
    required: true,
  },
})

/* form */
const credentials = reactive({
  email: '',
  password: '',
})

function onSubmit() {
  if (!credentials.email || !credentials.password) {
    alert('Please enter an email and password.')
  } else {
    if (props.tab === 'Login') {
      authStore.loginUser(credentials)
    } else {
      authStore.registerUser(credentials)
    }
  }
}
</script>
