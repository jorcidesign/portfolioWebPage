<template>
  <p :class="['atom-text', `variant-${variant}`]">
    <slot />
  </p>
</template>

<script setup lang="ts">
defineProps({
  variant: { type: String, default: 'body' } // body, label, meta, dim
})
</script>

<style scoped>
.atom-text {
  margin: 0;
}

.variant-body {
  font-size: var(--text-base);
  line-height: var(--leading-loose);
  color: var(--color-ink-80);
}

.variant-label {
  font-size: var(--text-2xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-ink-60);
  display: block;
}

.variant-meta {
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-ink-40);
}

.variant-dim {
  font-size: var(--text-sm);
  color: var(--color-ink-40);
  line-height: var(--leading-normal);
}

/* Ajustes específicos para móvil */
@media (max-width: 768px) {
  .variant-body {
    /* Mejoramos legibilidad en pantallas pequeñas */
    line-height: 1.6; 
    color: var(--color-ink); /* Más contraste en móvil */
  }

  .variant-label {
    /* Los labels suelen necesitar un empujón extra de separación hacia abajo en móvil */
    margin-bottom: 0.5rem;
  }
}
</style>