<script setup lang="ts">
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition name="slide">
      <component :is="Component" :key="route.path"/>
    </transition>
  </router-view>
</template>

<style>
.slide-enter-active, .slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
  position: absolute;
  width: 100vw;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(30%);
  opacity: 0;
}
</style>
