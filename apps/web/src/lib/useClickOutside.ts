import { useEffect } from 'react';

export function useClickOutside(
  selector: string,
  callback: () => void,
  isActive: boolean
) {
  useEffect(() => {
    if (!isActive) return;

    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;

      const modal = document.querySelector(selector);
      const target = event.target;
      const isClickedOutside = !modal?.contains(target);
      const isClickedInsideLink = modal?.contains(target);

      if (isClickedOutside) {
        return callback();
      }

      if (isClickedInsideLink) {
        const isLinkClicked = target.closest('a');
        if (isLinkClicked) return callback();
      }
    };

    document.addEventListener('click', onClick);

    return () => document.removeEventListener('click', onClick);
  }, [selector, callback, isActive]);
}
