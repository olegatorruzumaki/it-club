<template>
  <div class="payment">
    <div class="contact__title -mx-5 text-center flex justify-around items-center p-3">
      <router-link class="back-btn" :to="{name: 'Payment'}"><img src="../assets/arrow.svg" alt="back"></router-link>
      <div>Select method</div>
      <router-link class="add-btn" :to="{name: 'AddMethod'}"><img src="../assets/plus.svg" alt="add"></router-link>
    </div>
    <div v-if="methodsCardsData.length" class="mb-10">
      <div class="payment__row">
        <div>Credit/debit cards</div>
      </div>
      <div class="select__row" v-for="(methodCard, index) in methodsCardsData" :key="index"
           @click="selectMethod(methodCard)">
        <div class="card__type flex justify-between mb-5">
          <div class="card__type border w-10 h-7"></div>
          <Popper hover>
            <button @click="dotsClick" class="p-2"><img class="block" src="../assets/dots.svg" alt="dots"></button>
            <template #content>
              <div @click="removeMethod($event, methodCard)">Remove Card</div>
            </template>
          </Popper>
        </div>
        <div>{{ methodCard.fullName }}</div>
        <div class="flex justify-between">
          <div>{{ methodCard.cardNumber }}</div>
          <div>{{ methodCard.date }}</div>
        </div>
      </div>
    </div>
    <div v-if="methodsAccountsData.length">
      <div class="payment__row">
        <div>Bank accounts</div>
      </div>
      <div class="select__row p-5" v-for="(methodAccount, index) in methodsAccountsData" :key="index"
           @click="selectMethod(methodAccount)">
        <div class="flex justify-between items-center">
          <div>{{ methodAccount.accountName }}</div>
          <Popper hover>
            <button @click="dotsClick" class="p-2"><img class="block" src="../assets/dots.svg" alt="dots"></button>
            <template #content>
              <div @click="removeMethod($event, methodAccount)">Remove Account</div>
            </template>
          </Popper>
        </div>
        <div>{{ methodAccount.accountNumber }}</div>
        <div class="text-right">{{ methodAccount.bsb }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs} from 'vue';
// @ts-ignore
import Popper from 'vue3-popper';

export default defineComponent({
  name: 'SelectMethod',
  components: {
    Popper,
  },
  setup() {
    const state = reactive({
      methodsCardsData: localStorage.methodCard ? JSON.parse(localStorage.methodCard) : {},
      methodsAccountsData: localStorage.methodAccount ? JSON.parse(localStorage.methodAccount) : {},
    })
    return {...toRefs(state)}
  },
  methods: {
    selectMethod(method: any) {
      const selectedMethod = {
        name: method.fullName || method.accountName,
        number: method.cardNumber || method.accountNumber,
        dateBSB: method.date || method.bsb,
      }

      sessionStorage.setItem('selectedMethod', JSON.stringify(selectedMethod)
      );
      // @ts-ignore
      this.$router.push({name: 'Payment'});
    },
    dotsClick(event: Event) {
      event.stopPropagation();
    },
    removeMethod(event: Event, method: any) {
      event.stopPropagation();
      if (method.type === 'card') {
        let methodCard = JSON.parse(localStorage.getItem('methodCard') as string);
        const indexOfObject = methodCard.findIndex((object: any) => {
          return object.cardNumber === method.cardNumber;
        });
        methodCard.splice(indexOfObject, 1);
        localStorage.setItem('methodCard', JSON.stringify(methodCard));
        this.methodsCardsData = localStorage.methodCard ? JSON.parse(localStorage.methodCard) as object[] : {};
      } else {
        let methodAccount = JSON.parse(localStorage.methodAccount);
        const indexOfObject = methodAccount.findIndex((object: any) => {
          return object.accountNumber === method.accountNumber;
        });
        methodAccount.splice(indexOfObject, 1);
        localStorage.setItem('methodAccount', JSON.stringify(methodAccount));
        this.methodsAccountsData = localStorage.methodAccount ? JSON.parse(localStorage.methodAccount) as object[] : {};
      }
      sessionStorage.removeItem('selectedMethod');
    },
  },
})
</script>

<style scoped>
.contact__title {
  @apply border-b
}

.select__row {
  @apply mt-3 p-3 border whitespace-nowrap overflow-hidden
}
</style>
