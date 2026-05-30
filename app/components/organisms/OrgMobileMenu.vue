<template>
  <div class="org-mobile-menu" ref="menuRef">
    <div class="menu-inner">
      
      <div class="menu-center">
        <div class="nav-link-wrapper">
          <AtomNavLink to="/" variant="menu" subtext="intro" @click="closeMenu">Home</AtomNavLink>
        </div>
        <div class="nav-link-wrapper">
          <AtomNavLink to="/works" variant="menu" @click="closeMenu">Works</AtomNavLink>
        </div>
        <div class="nav-link-wrapper">
          <AtomNavLink to="/about" variant="menu" @click="closeMenu">About</AtomNavLink>
        </div>
        <div class="nav-link-wrapper">
          <AtomNavLink to="/contact" variant="menu" @click="closeMenu">Contact</AtomNavLink>
        </div>
      </div>

      <div class="menu-bottom" v-if="contact">
        <div class="footer-col left">
          <AtomLink :href="`mailto:${contact.email}`" class="footer-link">{{ contact.email }}</AtomLink>
          <AtomLink :href="`tel:${contact.phoneLink}`" class="footer-link">{{ contact.phoneDisplay }}</AtomLink>
        </div>
        <div class="footer-col right">
          <AtomLink :href="contact.socials?.github" is-external class="footer-link">Github</AtomLink>
          <AtomLink :href="contact.socials?.linkedin" is-external class="footer-link">LinkedIn</AtomLink>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import gsap from 'gsap'
import { contact } from '~/data/contact'

const props = defineProps({
  isOpen: { type: Boolean, default: false }
})

const emit = defineEmits(['close'])
const menuRef = ref<HTMLElement | null>(null)
let tl: gsap.core.Timeline | null = null

const closeMenu = () => emit('close')

onMounted(() => {
  gsap.set(menuRef.value, { yPercent: -100, display: 'none' })
})

watch(() => props.isOpen, (isNowOpen) => {
  if (!menuRef.value) return

  const navLinks = menuRef.value.querySelectorAll('.nav-link-wrapper')
  const bottomLinks = menuRef.value.querySelectorAll('.footer-link')

  if (tl) tl.kill()
  tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } })

  if (isNowOpen) {
    gsap.set(menuRef.value, { display: 'block' })
    tl.to(menuRef.value, { yPercent: 0, duration: 0.8 }, 0)
    tl.fromTo(navLinks,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' },
      0.3
    )
    tl.fromTo(bottomLinks,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power3.out' },
      0.5
    )
  } else {
    tl.to(navLinks, { y: -80, duration: 0.4, stagger: 0.04, ease: 'power3.in' }, 0)
    tl.to(bottomLinks, { y: -30, duration: 0.3, stagger: 0.02, ease: 'power3.in' }, 0)
    tl.to(menuRef.value, { yPercent: -100, duration: 0.7 }, 0.2)
    tl.set(navLinks, { y: 60, opacity: 0 })
    tl.set(bottomLinks, { y: 20, opacity: 0 })
    tl.set(menuRef.value, { display: 'none' })
  }
})
</script>

<style scoped>
.org-mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100svh;
  background-color: var(--color-ink);
  z-index: 40;
  will-change: transform;
}

.menu-inner {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: calc(var(--nav-height-mobile) + 2rem) var(--px) 2rem var(--px);
}

.menu-center {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--space-10);
}

.nav-link-wrapper {
  /* sin overflow hidden — era el culpable del corte visual */
  will-change: transform, opacity;
}

.menu-bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-col.left {
  align-items: flex-start;
}

.footer-col.right {
  align-items: flex-end;
}

:deep(.atom-link) {
  color: var(--color-bg) !important;
}

@media (min-width: 993px) {
  .org-mobile-menu {
    display: none !important;
  }
}
</style>