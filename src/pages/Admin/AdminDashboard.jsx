import { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const snapshot = await getDocs(collection(db, "products"));
    const list = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setProducts(list);
  };

  // 🔥 DELETE PRODUCT
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this product?");
    if (!confirmDelete) return;

    await deleteDoc(doc(db, "products", id));
    fetchProducts(); // refresh
  };

  return (
    <div className="p-8">

      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold text-orange-600">
          Admin Dashboard
        </h1>

        <button
          onClick={() => navigate("/admin/add-product")}
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          + Add Product
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">

            <img
              src={product.imageUrl}
              className="w-full h-40 object-cover rounded"
            />

            <h2 className="mt-2 font-semibold">{product.name}</h2>

            <div className="flex justify-between mt-3">

              

              <button
           onClick={() => navigate(`/admin/edit/${product.id}`)}
           className="bg-yellow-500 text-white px-3 py-1 rounded"
          >
        Edit
     </button>

              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default AdminDashboard;