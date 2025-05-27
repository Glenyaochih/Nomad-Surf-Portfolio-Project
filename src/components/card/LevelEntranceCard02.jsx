import { useEffect, useMemo, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import DarkButtonLinearG from '../button/DarkButtonLinearG';

export default function LevelEntranceCard02({ data }) {
  const entrance2Ref = useRef(null);
  const { contextSafe } = useGSAP({ scope: entrance2Ref });
  const mm = useMemo(() => gsap.matchMedia(), []);
  const isDesktop = useMemo(() => window.matchMedia('(min-width: 576px)'), []);
  //使用useMemo 避免其他元件重新更新時重新觸發
  useEffect(() => {
    mm.add({
      '(min-width: 576px)': () => {},
    });

    return () => mm.revert();
  }, [mm]);

  const onMouseEnterEntrance = contextSafe(() => {
    //contextSafe 避免動畫還在運行,減少記憶體洩漏，確保效能
    //當寬度576px以上成立才觸發matchMedia
    if (isDesktop.matches) {
      gsap.fromTo(
        ['.btn', '.entrance-bg-image'],
        {
          y: (i, e) => (e.classList.contains('btn') ? 0 : undefined),
          x: (i, e) =>
            e.classList.contains('entrance-bg-image') ? 0 : undefined,
        },
        {
          opacity: (i, e) => (e.classList.contains('btn') ? 1 : undefined),
          y: (i, e) => (e.classList.contains('btn') ? -250 : undefined),
          x: (i, e) =>
            e.classList.contains('entrance-bg-image') ? 50 : undefined,
          duration: 0.5,
        }
      );
      gsap.to(
        [
          entrance2Ref.current,
          '.filter-sm-l',
          '.half-filter-r',
          '.top-space-r',
        ],
        {
          backgroundImage: (i, e) =>
            e.classList.contains('filter-sm-l') ? 'none' : undefined,

          width: (i, e) =>
            e.classList.contains('half-filter-r') ? '50%' : undefined,
          opacity: (i, e) =>
            e.classList.contains('half-filter-r') ? 1 : undefined,
          x: (i, e) => (e.classList.contains('top-space-r') ? 10 : undefined),
          duration: 0.5,
        }
      );
    }
  });

  const onMouseLeaveEntrance = contextSafe(() => {
    if (isDesktop.matches) {
      gsap.fromTo(
        ['.btn', '.entrance-bg-image'],
        {
          y: (i, e) => (e.classList.contains('btn') ? -250 : undefined),
          x: (i, e) =>
            e.classList.contains('entrance-bg-image') ? 50 : undefined,
        },
        {
          opacity: (i, e) => (e.classList.contains('btn') ? 0 : undefined),
          y: (i, e) => (e.classList.contains('btn') ? 0 : undefined),
          x: (i, e) =>
            e.classList.contains('entrance-bg-image') ? 0 : undefined,
          duration: 0.5,
        }
      );
      gsap.to(['.filter-sm-l', '.half-filter-r', '.top-space-r'], {
        backgroundImage: (i, e) =>
          e.classList.contains('filter-sm-l')
            ? 'linear-gradient(to left, rgba(10, 39, 56, 0), rgba(10, 39, 56, 0.8))'
            : undefined,
        width: (i, e) =>
          e.classList.contains('half-filter-r') ? '25%' : undefined,
        opacity: (i, e) =>
          e.classList.contains('half-filter-r') ? 0 : undefined,
        x: (i, e) => (e.classList.contains('top-space-r') ? 0 : undefined),
        duration: 0.5,
      });
    }
  });
  return (
    <>
      <div>
        <div
          ref={entrance2Ref}
          onMouseEnter={onMouseEnterEntrance}
          onMouseLeave={onMouseLeaveEntrance}
          className='mid-grade position-relative border border-dark'
          // style={{
          //   backgroundImage: 'url(img/homePage/image-copy.png)',
          // }}
        >
          <img
            className='entrance-bg-image position-absolute'
            src='img/homePage/grade-02.webp'
            alt='entrance-bg-image'
          />
          <div className='position-absolute bottom-0 start-50 h-100  half-filter-r'></div>
          <div className='position-absolute bottom-0 h-100 w-100 filter-sm-l d-none d-sm-block'></div>
          <div className='position-absolute bottom-0 h-100 w-100 filter d-sm-none'></div>
          <div className=' container px-9 h-100 position-relative'>
            <div className='d-flex align-items-center flex-sm-row-reverse h-100'>
              <div className='d-flex flex-column gap-3 gap-sm-7 top-space-r h-100'>
                <div>
                  <h4 className='fs-sm-2'>
                    {data.level01}
                    <span lang='en'>{data.level02}</span>
                  </h4>
                  <h6 lang='zh-TW' className='fs-7 fs-sm-6'>
                    {data.title01}
                    <br className='d-none d-md-block' />
                    {data.title02}
                  </h6>
                </div>
                <div className='mt-sm-auto'>
                  <DarkButtonLinearG
                    btnName={'來去探索'}
                    btnType={'btn-dark'}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
