<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { createTicket } from '@/services/ticketService';
  import { PRIORITIES } from '@/constants';

  const router = useRouter();

  const title = ref('');
  const description = ref('');
  const priority = ref('medium');
  const errors = ref([]);
  const submitting = ref(false);

  function validate() {
    errors.value = [];
    const t = title.value.trim();
    if (t.length < 3 || t.length > 255) {
      errors.value.push('Le titre doit faire entre 3 et 255 caractères.');
    }
    if (description.value.trim().length < 15) {
      errors.value.push('La description doit faire au moins 15 caractères.');
    }
    if (!priority.value) {
      errors.value.push('Il faut choisir une priorité.');
    }
    return errors.value.length === 0;
  }

  async function submit() {
    if (submitting.value || !validate()) return;

    submitting.value = true;
    try {
      const ticket = await createTicket(title.value.trim(), description.value.trim(), priority.value);
      router.push({ name: 'ticket.show', params: { id: ticket.id } });
    } catch (e) {
      errors.value = [e.message];
    } finally {
      submitting.value = false;
    }
  }
</script>

<template>
  <h1>Créer un ticket</h1>

  <form class="ticket-form" @submit.prevent="submit">
    <ul v-if="errors.length > 0" class="error">
      <li v-for="err in errors" :key="err">{{ err }}</li>
    </ul>

    <label for="title">Titre</label>
    <input id="title" v-model="title" type="text" />

    <label for="description">Description ({{ description.length }} caractères)</label>
    <textarea id="description" v-model="description" rows="6"></textarea>

    <label for="priority">Priorité</label>
    <select id="priority" v-model="priority">
      <option v-for="p in PRIORITIES" :key="p" :value="p">{{ p }}</option>
    </select>

    <button type="submit" :disabled="submitting">Créer</button>
  </form>
</template>
