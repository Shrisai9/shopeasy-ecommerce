import ProductCard from './components/ProductCard'

const featuredProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop",
    description: "Premium quality wireless headphones with noise cancellation"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop",
    description: "Advanced smartwatch with health tracking features"
  },
  {
    id: 3,
    name: "Laptop Stand",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop",
    description: "Ergonomic laptop stand for better posture"
  }
]

export default function Home() {
  return (
    <main className="main-content">
      <section className="hero">
        <div className="container">
          <h1>Welcome to ShopEasy</h1>
          <p>Discover amazing products at unbeatable prices</p>
          <button className="cta-button">Shop Now</button>
        </div>
      </section>

      <section className="featured-products">
        <div className="container">
          <h2>Featured Products</h2>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}