import { useState } from "react";
import { db, storage } from "../../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function AddProduct() {

  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    benefits: ""
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Handle input change
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  // 🔹 Handle image select
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // 🔹 Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please select an image");
      return;
    }

    try {
      setLoading(true);

      // 🔥 Upload image to Firebase Storage
      const imageRef = ref(storage, `products/${Date.now()}-${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);

      const imageUrl = await getDownloadURL(imageRef);

      // 🔥 Convert benefits string → array
      const benefitsArray = product.benefits
        .split(",")
        .map((item) => item.trim());

      // 🔥 Save to Firestore
      await addDoc(collection(db, "products"), {
        name: product.name,
        category: product.category,
        description: product.description,
        imageUrl: imageUrl,
        benefits: benefitsArray,
        createdAt: new Date()
      });

      alert("Product added successfully!");

      // Reset form
      setProduct({
        name: "",
        category: "",
        description: "",
        benefits: ""
      });
      setImageFile(null);

    } catch (error) {
      console.error(error);
      alert("Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">

      <h2 className="text-2xl font-bold mb-4 text-orange-600">
        Add Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Category */}
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Benefits */}
        <textarea
          name="benefits"
          placeholder="Enter benefits (comma separated)"
          value={product.benefits}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Image Upload */}
        <input
          type="file"
          onChange={handleImageChange}
          className="w-full"
          accept="image/*"
          required
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-orange-500 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Uploading..." : "Add Product"}
        </button>

      </form>

    </div>
  );
}

export default AddProduct;