<template>
  <Form @submit="submit" class="payment h-screen px-5 pb-10 pt-5 flex flex-col">
    <div class="payment__title text-center">
      Make a payment
    </div>
    <div class="payment__row">
      <div>Select contact</div>
      <router-link :to="'/selectContact'" class="payment__select flex px-3 items-center">
        {{ contact.firstName }}
        {{ contact.lastName }}
        {{ contact.email }}
      </router-link>
    </div>
    <div class="payment__row">
      <div>Select payment method</div>
      <router-link :to="'/selectMethod'" class="payment__select flex px-3 items-center">
        {{ method.name }}
        {{ method.number }}
        {{ method.dateBSB }}
      </router-link>
    </div>
    <div class="payment__row">
      <label>Enter amount
        <Field class="input" name="amount" type="text" rules="required" v-mask="'#########'"/>
        <ErrorMessage name="amount"/>
      </label>
    </div>
    <div class="mt-auto w-full">
      <button type="submit" class="btn">Pay</button>
    </div>
  </Form>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs} from 'vue';
import {ErrorMessage, Field, Form} from "vee-validate";

import {mask} from 'vue-the-mask'

export default defineComponent({
  name: 'Payment',
  directives: {mask},
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup() {
    const state = reactive({
      contact: {
        firstName: '' as string,
        lastName: '' as string,
        email: '' as string,
      } as object,
      method: {
        name: '' as string,
        number: '' as string,
        dateBSB: '' as string,
      } as object,
    })
    return {...toRefs(state)}
  },
  methods: {
    submit() {
      this.$router.push({name: 'Final'})
    }
  },
  mounted() {
    this.contact = sessionStorage.getItem('selectedContact') ? JSON.parse(sessionStorage.getItem('selectedContact')) : '';
    this.method = sessionStorage.getItem('selectedMethod') ? JSON.parse(sessionStorage.getItem('selectedMethod')) : '';
  }
})
</script>

<style>
.payment__row {
  @apply mt-3
}

.payment__select,
.payment__value {
  @apply h-10 border w-full
}

input, .input {
  @apply h-10 border w-full px-3
}
</style>
