import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import WhatsAppButton from "../components/WhatsAppButton";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

import babaImg from "../assets/Baba.jpeg";
import heroImg from "../assets/Heroimage.png";

function Home() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

      setProducts(productList.slice(0, 4));

    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      {/* HERO */}
      <section className="bg-gradient-to-r from-orange-100 to-orange-50 py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          <div>
            <p className="text-orange-500 font-semibold mb-2">
              Pure Spiritual & Ayurvedic Essentials
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Sacred Products for a <span className="text-orange-600">Blessed Life</span>
            </h1>

            <p className="mt-4 text-gray-600 text-lg">
              Discover authentic Rudraksha, Ayurveda jadibuti,Herbal & Beauty care . 
               Carefully selected to bring peace, positivity, and wellness into your life.
            </p>

            <div className="mt-6 flex gap-4">
              <button
                onClick={() => navigate("/products")}
                className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
              >
                Explore Products
              </button>

              <button
                onClick={() => navigate("/contact")}
                className="border border-orange-500 text-orange-500 px-6 py-3 rounded-lg hover:bg-orange-100"
              >
                Contact Us
              </button>
            </div>
          </div>

          <img
            src={heroImg}
            alt="hero"
            className="w-full h-[350px] object-cover rounded-xl shadow-lg"
          />

        </div>
      </section>

      {/* 🔥 FIXED CATEGORIES (FULL WIDTH DESIGN) */}
      <section className="px-6 py-10 bg-white">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-2xl font-bold mb-6 text-orange-600">
            Categories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div
              onClick={() => navigate("/products")}
              className="bg-orange-100 p-10 rounded-xl shadow hover:scale-105 transition cursor-pointer text-center"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                Rudraksha
              </h3>
              
            </div>

            <div
              onClick={() => navigate("/products")}
              className="bg-orange-100 p-10 rounded-xl shadow hover:scale-105 transition cursor-pointer text-center"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                Ayurveda Jadibuti
              </h3>
             
            </div>

            <div
              onClick={() => navigate("/products")}
              className="bg-orange-100 p-10 rounded-xl shadow hover:scale-105 transition cursor-pointer text-center"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                Herbal & Beauty Care
              </h3>
              
            </div>

          </div>

        </div>
      </section>

      {/* 🔥 FEATURED PRODUCTS (FIXED ALIGNMENT) */}
      <section className="px-6 py-10 bg-gray-50">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-2xl font-bold mb-6 text-orange-600">
            Featured Products
          </h2>

          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-orange-50 py-12">
        <div className="max-w-4xl mx-auto text-center px-4">

          <img
            src={babaImg}
            alt="baba"
            className="w-32 h-32 mx-auto rounded-full object-cover shadow-lg border-4 border-orange-200"
          />

          <h2 className="text-2xl md:text-3xl font-bold text-orange-600 mt-4">
            Gurukrupa Enterprises
          </h2>

          <p className="text-gray-600 mt-2 font-semibold">
            With the blessings of Dr. Baba Mahanta Mohan Giri (Ayurvedic)
          </p>

          <p className="mt-4 text-gray-700">
            We provide authentic spiritual and Ayurvedic products to bring peace, positivity, and wellness into everyday life.
          </p>

        </div>
      </section>

      <WhatsAppButton />

    </div>
  );
}

export default Home;