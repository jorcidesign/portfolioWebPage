<template>
  <NuxtLink 
    :to="to" 
    :class="['atom-nav-link', `variant-${variant}`, { 'is-active': active }]"
  >
    <span class="nav-text webgl-hover-effect">
      <span class="nav-label"><slot /></span>
      <span v-if="withComma" class="nav-comma">,</span>
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps({
  to: { type: String, required: true },
  variant: { type: String, default: 'header' }, // 'header' | 'menu'
  active: { type: Boolean, default: false },
  withComma: { type: Boolean, default: false }
})
</script>

<style scoped>
.atom-nav-link {
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  /* Quitamos transition global para evitar que pise al ::after */
}

.nav-text {
  display: inline-flex;
  align-items: baseline;
}

.nav-label {
  position: relative;
}

.nav-comma {
  display: inline-block;
  margin-left: 1px;
}

/* === VARIANTE 1: HEADER (Desktop) === */
.variant-header {
  font-family: var(--font-primary);
  font-size: var(--text-base);
  font-weight: var(--weight-medium);
  color: inherit;
  opacity: 0.5;
  text-transform: capitalize;
  /* La opacidad se anima aquí de forma aislada */
  transition: opacity var(--duration-base) var(--ease-out);
}

.variant-header:hover, 
.variant-header.is-active {
  opacity: 1;
}

.variant-header .nav-label {
  padding-bottom: 2px;
}

.variant-header .nav-label::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left; /* Mantenemos left fijo para evitar el glitch al salir */
  transition: transform var(--duration-base) var(--ease-out);
}

.variant-header:hover .nav-label::after,
.variant-header.is-active .nav-label::after {
  transform: scaleX(1);
}

/* === VARIANTE 2: MENU (Mobile Fullscreen) === */
.variant-menu {
  color: var(--color-accent);
}

.variant-menu .nav-text {
  font-family: var(--font-screamer);
  font-size: var(--text-huge);
  font-weight: var(--weight-black);
  letter-spacing: var(--tracking-tight);
  line-height: var(--leading-none);
  text-transform: uppercase;
  /* Le damos el aire al padre para que el overflow: hidden no ampute la línea */
  padding-bottom: 0.8rem; 
}

.variant-menu .nav-label::after {
  content: '';
  position: absolute;
  /* Bajamos la línea desde el label hacia el espacio que creó el padding del padre */
  bottom: -0.3rem; 
  left: 0;
  width: 100%;
  height: 1px;
  background: #FFFFFF;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--duration-slow) var(--ease-out);
}

.variant-menu:hover .nav-label::after {
  transform: scaleX(1);
}
</style>