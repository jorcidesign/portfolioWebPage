import { useEffect, type RefObject, type DependencyList } from 'react';
import gsap from 'gsap';

export function useGSAP(
  callback: () => void,
  scope?: RefObject<Element | null>,
  deps: DependencyList = [],
) {
  useEffect(() => {
    const ctx = gsap.context(callback, scope?.current ?? undefined);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
