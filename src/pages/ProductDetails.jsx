import { useLocation } from "react-router-dom";

function ProductDetails() {
  const location = useLocation();
  const product = location.state;

  const phoneNumber = "919876543210"; // replace with your number

  const handleWhatsApp = () => {
    const message = `Hello, I want to buy ${product.name}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  if (!product) {
    return <h2 className="p-6 text-center">Product not found</h2>;
  }

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">

      <div className="grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT: IMAGE */}
        <div>
          <img
            src={product.imageUrl}  // ✅ FIXED HERE
            alt={product.name}
            className="w-full h-80 object-cover rounded-xl shadow-md"
          />
        </div>

        {/* RIGHT: DETAILS */}
        <div>

          <h1 className="text-3xl md:text-4xl font-bold text-orange-600">
            {product.name}
          </h1>

          <p className="mt-2 text-gray-500">
            Category: {product.category}
          </p>

          <p className="mt-4 text-gray-700 leading-relaxed">
            {product.description}
          </p>

          {/* ✅ DYNAMIC BENEFITS */}
          <div className="mt-6 bg-orange-50 p-4 rounded-lg">
            <h3 className="font-semibold text-orange-600 mb-2">
              Benefits
            </h3>

            {product.benefits && product.benefits.length > 0 ? (
              <ul className="list-disc pl-5 text-gray-700 text-sm">
                {product.benefits.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">
                No benefits available
              </p>
            )}
          </div>

          {/* WhatsApp CTA */}
          <button
            onClick={handleWhatsApp}
            className="mt-6 w-full md:w-auto bg-green-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-600 transition"
          >
            Contact on WhatsApp
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;