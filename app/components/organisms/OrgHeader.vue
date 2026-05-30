<template>
  <header class="nav-container">
    <div class="nav-wrapper">

      <div class="logo interactive-element">
        <AtomLogo />
      </div>

      <div class="nav desktop-only interactive-element">
        <nav class="nav-list">
          <AtomNavLink to="/works"    :with-comma="true">Works</AtomNavLink>
          <AtomNavLink to="/about"    :with-comma="true">About</AtomNavLink>
          <AtomNavLink to="/contact">Contact</AtomNavLink>
        </nav>
      </div>

      <div class="socials desktop-only interactive-element">
  <AtomLink :href="contact.socials.github" is-external>Github</AtomLink>
  <AtomLink :href="contact.socials.linkedin" is-external>LinkedIn</AtomLink>
  <AtomLink :href="`mailto:${contact.email}`" is-external>Email</AtomLink>
</div>

      <div class="menu-toggle mobile-only interactive-element">
        <AtomMenuHandler
          :is-open="isMenuOpen"
          @toggle="$emit('toggle-menu')"
        />
      </div>

    </div>
  </header>
</template>

<script setup lang="ts">
import { contact } from '~/data/contact'

defineProps({
  isMenuOpen: { type: Boolean, default: false }
})
defineEmits(['toggle-menu'])
</script>
<style scoped>
.nav-container {
  --header-px:        clamp(1rem, 1.5vw, 1.5rem);
  --header-pt:        1rem;
  --header-links-gap: 0.75rem;
  --header-nav-gap:   0.15rem;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--nav-height);
  z-index: var(--z-nav);
  color: #ffffff;
  mix-blend-mode: difference;
  pointer-events: none;
}

.nav-wrapper {
  display: grid;
  grid-template-columns: 1fr auto 1fr; 
  align-items: start;
  width: 100%;
  height: 100%;
  padding-top: var(--header-pt);
  padding-inline: var(--header-px);
}

.interactive-element { pointer-events: auto; }

.logo {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: visible; 
  min-width: 0;
}

.nav {
  display: flex;
  align-items: flex-start;
  justify-content: center; 
}

.nav-list {
  display: flex;
  align-items: baseline;
  gap: var(--header-nav-gap);
}

.socials {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end; 
  gap: var(--header-links-gap);
}

.menu-toggle {
  display: none;
  align-items: flex-start;
  justify-content: flex-end;
}

.mobile-only { display: none; }

@media (max-width: 992px) {
  .nav-container {
    --header-px: 1rem;
    --header-pt: 0.75rem;
    height: var(--nav-height-mobile);
  }

  .nav-wrapper {
    grid-template-columns: 1fr auto; 
    gap: 0;
  }

  .desktop-only { display: none; }
  .menu-toggle  { display: flex; }
}
</style>