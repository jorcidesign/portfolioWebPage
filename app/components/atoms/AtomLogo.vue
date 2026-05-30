<template>
  <NuxtLink to="/" class="atom-logo" @mouseenter="onEnter" @mouseleave="onLeave">
    <span class="logo-first">Jorge</span>
    <span class="logo-last-wrapper" ref="wrapperRef">
      <span
        v-for="(char, index) in chars"
        :key="index"
        class="logo-char"
        :ref="(el) => setCharRef(el, index)"
      >{{ char }}</span>
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import gsap from 'gsap'

const TEXT = 'Del Aguila'
const chars = TEXT.split('').map(c => c === ' ' ? '\u00A0' : c)

const wrapperRef = ref<HTMLElement | null>(null)
const charRefs: HTMLElement[] = []
let tl: gsap.core.Timeline | null = null
let measuredWidth = 0

const setCharRef = (el: unknown, index: number) => {
  if (el instanceof HTMLElement) charRefs[index] = el
}

onMounted(async () => {
  await nextTick()
  if (wrapperRef.value) {
    gsap.set(wrapperRef.value, { width: 'auto', paddingLeft: '0.25em' })
    measuredWidth = wrapperRef.value.scrollWidth
    gsap.set(wrapperRef.value, { width: 0, paddingLeft: 0, overflow: 'visible' })
  }
  gsap.set(charRefs, { yPercent: 120, opacity: 0 })
})

const onEnter = () => {
  if (tl) tl.kill()
  tl = gsap.timeline()
  tl.to(wrapperRef.value, {
    width: measuredWidth,
    paddingLeft: '0.25em',
    duration: 0.05,
    ease: 'none'
  }, 0)
  tl.to(charRefs, {
    yPercent: 0,
    opacity: 1,
    duration: 0.55,
    ease: 'power3.out',
    stagger: { each: 0.04, from: 'start' }
  }, 0)
}

const onLeave = () => {
  if (tl) tl.kill()
  tl = gsap.timeline()
  tl.to(charRefs, {
    yPercent: -120,
    opacity: 0,
    duration: 0.4,
    ease: 'power3.in',
    stagger: { each: 0.03, from: 'end' }
  }, 0)
  tl.to(wrapperRef.value, {
    width: 0,
    paddingLeft: 0,
    duration: 0.25,
    ease: 'power2.in'
  }, 0.15)
}
</script>

<style scoped>
.atom-logo {
  display: inline-flex;
  align-items: baseline;
  font-family: var(--font-primary);
  font-size: var(--text-base);
  font-weight: var(--weight-bold);
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  line-height: 1;
  overflow: visible;
}

.logo-first {
  flex-shrink: 0;
}

.logo-last-wrapper {
  display: inline-flex;
  align-items: baseline;
  overflow: visible;  /* ← sin clip en ningún lado */
  width: 0;
  white-space: nowrap;
}

.logo-char {
  display: inline-block;
}
</style>