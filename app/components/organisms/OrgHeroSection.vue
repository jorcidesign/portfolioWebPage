<template>
  <section class="org-hero-section" ref="sectionRef">
    <div class="hero-container">

      <!-- ① TÍTULO — parallax ref para scroll -->
      <div class="hero-title" ref="titleRef">
        <AtomCreativeHeading :title="about.hero.title" />
      </div>

      <!--
        ② HERO DESIGNER — el rectángulo del diseño original.
        Estructura fiel al HTML de referencia:
        .hero-designer
          .hero-designer__descr  (skills, izquierda)
          .hero-designer__img    (imagen, derecha — sobresale arriba)
        + .hero-based            (derecha del rectángulo, desktop)
      -->
      <div class="hero-designer reveal-curtain" style="--delay: 150ms">

        <!-- Textos / disciplinas — izquierda del rectángulo -->
        <div class="hero-designer__descr">
          <p
            v-for="(skill, i) in about.hero.skills"
            :key="skill"
            class="reveal-curtain"
            :style="{ '--delay': `${280 + i * 70}ms` }"
          >
            <span>/ {{ skill }}</span>
          </p>
        </div>

        <!-- Imagen — derecha, sobresale hacia arriba -->
        <div class="hero-designer__img reveal-curtain" style="--delay: 200ms">
          <img
            :src="about.hero.image"
            :alt="`${about.hero.name} — ${about.hero.title}`"
            loading="eager"
            decoding="async"
          />
        </div>

      </div>

      <!-- "Based in Peru" — fuera del rectángulo, alineado a la derecha -->
      <div class="hero-based reveal-curtain" style="--delay: 320ms">
        <span v-for="word in about.hero.location.split(' ')" :key="word">
          {{ word }}
        </span>
      </div>

      <!-- ③ Bio paragraph -->
      <div class="hero-description reveal-curtain" style="--delay: 450ms">
        <p>{{ about.hero.bio }}</p>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// ─── Datos (reemplaza con import real de ~/data/about) ──────────
const about = {
  hero: {
    name: 'Jorge Del Aguila',
    title: 'Creative Developer',
    skills: ['Frontend Development', 'Backend Development', 'QA Automation'],
    location: 'Based in Peru',
    bio: "I'm a systems engineering student and creative developer building digital experiences that sit at the intersection of code and design — from web apps to interactive tools.",
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&fit=crop&crop=face',
  },
}

// ─── Parallax del título ────────────────────────────────────────
const titleRef = ref<HTMLElement | null>(null)
let rafId: number | null = null

function onScroll() {
  if (!titleRef.value) return
  if (rafId) return // throttle con rAF

  rafId = requestAnimationFrame(() => {
    const scrollY = window.scrollY
    // El título sube 0.4x más rápido que el scroll (parallax factor)
    const offset = scrollY * -0.4
    if (titleRef.value) {
      titleRef.value.style.transform = `translateY(${offset}px)`
    }
    rafId = null
  })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<style scoped>
/* ═══════════════════════════════════════════════════════════════
   SECTION
═══════════════════════════════════════════════════════════════ */
.org-hero-section {
  position: relative;
  width: 100%;
  min-height: 100svh;

  padding-top: calc(var(--nav-height) + var(--space-8));
  padding-bottom: var(--space-20);
  padding-inline: var(--px);

  background-color: var(--color-bg);
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
}

/* ═══════════════════════════════════════════════════════════════
   CONTAINER
═══════════════════════════════════════════════════════════════ */
.hero-container {
  width: 100%;
  max-width: var(--container);
  margin-inline: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  /* Sin gap fijo — lo manejamos con margin en cada bloque */
}

/* ═══════════════════════════════════════════════════════════════
   ① TÍTULO con overlap
   will-change para el parallax JS
═══════════════════════════════════════════════════════════════ */
.hero-title {
  position: relative;
  z-index: var(--z-content);
  width: 100%;
  text-align: center;
  will-change: transform;

  /*
   * El overlap: jala el .hero-designer hacia arriba
   * para que el título se superponga sobre el borde superior del rectángulo.
   * Valor fijo en px para que sea predecible.
   */
  margin-bottom: -2.5rem;
}

/* ═══════════════════════════════════════════════════════════════
   ② HERO DESIGNER — el rectángulo horizontal del diseño

   Estructura:
   [  .hero-designer__descr  |  .hero-designer__img  ]
   □□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□

   La imagen sobresale del rectángulo hacia arriba con
   margin-top negativo y está pegada a la derecha.
═══════════════════════════════════════════════════════════════ */
.hero-designer {
  position: relative;
  z-index: var(--z-base);
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: flex-end; /* el contenido se alinea al fondo del rectángulo */
  justify-content: space-between;

  /* El rectángulo: fondo gris cálido, sin bordes */
  background-color: var(--color-surface);

  /*
   * Altura del rectángulo: más baja que la imagen para que sobresalga.
   * La imagen tiene ~280px de alto → el rect tiene ~180px
   * → la imagen sobresale ~100px hacia arriba.
   */
  min-height: clamp(140px, 18vh, 200px);

  padding-left: var(--px);
  padding-right: 0; /* La imagen llega hasta el borde derecho */
  padding-bottom: var(--space-6);

  margin-bottom: 0;
}

/* ─── Disciplinas (izquierda del rectángulo) ───────────────── */
.hero-designer__descr {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  align-self: center;
}

.hero-designer__descr p {
  margin: 0;
}

.hero-designer__descr p span {
  font-family: var(--font-primary);
  font-size: var(--text-xs);
  font-weight: var(--weight-bold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-ink);
  line-height: var(--leading-snug);
  display: block;
}

/* ─── Imagen (derecha, sobresale arriba) ───────────────────── */
.hero-designer__img {
  position: relative;
  flex-shrink: 0;

  /*
   * Ancho de la imagen: proporcional al viewport, cuadrada.
   * La imagen sobresale hacia arriba gracias a margin-top negativo.
   */
  width: clamp(180px, 26vh, 300px);
  aspect-ratio: 1 / 1;

  /* Sobresale hacia arriba del rectángulo */
  margin-top: clamp(-120px, -15vh, -100px);
  /* Pegada al borde derecho del rectángulo */
  margin-right: 0;
  align-self: flex-end;

  overflow: hidden;
}

.hero-designer__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;

  /* Blanco y negro editorial */
  filter: grayscale(100%) contrast(1.08);

  display: block;
}

/* ═══════════════════════════════════════════════════════════════
   "BASED IN PERU" — debajo-derecha del rectángulo
   Mimics the original: letras espaciadas, pequeñas, alineadas derecha
═══════════════════════════════════════════════════════════════ */
.hero-based {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: var(--space-4);

  padding-top: var(--space-3);
  padding-right: clamp(var(--space-4), 4vw, var(--space-12));
}

.hero-based span {
  font-family: var(--font-primary);
  font-size: var(--text-2xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-ink-60);
}

/* ═══════════════════════════════════════════════════════════════
   BIO PARAGRAPH
═══════════════════════════════════════════════════════════════ */
.hero-description {
  margin-top: var(--space-12);
  max-width: min(600px, 85ch);
  text-align: center;
}

.hero-description p {
  font-family: var(--font-primary);
  font-size: var(--text-xs);
  font-weight: var(--weight-regular);
  letter-spacing: var(--tracking-wider);
  line-height: var(--leading-loose);
  text-transform: uppercase;
  color: var(--color-ink-60);
}

/* ═══════════════════════════════════════════════════════════════
   ANIMACIÓN — TELÓN DESDE ARRIBA
   clip-path reveal + translateY
═══════════════════════════════════════════════════════════════ */
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
    clip-path: inset(0 0 0% 0);
    opacity: 1;
  }
}

/* ═══════════════════════════════════════════════════════════════
   RESPONSIVE — MOBILE (≤ 992px)
═══════════════════════════════════════════════════════════════ */
@media (max-width: 992px) {
  .org-hero-section {
    padding-top: calc(var(--nav-height-mobile) + var(--space-4));
    padding-bottom: var(--space-16);
    align-items: flex-start;
  }

  /* Overlap más pequeño en mobile */
  .hero-title {
    margin-bottom: -1.5rem;
  }

  /*
   * En mobile: el rectángulo cambia layout.
   * Imagen a la IZQUIERDA, skills a la derecha (como en el screenshot mobile).
   */
  .hero-designer {
    flex-direction: row;
    align-items: flex-end;
    padding-left: 0;
    padding-bottom: var(--space-4);
    min-height: clamp(110px, 25vw, 160px);
    gap: var(--space-5);
  }

  .hero-designer__img {
    width: clamp(120px, 35vw, 180px);
    margin-top: clamp(-80px, -12vw, -60px);
    margin-right: unset;
    margin-left: 0; /* Ahora va a la izquierda */
    order: -1; /* Imagen primero */
  }

  .hero-designer__descr {
    flex: 1;
    align-self: center;
    gap: var(--space-2);
  }

  .hero-designer__descr p span {
    font-size: clamp(0.6rem, 2.5vw, 0.75rem);
  }

  .hero-based {
    justify-content: flex-start;
    padding-right: 0;
    padding-left: var(--space-2);
  }

  .hero-description {
    margin-top: var(--space-8);
  }

  .hero-description p {
    font-size: clamp(0.6rem, 2.5vw, 0.72rem);
  }
}

@media (max-width: 480px) {
  .hero-designer__descr p span {
    font-size: 0.6rem;
    letter-spacing: 0.04em;
  }
}
</style>