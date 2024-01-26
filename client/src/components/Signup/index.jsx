import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../../images/logo192.png";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const url = "http://localhost:4000/api/users";
      const { data: res } = await axios.post(url, data);
      setMsg(res.message);
      setData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
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
      <div className="flex justify-center items-center min-h-screen flex-col">
        <img src={logo} alt={'LOGO'} className='scale-50 p-0'/>
        <div className='flex flex-col sm:flex-row bg-white border-secondary shadow-xl rounded-xl mx-auto p-4 sm:p-8'>
          <div className="justify-center bg-primary rounded-xl flex p-4 sm:p-8 flex-col mb-4 sm:mb-0">
            <h1 className="text-white text-4xl items-center mb-8">Welcome Back</h1>
            <Link to="/login">
              <button type="button" className="flex text-black text-xl bg-white rounded-xl p-2 mx-auto">
                Sign in
              </button>
            </Link>
          </div>
          <div className='p-4 sm:p-16 flex-grow'>
            <form className='flex flex-col mx-auto' onSubmit={handleSubmit}>
              <h1 className='mx-auto text-4xl justify-center flex mb-5'>Create Account</h1>
              <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  onChange={handleChange}
                  value={data.firstName}
                  required
                  className='bg-secondary outline-0 rounded-md p-3 w-96 mb-1.5'
              ></input>
              <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  onChange={handleChange}
                  value={data.lastName}
                  required
                  className='bg-secondary outline-0 rounded-md p-3 w-96 mb-1.5'
              ></input>
              <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                  required
                  className='bg-secondary outline-0 rounded-md p-3 w-96 mb-1.5'
              ></input>
              <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  value={data.password}
                  required
                  className='bg-secondary outline-0 rounded-md p-3 w-96 mb-1.5'
              ></input>
              {error && <div className='bg-red-400 mx-auto w-96 rounded-md p-2 mt-1'>{error}</div>}
              {msg && <div className='bg-green-400 mx-auto rounded-md p-2'>{msg}</div>}
              <button type="submit" className="text-xl bg-primary text-white rounded-xl p-2 m-3 mx-auto">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Signup;
