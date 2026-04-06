import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "../firebase/firebaseConfig";
import { signOut, onAuthStateChanged } from "firebase/auth";

function Navbar() {

  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 🔥 Track login state (proper way)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSearch = () => {
    if (search.trim() === "") return;
    navigate(`/products?search=${encodeURIComponent(search)}`);
  };

  // 🔓 Logout
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div>

      {/* TOP STRIP */}
      <div className="bg-orange-500 text-white text-sm py-2 px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-2">
        <p className="text-center md:text-left">
          Sacred Products. Pure Blessings. Delivered to Your Doorstep.
        </p>

        <div className="flex flex-wrap justify-center md:justify-end gap-3 md:gap-6 text-xs md:text-sm">
          <span>📍 Bhubaneswar, Odisha</span>
          <span>📧 Gurukrupaenterpriser@gmail.com</span>
          <span>📞 +91 9861955811</span>
        </div>
      </div>

      {/* NAVBAR */}
      <div className="bg-white shadow-md px-4 md:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* LOGO */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold text-orange-600">ॐ Gurukrupa</h1>
          <p className="text-xs text-gray-500">Enterprises</p>
        </div>

        {/* SEARCH */}
        <div className="w-full md:w-1/2 flex">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            placeholder="Search products..."
            className="w-full border px-4 py-2 rounded-l-lg"
          />
          <button
            onClick={handleSearch}
            className="bg-orange-500 text-white px-4 rounded-r-lg hover:bg-orange-600"
          >
            🔍
          </button>
        </div>

        {/* MENU */}
        <div className="flex gap-3 md:gap-4 items-center text-sm md:text-base">

          <Link to="/" className="hover:text-orange-500">Home</Link>
          <Link to="/products" className="hover:text-orange-500">Products</Link>
          <Link to="/contact" className="hover:text-orange-500">Contact</Link>

          {/* 🔐 AUTH UI */}
          {!user ? (
            <button
              onClick={() => navigate("/login")}
              className="bg-orange-500 text-white px-3 py-1 rounded"
            >
              Login
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/admin")}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Admin
              </button>

              <button
                onClick={() => navigate("/admin/change-password")}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Password
              </button>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>

    </div>
  );
}

export default Navbar;