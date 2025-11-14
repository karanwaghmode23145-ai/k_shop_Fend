import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from './slices/productSlice'
import { Routes, Route, Link } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './Pages/Home'



const App = () => {
    return (
        <>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
        </>
       

    )
}


export default App