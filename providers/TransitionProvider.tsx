'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

interface TransitionContextValue {
  isTransitioning: boolean;
  startTransition: () => void;
  endTransition: () => void;
}

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startTransition = useCallback(() => setIsTransitioning(true), []);
  const endTransition = useCallback(() => setIsTransitioning(false), []);

  return (
    <TransitionContext.Provider value={{ isTransitioning, startTransition, endTransition }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransitionContext(): TransitionContextValue {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error('useTransitionContext must be used within TransitionProvider');
  return ctx;
}
