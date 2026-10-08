<script setup>
  import { ref, onMounted } from 'vue';
  import { getTickets } from '@/services/ticketService';
  import TicketCard from '@/components/TicketCard.vue';
  import FilterBar from '@/components/FilterBar.vue';

  const ticketList = ref(null);
  const page = ref(1);
  const filters = ref({ title: '', status: '', priority: '' });
  const error = ref(null);
  const loading = ref(false);

  async function loadPage(p) {
    loading.value = true;
    error.value = null;
    try {
      ticketList.value = await getTickets(p, filters.value);
      page.value = p;
    } catch (e) {
      error.value = e.message;
    }
    loading.value = false;
  }

  onMounted(() => loadPage(1));
</script>

<template>
  <h1>Tableau de bord</h1>

  <FilterBar v-model="filters" @search="loadPage(1)" />

  <p v-if="error" class="error">{{ error }}</p>
  <p v-else-if="loading">Chargement...</p>

  <div v-else-if="ticketList">
    <p>{{ ticketList.total }} ticket(s) trouvé(s)</p>

    <p v-if="ticketList.items.length === 0">Aucun ticket.</p>

    <TicketCard v-for="ticket in ticketList.items" :key="ticket.id" :ticket="ticket" />

    <div class="pagination">
      <button v-if="ticketList.hasPreviousPage" v-on:click="() => loadPage(page - 1)">Page précédente</button>
      <span>Page {{ page }}</span>
      <button v-if="ticketList.hasNextPage" v-on:click="() => loadPage(page + 1)">Page suivante</button>
    </div>
  </div>
</template>
