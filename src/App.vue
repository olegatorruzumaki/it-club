<script setup lang="ts">
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition">
      <component :is="Component" :key="route.path"/>
    </transition>
  </router-view>
</template>

<style>
</style>
