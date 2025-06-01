import { gsap } from 'gsap';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-router-dom';
import OutlineButton from '../button/outlineButton';

export default function ProductListCard({ item, cardBackground }) {
  const cardRef = useRef(null);
  const { contextSafe } = useGSAP({ scope: cardRef });

  //當滑鼠進入的時候
  const onMouseEnterCard = contextSafe(() => {
    gsap.to(['.card-move', '.card-img-top', '.badge', '.btn'], {
      y: (i, e) => (e.classList.contains('card-move') ? -20 : undefined),
      scale: (i, e) => (e.classList.contains('card-img-top') ? 1.2 : undefined),
      letterSpacing: (i, e) =>
        e.classList.contains('badge') ? '0.16em' : undefined,
      opacity: (i, e) => (e.classList.contains('btn') ? 1 : undefined),

      duration: 0.5,
    });
  });
  //當滑鼠離開的時候
  const onMouseLeaveCard = contextSafe(() => {
    gsap.to(['.card-move', '.card-img-top', '.badge', '.btn'], {
      y: (i, e) => (e.classList.contains('card-move') ? 0 : undefined),
      scale: (i, e) => (e.classList.contains('card-img-top') ? 1 : undefined),
      letterSpacing: (i, e) =>
        e.classList.contains('badge') ? '0.12em' : undefined,
      opacity: (i, el) => (el.classList.contains('btn') ? 0 : undefined),
      duration: 0.5,
    });
  });

  return (
    <>
      <div>
        <div
          ref={cardRef}
          className={`card border-0 pt-sm-13 pb-sm-11 bg-${cardBackground}`}
          onMouseEnter={onMouseEnterCard}
          onMouseLeave={onMouseLeaveCard}
        >
          <div className='card-move'>
            <img
              src={item.image}
              className='card-img-top object-fit-contain'
              alt='longBoard'
            />
            <div className='card-body pt-3 pb-0'>
              <div className='mb-3'>
                <h6 className='mb-3'>
                  <span className='fs-7 badge text-bg-success-20 fw-normal'>
                    {item.grade}
                  </span>
                </h6>
                <h5 className='card-title mb-3'>{item.title}</h5>
                <p className='fs-6'>${item.price}</p>
              </div>
              <Link to={'/product/:id'}>
                <OutlineButton
                  btnName={'來去看看'}
                  btnColor={'primary-100'}
                  isVisible={0}
                  isArrowVisible={true}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
