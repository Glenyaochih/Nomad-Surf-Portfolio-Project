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
  (frontProductsSlice) => {
    return frontProductsSlice.product;
  }
);
const selectRecommendType = createSelector(
  [selectProductsState],
  (frontProductSlice) => frontProductSlice.recommendType
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
      filteredProduct = [...filteredProduct].sort(
        (a, b) => a.origin_price - b.origin_price
      );
    }
    if (sortOption === 'height-to-low') {
      filteredProduct = [...filteredProduct].sort(
        (a, b) => b.origin_price - a.origin_price
      );
    }
    // ===銷售排序 ===
    if (sortOption === 'best-selling') {
      filteredProduct = [...filteredProduct].sort(
        (a, b) => a.soldNum - b.soldNum
      );
    }

    return filteredProduct;
  }
);

export const selectRecommendedProducts = createSelector(
  [selectFrontProducts, selectFrontProduct, selectRecommendType],
  (products, currentProduct, type) => {
    // 如果推薦類型是 'latest'，直接篩選最新產品，不依賴 currentProduct
    if (type === 'latest') {
      const latestProducts = products.filter((product) => {
        return product.is_new_arrivals;
      });
      return latestProducts;
    }

    // 以下邏輯只適用於依賴 currentProduct 的推薦類型 (例如 'more_recommend')
    if (!currentProduct || Object.keys(currentProduct).length === 0) {
      return []; // 如果沒有當前產品，則不推薦
    }

    if (type === 'more_recommend') {
      const filteredByGrade = products.filter(
        (product) =>
          product.grade === currentProduct.grade &&
          product.id !== currentProduct.id
      );

      // 如果沒有相同等級的產品，則從所有產品中隨機選取
      const productsToRecommend =
        filteredByGrade.length > 0 ? filteredByGrade : products;

      // 隨機洗牌並取前5個產品 (確保不可變性)
      const randomProducts = [...productsToRecommend].sort(
        () => 0.5 - Math.random()
      );
      // 篩選出相同等級且不等於當前產品的板子
      return randomProducts.slice(0, 5);
    }

    // 如果沒有匹配的推薦類型，返回空陣列
    return [];
  }
);
