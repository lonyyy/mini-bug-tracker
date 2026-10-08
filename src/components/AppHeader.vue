<template>
  <nav>
    <RouterLink :to="{ name: 'dashboard' }">Tableau de bord</RouterLink>
    <RouterLink :to="{ name: 'ticket.create' }">Créer un ticket</RouterLink>
  </nav>
</template>
