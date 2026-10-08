<script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { getTicket, updateTicket, deleteTicket } from '@/services/ticketService';
  import { STATUSES, PRIORITIES } from '@/constants';
  import PriorityBadge from '@/components/PriorityBadge.vue';
  import StatusBadge from '@/components/StatusBadge.vue';

  const props = defineProps({
    id: String,
  })

  const router = useRouter();

  const ticket = ref(null);
  const status = ref('');
  const priority = ref('');
  const error = ref(null);
  const message = ref(null);

  async function load() {
    try {
      ticket.value = await getTicket(props.id);
      status.value = ticket.value.status;
      priority.value = ticket.value.priority;
    } catch (e) {
      error.value = e.message;
    }
  }

  async function save() {
    message.value = null;
    error.value = null;
    try {
      ticket.value = await updateTicket(ticket.value.id, {
        status: status.value,
        priority: priority.value,
      });
      message.value = 'Ticket mis à jour !';
    } catch (e) {
      error.value = e.message;
    }
  }

  async function remove() {
    if (!confirm('Supprimer ce ticket ?')) return;
    try {
      await deleteTicket(ticket.value.id);
      router.push({ name: 'dashboard' });
    } catch (e) {
      error.value = e.message;
    }
  }

  onMounted(load);
</script>

<template>
  <h1>Détail d'un ticket</h1>

  <p v-if="error" class="error">{{ error }}</p>
  <p v-if="message" class="success">{{ message }}</p>

  <div v-if="ticket" :class="'ticket-detail border-' + ticket.priority">
    <h2>#{{ ticket.id }} - {{ ticket.title }}</h2>
    <p>
      <PriorityBadge :priority="ticket.priority" />
      <StatusBadge :status="ticket.status" />
      <small>créé le {{ ticket.formattedDate }}</small>
    </p>
    <p>{{ ticket.description }}</p>

    <h3>Modifier</h3>
    <form @submit.prevent="save">
      <label>Statut
        <select v-model="status">
          <option v-for="s in STATUSES" :key="s" :value="s">{{ s }}</option>
        </select>
      </label>
      <label>Priorité
        <select v-model="priority">
          <option v-for="p in PRIORITIES" :key="p" :value="p">{{ p }}</option>
        </select>
      </label>
      <button type="submit">Enregistrer</button>
    </form>

    <button class="danger" @click="remove">Supprimer le ticket</button>
  </div>

  <RouterLink :to="{ name: 'dashboard' }">← Retour au tableau de bord</RouterLink>
</template>
