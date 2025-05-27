import { gsap } from 'gsap';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

export const useCardHoverAnimation = () => {
  const cardRef = useRef(null);
  const { contextSafe } = useGSAP({ scope: cardRef });

  const onMouseEnterCard = contextSafe(() => {
    gsap.to([cardRef.current, '.card-img-top', '.badge', '.btn'], {
      y: (i, e) => (e === cardRef.current ? -30 : undefined),
      scale: (i, e) => (e.classList.contains('card-img-top') ? 1.2 : undefined),
      letterSpacing: (i, e) =>
        e.classList.contains('badge') ? '0.16em' : undefined,
      opacity: (i, e) => (e.classList.contains('btn') ? 1 : undefined),

      duration: 0.5,
    });
  });

  const onMouseLeaveCard = contextSafe(() => {
    gsap.to([cardRef.current, '.card-img-top', '.badge', '.btn'], {
      y: (i, e) => (e === cardRef.current ? 0 : undefined),
      scale: (i, e) => (e.classList.contains('card-img-top') ? 1 : undefined),
      letterSpacing: (i, e) =>
        e.classList.contains('badge') ? '0.12em' : undefined,
      opacity: (i, el) => (el.classList.contains('btn') ? 0 : undefined),
      duration: 0.5,
    });
  });

  return { cardRef, onMouseEnterCard, onMouseLeaveCard };
};
