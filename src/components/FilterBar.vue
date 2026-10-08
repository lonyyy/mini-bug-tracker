<script setup>
import { STATUSES, PRIORITIES } from '@/constants';

// filters = { title, status, priority }, partagé avec le parent via v-model
const filters = defineModel();
const emit = defineEmits(['search']);
</script>

<template>
  <form class="filter-bar" @submit.prevent="emit('search')">
    <input v-model="filters.title" type="text" placeholder="Rechercher par titre" />

    <select v-model="filters.status">
      <option value="">Tous les statuts</option>
      <option v-for="s in STATUSES" :key="s" :value="s">{{ s }}</option>
    </select>

    <select v-model="filters.priority">
      <option value="">Toutes les priorités</option>
      <option v-for="p in PRIORITIES" :key="p" :value="p">{{ p }}</option>
    </select>

    <button type="submit">Filtrer</button>
  </form>
</template>
