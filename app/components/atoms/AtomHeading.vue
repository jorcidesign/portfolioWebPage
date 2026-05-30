<template>
  <component :is="as" :class="['atom-heading', `size-${size}`]">
    <slot />
  </component>
</template>

<script setup lang="ts">
defineProps({
  as: { type: String, default: 'h2' }, 
  size: { type: String, default: '3xl' } // huge, 4xl, 3xl, 2xl, xl
})
</script>

<style scoped>
.atom-heading {
  font-family: var(--font-display);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-tight);
  line-height: var(--leading-tight);
  margin: 0;
  /* Prevenimos que textos muy largos rompan el layout en móvil */
  word-break: break-word;
  overflow-wrap: break-word;
}

.size-huge { font-size: var(--text-huge); font-weight: var(--weight-bold); line-height: var(--leading-none); }
.size-4xl  { font-size: var(--text-4xl); }
.size-3xl  { font-size: var(--text-3xl); }
.size-2xl  { font-size: var(--text-2xl); }
.size-xl   { font-size: var(--text-xl); }

/* Ajustes específicos para móvil */
@media (max-width: 768px) {
  .atom-heading {
    /* En móvil, los títulos gigantes necesitan respirar un poco más en el alto de línea */
    line-height: 1.05; 
    letter-spacing: -0.02em;
  }
  
  .size-huge {
    line-height: 0.95; /* El 'huge' sigue necesitando estar apretado, pero no tanto como en desktop */
  }
}
</style>