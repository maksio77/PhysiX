import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import logo from "../../images/logo192.png";
import Spinner from "../../components/Spinner";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen flex-col bg-secondary">
      <img src={logo} alt="LOGO" className=" sm: w-24 lg:w-36 " />
      <div className="flex flex-col sm:flex-row bg-white border-gray-100 shadow-xl rounded-xl p-4 sm:p-14 mb-2 mx-1 sm:max-w-3xl">
        <div className="justify-center bg-primary rounded-xl flex p-4 flex-col mb-4 w-full sm:w-1/2 lg:w-2/3 xl:w-3/4">
          <form className="flex flex-col mx-auto" onSubmit={handleSubmit}>
            <h1 className="mx-auto sm: text-2xl lg:text-4xl justify-center flex mb-5 text-white ">
              Увійдіть до свого облікового запису
            </h1>
            <div className="flex items-center">
              <MdOutlineEmail color="white" size={30} className="mr-3" />
              <input
                type="text"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
                className="bg-secondary outline-none rounded-md p-3 mb-1 w-full"
                style={{ maxWidth: "100%" }}
              />
            </div>
            <div className="flex items-center">
              <RiLockPasswordLine color="white" size={30} className="mr-3" />
              <input
                type="password"
                placeholder="Пароль"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                className="bg-secondary outline-none rounded-md p-3 w-full"
                style={{ maxWidth: "100%" }}
              />
            </div>
            <Link
              to="/forgot-password"
              style={{
                alignSelf: "flex-start",
                textDecoration: "none",
                color: "white",
                marginLeft: "2.5rem",
                marginTop: "0.5rem",
              }}
            >
              Забув пароль?
            </Link>
            {!loading ? (
              <>
                {error && (
                  <div className="bg-red-400 mx-auto w-full sm:w-80 rounded-md p-2 mt-1">
                    {error}
                  </div>
                )}
              </>
            ) : (
              <div className="mx-auto flex items-center mt-4">
                <Spinner size={30} />
              </div>
            )}
            <button
              type="submit"
              className="text-xl hover:opacity-85 hover:shadow-sm  bg-white text-black rounded-xl p-2 m-3 mx-auto"
            >
              Увійти
            </button>
          </form>
        </div>
        <div className="flex flex-col mx-auto justify-center p-4 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
          <h1 className="mx-auto sm: text-2xl lg:text-4xl justify-center flex mb-5">
            Новачок?
          </h1>
          <Link to="/signup">
            <button
              type="button"
              className="text-xl hover:opacity-85 hover:shadow-sm  bg-primary text-white justify-center rounded-xl p-2 mx-auto flex"
            >
              Зареєструватися
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
