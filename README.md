# Nomad Surf - Portfolio Project

這是一個使用 React 19 (RC) 和 Redux Toolkit 打造的現代化電子商務前端專案。本專案展示了完整的前後台功能，特別著重於複雜的產品篩選、購物車狀態管理以及響應式的使用者體驗。

## 🛠 技術堆疊 (Tech Stack)

本專案採用了以下關鍵技術與套件：

### 核心架構 (Core)
- **[React](https://react.dev/)** (v19 RC): 使用最新的 React 版本構建使用者介面。
- **[Vite](https://vitejs.dev/)**: 極速的前端建置工具與開發伺服器。
- **[React Router](https://reactrouter.com/)** (v7): 處理專案的路由導航 (Routing)。

### 狀態管理 (State Management)
- **[Redux Toolkit](https://redux-toolkit.js.org/)**: 高效且標準化的狀態管理方案，用於處理全域狀態（如 User Auth, Cart, Products 等）。
- **[React Redux](https://react-redux.js.org/)**: 連接 React 組件與 Redux store。

### 樣式與 UI (Styling & UI)
- **[Bootstrap 5](https://getbootstrap.com/)**: 快速構建響應式佈局與元件。
- **[Sass (SCSS)](https://sass-lang.com/)**: 使用 CSS 預處理器來管理巢狀樣式與變數。
- **[React Icons](https://react-icons.github.io/react-icons/)**: 整合多個圖標庫的便利套件。
- **[Swiper](https://swiperjs.com/)**: 用於製作現代化的輪播效果 (Carousel)。
- **[React Spinners](https://www.davidhu.io/react-spinners/)** / **React Loading**: 處理載入中的視覺回饋。
- **[React Fast Marquee](https://www.npmjs.com/package/react-fast-marquee)**: 製作跑馬燈效果。

### 動畫 (Animation)
- **[GSAP](https://gsap.com/)** (`gsap`, `@gsap/react`): 用於製作高效且複雜的網頁動畫。

### 地圖 (Maps)
- **[Leaflet](https://leafletjs.com/)** & **[React Leaflet](https://react-leaflet.js.org/)**: 整合互動式地圖功能。

### 表單與資料處理 (Forms & Data)
- **[React Hook Form](https://react-hook-form.com/)**: 高效能且易於使用的表單驗證套件。
- **[Axios](https://axios-http.com/)**: 處理 HTTP 請求。
- **[JWT Decode](https://github.com/auth0/jwt-decode)**: 解析 JSON Web Tokens 處理身份驗證資訊。
- **UUID**: 生成唯一識別碼。

---

## 🚀 如何執行專案 (Getting Started)

### 1. 安裝依賴 (Install Dependencies)
在專案根目錄執行：
```bash
npm install
```

### 2. 啟動開發伺服器 (Run Dev Server)
```bash
npm run dev
```

### 3. 建置生產版本 (Build)
```bash
npm run build
```

### 4. 部署 (Deploy)
部署至 GitHub Pages：
```bash
npm run deploy
```

## 📂 專案結構簡介
- `src/pages`: 包含前台 (Front) 與後台 (Admin) 的頁面組件。
- `src/redux`: 包含 Redux Store 設定與各個 Slice (如 Auth, Cart, Products)。
- `src/components`: 共用的 UI 組件。
- `src/assets`: 靜態資源（圖片、樣式等）。
