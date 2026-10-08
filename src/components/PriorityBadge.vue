<script setup>
defineProps(['priority']);
</script>

<template>
  <span :class="'badge priority-' + priority">{{ priority }}</span>
</template>
