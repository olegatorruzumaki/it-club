<template>
  <Form @submit="submit" class="payment">
    <div class="payment__title text-center">
      Make a payment
    </div>
    <div class="payment__row">
      <div>Select contact</div>
      <router-link :to="{name: 'SelectContact'}" class="payment__select flex px-3 items-center">
        {{ contact['firstName'] }}
        {{ contact['lastName'] }}
        {{ contact['email'] }}
      </router-link>
    </div>
    <div class="payment__row">
      <div>Select payment method</div>
      <router-link :to="{name: 'SelectMethod'}" class="payment__select flex px-3 items-center">
        {{ method['name'] }}
        {{ method['number'] }}
        {{ method['dateBSB'] }}
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
  // @ts-ignore
  directives: {mask},
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup() {
    const state = reactive({
      contact: {
        firstName: sessionStorage.selectedContact ? JSON.parse(sessionStorage.selectedContact).firstName : '',
        lastName: sessionStorage.selectedContact ? JSON.parse(sessionStorage.selectedContact).lastName : '',
        email: sessionStorage.selectedContact ? JSON.parse(sessionStorage.selectedContact).email : '',
      },
      method: {
        name: sessionStorage.selectedMethod ? JSON.parse(sessionStorage.selectedMethod).name : '',
        number: sessionStorage.selectedMethod ? JSON.parse(sessionStorage.selectedMethod).number : '',
        dateBSB: sessionStorage.selectedMethod ? JSON.parse(sessionStorage.selectedMethod).dateBSB : '',
      },
    })
    return {...toRefs(state)}
  },
  methods: {
    submit() {
      // @ts-ignore
      this.$router.push({name: 'Final'});
    },
  },
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
