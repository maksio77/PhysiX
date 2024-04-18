import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { TfiMenu } from "react-icons/tfi";
import { FaRobot } from "react-icons/fa6";
import { FaNoteSticky } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import Spinner from "../Spinner";

const Header = () => {
  const { user, loading } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpenSection, setIsOpenSection] = useState(false);

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

  const simulations = [
    { link: "gasProperties", name: "Властивості газу" },
    { link: "density", name: "Густина" },
    { link: "electricCircuit", name: "Електричне коло" },
    { link: "faradaysLaw", name: "Закон Фарадея" },
    { link: "optics", name: "Оптика" },
    { link: "buildNucleus", name: "Побудувати ядро" },
    { link: "rutherfordScattering", name: "Розсіювання Резерфорда" },
    { link: "skatesPark", name: "Скейт парк" },
    { link: "energyFormsAndChanges", name: "Форми енергії та їх зміни" },
    { link: "wawes", name: "Хвилі" },
  ];

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
      <div className="flex items-center">
        <div className="flex items-center">
          <FaUserCircle className="sm:text-sm lg:text-lg text-secondary mr-1 hidden sm:block" />
          <p className="sm:text-sm lg:text-lg text-secondary mr-2 hidden sm:block">
            {!user || loading ? (
              <Spinner size={20} />
            ) : (
              `${user.firstName} ${user.lastName}`
            )}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-white lg:text-xl sm: text-sm text-primary px-4 py-2 rounded hover:bg-secondary"
        >
          <Link
            to={"/login"}
            style={{ alignSelf: "flex-start", textDecoration: "none" }}
          >
            Вийти
          </Link>
        </button>
      </div>
      {menuOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-full rounded-xl left-0 lg:w-64 bg-white z-20 flex flex-col p-4 items-center space-around space-y-4 transition-transform duration-200 transform translate-x-0 overflow-auto shadow-lg"
        >
          <Link to={"/"} style={{ textDecoration: "none", width: "100%" }}>
            <button
              onClick={toggleMenu}
              className="bg-primary text-white px-4 py-2 rounded w-full hover:bg-secondary hover:text-primary flex justify-between items-center"
            >
              <IoMdHome className="self-start" size={20} />
              <span className="self-center flex-grow text-center px-3">
                На головну
              </span>
            </button>
          </Link>

          <button
            id="dropdown-button"
            className="bg-primary text-white px-4 py-2 rounded w-full hover:bg-secondary hover:text-primary flex justify-between items-center"
            onClick={() => setIsOpenSection(!isOpenSection)}
          >
            <FaRobot className="self-start" size={20} />
            <span className="self-center flex-grow text-center px-3">
              Симуляції
            </span>
            <FaChevronDown
              className={`self-end transition-transform duration-300 ${
                isOpenSection ? "rotate-180" : ""
              }`}
              size={20}
            />
          </button>

          <div
            id="dropdown-list"
            className={`dropdown-list text-center ${
              isOpenSection ? "block" : "hidden"
            }`}
            style={{ maxHeight: "190px", overflowY: "scroll", width: "100%" }}
          >
            <ul className="list-reset">
              {simulations.map((simulation, index) => (
                <li
                  key={index}
                  className="p-2 my-1 bg-secondary rounded-xl text-black hover:bg-gradient-to-r from-primary to-transparent"
                >
                  <Link
                    onClick={toggleMenu}
                    to={`/simulations/${simulation.link}`}
                    style={{ textDecoration: "none", width: "100%" }}
                  >
                    {simulation.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Link to={"/tests"} style={{ textDecoration: "none", width: "100%" }}>
            <button
              onClick={toggleMenu}
              className="bg-primary text-white px-4 py-2 rounded w-full hover:bg-secondary hover:text-primary flex justify-between items-center"
            >
              <FaNoteSticky size={20} className="self-start" />
              <span className="self-center flex-grow text-center px-3">
                Тестування
              </span>
            </button>
          </Link>

          <Link
            to={"/favorite"}
            style={{ textDecoration: "none", width: "100%" }}
          >
            <button
              onClick={toggleMenu}
              className="bg-primary text-white px-4 py-2 rounded w-full hover:bg-secondary hover:text-primary flex justify-between items-center"
            >
              <FaStar size={20} className="self-start" />
              <span className="self-center flex-grow text-center px-3">
                Обране
              </span>
            </button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
