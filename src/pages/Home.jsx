import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import WhatsAppButton from "../components/WhatsAppButton";

// product images
import rudrakshaImg from "../assets/Rudraksha.jpg";
import malaImg from "../assets/Rudraksha Mala.jpeg";
import hibiscusImg from "../assets/Dry Hibiscus flower.jpeg";
import dryFlowerImg from "../assets/Dry flower.jpeg";

// baba image
import babaImg from "../assets/Baba.jpeg";

// hero image
import heroImg from "../assets/Heroimage.png";

function Home() {

  const navigate = useNavigate();

  const featuredProducts = [
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

  return (
    <div>

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-orange-100 to-orange-50 py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          {/* Left */}
          <div className="max-w-xl">
            <p className="text-orange-500 font-semibold mb-2">
              Pure Spiritual & Ayurvedic Essentials
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Sacred Products for a <span className="text-orange-600">Blessed Life</span>
            </h1>

            <p className="mt-4 text-gray-600 text-lg">
              Discover authentic Rudraksha, herbal products and natural
              flowers. Carefully selected to bring peace, positivity, and wellness into your life.
            </p>

            <div className="mt-6 flex gap-4">

              <button
                onClick={() => navigate("/products")}
                className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
              >
                Explore Products
              </button>

              <button
                onClick={() => navigate("/contact")}
                className="border border-orange-500 text-orange-500 px-6 py-3 rounded-lg hover:bg-orange-100 transition"
              >
                Contact Us
              </button>

            </div>
          </div>

          {/* Right */}
          <div>
            <img
              src={heroImg}
              alt="Spiritual Products"
              className="w-full h-[350px] object-cover rounded-xl shadow-lg"
            />
          </div>

        </div>
      </section>

      {/* CATEGORIES */}
      <section className="p-8">
        <h2 className="text-2xl font-bold mb-6 text-orange-600">
          Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          <div
            onClick={() => navigate("/products")}
            className="bg-orange-100 p-6 text-center rounded-lg shadow hover:scale-105 transition cursor-pointer"
          >
            All Type of Diseases
          </div>

          <div
            onClick={() => navigate("/products")}
            className="bg-orange-100 p-6 text-center rounded-lg shadow hover:scale-105 transition cursor-pointer"
          >
            Rudraksha
          </div>

          <div
            onClick={() => navigate("/products")}
            className="bg-orange-100 p-6 text-center rounded-lg shadow hover:scale-105 transition cursor-pointer"
          >
            Herbal Products
          </div>

          

          <div
            onClick={() => navigate("/products")}
            className="bg-orange-100 p-6 text-center rounded-lg shadow hover:scale-105 transition cursor-pointer"
          >
            Dried Flowers
          </div>

        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="p-8">
        <h2 className="text-2xl font-bold mb-6 text-orange-600">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="bg-orange-50 py-12">
        <div className="max-w-4xl mx-auto text-center px-4">

          <img
            src={babaImg}
            alt="Dr Baba Mahant Mohan Giri"
            className="
              w-24 h-24 
              sm:w-32 sm:h-32 
              md:w-40 md:h-40 
              lg:w-48 lg:h-48 
              mx-auto rounded-full object-cover 
              shadow-lg border-4 border-orange-200
            "
          />

          <h2 className="text-2xl md:text-3xl font-bold text-orange-600 mt-4">
            Gurukrupa Enterprises
          </h2>

          <p className="text-sm md:text-base text-gray-500 mt-1 font-bold">
  Dr. Baba Mahanta Mohan Giri (Ayurvedic)
</p>

          <p className="mt-4 text-gray-700 max-w-2xl mx-auto text-sm md:text-base">
            We provide authentic spiritual and Ayurvedic products including Rudraksha,
            herbal remedies, pooja essentials, and dried flowers. Our mission is to
            bring peace, positivity, and traditional wellness into everyday life.
          </p>

        </div>
      </section>

      {/* FLOATING WHATSAPP BUTTON */}
      <WhatsAppButton />

    </div>
  );
}

export default Home;