import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import logo from "../../images/logo192.png";
import Spinner from "../../components/Spinner";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen flex-col bg-secondary">
      <img src={logo} alt="LOGO" className="w-24 lg:w-36" />
      <div className="flex flex-col sm:flex-row bg-white border-gray-100 shadow-xl rounded-xl p-4 sm:p-14 mb-2 mx-1 sm:max-w-3xl">
        <div className="justify-center bg-primary rounded-xl flex p-4 flex-col mb-4 w-full sm:w-1/2 lg:w-2/3 xl:w-3/4">
          <form className="flex flex-col mx-auto" onSubmit={handleSubmit}>
            <h1 className="mx-auto text-2xl lg:text-4xl justify-center flex mb-5 text-white">
              Створити обліковий запис
            </h1>
            <div className="flex items-center mb-1">
              <FaUserCircle color="white" size={30} className="mr-3" />
              <input
                type="text"
                placeholder="Ім'я"
                name="firstName"
                onChange={handleChange}
                value={data.firstName}
                required
                className="bg-secondary outline-none rounded-md p-3 w-full"
                style={{ maxWidth: "100%" }}
              />
            </div>
            <div className="flex items-center mb-1">
              <FaUserCircle color="white" size={30} className="mr-3" />
              <input
                type="text"
                placeholder="Прізвище"
                name="lastName"
                onChange={handleChange}
                value={data.lastName}
                required
                className="bg-secondary outline-none rounded-md p-3 w-full"
                style={{ maxWidth: "100%" }}
              />
            </div>
            <div className="flex items-center mb-1">
              <MdOutlineEmail color="white" size={30} className="mr-3" />
              <input
                type="text"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
                className="bg-secondary outline-none rounded-md p-3 w-full"
                style={{ maxWidth: "100%" }}
              />
            </div>
            <div className="flex items-center mb-1">
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
            {!loading ? (
              <>
                {error && (
                  <div className="bg-red-400 mx-auto w-full sm:w-80 rounded-md p-2 mt-1">
                    {error}
                  </div>
                )}
                {msg && (
                  <div className="bg-green-400 mx-auto rounded-md p-2">
                    {msg}
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
              Зареєструватися
            </button>
          </form>
        </div>
        <div className="flex flex-col mx-auto justify-center items-center p-4 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
          <h1 className="mx-auto text-2xl lg:text-4xl justify-center flex mb-5">
            Вже маєте обліковий запис?
          </h1>
          <Link to="/login">
            <button
              type="button"
              className="text-xl bg-primary hover:opacity-85 hover:shadow-sm  text-white justify-center rounded-xl p-2 mx-auto flex"
            >
              Увійти
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
  // return (
  //   <div className="flex justify-center items-center min-h-screen flex-col bg-secondary">
  //     <img src={logo} alt="LOGO" className="w-24 lg:w-36" />
  //     <div className="flex flex-col sm:flex-row bg-white border-gray-100 shadow-xl rounded-xl p-4 sm:p-14 mb-2 mx-1 sm:max-w-3xl">
  //       <div className="justify-center bg-primary rounded-xl flex p-4 flex-col mb-4 w-full sm:w-1/2 lg:w-2/3 xl:w-3/4">
  //         <form className="flex flex-col mx-auto" onSubmit={handleSubmit}>
  //           <h1 className="mx-auto text-2xl lg:text-4xl justify-center flex mb-5 text-white">
  //             Створити обліковий запис
  //           </h1>
  //           <input
  //             type="text"
  //             placeholder="Ім'я"
  //             name="firstName"
  //             onChange={handleChange}
  //             value={data.firstName}
  //             required
  //             className="bg-secondary outline-none rounded-md p-3 mb-1 w-full"
  //             style={{ maxWidth: "100%" }}
  //           />
  //           <input
  //             type="text"
  //             placeholder="Прізвище"
  //             name="lastName"
  //             onChange={handleChange}
  //             value={data.lastName}
  //             required
  //             className="bg-secondary outline-none rounded-md mb-1 p-3 w-full"
  //             style={{ maxWidth: "100%" }}
  //           />
  //           <input
  //             type="text"
  //             placeholder="Email"
  //             name="email"
  //             onChange={handleChange}
  //             value={data.email}
  //             required
  //             className="bg-secondary outline-none rounded-md p-3 mb-1 w-full"
  //             style={{ maxWidth: "100%" }}
  //           />
  //           <input
  //             type="password"
  //             placeholder="Пароль"
  //             name="password"
  //             onChange={handleChange}
  //             value={data.password}
  //             required
  //             className="bg-secondary outline-none rounded-md p-3 mb-1 w-full"
  //             style={{ maxWidth: "100%" }}
  //           />
  //           {error && (
  //             <div className="bg-red-400 mx-auto w-full sm:w-80 rounded-md p-2 mt-1">
  //               {error}
  //             </div>
  //           )}
  //           {msg && (
  //             <div className="bg-green-400 mx-auto rounded-md p-2">{msg}</div>
  //           )}
  //           <button
  //             type="submit"
  //             className="text-xl bg-white text-black rounded-xl p-2 m-3 mx-auto"
  //           >
  //             Зареєструватися
  //           </button>
  //         </form>
  //       </div>
  //       <div className="flex flex-col mx-auto justify-center items-center p-4 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
  //         <h1 className="mx-auto text-2xl lg:text-4xl justify-center flex mb-5">
  //           Вже маєте обліковий запис?
  //         </h1>
  //         <Link to="/login">
  //           <button
  //             type="button"
  //             className="text-xl bg-primary text-white justify-center rounded-xl p-2 mx-auto flex"
  //           >
  //             Увійти
  //           </button>
  //         </Link>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Signup;
