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
<div className="grid md:grid-cols-3 gap-4 mt-4">
{products.map((p) => (
<div key={p._id} className="border p-3 rounded shadow">
<img src={p.image} alt={p.name} className="w-full h-40 object-cover" />
<h2 className="text-xl font-bold mt-2">{p.name}</h2>
<p className="text-gray-600">{p.description}</p>
<p className="text-green-600 font-bold mt-1">₹{p.price}</p>
</div>
))}
</div>
)
}


export default ProductList