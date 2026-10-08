import { API_URL } from '@/constants';
import { TicketDTO } from '@/DTO/TicketDTO.js';
import { CollectionDTO } from '@/DTO/CollectionDTO.js';

const headers = { Accept: 'application/ld+json' };

export async function getTickets(page, filters) {
  const params = new URLSearchParams({ page });
  if (filters.status) params.set('status', filters.status);
  if (filters.priority) params.set('priority', filters.priority);
  if (filters.title) params.set('title', filters.title);

  const response = await fetch(`${API_URL}/tickets?${params}`, { headers });
  if (!response.ok) throw new Error('Erreur lors du chargement des tickets');
  const data = await response.json();
  return new CollectionDTO(data, (rawItem) => new TicketDTO(rawItem));
}

export async function getTicket(id) {
  const response = await fetch(`${API_URL}/tickets/${id}`, { headers });
  if (!response.ok) throw new Error('Ticket introuvable');
  const data = await response.json();
  return new TicketDTO(data);
}

export async function createTicket(title, description, priority) {
  const response = await fetch(`${API_URL}/tickets`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/ld+json' },
    body: JSON.stringify({ title, description, priority }),
  });
  if (!response.ok) throw new Error('Erreur lors de la création du ticket');
  const data = await response.json();
  return new TicketDTO(data);
}

export async function updateTicket(id, updateData) {
  const response = await fetch(`${API_URL}/tickets/${id}`, {
    method: 'PATCH',
    headers: { ...headers, 'Content-Type': 'application/merge-patch+json' },
    body: JSON.stringify(updateData),
  });
  if (!response.ok) throw new Error('Erreur lors de la mise à jour');
  const data = await response.json();
  return new TicketDTO(data);
}

export async function deleteTicket(id) {
  const response = await fetch(`${API_URL}/tickets/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Erreur lors de la suppression');
}
