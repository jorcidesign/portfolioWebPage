<template>
  <div :class="['atom-divider', `variant-${variant}`]" aria-hidden="true"></div>
</template>

<script setup lang="ts">
defineProps({
  variant: { type: String, default: 'light' } // light, dark
})
</script>

<style scoped>
.atom-divider {
  width: 100%;
  height: 1px;
  /* GSAP usará scaleX para animar esto después */
  transform-origin: left center; 
  will-change: transform;
}

.variant-light {
  background: var(--color-rule);
}

.variant-dark {
  background: var(--color-ink);
}

/* Ajustes Móviles */
@media (max-width: 768px) {
  .atom-divider {
    /* A veces en móvil las líneas de 1px se pierden en pantallas de baja densidad, 
       pero 1px suele ser estándar. Lo dejamos fluido. */
    opacity: 0.8; 
  }
}
</style>