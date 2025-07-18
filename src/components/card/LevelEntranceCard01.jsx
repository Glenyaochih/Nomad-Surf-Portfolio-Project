import { useEffect, useMemo, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import DarkButtonLinearG from '../button/DarkButtonLinearG';
import { useDispatch, useSelector } from 'react-redux';
import {
  setApplyFilter,
  setFilter,
} from '../../redux/slice/front/products/frontProductsSlice';

export default function LevelEntranceCard01({ data }) {
  const entranceRef = useRef(null); //取得範圍參考
  const { contextSafe } = useGSAP({ scope: entranceRef });
  const mm = useMemo(() => gsap.matchMedia(), []);
  const isDesktop = useMemo(() => window.matchMedia('(min-width: 576px)'), []);
  const tempFilters = useSelector(
    (state) => state.frontGetProducts.filters.tempFilters
  );
  const dispatch = useDispatch();

  useEffect(() => {
    mm.add({
      '(min-width: 576px)': () => {},
    });
    return () => mm.revert();
  }, [mm]);

  const onMouseEnterEntrance = contextSafe(() => {
    if (isDesktop.matches) {
      gsap.fromTo(
        ['.entrance-bg-image-1'],
        {
          y: (i, e) =>
            e.classList.contains('entrance-bg-image-1') ? 0 : undefined,
          x: (i, e) =>
            e.classList.contains('entrance-bg-image-1') ? 0 : undefined,
        },
        {
          y: (i, e) =>
            e.classList.contains('entrance-bg-image-1') ? 10 : undefined,
          x: (i, e) =>
            e.classList.contains('entrance-bg-image-1') ? 10 : undefined,
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
            e === entranceRef.current ? '5px 5px' : undefined, // 這是 GSAP 內建的函式，e 為 GSAP 監聽回來的 dom 元素
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

  // 滑鼠離開事件處理函數
  const onMouseLeaveEntrance = contextSafe(() => {
    // 檢查是否為桌面視圖
    if (isDesktop.matches) {
      // 對 .entrance-bg-image 元素執行 fromTo 動畫，使其回到原始位置
      gsap.fromTo(
        ['.entrance-bg-image-1'],
        {
          y: (i, e) =>
            e.classList.contains('entrance-bg-image-1') ? 10 : undefined,
          x: (i, e) =>
            e.classList.contains('entrance-bg-image-1') ? 10 : undefined,
        },
        {
          y: (i, e) =>
            e.classList.contains('entrance-bg-image-1') ? 0 : undefined,
          x: (i, e) =>
            e.classList.contains('entrance-bg-image-1') ? 0 : undefined,
          duration: 0.5,
        }
      );
      // 對多個元素執行 to 動畫，使其回到原始狀態
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

  return (
    <>
      <div>
        {/* 入口卡片容器，監聽滑鼠進入和離開事件 */}
        <div
          ref={entranceRef}
          onMouseEnter={onMouseEnterEntrance}
          onMouseLeave={onMouseLeaveEntrance}
          className='grade position-relative border border-dark'
        >
          {/* 背景圖片 */}
          <img
            className='entrance-bg-image-1 position-absolute'
            src={data.backgroundImg}
            alt='entrance-bg-image-1'
          />
          {/* 半透明濾鏡層 (左側) */}
          <div className='position-absolute bottom-0 end-50 h-100 w-100 half-filter-l'></div>
          {/* 響應式濾鏡層 (右側，桌面顯示) */}
          <div className='position-absolute bottom-0 h-100 w-100 filter-sm-r d-none d-sm-block'></div>
          {/* 濾鏡層 (移動端顯示) */}
          <div className='position-absolute bottom-0 h-100 w-100 filter d-sm-none'></div>
          {/* 內容容器 */}
          <div className='container px-9 position-relative'>
            <div className='d-flex  align-items-center '>
              {/* 標題和描述部分 */}
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
                  {/* 探索按鈕 */}
                  <DarkButtonLinearG
                    btnName={'來去探索'}
                    btnType={'btn-dark'}
                    btnBorderColor={'border-white'}
                    destination={'/products'}
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
