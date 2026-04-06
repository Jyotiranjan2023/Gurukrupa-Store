import { useState } from "react";
import { auth } from "../../firebase/firebaseConfig";
import { updatePassword } from "firebase/auth";

function ChangePassword() {

  const [password, setPassword] = useState("");

  const handleChangePassword = async () => {
    try {
      await updatePassword(auth.currentUser, password);
      alert("Password updated");
    } catch (error) {
      alert("Error updating password");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">

      <h2 className="text-2xl font-bold mb-4">Change Password</h2>

      <input
        type="password"
        placeholder="New Password"
        className="w-full border p-2 mb-3"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleChangePassword}
        className="w-full bg-orange-500 text-white py-2"
      >
        Update Password
      </button>

    </div>
  );
}

export default ChangePassword;