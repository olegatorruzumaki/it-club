<template>
  <div class="payment">
    <div class="contact__title -mx-5 text-center flex justify-around items-center p-3">
      <router-link class="back-btn" :to="{name: 'Payment'}"><img src="../assets/arrow.svg" alt="back"></router-link>
      <div>Select contact</div>
      <router-link class="add-btn" :to="{name: 'AddContact'}"><img src="../assets/plus.svg" alt="add"></router-link>
    </div>
    <div class="select__row" v-for="(contact, index) in contactsData" :key="index" @click="selectContact(contact)">
      {{ contact['firstName'] }}
      {{ contact['lastName'] }}
      {{ contact['email'] }}
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs} from 'vue';

export default defineComponent({
  name: 'SelectContact',
  components: {},
  setup() {
    const state = reactive({
      contactsData: localStorage.contacts ? JSON.parse(localStorage.contacts) as object[] : {},
    })
    return {...toRefs(state)}
  },
  methods: {
    selectContact(contact: object) {
      sessionStorage.setItem('selectedContact', JSON.stringify(contact));
      // @ts-ignore
      this.$router.push({name: 'Payment'});
    },
  }
})
</script>

<style scoped>
.contact__title {
  @apply border-b
}

.select__row {
  @apply mt-3 py-1 px-3 border whitespace-nowrap overflow-hidden
}
</style>
