<template>
  <button 
    class="atom-menu-handler" 
    @click="$emit('toggle')"
    aria-label="Toggle Menu"
  >
    <span ref="textMenu" class="handler-text">Menu</span>
    <span ref="textClose" class="handler-text">Close</span>
  </button>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  isOpen: { type: Boolean, default: false }
})

defineEmits(['toggle'])

const textMenu = ref<HTMLElement | null>(null)
const textClose = ref<HTMLElement | null>(null)

// Configuración inicial basada en el prop
onMounted(() => {
  if (props.isOpen) {
    gsap.set(textMenu.value, { yPercent: -100, opacity: 0 })
    gsap.set(textClose.value, { yPercent: 0, opacity: 1 })
  } else {
    gsap.set(textMenu.value, { yPercent: 0, opacity: 1 })
    gsap.set(textClose.value, { yPercent: 100, opacity: 0 })
  }
})

// Reacciona a los cambios en el prop
watch(() => props.isOpen, (isNowOpen) => {
  const tl = gsap.timeline({ defaults: { duration: 0.4, ease: "power3.out" } })
  
  if (isNowOpen) {
    // Sube "Menu" y lo desaparece
    tl.to(textMenu.value, { yPercent: -100, opacity: 0 }, 0)
    // Sube "Close" desde abajo y lo aparece
    tl.fromTo(textClose.value, 
      { yPercent: 100, opacity: 0 }, 
      { yPercent: 0, opacity: 1 }, 
      0.05 // Ligero delay para suavidad
    )
  } else {
    // Baja "Close" y lo desaparece
    tl.to(textClose.value, { yPercent: -100, opacity: 0 }, 0)
    // Sube "Menu" desde abajo y lo aparece
    tl.fromTo(textMenu.value, 
      { yPercent: 100, opacity: 0 }, 
      { yPercent: 0, opacity: 1 }, 
      0.05
    )
  }
})
</script>

<style scoped>
.atom-menu-handler {
  position: relative;
  width: 3.5rem; /* Ancho fijo para que no parpadee entre "Menu" y "Close" */
  height: 1.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  color: inherit;
  font-family: var(--font-primary);
  font-size: var(--text-base);
  font-weight: var(--weight-medium);
  overflow: hidden;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
}

.handler-text {
  position: absolute;
  display: block;
  width: 100%;
  text-align: center;
  will-change: transform, opacity;
}
</style>