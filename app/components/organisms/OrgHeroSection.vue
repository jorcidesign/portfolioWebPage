<template>
  <section class="org-hero-section">
    <div class="hero__title" ref="titleRef">
      <AtomCreativeHeading :title="about.hero.title" />
    </div>

    <div class="hero__stage">
      <div class="hero__content reveal-curtain" style="--delay: 150ms">
        <div class="hero__services">
          <p
            v-for="(skill, i) in skills"
            :key="skill"
            class="reveal-curtain"
            :style="{ '--delay': `${280 + i * 70}ms` }"
          >
            <span>/ {{ skill }}</span>
          </p>
        </div>
      </div>

      <figure class="hero__image reveal-curtain" style="--delay: 200ms">
        <img
          :src="about.hero.image"
          :alt="about.hero.title"
          loading="eager"
          decoding="async"
        />
      </figure>

      <div class="hero__location">
        {{ about.hero.location }}
      </div>
    </div>

    <div class="hero__description reveal-curtain" style="--delay: 450ms">
      <p>{{ about.hero.paragraph.join(" ") }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { about } from "~/data/about";

const skills = computed(() =>
  about.hero.skills.split("/").map((s) => s.trim()).filter(Boolean)
);

const titleRef = ref<HTMLElement | null>(null);

let rafId: number | null = null;

function onScroll() {
  if (!titleRef.value) return;
  if (rafId) return;

  rafId = requestAnimationFrame(() => {
    const offset = window.scrollY * -0.4;

    if (titleRef.value) {
      titleRef.value.style.transform = `translateY(${offset}px)`;
    }

    rafId = null;
  });
}

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);

  if (rafId) {
    cancelAnimationFrame(rafId);
  }
});
</script>

<style scoped>
.org-hero-section {
  position: relative;
  min-height: 100svh;

  background: var(--color-bg);

  overflow-x: hidden;
  overflow-y: visible;

  padding-top: calc(var(--nav-height) + var(--space-8));
  padding-bottom: var(--space-20);
}

.hero__title {
  position: relative;
  z-index: 30;

  width: 100%;

  margin-bottom: -5rem;

  will-change: transform;
}

/*
|--------------------------------------------------------------------------
| STAGE
|--------------------------------------------------------------------------
*/

.hero__stage {
  position: relative;

  width: min(1100px, 100%);
  height: 460px;

  margin-inline: auto;

  --hero-offset: 50px;
}

/*
|--------------------------------------------------------------------------
| CARD
|--------------------------------------------------------------------------
*/

.hero__content {
  position: absolute;

  left: 50%;
  top: calc(120px + var(--hero-offset));

  transform: translateX(-50%);

  width: 820px;
  height: 340px;

  background: var(--color-surface);

  z-index: 1;
}

/*
|--------------------------------------------------------------------------
| SERVICES
|--------------------------------------------------------------------------
*/

.hero__services {
  position: absolute;

  left: 4rem;
  bottom: 3rem;

  z-index: 2;
}

.hero__services p {
  margin: 0;
}

.hero__services span {
  display: block;

  font-family: var(--font-primary);

  font-size: var(--text-xs);
  font-weight: var(--weight-bold);

  line-height: 1.4;

  text-transform: uppercase;

  color: var(--color-ink);
}

/*
|--------------------------------------------------------------------------
| IMAGE
|--------------------------------------------------------------------------
*/

.hero__image {
  position: absolute;

  width: 330px;
  height: 440px;

  left: 57%;
  top: var(--hero-offset);

  transform: translateX(-50%);

  z-index: 10;
}

.hero__image img {
  width: 100%;
  height: 100%;

  object-fit: cover;
  object-position: center;

  display: block;

  filter: grayscale(100%) contrast(1.08);
}

/*
|--------------------------------------------------------------------------
| LOCATION
|--------------------------------------------------------------------------
*/

.hero__location {
  position: absolute;

  top: calc(30px + var(--hero-offset));
  left: calc(57% + 210px);

  z-index: 12;

  white-space: nowrap;

  font-family: var(--font-primary);

  font-size: var(--text-2xs);

  letter-spacing: 0.55em;

  text-transform: uppercase;

  color: var(--color-ink-60);
}

/*
|--------------------------------------------------------------------------
| DESCRIPTION
|--------------------------------------------------------------------------
*/

.hero__description {
  max-width: 540px;

  margin-inline: auto;
  margin-top: 5rem;

  text-align: center;
}

.hero__description p {
  font-family: var(--font-primary);

  font-size: var(--text-xs);

  line-height: 1.7;

  letter-spacing: 0.08em;

  text-transform: uppercase;

  color: var(--color-ink-60);
}

/*
|--------------------------------------------------------------------------
| REVEAL
|--------------------------------------------------------------------------
*/

.reveal-curtain {
  animation: curtain-reveal 800ms cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: var(--delay, 0ms);
}

@keyframes curtain-reveal {
  from {
    clip-path: inset(0 0 100% 0);
    opacity: 0;
  }

  to {
    clip-path: inset(0 0 0 0);
    opacity: 1;
  }
}

/*
|--------------------------------------------------------------------------
| TABLET
|--------------------------------------------------------------------------
*/

@media (max-width: 992px) {
  .hero__title {
    margin-bottom: -3rem;
  }

  .hero__stage {
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .hero__content {
    position: relative;

    top: auto;
    left: auto;

    transform: none;

    width: 100%;
    max-width: 680px;

    min-height: 280px;

    padding: 2rem;
  }

  .hero__image {
    position: relative;

    top: -60px;
    left: auto;

    transform: none;

    width: 220px;
    height: 280px;

    margin-bottom: -60px;
  }

  .hero__location {
    position: relative;

    left: auto;
    top: auto;

    margin-top: 1rem;

    letter-spacing: 0.35em;
  }

  .hero__services {
    position: static;
  }
}

/*
|--------------------------------------------------------------------------
| MOBILE
|--------------------------------------------------------------------------
*/

@media (max-width: 640px) {
  .hero__stage {
    gap: 0;
  }

  .hero__content {
    padding: 1.5rem;
  }

  .hero__image {
    width: 180px;
    height: 230px;
  }

  .hero__description {
    padding-inline: 1rem;
  }

  .hero__description p {
    font-size: 0.72rem;
  }
}
</style>
