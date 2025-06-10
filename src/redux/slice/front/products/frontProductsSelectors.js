import { createSelector } from '@reduxjs/toolkit';

// 第一層 建立一個基礎 selector指向 slice frontProductSlice.js
const selectProductsState = (state) => state.frontGetProducts;

// 第二層 (衍伸)：基於 selectProductsState，建立更具體的 memoized selectors，分別用來取得 products 和 filters。
const selectFrontProducts = createSelector(
  [selectProductsState],
  (frontProductsSlice) => frontProductsSlice.products
);

export const selectFrontProduct = createSelector(
  [selectProductsState],
  (frontProductsSlice) => frontProductsSlice.product
);

const selectFilters = createSelector(
  [selectProductsState],
  (frontProductsSlice) => frontProductsSlice.filters.activeFilters
);

const selectSort = createSelector(
  [selectProductsState],
  (frontProductsSlice) => frontProductsSlice.filters.sortOption
);

export const selectFilterOffcanvasOpen = createSelector(
  [selectProductsState],
  (frontProductsSlice) => frontProductsSlice.filters.filterOffcanvasOpen
);

//第三層 (組合)基於第二層的 memoized selectors，最終的組合

export const selectFilteredProducts = createSelector(
  [selectFrontProducts, selectFilters, selectSort],
  (products, filters, sortOption) => {
    let filteredProduct = [...products];

    // === 衝浪程度篩選 ===

    if (filters.grades && filters.grades.length > 0) {
      filteredProduct = filteredProduct.filter((product) =>
        filters.grades.includes(product.grade)
      );
    }

    // === fin系統篩選 ===

    if (filters.finSystem !== null && filters.finSystem !== '') {
      filteredProduct = filteredProduct.filter((product) => {
        return filters.finSystem === product.fin_system;
      });
    }

    // === 價格區間篩選 ===
    if (filters.priceRange) {
      filteredProduct = filteredProduct.filter((product) => {
        const { min, max } = filters.priceRange;
        if (min !== undefined && max !== undefined) {
          return product.origin_price >= min && product.origin_price <= max;
        }
        if (min !== undefined) {
          return product.origin_price >= min;
        }
        if (max !== undefined) {
          return product.origin_price <= max;
        }
        return true; // 確保當 min/max 都未定義時，仍能包含產品
      });
    }

    // === 尺寸間篩選 ===
    if (filters.size) {
      filteredProduct = filteredProduct.filter((product) => {
        return product.sizes.some((sizeObj) => {
          const match = sizeObj.size.match(/^(\d+)/);
          return match && match[1] === filters.size;
        });
      });
    }
    // === 價格排序 ===

    if (sortOption === 'low-to-height') {
      filteredProduct = filteredProduct.sort(
        (a, b) => a.origin_price - b.origin_price
      );
    }
    if (sortOption === 'height-to-low') {
      filteredProduct = filteredProduct.sort(
        (a, b) => b.origin_price - a.origin_price
      );
    }
    // ===銷售排序 ===
    if (sortOption === 'best-selling') {
      filteredProduct = filteredProduct.sort((a, b) => a.soldNum - b.soldNum);
    }

    return filteredProduct;
  }
);
