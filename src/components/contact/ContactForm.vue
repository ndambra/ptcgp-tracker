<template>
  <q-card class="q-mx-auto q-pa-md" style="width: 90%">
    <q-card-section>
      <div class="text-h4 text-center">Contact Me</div>
    </q-card-section>
    <q-form @submit="onSubmit" class="q-gutter-sm q-pa-md">
      <q-input
        filled
        v-model="formRef.name"
        label="Your name *"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Field Required']"
      />
      <q-input
      filled
        v-model="formRef.email"
        label="Your email *"
        placeholder="test@test.com"
        lazy-rules
        type="email"
        :rules="[(val) => (val && val.length > 0) || 'Field Required']"
      />
      <q-input filled v-model="formRef.message" type="textarea" label="Message" />
      <div>
        <q-btn color="primary" label="Send" type="submit" />
      </div>
    </q-form>
  </q-card>
</template>

<script setup>
/* imports */
import { ref } from 'vue'
import { useQuasar } from 'quasar';

const $q = useQuasar();

const formRef = ref({
  name: '',
  email: '',
  message: '',
})


/* submit form */
const onSubmit = () => {
  console.log('submit form');
  formRef.value.name = '';
  formRef.value.email = '';
  formRef.value.message = '';
  $q.notify({
    message: 'Message sent!',
    color: 'positive'
  })
}
</script>
