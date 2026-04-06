import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

function Products() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  // 🔍 Get search query
  const searchQuery = new URLSearchParams(location.search).get("search") || "";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));

      const productList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setProducts(productList);

    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 FILTER LOGIC
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 min-h-screen bg-gray-50">

      <h1 className="text-3xl font-bold text-orange-600 mb-6">
        Our Products
      </h1>

      {/* Show search info */}
      {searchQuery && (
        <p className="text-gray-500 mb-4">
          Showing results for: <span className="font-semibold">{searchQuery}</span>
        </p>
      )}

      {/* Loading */}
      {loading && (
        <p className="text-gray-500">Loading products...</p>
      )}

      {/* Empty State */}
      {!loading && filteredProducts.length === 0 && (
        <p className="text-gray-500">No products found.</p>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {!loading &&
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        }
      </div>

    </div>
  );
}

export default Products;