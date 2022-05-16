<template>
  <Form @submit="saveData" class="payment p-5">
    <div class="contact__title -mx-5 text-center flex justify-around">
      <router-link :to="'/selectContact'">-</router-link>
      <div>New contact</div>
      <div></div>
    </div>
    <div class="payment__row">
      <div>First Name
        <Field class="input" name="firstName" v-model="contactData.firstName" type="text" rules="required"/>
        <ErrorMessage name="firstName"/>
      </div>
    </div>
    <div class="payment__row">
      <label>Last Name
        <Field class="input" name="lastName" v-model="contactData.lastName" type="text" rules="required"/>
        <ErrorMessage name="lastName"/>
      </label>
    </div>
    <div class="payment__row">
      <label>Email
        <Field class="input" name="email" v-model="contactData.email" type="email" rules="required|email"/>
        <ErrorMessage name="email"/>
      </label>
    </div>
    <div class="mt-10 w-full">
      <button class="btn" type="submit">Save</button>
      <button class="btn mt-10" @click="clearLocal">Clear</button>
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
        firstName: '' as string,
        lastName: '' as string,
        email: '' as string,
      }
    })

    return {...toRefs(state)}
  },
  methods: {
    saveData() {
      let contacts: any[] = [];
      if (localStorage.contacts) {
        contacts = JSON.parse(localStorage.contacts);
        contacts.push(this.contactData)
      } else {
        contacts.push(this.contactData);
      }
      localStorage.setItem('contacts', JSON.stringify(contacts));

      this.contactData = {
        firstName: '' as string,
        lastName: '' as string,
        email: '' as string,
      }
      this.$router.push('/selectContact');
    },

    clearLocal() {
      localStorage.clear();
    }
  }
})
</script>

<style scoped>
.contact__title {
  @apply border-b
}
</style>
