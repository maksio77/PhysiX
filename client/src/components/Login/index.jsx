import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:4000/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className='flex flex-col sm:flex-row bg-white border-gray-100 shadow-xl rounded-xl mx-auto p-4 sm:p-8'>
        <div className="justify-center bg-teal-500 rounded-xl flex p-4 sm:p-8 flex-col mb-4 sm:mb-0">
          <form className='flex flex-col mx-auto' onSubmit={handleSubmit}>
            <h1 className='mx-auto text-4xl justify-center flex mb-5 text-white'>Login to Your Account</h1>
            <input
              type="text"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className='bg-gray-100 outline-0 rounded-md p-3 w-96 mb-1.5'
            ></input>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className='bg-gray-100 outline-0 rounded-md p-3 w-96 mb-1.5'
            ></input>
            <Link
              to="/forgot-password"
              style={{
                alignSelf: "flex-start",
                textDecoration: "none",
                color: "white",
              }}
            >
              <p style={{ padding: "0 15px" }}>Forgot Password?</p>
            </Link>
            {error && <div className='bg-red-400 mx-auto w-96 rounded-md p-2 mt-1'>{error}</div>}
            <button type="submit" className="text-xl bg-white text-black rounded-xl p-2 m-3 mx-auto">
              Sign In
            </button>
          </form>
        </div>
        <div className='flex flex-col mx-auto justify-center p-20'>
          <h1 className='mx-auto text-4xl justify-center flex mb-5'>New Here?</h1>
          <Link to="/signup">
            <button type="button" className="text-xl bg-teal-500 text-white rounded-xl p-2 m-3 mx-auto flex">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
