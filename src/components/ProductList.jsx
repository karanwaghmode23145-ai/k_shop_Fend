import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../slices/productSlice'


const ProductList = () => {
    const dispatch = useDispatch()
    const { products, loading } = useSelector((state) => state.products)


    useEffect(() => {
        dispatch(fetchProducts())
    }, [])


    if (loading) return <p>Loading...</p>


    return (
       <>
       <h1>Home Page</h1>
       </>
    )
}


export default ProductList