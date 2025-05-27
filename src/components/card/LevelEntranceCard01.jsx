import { useEffect, useMemo, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import DarkButtonLinearG from '../button/DarkButtonLinearG';

export default function LevelEntranceCard01({ data }) {
  const entranceRef = useRef(null);
  const { contextSafe } = useGSAP({ scope: entranceRef });
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
        ['.entrance-bg-image'],
        {
          y: (i, e) =>
            e.classList.contains('entrance-bg-image') ? 0 : undefined,
          x: (i, e) =>
            e.classList.contains('entrance-bg-image') ? 0 : undefined,
        },
        {
          y: (i, e) =>
            e.classList.contains('entrance-bg-image') ? 10 : undefined,
          x: (i, e) =>
            e.classList.contains('entrance-bg-image') ? 10 : undefined,
          duration: 0.5,
        }
      );

      gsap.to(
        [
          entranceRef.current,
          '.filter-sm-r',
          '.half-filter-l',
          '.top-space-l',
          '.btn',
        ],
        {
          backgroundPosition: (i, e) =>
            e === entranceRef.current ? '5px 5px' : undefined, //這是GSAP 內建的函式e為GSAP 監聽回來的dom元素
          backgroundImage: (i, e) =>
            e.classList.contains('filter-sm-r') ? 'none' : undefined,
          opacity: (i, e) =>
            e.classList.contains('half-filter-l') ? 1 : undefined,
          x: (i, e) => (e.classList.contains('top-space-l') ? 10 : undefined),
          visibility: (i, el) =>
            el.classList.contains('btn') ? 'visible' : undefined,
          duration: 0.6,
        }
      );
    }
  });

  const onMouseLeaveEntrance = contextSafe(() => {
    if (isDesktop.matches) {
      gsap.fromTo(
        ['.entrance-bg-image'],
        {
          y: (i, e) =>
            e.classList.contains('entrance-bg-image') ? 10 : undefined,
          x: (i, e) =>
            e.classList.contains('entrance-bg-image') ? 10 : undefined,
        },
        {
          y: (i, e) =>
            e.classList.contains('entrance-bg-image') ? 0 : undefined,
          x: (i, e) =>
            e.classList.contains('entrance-bg-image') ? 0 : undefined,
          duration: 0.5,
        }
      );
      gsap.to(
        [
          entranceRef.current,
          '.filter-sm-r',
          '.half-filter-l',
          '.top-space-l',
          '.btn',
        ],
        {
          backgroundPosition: (i, e) =>
            e === entranceRef.current ? '0px 0px' : undefined,
          backgroundImage: (i, e) =>
            e.classList.contains('filter-sm-r')
              ? 'linear-gradient(to right, rgba(10, 39, 56, 0), rgba(10, 39, 56, 0.8))'
              : undefined,
          opacity: (i, e) =>
            e.classList.contains('half-filter-l') ? 0 : undefined,
          x: (i, e) => (e.classList.contains('top-space-l') ? 0 : undefined),
          visibility: (i, el) =>
            el.classList.contains('btn') ? 'hidden' : undefined,
          duration: 0.5,
        }
      );
    }
  });
  return (
    <>
      <div>
        <div
          ref={entranceRef}
          onMouseEnter={onMouseEnterEntrance}
          onMouseLeave={onMouseLeaveEntrance}
          className='grade position-relative border border-dark'
        >
          <img
            className='entrance-bg-image position-absolute'
            src={data.backgroundImg}
            alt='entrance-bg-image'
          />
          <div className='position-absolute bottom-0 end-50 h-100 w-100 half-filter-l'></div>
          <div className='position-absolute bottom-0 h-100 w-100 filter-sm-r d-none d-sm-block'></div>
          <div className='position-absolute bottom-0 h-100 w-100 filter d-sm-none'></div>
          <div className='container px-9 position-relative'>
            <div className='d-flex  align-items-center '>
              <div className=' d-flex flex-column justify-content-center gap-3 gap-sm-7 top-space-l'>
                <h4 className='fs-sm-2'>
                  {data.level01}
                  <span lang='en'> {data.level02}</span>
                </h4>
                <h6 lang='zh-TW' className='fs-7 fs-sm-6'>
                  {data.title01}
                  <br className='d-none d-md-block' />
                  {data.title02}
                </h6>
                <div>
                  <DarkButtonLinearG
                    btnName={'來去探索'}
                    btnType={'btn-dark'}
                    btnBorderColor={'border-white'}
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
