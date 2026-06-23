import { useTransitionContext } from '@/providers/TransitionProvider';

export function usePageTransition() {
  return useTransitionContext();
}
