import React from "react";
import MathJax from "react-mathjax";
import { replaceUnderscores } from "../../utils/repleceUnderscores";

const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const formula = [];
  const text = `
    `;

  {/* <p className="text-3xl p-2">
        <MathJax.Provider>{replaceUnderscores(text, formula)}</MathJax.Provider>
      </p> */}

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <nav className="bg-teal-500 p-4 w-full fixed top-0 z-10 flex justify-between shadow-md">
        <h1 className="text-4xl text-white">PhysiX</h1>
        <button className="bg-white text-teal-500 px-4 py-2 rounded" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <div className="flex flex-wrap justify-center items-center gap-4 max-w-screen-xl mx-auto mt-20 mb-8">
        {/* Блоки */}
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <div key={index} className="bg-white rounded-lg overflow-hidden w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 shadow-md">
            <img src="https://via.placeholder.com/300" alt="Image" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">Заголовок {index}</h3>
              <p className="text-gray-600">Текст опису блока</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
