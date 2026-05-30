import Lenis from '@studio-freight/lenis'

export const useSmoothScroll = () => {
  // Guardamos la instancia para poder acceder a ella desde cualquier componente
  const lenis = useState<Lenis | null>('lenis', () => null)
  let reqId: number

  const initSmoothScroll = () => {
    if (lenis.value) return // Evita múltiples instancias

    lenis.value = new Lenis({
      duration: 1.2, // La fricción nivel Awwwards que querías
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })

    const raf = (time: number) => {
      lenis.value?.raf(time)
      reqId = requestAnimationFrame(raf)
    }

    reqId = requestAnimationFrame(raf)
  }

  const destroySmoothScroll = () => {
    if (lenis.value) {
      lenis.value.destroy()
      lenis.value = null
    }
    if (reqId) {
      cancelAnimationFrame(reqId)
    }
  }

  return {
    initSmoothScroll,
    destroySmoothScroll,
    lenis
  }
}