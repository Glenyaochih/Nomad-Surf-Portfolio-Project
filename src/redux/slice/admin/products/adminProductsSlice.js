import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createAsyncMessage } from '../../message/messageSlice';
import { setAdminGetLoading } from '../auth/adminAuthSlice';
import { adminProductsAPI } from './adminProductsAPI';

const initialProductState = {
    product_num: '',
    category: '',
    colors: [{ colorName: '', colorCode: '' }],
    content: '',
    description: '',
    grade: '',
    hasDiscount: 0,
    imageUrl: '',
    imagesUrl: [''],
    is_enabled: 0,
    is_new_arrivals: 0,
    origin_price: '',
    price: '',
    sizes: [{ size: '', stock: 0 }],
    fin_system: '',
    title: '',
    unit: '',
    soldNum: 0,
};

export const adminProductsSlice = createSlice({
    name: 'adminProducts',
    initialState: {
        products: [],
        rangePages: [],
        pageState: {},
        currentPage: '',
        category: '',
        // For creating new product
        initData: initialProductState,
        // For updating product
        tempProduct: { ...initialProductState, colors: [], sizes: [] },
        productId: '',
        // For deleting products
        idContainer: [],
    },
    reducers: {
        // ===== GET Products Reducers =====
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setProductsPagesRange: (state, action) => {
            const { current_page, total_pages } = action.payload;
            const range = [];
            const maxDisplayPages = 3;
            let start = Math.max(1, current_page - Math.floor(maxDisplayPages / 2));
            let end = Math.min(total_pages, start + maxDisplayPages - 1);
            if (end - start < maxDisplayPages - 1) {
                start = Math.max(1, end - maxDisplayPages - 1);
            }
            for (let i = start; i <= end; i++) {
                range.push(i);
            }
            state.rangePages = range;
            state.pageState = action.payload;
        },
        setProductsCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setProductCategory: (state, action) => {
            state.category = action.payload;
        },

        // ===== POST Product Reducers =====
        setPostProductInputChange: (state, action) => {
            const { value, name, checked, type } = action.payload;
            state.initData[name] = type === 'checkbox' ? checked : value;
        },
        setPostImagesInputChange: (state, action) => {
            const { value, index } = action.payload;
            const newImages = [...state.initData.imagesUrl];
            newImages[index] = value;
            state.initData.imagesUrl = newImages;
        },
        setPostSizesInputChange: (state, action) => {
            const { name, value, index } = action.payload;
            state.initData.sizes[index] = {
                ...state.initData.sizes[index],
                [name]: value,
            };
        },
        setPostColorsInputChange: (state, action) => {
            const { name, value, index } = action.payload;
            state.initData.colors[index] = {
                ...state.initData.colors[index],
                [name]: value,
            };
        },
        setPostAddSizeHandler: (state) => {
            const newSizes = [...state.initData.sizes, { size: '', stock: 0 }];
            state.initData.sizes = newSizes;
        },
        setPostAddColorHandler: (state) => {
            const newColors = [
                ...state.initData.colors,
                { colorName: '', colorCode: '' },
            ];
            state.initData.colors = newColors;
        },
        setPostAddImagesHandler: (state) => {
            const newImages = [...state.initData.imagesUrl, ''];
            state.initData.imagesUrl = newImages;
        },
        setPostDeleteImagesHandler: (state) => {
            const newImages = [...state.initData.imagesUrl];
            newImages.pop();
            state.initData.imagesUrl = newImages;
        },
        setPostDeleteSizeHandler: (state, action) => {
            const index = action.payload;
            const newSizes = [...state.initData.sizes];
            newSizes.splice(index, 1);
            state.initData.sizes = newSizes;
        },
        setPostDeleteColorHandler: (state, action) => {
            const index = action.payload;
            const newColors = [...state.initData.colors];
            newColors.splice(index, 1);
            state.initData.colors = newColors;
        },
        setResetProductInitialState: (state) => {
            state.initData = initialProductState;
        },

        // ===== PUT Product Reducers =====
        setTempProduct(state, action) {
            const product = action.payload;
            state.tempProduct = product;
            state.productId = product.id;
        },
        setPutProductInputChange: (state, action) => {
            const { value, name, checked, type } = action.payload;
            state.tempProduct[name] = type === 'checkbox' ? checked : value;
        },
        setPutImagesInputChange: (state, action) => {
            const { value, index } = action.payload;
            const newImages = [...state.tempProduct.imagesUrl];
            newImages[index] = value;
            state.tempProduct.imagesUrl = newImages;
        },
        setPutSizesInputChange: (state, action) => {
            const { name, value, index } = action.payload;
            state.tempProduct.sizes[index] = {
                ...state.tempProduct.sizes[index],
                [name]: value,
            };
        },
        setPutColorsInputChange: (state, action) => {
            const { name, value, index } = action.payload;
            state.tempProduct.colors[index] = {
                ...state.tempProduct.colors[index],
                [name]: value,
            };
        },
        setPutAddSizeHandler: (state) => {
            const newSizes = [...state.tempProduct.sizes, { size: '', stock: 0 }];
            state.tempProduct.sizes = newSizes;
        },
        setPutAddColorHandler: (state) => {
            const newColors = [
                ...state.tempProduct.colors,
                { colorName: '', colorCode: '' },
            ];
            state.tempProduct.colors = newColors;
        },
        setPutAddImagesHandler: (state) => {
            const newImages = [...state.tempProduct.imagesUrl, ''];
            state.tempProduct.imagesUrl = newImages;
        },
        setPutDeleteImagesHandler: (state) => {
            const newImages = [...state.tempProduct.imagesUrl];
            newImages.pop();
            state.tempProduct.imagesUrl = newImages;
        },
        setPutDeleteSizeHandler: (state, action) => {
            const { index } = action.payload;
            const newSizes = [...state.tempProduct.sizes];
            newSizes.splice(index, 1);
            state.tempProduct.sizes = newSizes;
        },
        setPutDeleteColorHandler: (state, action) => {
            const { index } = action.payload;
            const newColors = [...state.tempProduct.colors];
            newColors.splice(index, 1);
            state.tempProduct.colors = newColors;
        },

        // ===== Upload Image Handlers (shared for POST & PUT) =====
        setUploadImageHandler: (state, action) => {
            // This is used by both POST and PUT operations
            if (state.productId) {
                // If editing, update tempProduct
                state.tempProduct.imageUrl = action.payload;
            } else {
                // If creating, update initData
                state.initData.imageUrl = action.payload;
            }
        },
        setUploadImagesHandler: (state, action) => {
            const image = action.payload;
            if (state.productId) {
                // If editing
                const newImages = [...state.tempProduct.imagesUrl, image];
                state.tempProduct.imagesUrl = newImages;
            } else {
                // If creating
                const newImages = [...state.initData.imagesUrl, image];
                state.initData.imagesUrl = newImages;
            }
        },

        // ===== DELETE Products Reducers =====
        setDelProductInputChange: (state, action) => {
            const { checked, productId } = action.payload;
            if (checked) {
                state.idContainer = [...state.idContainer, productId];
            } else {
                state.idContainer = state.idContainer.filter((id) => id !== productId);
            }
        },
    },
});

// ===== Async Thunks =====

// Get products with pagination
export const getProductsAsync = createAsyncThunk(
    'products/getProducts',
    async (params = {}, { dispatch }) => {
        const { page = 1, category = '', skipLoading = false } = params;
        if (!skipLoading) {
            dispatch(setAdminGetLoading(true));
        }
        try {
            const res = await adminProductsAPI.getProducts(page, category);
            dispatch(adminProductsSlice.actions.setProducts(res.data.products));
            dispatch(
                adminProductsSlice.actions.setProductsPagesRange(res.data.pagination)
            );
        } catch (error) {
            console.error(error);
        } finally {
            if (!skipLoading) {
                dispatch(setAdminGetLoading(false));
            }
        }
    }
);

// Create new product
export const createProductAsync = createAsyncThunk(
    'products/createProduct',
    async (_, { getState, dispatch }) => {
        const initData = getState().adminProducts.initData;
        const data = {
            data: {
                ...initData,
                origin_price: Number(initData.origin_price),
                price: Number(initData.price),
                soldNum: Number(initData.soldNum),
                sizes: initData.sizes.map((size) => ({
                    ...size,
                    stock: Number(size.stock),
                })),
                hasDiscount: initData.hasDiscount ? 1 : 0,
                is_enabled: initData.is_enabled ? 1 : 0,
                is_new_arrivals: initData.is_new_arrivals ? 1 : 0,
            },
        };
        dispatch(setAdminGetLoading(true));
        try {
            const res = await adminProductsAPI.createProduct(data);
            await dispatch(getProductsAsync({ skipLoading: true }));
            dispatch(adminProductsSlice.actions.setResetProductInitialState());
            dispatch(createAsyncMessage(res.data));
        } catch (error) {
            dispatch(createAsyncMessage(error.response.data));
        } finally {
            dispatch(setAdminGetLoading(false));
        }
    }
);

// Update product
export const updateProductAsync = createAsyncThunk(
    'products/updateProduct',
    async (_, { getState, dispatch }) => {
        const tempProduct = getState().adminProducts.tempProduct;
        const id = getState().adminProducts.productId;
        const data = {
            data: {
                ...tempProduct,
                origin_price: Number(tempProduct.origin_price),
                price: Number(tempProduct.price),
                soldNum: Number(tempProduct.soldNum),
                sizes: tempProduct.sizes.map((size) => ({
                    ...size,
                    stock: Number(size.stock),
                })),
                hasDiscount: tempProduct.hasDiscount ? 1 : 0,
                is_enabled: tempProduct.is_enabled ? 1 : 0,
                is_new_arrivals: tempProduct.is_new_arrivals ? 1 : 0,
            },
        };
        dispatch(setAdminGetLoading(true));
        try {
            const res = await adminProductsAPI.updateProduct(id, data);
            console.log(res);
            await dispatch(getProductsAsync({ skipLoading: true }));
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setAdminGetLoading(false));
        }
    }
);

// Delete products (multiple)
export const deleteProductsAsync = createAsyncThunk(
    'products/deleteProducts',
    async (_, { dispatch, getState }) => {
        const productsId = getState().adminProducts.idContainer; // Array of IDs
        dispatch(setAdminGetLoading(true));
        try {
            // Create an array of promises for deletion
            const deletePromises = productsId.map((id) => adminProductsAPI.deleteProduct(id)); // Correctly return the promise

            // Wait for all deletions to complete
            const results = await Promise.all(deletePromises);

            // Display success message for the last result (or handle messages properly)
            // Assuming we want to show at least one success message
            if (results.length > 0) {
                dispatch(createAsyncMessage(results[results.length - 1].data));
            }

            // Refresh product list
            await dispatch(getProductsAsync({ page: 1, category: '', skipLoading: true }));
        } catch (error) {
            // Handle error - createAsyncMessage expects response data objects
            if (error.response) {
                dispatch(createAsyncMessage(error.response.data));
            } else {
                console.error(error)
            }
        } finally {
            dispatch(setAdminGetLoading(false));
        }
    }
);

// Upload image
export const uploadImageAsync = createAsyncThunk(
    'products/uploadImage',
    async (payload, { dispatch }) => {
        const { file, name } = payload;
        try {
            const res = await adminProductsAPI.uploadImage(file);
            const newImages = res.data.imageUrl;
            name === 'file'
                ? dispatch(adminProductsSlice.actions.setUploadImageHandler(newImages))
                : dispatch(adminProductsSlice.actions.setUploadImagesHandler(newImages));
            dispatch(createAsyncMessage(res.data));
        } catch (error) {
            console.log(error);
        }
    }
);

// Export actions
export const {
    setProductsCurrentPage,
    setProductCategory,
    setPostProductInputChange,
    setPostImagesInputChange,
    setPostAddImagesHandler,
    setPostDeleteImagesHandler,
    setPostAddSizeHandler,
    setPostSizesInputChange,
    setPostDeleteSizeHandler,
    setPostAddColorHandler,
    setPostDeleteColorHandler,
    setPostColorsInputChange,
    setResetProductInitialState,
    setTempProduct,
    setPutProductInputChange,
    setPutImagesInputChange,
    setPutAddImagesHandler,
    setPutDeleteImagesHandler,
    setPutAddSizeHandler,
    setPutSizesInputChange,
    setPutDeleteSizeHandler,
    setPutAddColorHandler,
    setPutDeleteColorHandler,
    setPutColorsInputChange,
    setUploadImageHandler,
    setUploadImagesHandler,
    setDelProductInputChange,
} = adminProductsSlice.actions;

export default adminProductsSlice.reducer;
