<template>
    
  <main class="home-test">
    <!-- <div>
      <h1>¡Hola, Jorge! 🚀</h1>
      <p>Si el fondo es crema, la letra es oscura, y haces scroll hacia abajo de forma súper suave... la Fase 1 es un éxito total.</p>
    </div> -->
    <OrgHeroSection />
    <div class="spacer">Sigue bajando... (Prueba la fricción del scroll) 👇</div>
    
    <h2>¡Llegaste al final! 🎉</h2>
  </main>
</template>

<style scoped>
.home-test {
  /* Forzamos que la página sea el doble de alta que la pantalla para probar el scroll */
  min-height: 200vh; 
  padding: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

h1 {
  font-size: clamp(3rem, 8vw, 6rem);
  text-transform: uppercase;
  margin-bottom: 1rem;
}

h2 {
  font-size: clamp(2rem, 5vw, 4rem);
}

.spacer {
  font-size: 2rem;
  opacity: 0.5;
}
</style>