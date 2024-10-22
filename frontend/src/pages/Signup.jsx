import React, { useState } from "react";
import axios from "axios";
import CheckboxGender from "../components/CheckboxGender";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/authContext";

const Signup = () => {
  const { setAuthUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const navigate = useNavigate();

  const signupDatas = {
    fullName: inputs.fullName,
    userName: inputs.userName,
    password: inputs.password,
    confirmPassword: inputs.confirmPassword,
    gender: inputs.gender,
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { fullName, userName, password, confirmPassword, gender } = inputs;
    try {
      if (!fullName || !userName || !password || !gender) {
        toast("All fields are required!!!");
      }
      if (password !== confirmPassword) {
        toast("Missmatched password!");
      }
      const { data } = await axios.post("/api/auth/signup", signupDatas);
      console.log(data);

      if (data.error) {
        throw new Error(data.error);
      }
      // save data to local storage
      localStorage.setItem("authUser", JSON.stringify(data));
      // context setAuthUser(data)
      setAuthUser(data);
      setLoading(false);
      toast.success("Acount creation successful");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign up
          <span className="text-blue-500 capitalize"> chat app</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2" htmlFor="username">
              <span className="text-base label-text text-white capitalize">
                full name
              </span>
            </label>
            <input
              type="text"
              placeholder="Input your username"
              className="w-full input input-bordered h-10"
              value={inputs.fullName}
              onChange={(event) =>
                setInputs({ ...inputs, fullName: event.target.value })
              }
            />
          </div>
          <div>
            <label className="label" htmlFor="password">
              <span className="text-base label-text text-white capitalize">
                username
              </span>
            </label>
            <input
              type="text"
              placeholder="Input your password"
              className="w-full input input-bordered h-10"
              value={inputs.userName}
              onChange={(event) =>
                setInputs({ ...inputs, userName: event.target.value })
              }
            />
          </div>
          <div>
            <label className="label" htmlFor="password">
              <span className="text-base label-text text-white capitalize">
                password
              </span>
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
          <div>
            <label className="label" htmlFor="password">
              <span className="text-base label-text text-white capitalize">
                confirm password
              </span>
            </label>
            <input
              type="text"
              placeholder="Input your password"
              className="w-full input input-bordered h-10"
              value={inputs.confirmPassword}
              onChange={(event) =>
                setInputs({ ...inputs, confirmPassword: event.target.value })
              }
            />
          </div>
          <CheckboxGender
            onCheckboxChange={handleCheckboxChange}
            selectedGenger={inputs.gender}
          />
          <Link
            to="/login"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white"
          >
            Already have an account?
          </Link>
          <div>
            <button className="btn btn-block btn-sm mt-2" disabled={loading}>
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
