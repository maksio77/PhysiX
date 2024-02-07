import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TfiMenu } from "react-icons/tfi";
import { FaRobot } from "react-icons/fa6";
import { FaNoteSticky } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen) setMenuOpen(false);
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [menuOpen]);

  const toggleMenu = (event) => {
    event.stopPropagation();
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  };

  return (
    <header className="bg-primary p-4 fixed top-0 w-full z-10 flex justify-between items-center shadow-md">
      <div className="flex flex-start">
        <button
          onClick={toggleMenu}
          className="bg-primary text-white px-4 py-2 rounded w-full hover:bg-secondary hover:text-primary"
        >
          <TfiMenu className="h-5 w-5" />
        </button>
      </div>
      <Link to={"/"}>
        <h1 className="sm: text-2xl lg:text-4xl text-white hover:text-secondary">
          PhysiX
        </h1>
      </Link>
      <button
        onClick={handleLogout}
        className="bg-white lg:text-xl sm: text-sm text-primary px-4 py-2 rounded hover:bg-secondary"
      >
        <Link
          to={"/login"}
          style={{ alignSelf: "flex-start", textDecoration: "none" }}
        >
          Logout
        </Link>
      </button>
      {menuOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-full rounded-xl left-0 lg:w-64 bg-white z-20 flex flex-col p-4 items-center space-around space-y-4 transition-transform duration-200 transform translate-x-0 overflow-auto shadow-lg"
        >
          <Link to={"/"} style={{ textDecoration: "none", width: "100%" }}>
            <button onClick={toggleMenu} className="bg-primary text-white px-4 py-2 rounded w-full hover:bg-secondary hover:text-primary flex justify-between items-center">
              <IoMdHome className="self-start" size={20} />
              <span className="self-center flex-grow text-center px-3">
                На головну
              </span>
            </button>
          </Link>
          <Link to={"/simulations"} style={{ textDecoration: "none", width: "100%" }}>
            <button onClick={toggleMenu} className="bg-primary text-white px-4 py-2 rounded w-full hover:bg-secondary hover:text-primary flex justify-between items-center">
              <FaRobot className="self-start" size={20} />
              <span className="self-center flex-grow text-center px-3">
                Симуляції
              </span>
            </button>
          </Link>
          <Link to={"/tests"} style={{ textDecoration: "none", width: "100%" }}>
            <button onClick={toggleMenu} className="bg-primary text-white px-4 py-2 rounded w-full hover:bg-secondary hover:text-primary flex justify-between items-center">
              <FaNoteSticky size={20} className="self-start" />
              <span className="self-center flex-grow text-center px-3">
                Тестування
              </span>
            </button>
          </Link>
          <Link to={"/favourites"} style={{ textDecoration: "none", width: "100%" }}>
            <button onClick={toggleMenu} className="bg-primary text-white px-4 py-2 rounded w-full hover:bg-secondary hover:text-primary flex justify-between items-center">
              <FaStar size={20} className="self-start" />
              <span className="self-center flex-grow text-center px-3">Обране</span>
            </button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
