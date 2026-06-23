import { useRef, useCallback } from 'react';

type SplitMode = 'chars' | 'words' | 'lines';

interface SplitResult {
  elements: HTMLElement[];
  revert: () => void;
}

export function useSplitText() {
  const cache = useRef<Map<HTMLElement, string>>(new Map());

  const split = useCallback(
    (el: HTMLElement, mode: SplitMode = 'lines'): SplitResult => {
      const original = el.innerHTML;
      cache.current.set(el, original);
      const revert = () => { el.innerHTML = original; };
      const text = el.textContent ?? '';

      if (mode === 'chars') {
        el.innerHTML = text
          .split('')
          .map(
            (c) =>
              `<span class="s-char" style="display:inline-block">${c === ' ' ? '&nbsp;' : c}</span>`,
          )
          .join('');
        return { elements: [...el.querySelectorAll<HTMLElement>('.s-char')], revert };
      }

      if (mode === 'words') {
        el.innerHTML = text
          .split(/\s+/)
          .filter(Boolean)
          .map((w) => `<span class="s-word" style="display:inline-block">${w}</span>`)
          .join(' ');
        return { elements: [...el.querySelectorAll<HTMLElement>('.s-word')], revert };
      }

      // lines — group word spans by their top offset
      el.innerHTML = text
        .split(/\s+/)
        .filter(Boolean)
        .map((w) => `<span class="s-w" style="display:inline-block;margin-right:0.28em">${w}</span>`)
        .join('');

      const wordSpans = [...el.querySelectorAll<HTMLElement>('.s-w')];
      const lineMap = new Map<number, HTMLElement[]>();

      wordSpans.forEach((span) => {
        const top = Math.round(span.getBoundingClientRect().top);
        if (!lineMap.has(top)) lineMap.set(top, []);
        lineMap.get(top)!.push(span);
      });

      el.innerHTML = '';
      const lineInners: HTMLElement[] = [];

      lineMap.forEach((words) => {
        const outer = document.createElement('span');
        outer.style.cssText = 'display:block;overflow:hidden';
        const inner = document.createElement('span');
        inner.style.display = 'block';
        words.forEach((w) => inner.appendChild(w));
        outer.appendChild(inner);
        el.appendChild(outer);
        lineInners.push(inner);
      });

      return { elements: lineInners, revert };
    },
    [],
  );

  return { split };
}
