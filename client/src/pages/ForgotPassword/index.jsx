import { useState } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const url = `https://physix-production-9a73.up.railway.app/api/password-reset`;
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
    } finally {
      setLoading(false);
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
        {!loading ? (
          <>
            {error && (
              <div className="bg-red-400 mx-auto w-full sm:w-80 rounded-md p-2 my-1">
                {error}
              </div>
            )}
            {msg && (
              <div className="bg-green-400 mx-auto rounded-md p-2 my-1">
                {msg}
              </div>
            )}
          </>
        ) : (
          <div className="mx-auto flex items-center m-4">
            <Spinner size={30} />
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
