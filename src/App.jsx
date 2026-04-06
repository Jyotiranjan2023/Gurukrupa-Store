import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

// Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Contact from "./pages/Contact";

// Admin Pages
import AddProduct from "./pages/Admin/AddProduct";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import EditProduct from "./pages/Admin/EditProduct";
import Login from "./pages/Admin/Login";
import ChangePassword from "./pages/Admin/ChangePassword";

// Layout
import MainLayout from "./layouts/MainLayout";

function App() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 FIX: Track auth properly
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 🔐 Protected Route
  const ProtectedRoute = ({ children }) => {
    if (loading) return <p>Loading...</p>;
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <MainLayout>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        {/* 🔐 ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-product"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/edit/:id"
          element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          }
        />

        {/* ✅ MISSING ROUTE (IMPORTANT) */}
        <Route
          path="/admin/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />

      </Routes>
    </MainLayout>
  );
}

export default App;