<template>
  <h1 class="atom-creative-heading" :aria-label="title">
    <span
      v-for="(char, index) in charData"
      :key="index"
      class="heading-char"
      :style="{ '--delay': `${char.delay}ms` }"
      aria-hidden="true"
    >{{ char.char }}</span>
  </h1>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title?: string
}>()

const title = computed(() => props.title ?? 'Creative Developer')

/**
 * Animación ola en triángulo invertido:
 * letras del centro caen primero (delay 0),
 * extremos caen después.
 */
const charData = computed(() => {
  const chars = title.value.split('')
  const total = chars.length
  const center = (total - 1) / 2
  const STEP_MS = 30

  return chars.map((char, index) => ({
    char: char === ' ' ? '\u00A0' : char,
    delay: Math.round(Math.abs(index - center) * STEP_MS),
  }))
})
</script>

<style scoped>
.atom-creative-heading {
  font-family: var(--font-screamer);

  /*
   * El título "CREATIVE DEVELOPER" (~18 chars) debe ocupar
   * casi todo el ancho del container sin romper línea en desktop.
   * 8.5vw da ~163px en 1920px → title completo ~163*18 = demasiado.
   * Usamos una fórmula más precisa: el título tiene ~18 caracteres,
   * con letter-spacing -0.04em el ancho efectivo por char es ~0.88em.
   * Para que quepan en 100vw: font-size = 100vw / (18 * 0.88) ≈ 6.3vw
   * Ajustamos a ~6.5vw para que sangre ligeramente.
   */
  font-size: clamp(2.5rem, 6.5vw, 9rem);
  font-weight: var(--weight-black);
  letter-spacing: var(--tracking-tight);
  line-height: var(--leading-none);
  text-transform: uppercase;
  color: var(--color-ink);

  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  white-space: nowrap;

  margin: 0;
  padding: 0;
  overflow: visible;
}

/* ─── Cada letra ─────────────────────────────────── */
.heading-char {
  display: inline-block;
  will-change: transform, opacity;
  animation: char-drop 650ms var(--ease-out, cubic-bezier(0.16, 1, 0.3, 1)) both;
  animation-delay: var(--delay, 0ms);
}

@keyframes char-drop {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* ─── Mobile: wrap controlado ─────────────────────── */
@media (max-width: 992px) {
  .atom-creative-heading {
    flex-wrap: wrap;
    white-space: normal;
    font-size: clamp(2.8rem, 12vw, 5.5rem);
    text-align: center;
    justify-content: center;
  }
}
</style>