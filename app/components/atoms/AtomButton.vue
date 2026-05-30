<template>
  <component 
    :is="href ? resolveComponent('NuxtLink') : 'button'"
    :to="href"
    :class="['atom-button', `variant-${variant}`]"
  >
    <div class="filler"></div>
    <span class="content">
      <slot />
      <span v-if="count" class="count">{{ count }}</span>
    </span>
  </component>
</template>

<script setup lang="ts">
import { resolveComponent } from 'vue'

defineProps({
  variant: { type: String, default: 'primary' }, // primary (oscuro), secondary (claro), outline
  href: { type: String, default: null }, // Si le pasas href, se vuelve un NuxtLink
  count: { type: String, default: '' }
})
</script>

<style scoped>
.atom-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-5) var(--space-8);
  border-radius: var(--radius-full);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  cursor: pointer;
  overflow: hidden;
  border: 1px solid var(--color-rule);
  transition: border-color var(--duration-base) var(--ease-out), color var(--duration-base) var(--ease-out);
  /* Aseguramos que no haya outlines nativos feos */
  outline: none;
  background: transparent;
}

.content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.count {
  font-weight: var(--weight-bold);
  background: var(--color-rule);
  padding: 2px 8px;
  border-radius: var(--radius-full);
  transition: background var(--duration-base) var(--ease-out);
}

/* El efecto de relleno */
.filler {
  position: absolute;
  top: -50%;
  left: -25%;
  width: 150%;
  height: 200%;
  border-radius: 50%;
  transform: translate3d(0, 75%, 0);
  pointer-events: none;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1;
}

/* Variante: Primary (Fondo oscuro por defecto) */
.variant-primary {
  color: var(--color-bg);
  background-color: var(--color-ink);
  border-color: transparent;
}
.variant-primary .filler {
  background: var(--color-bg);
}
.variant-primary:hover {
  color: var(--color-ink);
}

/* Variante: Outline (Transparente por defecto) */
.variant-outline {
  color: var(--color-ink);
  border-color: var(--color-rule);
}
.variant-outline .filler {
  background: var(--color-ink);
}
.variant-outline:hover {
  color: var(--color-bg);
  border-color: var(--color-ink);
}

/* Hover Global */
.atom-button:hover .filler {
  transform: translate3d(0, 0, 0);
}

.atom-button:hover .count {
  background: rgba(255, 255, 255, 0.2);
}

/* Ajustes Móviles */
@media (max-width: 768px) {
  .atom-button {
    /* Hacemos el botón un poco más compacto en móvil para que no coma pantalla */
    padding: var(--space-4) var(--space-6);
    width: 100%; /* Opcional: en móvil suele verse mejor si ocupa todo el ancho, o al menos aseguramos que no se desborde */
    justify-content: center;
  }
  
  @media (hover: none) {
    /* Quitamos el hover effect en táctil para evitar bugs visuales al hacer tap */
    .filler {
      display: none;
    }
    .variant-outline:active {
      background-color: var(--color-ink);
      color: var(--color-bg);
    }
  }
}
</style>