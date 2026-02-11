import { useEffect, useRef } from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { setSearch } from '../../redux/slice/front/products/frontProductsSlice';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({ showInput, setShowInput, searchBarType }) {
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //搜尋框
  const handleSearch = (e) => {
    dispatch(setSearch(e.target.value));
  };
  //enter後換到商品頁
  const clickChangePage = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      if (searchBarType === 'navbar-search') {
        navigate('/products');
      }
    }
  };
  //搜尋匡控制邏輯
  const handleMouseEnter = () => {
    setShowInput(true);
  };

  useEffect(() => {
    //控制searchBar 隱藏
    if (showInput) {
      const handleClickOutside = (e) => {
        if (searchRef.current && !searchRef.current.contains(e.target)) {
          console.log('關');
          setShowInput(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside, true);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside, true);
      };
    }
  }, [showInput, setShowInput]);

  return (
    <div ref={searchRef} className='input-group rounded-pill search-bar'>
      {showInput && (
        <input
          type='text'
          className='form-control border-end-0 rounded-start-pill focus-ring search-input'
          placeholder='輸入關鍵字'
          aria-label='Input group example'
          aria-describedby='btnGroupAddon'
          onChange={handleSearch}
          onKeyDown={clickChangePage}
        />
      )}
      <button
        onMouseEnter={handleMouseEnter}
        className={`input-group-text border-start-0 ${showInput ? 'rounded-end-pill' : 'border-0'}  `}
        id='btnGroupAddon'
      >
        <MdOutlineSearch />
      </button>
    </div>
  );
}
