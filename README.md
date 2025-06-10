# Portfolio Project - React E-commerce Frontend

這是一個使用 React 和 Redux Toolkit 打造的前端專案，旨在展示一個功能完善的電子商務網站，特別著重於複雜的產品篩選和狀態管理。

---

## ✨ 專案特色

- **現代前端技術棧**: 使用 React 和 Vite 搭建，提供極速的開發體驗。
- **高效的狀態管理**: 透過 Redux Toolkit (RTK) 集中管理應用程式狀態，並遵循最佳實踐。
- **高效能的衍生資料計算**: 利用 Reselect 的 `createSelector` 來避免不必要的重複計算，優化篩選效能。
- **複雜的產品篩選功能**:
  - **暫存篩選條件**: 使用者可以調整多個篩選條件，只有在點擊「套用」後，篩選結果才會更新，提供流暢的使用者體驗。
  - **多維度篩選**:
    - **價格區間**: 可自訂最低和最高價格。
    - **多選篩選**: 例如「衝浪程度」，可同時選擇多個選項。
    - **單選篩選**: 例如「Fin 系統」，在多個選項中擇一。
    - **尺寸篩選**。
- **元件化設計**: 使用 React 元件來建構可重用和可維護的 UI，例如 `ProductFilterOffcanvas`。

---

## 🛠️ 技術棧

- **框架**: [React](https://reactjs.org/)
- **建置工具**: [Vite](https://vitejs.dev/)
- **狀態管理**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **選擇器/衍生狀態**: [Reselect](https://github.com/reduxjs/reselect)
- **CSS 框架**: [Bootstrap](https://getbootstrap.com/) (從 class name 如 `btn-check`, `offcanvas-body` 推斷)
- **語言**: JavaScript (ES6+)

---

## 🚀 開始使用

請依照以下步驟在你的本地環境中啟動專案。

### 1. 安裝依賴

在專案根目錄下，執行以下指令來安裝所有必要的 npm 套件。

```bash
npm install
```

### 2. 啟動開發伺服器

安裝完成後，執行以下指令來啟動 Vite 開發伺服器。

```bash
npm run dev
```

專案將會在 `http://localhost:5173` (或另一個可用的埠號) 上運行。

---

## 📁 專案結構 (推斷)

```
/
├── public/
├── src/
│   ├── components/
│   │   └── offcanvas/
│   │       └── ProductFilterOffcanvas.jsx  # 篩選器 UI 元件
│   │   ├── redux/
│   │   │   └── slice/
│   │   │       └── front/
│   │   │           └── products/
│   │   │               ├── frontProductsSlice.js     # Redux Slice (actions, reducers)
│   │   │               └── frontProductsSelectors.js # Reselect 選擇器
│   │   ├── constants/
│   │   │   └── products.js                 # 存放如產品等級、尺寸等靜態資料
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   └── README.md
```

---

## 📝 未來展望

- [ ] 串接真實的後端 API 來獲取產品資料。
- [ ] 完善購物車功能。
- [ ] 新增使用者登入及會員系統。
- [ ] 為關鍵的 Redux 邏輯和元件編寫單元測試。
