import React from 'react'
import Hero from '../components/Home/Hero/Hero'
import SupportSection from '../components/Home/SupportSection/SupportSection'
import ProductSection from '../components/ProductSection/ProductSection'
import BannerSection from '../components/Home/BannerSection/BannerSection'
import OfferBanner from '../components/Home/OfferBanner/OfferBanner'
import NewArrivals from '../components/Home/NewArrivals/NewArrivals'

const Home = () => {
  return (
    <>
    <Hero />
    
    <ProductSection />
    <BannerSection />
    <OfferBanner />
    <NewArrivals />
    <SupportSection />
    </>
  )
}

export default Home