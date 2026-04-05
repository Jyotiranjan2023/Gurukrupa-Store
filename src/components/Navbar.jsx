import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim() === "") return;
    navigate(`/products?search=${search}`);
  };

  return (
    <div>

      {/* TOP STRIP */}
      <div className="bg-orange-500 text-white text-sm py-2 px-6 flex justify-between">

        <p>
          Sacred Products. Pure Blessings. Delivered to Your Doorstep.
        </p>

        <div className="hidden md:flex gap-6">
          <span>📍 Bhubaneswar, Odisha</span>
          <span>📧 Gurukrupaenterpriser@gmail.com</span>
          <span>📞 +91 98619 55811</span>
        </div>

      </div>

      {/* MAIN NAVBAR */}
      <div className="bg-white shadow-md px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <div className="leading-tight">
          <h1 className="text-2xl font-bold text-orange-600">ॐ Gurukrupa</h1>
          <p className="text-xs text-gray-500">Enterprises</p>
        </div>

        {/* SEARCH BAR */}
        <div className="hidden md:flex w-1/2">
          <input
            type="text"
            placeholder="Search for Rudraksha, herbs, flowers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="w-full border rounded-l-lg px-4 py-2 focus:outline-none"
          />

          <button
            onClick={handleSearch}
            className="bg-orange-500 text-white px-4 rounded-r-lg"
          >
            🔍
          </button>
        </div>

        {/* MENU */}
        <div className="flex gap-6 text-gray-700 font-medium">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/contact">Contact</Link>
        </div>

      </div>

    </div>
  );
}

export default Navbar;