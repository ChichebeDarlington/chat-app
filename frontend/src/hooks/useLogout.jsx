import { useState } from "react";
import { useAuthContext } from "../context/authContext";
import { toast } from "react-toastify";
import axios from "axios";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);

    try {
      const { data } = await axios.post("/api/auth/logout");

      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.removeItem("authUser");
      setAuthUser(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { logout, loading };
};

export default useLogout;
