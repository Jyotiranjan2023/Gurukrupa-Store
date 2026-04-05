import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";

// Import images
import rudrakshaImg from "../assets/Rudraksha.jpg";
import malaImg from "../assets/Rudraksha Mala.jpeg";
import hibiscusImg from "../assets/Dry Hibiscus flower.jpeg";
import dryFlowerImg from "../assets/Dry flower.jpeg";

function Products() {

  // 🔍 Get search query from URL
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const search = query.get("search")?.toLowerCase() || "";

  // 📦 Product Data
  const products = [
    {
      id: 1,
      name: "Rudraksha",
      category: "Rudraksha",
      image: rudrakshaImg,
      description: "Enhances spiritual growth, reduces stress, and brings positive energy."
    },
    {
      id: 2,
      name: "Rudraksha Mala",
      category: "Rudraksha",
      image: malaImg,
      description: "Used for meditation and chanting, improves focus and inner peace."
    },
    {
      id: 3,
      name: "Dry Hibiscus Flower",
      category: "Flowers",
      image: hibiscusImg,
      description: "Supports heart health and improves natural body detox."
    },
    {
      id: 4,
      name: "Dry Flower",
      category: "Flowers",
      image: dryFlowerImg,
      description: "Used in pooja rituals to create a calm and spiritual environment."
    }
  ];

  // 🔎 Filter Products (Search Working)
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search)
  );

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <h1 className="text-3xl font-bold text-orange-600">
          Our Products
        </h1>

        {/* Show search result text */}
        {search && (
          <p className="text-gray-500 text-sm">
            Showing results for: <span className="font-semibold">{search}</span>
          </p>
        )}
      </div>

      {/* PRODUCTS GRID */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          <p className="text-lg">No products found</p>
        </div>
      )}

    </div>
  );
}

export default Products;