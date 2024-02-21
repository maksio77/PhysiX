import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PaginatedGrid from "../../components/PaginatedGrid";
import SearchInput from "../../components/SearchInput";

const FavoriteMaterials = () => {
  const { state } = useLocation();

  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("favoriteTheme");
    return storedTheme ? JSON.parse(storedTheme) : {};
  });

  const [originalData, setOriginalData] = useState(() => {
    const storedOriginalData = localStorage.getItem("originalData");
    return storedOriginalData ? JSON.parse(storedOriginalData) : {};
  });

  const [inputText, setInputText] = useState("");

  useEffect(() => {
    if (state?.theme) {
      const initialData = { info: state.theme, themeRoute: "materials" };
      setTheme(initialData);
      setOriginalData(initialData);
      localStorage.setItem("favoriteTheme", JSON.stringify(initialData));
      localStorage.setItem("originalData", JSON.stringify(initialData));
    }
  }, [state]);

  const filterByInput = (array, text) => {
    const lowerCaseText = text.toLowerCase();
    return array.filter((obj) => {
      for (let key in obj) {
        if (String(obj[key]).toLowerCase().includes(lowerCaseText)) {
          return true;
        }
      }
      return false;
    });
  };

  const handleSearchChange = (e) => {
    setInputText(e.target.value);

    if (e.target.value === "") {
      setTheme(originalData);
    } else {
      const res = filterByInput(originalData?.info || [], e.target.value);
      if (res.length > 0) {
        const updatedTheme = { ...originalData, info: res };
        setTheme(updatedTheme);
        localStorage.setItem("favoriteTheme", JSON.stringify(updatedTheme));
      }
    }
  };

  const handleResetSearch = () => {
    setInputText("");
    setTheme(originalData);
    localStorage.setItem("favoriteTheme", JSON.stringify(originalData));
  };

  return (
    <div className="min-h-[91vh] flex mx-auto flex-col justify-center items-center bg-secondary">
      <h2 className="sm: text-2xl lg:text-4xl font-semibold mx-auto mt-24 text-primary mb-2">
        Обрані Матеріали
      </h2>

      <div className="flex flex-col items-start max-w-screen-xl mx-auto">
        <div className="flex w-full lg:mt-8 sm:mt-2 space-x-4">
          <Link
            to={`/favorite`}
            className="flex-initial sm: text-xs lg:text-base p-2 border-2 border-secondary rounded-md text-white bg-primary hover:bg-secondary hover:text-primary text-left self-start"
          >
            До обраного
          </Link>
          <SearchInput
            className="flex-grow w-full"
            inputText={inputText}
            handleSearchChange={handleSearchChange}
            handleResetSearch={handleResetSearch}
          />
        </div>

        {theme && theme.info && theme.info.length > 0 && (
          <PaginatedGrid
            theme={theme}
            searchPhrase={""}
            inputText={inputText}
          />
        )}
      </div>
    </div>
  );
};

export default FavoriteMaterials;
