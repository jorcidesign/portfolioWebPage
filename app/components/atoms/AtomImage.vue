<template>
  <div :class="['atom-image-wrapper', `aspect-${aspect}`]">
    <img 
      :src="src" 
      :alt="alt" 
      class="atom-image" 
      loading="lazy"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: 'Image' },
  aspect: { type: String, default: 'auto' } // square, video, portrait, cinema, auto
})
</script>

<style scoped>
.atom-image-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: var(--radius-md); /* Puedes pasarlo por prop si varía mucho */
  background-color: var(--color-surface); /* Color de carga mientras aparece la img */
}

/* Aspect Ratios controlados por CSS moderno */
.aspect-square { aspect-ratio: 1 / 1; }
.aspect-video { aspect-ratio: 16 / 9; }
.aspect-portrait { aspect-ratio: 3 / 4; }
.aspect-cinema { aspect-ratio: 21 / 9; }
.aspect-auto { aspect-ratio: auto; }

.atom-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  /* GSAP usará scale en esta imagen para el efecto de entrada */
  will-change: transform;
  transform-origin: center center;
}

/* Ajustes Móviles */
@media (max-width: 768px) {
  .atom-image-wrapper {
    /* En móvil los bordes redondeados suelen ser ligeramente más pequeños */
    border-radius: var(--radius-sm);
  }
  
  /* Forzamos proporciones más amigables para scroll vertical en móvil */
  .aspect-cinema {
    aspect-ratio: 16 / 9; /* Cinema es muy estrecho para móvil */
  }
}
</style>