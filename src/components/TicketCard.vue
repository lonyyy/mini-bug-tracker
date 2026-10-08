<script setup>
import PriorityBadge from './PriorityBadge.vue';
import StatusBadge from './StatusBadge.vue';

defineProps(['ticket']);
</script>

<template>
  <div :class="'ticket-card border-' + ticket.priority">
    <h3>#{{ ticket.id }} - {{ ticket.title }}</h3>
    <p>
      <PriorityBadge :priority="ticket.priority" />
      <StatusBadge :status="ticket.status" />
      <small>créé le {{ ticket.formattedDate }}</small>
    </p>
    <RouterLink :to="{ name: 'ticket.show', params: { id: ticket.id } }">Voir le détail</RouterLink>
  </div>
</template>
