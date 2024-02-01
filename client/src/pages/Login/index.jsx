import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import logo from '../../images/logo192.png'

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
    <div className="flex justify-center items-center min-h-screen flex-col sm: w-auto bg-secondary">
      <img src={logo} alt={'LOGO'} className='scale-50 p-0'/>
      <div className='flex flex-col sm:flex-row bg-white border-gray-100 shadow-xl rounded-xl p-4 sm:p-14'>
        <div className="justify-center bg-primary rounded-xl flex p-4 flex-col mb-4 w-full sm:w-auto">
          <form className='flex flex-col mx-auto' onSubmit={handleSubmit}>
            {/*<FaRegUser color='white'/>*/}
            <h1 className='mx-auto text-4xl justify-center flex mb-5 text-white sm: text-2xl'>Login to Your
              Account</h1>
            <div className='flex sm: ml-10'>
              <MdOutlineEmail color='white' size={25} className='flex m-3 mx-auto justify-center'/>
              <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                  required
                  className='bg-secondary outline-0 rounded-md p-3 w-96 mb-1.5 ml-1.5 sm: w-64'
              ></input>
            </div>
            <div className='flex sm: ml-10'>
              <RiLockPasswordLine color='white' size={25} className='flex m-3 mx-auto justify-center'/>
              <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  value={data.password}
                  required
                  className='bg-secondary outline-0 rounded-md p-3 w-96 mb-1.5 ml-1.5 sm: w-64 mx-auto'
              ></input>
            </div>
            <Link
                to="/forgot-password"
                style={{
                  alignSelf: "flex-start",
                  textDecoration: "none",
                  color: "white",
                }}
                className='sm: ml-10'
            >
              <p style={{padding: "0 15px"}}>Forgot Password?</p>
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
            <button type="button" className="text-xl bg-primary text-white rounded-xl p-2 m-3 mx-auto flex">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
