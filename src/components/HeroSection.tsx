import React from 'react'

export default function HeroSection() {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products')
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="bg-troy-dark text-white py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="mb-6">
          <span className="text-6xl">⚡</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Train hard. Play harder.
        </h1>
        <p className="text-2xl md:text-3xl text-troy-yellow mb-8">
          Troy Fitness — elite football conditioning
        </p>
        <button
          onClick={scrollToProducts}
          className="bg-troy-yellow text-troy-dark px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-500 transition transform hover:scale-105"
        >
          Shop Now
        </button>
      </div>
    </section>
  )
}
