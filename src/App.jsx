import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from './slices/productSlice'
import { Routes, Route, Link } from 'react-router-dom'
import ProductList from './components/ProductList'


const App = () => {
return (
<div className="p-4">
<header className="p-2 bg-black text-white text-xl">Karan Shop</header>
<nav className="p-2 bg-gray-200">
<Link to="/">Home</Link>
</nav>
<Routes>
<Route path="/" element={<ProductList />} />
</Routes>
</div>
)
}


export default App