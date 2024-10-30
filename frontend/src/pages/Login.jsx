import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [inputs, setInputs] = useState({
    userName: "",
    password: "",
  });

  const navigate = useNavigate();

  const { setAuthUser } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const loginDatas = {
    userName: inputs.userName,
    password: inputs.password,
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { userName, password } = inputs;
    try {
      if (!userName || !password) {
        toast("All fields are required!!!");
      }
      const { data } = await axios.post("/api/auth/login", loginDatas);
      console.log(data);

      if (data.error) {
        throw new Error(data.error);
      }
      // save data to local storage
      localStorage.setItem("authUser", JSON.stringify(data));
      // context setAuthUser(data)
      setAuthUser(data);
      setLoading(false);
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
          <span className="text-blue-500 capitalize"> chat app</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2" htmlFor="username">
              <span className="text-base label-text capitalize">username</span>
            </label>
            <input
              type="text"
              placeholder="Input your username"
              className="w-full input input-bordered h-10"
              value={inputs.userName}
              onChange={(event) =>
                setInputs({ ...inputs, userName: event.target.value })
              }
            />
          </div>
          <div>
            <label className="label" htmlFor="password">
              <span className="text-base label-text capitalize">password</span>
            </label>
            <input
              type="text"
              placeholder="Input your password"
              className="w-full input input-bordered h-10"
              value={inputs.password}
              onChange={(event) =>
                setInputs({ ...inputs, password: event.target.value })
              }
            />
          </div>
          <Link
            to="/signup"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white"
          >
            Don't have an account?
          </Link>
          <div>
            <button className="btn btn-block btn-sm mt-2">
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
