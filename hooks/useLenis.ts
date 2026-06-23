import type Lenis from '@studio-freight/lenis';
import { useLenisContext } from '@/providers/LenisProvider';

export function useLenis(): Lenis | null {
  const lenisRef = useLenisContext();
  return lenisRef.current;
}
