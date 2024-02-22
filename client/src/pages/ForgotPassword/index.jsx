import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:4000/api/password-reset`;
      const { data } = await axios.post(url, { email });
      setMsg(data.message);
      setError("");
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
    <div className="container mx-auto flex items-center justify-center h-screen">
      <form
        className="bg-white rounded-lg p-10 shadow-md flex flex-col items-center sm:w-3/4 md:w-1/2 lg:w-1/3"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Забув пароль</h1>
        <input
          type="text"
          placeholder="Email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          className="bg-gray-100 rounded-lg border border-gray-400 w-full py-2 px-3 text-gray-700 leading-tight focus:outline focus:shadow-outline mb-5"
        />
        {error && (
          <div className="bg-red-500 text-white py-2 px-3 rounded-lg mb-5">
            {error}
          </div>
        )}
        {msg && (
          <div className="bg-green-500 text-white py-2 px-3 rounded-lg mb-5">
            {msg}
          </div>
        )}
        <button
          type="submit"
          className="bg-primary hover:opacity-85 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
        >
          Підтвердити
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
