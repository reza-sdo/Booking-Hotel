import { useEffect } from 'react';

export default function useOutsideClick(ref, exceptionId, cb) {
  useEffect(() => {
    function outsideClickHandler(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        event.target.id !== exceptionId
      ) {
        cb();
      }
    }
    document.addEventListener('mousedown', outsideClickHandler);

    return () => {
      document.removeEventListener('mousedown', outsideClickHandler);
    };
  }, [ref, cb]);
}
