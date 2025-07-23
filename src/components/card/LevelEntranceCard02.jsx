import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import DarkButtonLinearG from '../button/DarkButtonLinearG';
import { useDispatch, useSelector } from 'react-redux';
import {
  setApplyFilter,
  setFilter,
} from '../../redux/slice/front/products/frontProductsSlice';
import { useIsDesktop } from '../../hooks/useIsDesktop';

export default function LevelEntranceCard02({ data }) {
  const entrance2Ref = useRef(null);
  const { contextSafe } = useGSAP({ scope: entrance2Ref });
  const isDesktop = useIsDesktop();
  const tempFilters = useSelector(
    (state) => state.frontGetProducts.filters.tempFilters
  );
  const dispatch = useDispatch();

  const onMouseEnterEntrance = contextSafe(() => {
    //contextSafe 避免動畫還在運行,減少記憶體洩漏，確保效能
    if (isDesktop) {
      gsap.fromTo(
        ['.btn', '.entrance-bg-image-2'],
        {
          y: (i, e) => (e.classList.contains('btn') ? 0 : undefined),
          x: (i, e) =>
            e.classList.contains('entrance-bg-image-2') ? 0 : undefined,
        },
        {
          opacity: (i, e) => (e.classList.contains('btn') ? 1 : undefined),
          y: (i, e) => (e.classList.contains('btn') ? -250 : undefined),
          x: (i, e) =>
            e.classList.contains('entrance-bg-image-2') ? 50 : undefined,
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
  const handelGradesClick = (value) => {
    // 獲取當前 Redux store 中的 grades 篩選陣列，如果為空則初始化為空陣列
    const currentGrades = tempFilters.grades || [];
    let newGrades;

    // 判斷點擊的值是否已在 currentGrades 中
    if (currentGrades.includes(value)) {
      // 如果已存在，則從陣列中移除該值（實現取消篩選的功能）
      newGrades = currentGrades.filter((grade) => grade !== value);
    } else {
      // 如果不存在，則將該值添加到陣列中（實現添加篩選的功能）
      newGrades = [...currentGrades, value];
    }
    // 派發 setFilter action 更新暫時的篩選狀態 (tempFilters)
    dispatch(setFilter({ filterType: 'grades', value: newGrades }));
    // 派發 setApplyFilter action 將暫時的篩選狀態應用到活躍篩選狀態 (activeFilters)
    dispatch(setApplyFilter());
  };

  const onMouseLeaveEntrance = contextSafe(() => {
    if (isDesktop) {
      gsap.fromTo(
        ['.btn', '.entrance-bg-image-2'],
        {
          y: (i, e) => (e.classList.contains('btn') ? -250 : undefined),
          x: (i, e) =>
            e.classList.contains('entrance-bg-image-2') ? 50 : undefined,
        },
        {
          opacity: (i, e) => (e.classList.contains('btn') ? 0 : undefined),
          y: (i, e) => (e.classList.contains('btn') ? 0 : undefined),
          x: (i, e) =>
            e.classList.contains('entrance-bg-image-2') ? 0 : undefined,
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
        >
          <img
            className='entrance-bg-image-2 position-absolute'
            src='img/homePage/grade-02.webp'
            alt='entrance-bg-image-2'
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
                    destination={'/products'}
                    btnName={'來去探索'}
                    btnType={'btn-dark'}
                    event={() => handelGradesClick(data.grade)}
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
