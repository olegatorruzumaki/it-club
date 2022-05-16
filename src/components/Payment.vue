<template>
  <div class="payment p-5">
    <div class="payment__title text-center">
      Make a payment
    </div>
    <div class="payment__row">
      <div>Select contact</div>
      <router-link :to="'/selectContact'" class="payment__select block"></router-link>
    </div>
    <div class="payment__row">
      <div>Select payment method</div>
      <div class="payment__select"></div>
    </div>
    <div class="payment__row">
      <div>Enter amount</div>
      <div class="payment__value"></div>
    </div>
    <div class="mt-10 w-full">
      <button>Pay</button>
    </div>
  </div>
</template>

<script setup lang="ts">
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
