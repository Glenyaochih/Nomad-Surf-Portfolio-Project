import { useEffect, useState } from 'react';

export const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(min-width:576px)').matches
      : false
  );

  useEffect(() => {
    if (typeof window === 'undefined') return; //判斷目前執行環境是不是瀏覽器。
    const mediaQuery = window.matchMedia('min-width:=576px'); //建立一個 media query 物件，測螢幕寬度是否大於等於 576px。
    const handler = (e) => setIsDesktop(e.matches); //將setIsDesktop 這個函式裝入handler
    mediaQuery.addEventListener('change', handler); //監聽到螢幕改變執行handler
    return () => mediaQuery.removeEventListener('change', handler); //移除監聽
  }, []);

  return isDesktop;
};
