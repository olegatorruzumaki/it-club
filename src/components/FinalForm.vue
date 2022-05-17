<template>
  <div class="payment">
    <div class="justify-center flex">
      <img src="../assets/success.svg" alt="success" class="w-1/5">
    </div>
    <div class="text-center mt-5 text-2xl">Payment completed successfully</div>
    <div class="mt-auto w-full">
      <router-link :to="{name: 'Payment'}" class="btn">Make another one</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs} from 'vue';

export default defineComponent({
  name: 'Payment',
  components: {
  },
  setup() {
    const state = reactive({
    })
    return {...toRefs(state)}
  },
})
</script>

<style>
</style>
