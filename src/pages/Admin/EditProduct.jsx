import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, storage } from "../../firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    benefits: ""
  });

  const [imageFile, setImageFile] = useState(null);
  const [oldImage, setOldImage] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 Load product
  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        setProduct({
          name: data.name,
          category: data.category,
          description: data.description,
          benefits: data.benefits?.join(", ") || ""
        });

        setOldImage(data.imageUrl);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Handle input
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  // 🔹 Handle image
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // 🔥 Update product
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      let imageUrl = oldImage;

      // 👉 If new image selected → upload
      if (imageFile) {
        const imageRef = ref(storage, `products/${Date.now()}-${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      const benefitsArray = product.benefits
        .split(",")
        .map((item) => item.trim());

      // 🔥 Update Firestore
      const docRef = doc(db, "products", id);
      await updateDoc(docRef, {
        name: product.name,
        category: product.category,
        description: product.description,
        benefits: benefitsArray,
        imageUrl: imageUrl
      });

      alert("Product updated successfully!");
      navigate("/admin");

    } catch (error) {
      console.error(error);
      alert("Error updating product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">

      <h2 className="text-2xl font-bold mb-4 text-orange-600">
        Edit Product
      </h2>

      <form onSubmit={handleUpdate} className="space-y-4">

        {/* Name */}
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Category */}
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Benefits */}
        <textarea
          name="benefits"
          value={product.benefits}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Comma separated"
          required
        />

        {/* OLD IMAGE PREVIEW */}
        {oldImage && (
          <img
            src={oldImage}
            alt="old"
            className="w-full h-40 object-cover rounded"
          />
        )}

        {/* NEW IMAGE */}
        <input
          type="file"
          onChange={handleImageChange}
          className="w-full"
          accept="image/*"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>

      </form>

    </div>
  );
}

export default EditProduct;