<template>
  <component
    :is="isExternal ? 'a' : resolveComponent('NuxtLink')"
    :href="isExternal ? destination : undefined"
    :to="!isExternal ? destination : undefined"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    class="atom-link"
  >
    <span class="link-text"><slot /></span>
  </component>
</template>

<script setup lang="ts">
import { resolveComponent, computed } from 'vue'

const props = defineProps({
  to: { type: String, default: '' },      // Para NuxtLink (rutas internas)
  href: { type: String, default: '' },    // Para la etiqueta <a> (rutas externas)
  isExternal: { type: Boolean, default: false } 
})

// Magia: Si le pasas href o to, el componente sabrá cuál usar
const destination = computed(() => props.href || props.to)
</script>

<style scoped>
.atom-link {
  font-family: var(--font-primary);
  font-size: 14px;              /* fijo, no fluid — coincide con la imagen */
  font-weight: var(--weight-medium);
  color: inherit;
  text-decoration: none;
  letter-spacing: var(--tracking-normal);
  line-height: 1;
}

.link-text {
  position: relative;
}

/* Subrayado: entra de izquierda a derecha, sale de derecha a izquierda */
.link-text::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform var(--duration-base) var(--ease-out);
}

.atom-link:hover .link-text::after {
  transform: scaleX(1);
  transform-origin: left;
}
</style>