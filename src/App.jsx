import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from './slices/productSlice'
import { Routes, Route, Link } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './Pages/Home'

//redux
import CartTester from './Pages/CartTester'


// footer

import Footer from './components/Footer/Footer'

// ragister page
import RegisterSection from './components/Register/RegisterSection'

//login
import LoginSection from './LoginSection/LoginSection'

//product detail page
import ProductDetail from './components/ProductDetail/ProductDetail'

//cloud
import UploadImage from './Pages/UploadImage'

//collection
import CollectionPage from './components/CollectionPage/CollectionPage'

//review Section
import ReviewSection from './components/Reviews/ReviewSection'

//related product
import RelatedProductsPage from './Pages/RelatedProductsPage'

//cart
import CartPage from './Pages/CartPage'

//wishlist
import WishlistPage from './Pages/WishlistPage'


const App = () => {
    return (
        <>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterSection />} />
            <Route path="/login" element={<LoginSection />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/upload" element={<UploadImage />} />
            <Route path="/collection" element={<CollectionPage />} />
            <Route path="/review" element={<ReviewSection />} />
            <Route path="/related-products/:productId" element={<RelatedProductsPage />} />
            <Route path="/carttest" element={<CartTester />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
        </Routes>
        <Footer />
        </>
       

    )
}


export default App