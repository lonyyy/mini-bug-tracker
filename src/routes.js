import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '@/views/DashboardView.vue';
import TicketCreateView from '@/views/TicketCreateView.vue';
import TicketDetailView from '@/views/TicketDetailView.vue';

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: DashboardView, name: 'dashboard' },
        { path: '/tickets/create', component: TicketCreateView, name: 'ticket.create' },
        { path: '/tickets/:id(\\d+)', component: TicketDetailView, name: 'ticket.show', props: true },
    ]
})
