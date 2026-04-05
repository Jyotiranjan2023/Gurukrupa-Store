import { useNavigate } from "react-router-dom";
import whatsappIcon from "../assets/whatsapp icon.png";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const phoneNumber = "919861955811"; 

  const handleClick = () => {
    navigate(`/product/${product.id}`, { state: product });
  };

  const handleWhatsApp = () => {
    const message = `Hello, I want to buy ${product.name}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="border rounded-xl shadow-md p-4 bg-white hover:shadow-lg transition">

      {/* Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />

      {/* Content */}
      <h2 className="mt-3 text-lg font-semibold">
        {product.name}
      </h2>

      <p className="text-sm text-gray-600">
        {product.category}
      </p>

      {/* Buttons */}
      <div className="flex justify-between items-center mt-4">

        {/* Details Button */}
        <button
          onClick={handleClick}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Details
        </button>

        {/* WhatsApp Icon Button */}
        <button
          onClick={handleWhatsApp}
          className="bg-green-500 p-2 rounded-full hover:bg-green-600 shadow-md hover:scale-110 transition"
        >
          <img
            src={whatsappIcon}
            alt="WhatsApp"
            className="w-6 h-6"
          />
        </button>

      </div>

    </div>
  );
}

export default ProductCard;