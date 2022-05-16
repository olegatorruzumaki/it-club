<template>
  <div class="payment p-5">
    <div class="contact__title -mx-5 text-center flex justify-around">
      <router-link :to="'/'">-</router-link>
      <div>Select contact</div>
      <router-link :to="'/addContact'">+</router-link>
    </div>
    <div class="select__row" v-for="contact in contactsData">
      {{ contact.firstName }}
      {{ contact.lastName }}
      {{ contact.email }}
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs} from 'vue';


export default defineComponent({
  name: 'AddContact',
  components: {},
  setup() {
    const state = reactive({
      contactsData: JSON.parse(localStorage.contacts) as object[],
    })
    return {...toRefs(state)}
  },
  methods: {},
  mounted() {
    console.log('contactsData', this.contactsData);
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
