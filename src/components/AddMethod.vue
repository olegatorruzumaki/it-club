<template>
  <Form @submit="saveData" class="payment h-screen px-5 pb-10 flex flex-col">
    <div class="contact__title -mx-5 text-center flex justify-around items-center p-3">
      <router-link class="back-btn" :to="'/selectMethod'"><img src="../assets/arrow.svg" alt="back"></router-link>
      <div>New method</div>
      <div></div>
    </div>

    <div class="flex text-center mt-5">
      <div class="w-6/12 border py-1" :class="selectedType === 'card' ? 'selected-type' : ''"
           @click="selectedType = 'card'">Card
      </div>
      <div class="w-6/12 border py-1" :class="selectedType === 'account' ? 'selected-type' : ''"
           @click="selectedType = 'account'">
        Bank account
      </div>
    </div>

    <div v-if="selectedType === 'card'">
      <div class="payment__row">
        <div>Full Name
          <Field class="input" name="fullName" v-model="methodCardData.fullName" type="text" rules="required"/>
          <ErrorMessage name="fullName"/>
        </div>
      </div>
      <div class="payment__row">
        <label>Card number
          <Field class="input" name="cardNumber" v-model="methodCardData.cardNumber" type="text" rules="required|min:19"
                 v-mask="'#### #### #### ####'"/>
          <ErrorMessage name="cardNumber"/>
        </label>
      </div>
      <div class="payment__row">
        <label>Expiry date
          <Field class="input" name="date" placeholder="MM/YY" v-model="methodCardData.date" type="text"
                 rules="required|min:5" v-mask="'##/##'"/>
          <ErrorMessage name="date"/>
        </label>
      </div>
    </div>

    <div v-if="selectedType === 'account'">
      <div class="payment__row">
        <div>Account name
          <Field class="input" name="accountName" v-model="methodAccountData.accountName" type="text" rules="required"/>
          <ErrorMessage name="accountName"/>
        </div>
      </div>
      <div class="payment__row">
        <label>Account number
          <Field class="input" name="accountNumber" placeholder="##########" v-model="methodAccountData.accountNumber"
                 type="text" rules="required|min:10" v-mask="'##########'"/>
          <ErrorMessage name="accountNumber"/>
        </label>
      </div>
      <div class="payment__row">
        <label>BSB
          <Field class="input" name="bsb" placeholder="###-###" v-model="methodAccountData.bsb" type="text"
                 rules="required|min:7" v-mask="'###-###'"/>
          <ErrorMessage name="bsb"/>
        </label>
      </div>
    </div>
    <div class="mt-auto w-full">
      <button class="btn" type="submit">Save</button>
    </div>
  </Form>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs} from 'vue';
import {Form, Field, ErrorMessage, defineRule} from 'vee-validate';
import {required, min} from '@vee-validate/rules';

import {mask} from 'vue-the-mask'

defineRule('required', required);
defineRule('min', min);

export default defineComponent({
  name: 'AddMethod',
  directives: {mask},
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup() {
    const state = reactive({
      selectedType: 'card' as string,
      methodCardData: {
        fullName: '' as string,
        cardNumber: '' as string,
        date: '' as string,
        type: 'card' as string,
      },
      methodAccountData: {
        accountName: '' as string,
        accountNumber: '' as string,
        bsb: '' as string,
        type: 'account' as string,
      }
    })

    return {
      ...toRefs(state)
    };

  },
  methods: {
    saveData() {
      if (this.selectedType === 'card') {
        let methodCard: any[] = [];
        if (localStorage.methodCard) {
          methodCard = JSON.parse(localStorage.methodCard);
          methodCard.push(this.methodCardData)
        } else {
          methodCard.push(this.methodCardData);
        }
        localStorage.setItem('methodCard', JSON.stringify(methodCard));
      } else {
        let methodAccount: any[] = [];
        if (localStorage.methodAccount) {
          methodAccount = JSON.parse(localStorage.methodAccount);
          methodAccount.push(this.methodAccountData)
        } else {
          methodAccount.push(this.methodAccountData);
        }
        localStorage.setItem('methodAccount', JSON.stringify(methodAccount));
      }
      this.$router.push('/selectMethod');
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

.selected-type {
  @apply bg-purple-600 text-white
}
</style>
