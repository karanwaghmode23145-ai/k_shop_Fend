import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const fetchProducts = createAsyncThunk('products/fetch', async () => {
const { data } = await axios.get('https://k-shop-bend.vercel.app/api/products/')
return data
})


const productSlice = createSlice({
name: 'products',
initialState: { products: [], loading: false },
extraReducers: (builder) => {
builder
.addCase(fetchProducts.pending, (state) => {
state.loading = true
})
.addCase(fetchProducts.fulfilled, (state, action) => {
state.loading = false
state.products = action.payload
})
},
})


export default productSlice.reducer