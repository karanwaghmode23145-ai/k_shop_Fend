import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from './slices/productSlice'
import { Routes, Route, Link } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './Pages/Home'

// footer

import Footer from './components/Footer/Footer'

// ragister page
import RegisterSection from './components/Register/RegisterSection'

//login
import LoginSection from './LoginSection/LoginSection'



const App = () => {
    return (
        <>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterSection />} />
            <Route path="/login" element={<LoginSection />} />

        </Routes>
        <Footer />
        </>
       

    )
}


export default App