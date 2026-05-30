<template>
  <div id="app-wrapper">
    <OrgHeader :isMenuOpen="isMenuOpen" @toggle-menu="toggleMenu" />

    <OrgMobileMenu :isOpen="isMenuOpen" @close="closeMenu" />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

// ... El resto de tu código de Lenis queda igual ...
const { initSmoothScroll, destroySmoothScroll } = useSmoothScroll()

onMounted(() => {
  initSmoothScroll()
})

onBeforeUnmount(() => {
  destroySmoothScroll()
})
</script>