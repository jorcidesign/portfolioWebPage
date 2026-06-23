'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type { CursorType } from '@/data/types';

interface CursorState {
  type: CursorType;
  label: string;
}

interface CursorContextValue extends CursorState {
  setCursor: (type: CursorType, label?: string) => void;
  resetCursor: () => void;
}

const DEFAULT: CursorState = { type: 'default', label: '' };
const CursorContext = createContext<CursorContextValue | null>(null);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CursorState>(DEFAULT);

  const setCursor = useCallback((type: CursorType, label = '') => {
    setState({ type, label });
  }, []);

  const resetCursor = useCallback(() => setState(DEFAULT), []);

  return (
    <CursorContext.Provider value={{ ...state, setCursor, resetCursor }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursorContext(): CursorContextValue {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error('useCursorContext must be used within CursorProvider');
  return ctx;
}
