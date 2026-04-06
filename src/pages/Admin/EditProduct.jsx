import { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const docRef = doc(db, "products", id);
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      const data = snap.data();
      setName(data.name);
      setDescription(data.description);
      setCategory(data.category);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    await updateDoc(doc(db, "products", id), {
      name,
      description,
      category
    });

    alert("Product updated");
    navigate("/admin");
  };

  return (
    <div className="p-8 max-w-xl mx-auto">

      <h2 className="text-2xl font-bold mb-6 text-orange-600">
        Edit Product
      </h2>

      <form onSubmit={handleUpdate} className="space-y-4">

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2"
        />

        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2"
        />

        <button className="bg-green-500 text-white px-4 py-2">
          Update
        </button>

      </form>

    </div>
  );
}

export default EditProduct;