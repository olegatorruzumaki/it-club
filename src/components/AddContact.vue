<template>
  <Form @submit="saveData" class="payment">
    <div class="contact__title -mx-5 text-center flex justify-around items-center p-3">
      <router-link class="back-btn" :to="{name: 'SelectContact'}"><img src="../assets/arrow.svg" alt="back"></router-link>
      <div>New contact</div>
      <div></div>
    </div>
    <div class="payment__row">
      <div>First Name
        <Field class="input" name="firstName" v-model="contactData['firstName']" type="text" rules="required"/>
        <ErrorMessage name="firstName"/>
      </div>
    </div>
    <div class="payment__row">
      <label>Last Name
        <Field class="input" name="lastName" v-model="contactData['lastName']" type="text" rules="required"/>
        <ErrorMessage name="lastName"/>
      </label>
    </div>
    <div class="payment__row">
      <label>Email
        <Field class="input" name="email" v-model="contactData['email']" type="email" rules="required|email"/>
        <ErrorMessage name="email"/>
      </label>
    </div>
    <div class="mt-auto w-full">
      <button class="btn" type="submit">Save</button>
    </div>
  </Form>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs} from 'vue';
import {Form, Field, ErrorMessage, defineRule} from 'vee-validate';
import {required, email} from '@vee-validate/rules';

defineRule('required', required);
defineRule('email', email);

export default defineComponent({
  name: 'AddContact',
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup() {
    const state = reactive({
      contactData: {
        firstName: '',
        lastName: '',
        email: '',
      }
    })

    return {...toRefs(state)}
  },
  methods: {
    saveData() {
      let contacts: object[] = [];
      const contactData = this.contactData;
      if (localStorage.contacts) {
        contacts = JSON.parse(localStorage.contacts);
        contacts.push(contactData)
      } else {
        contacts.push(contactData);
      }
      localStorage.setItem('contacts', JSON.stringify(contacts));

      // @ts-ignore
      this.$router.push({name: 'SelectContact'});
    },
  }
})
</script>

<style scoped>
.contact__title {
  @apply border-b
}
</style>
