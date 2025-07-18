import { useEffect, useState } from 'react';

export const useFormattedDate = (timestamp) => {
  const [formattedDate, setFormattedDate] = useState('');
  useEffect(() => {
    if (timestamp) {
      //將時間戳轉成日期格式
      const date = new Date(timestamp);
      //取出年月日
      const year = date.getFullYear();
      //getMonth 是一個陣列須加1 ,需要用padStart所以要先轉成string .padStart( (目標長度), padString(填充字串)) 是一個字串方法 除理成01~09格式
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      //處理方法與月份雷同
      const day = date.getDate().toString().padStart(2, 0);
      setFormattedDate(`${year}/${month}/${day}`);
    } else {
      setFormattedDate('');
    }
  }, [timestamp]);
  return formattedDate;
};
