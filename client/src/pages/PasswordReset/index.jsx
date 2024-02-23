import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Page404 from "../404";

const PasswordReset = () => {
  const [validUrl, setValidUrl] = useState(false);
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const param = useParams();
  const url = `http://localhost:4000/api/password-reset/${param.id}/${param.token}`;

  useEffect(() => {
    const verifyUrl = async () => {
      try {
        await axios.get(url);
        setValidUrl(true);
      } catch (error) {
        setValidUrl(false);
      }
    };
    verifyUrl();
  }, [param, url]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(url, { password });
      setMsg(data.message);
      setError("");
      window.location = "/login";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setMsg("");
      }
    }
  };

  return (
    <>
      {validUrl ? (
        <div className="container mx-auto flex items-center justify-center h-screen">
          <form
            className="bg-white rounded-lg p-8 shadow-lg flex flex-col items-center sm:w-3/4 md:w-1/2 lg:w-1/3"
            onSubmit={handleSubmit}
          >
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
              Створити новий пароль
            </h1>
            <input
              type="password"
              placeholder="Новий пароль"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className="bg-gray-100 rounded-lg border border-gray-400 w-full py-2 px-3 text-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5"
            />
            {error && (
              <div className="bg-red-500 text-white py-2 px-3 rounded-lg mb-5 text-lg">
                {error}
              </div>
            )}
            {msg && (
              <div className="bg-green-500 text-white py-2 px-3 rounded-lg mb-5 text-lg">
                {msg}
              </div>
            )}
            <button
              type="submit"
              className="bg-primary hover:opacity-85 text-white font-bold py-2 px-4 rounded-lg focus:outline focus:shadow-outline text-lg"
            >
              Підтвердити
            </button>
          </form>
        </div>
      ) : (
        <Page404 />
      )}
    </>
  );
};

export default PasswordReset;
