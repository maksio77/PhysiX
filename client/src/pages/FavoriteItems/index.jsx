import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import usePhysixService from "../../services/PhysixService";
import ErrorMessage from "../../components/ErrorMessage";
import Spinner from "../../components/Spinner";
import { Helmet } from "react-helmet";

const FavoriteItems = () => {
  const token = localStorage.getItem("token");
  const { error, loading, getFavoriteItems } = usePhysixService();

  const [items, setItems] = useState();

  const getFavorites = useCallback(async () => {
    try {
      const res = await getFavoriteItems(token);
      setItems(res);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getFavorites();
  }, [getFavorites]);

  const content = items ? (
    <>
      <h2 className="text-4xl font-semibold mx-auto mt-28 text-primary">
        Обране
      </h2>
      <div className="flex flex-col items-start max-w-screen-xl mx-auto w-full">
        <Link
          to={`/`}
          className="mt-4 bg-primary text-white p-2 rounded-md text-left"
        >
          Назад
        </Link>
        <div className="flex flex-wrap justify-center items-center gap-4 mt-20 mb-8 w-full">
          <div className="bg-white rounded-lg overflow-hidden w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 shadow-md flex-grow">
            <div
              className={`p-4 ${
                items.favoriteTests.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              title={items.favoriteTests.length === 0 ? "ТЕСТИ ВІДСУТНІ" : ""}
            >
              <Link
                to={`/tests/favoriteTests`}
                state={{
                  tests: items.favoriteTests,
                  themeName: "Обрані Тести",
                  backRoute: {
                    link: "/favorite",
                    routeText: "До обраного",
                  },
                }}
                style={{
                  alignSelf: "flex-start",
                  textDecoration: "none",
                }}
                className={`sm:ml-10 ${
                  items.favoriteTests.length === 0 ? "pointer-events-none" : ""
                }`}
              >
                <h3 className="text-lg font-semibold hover:text-primary w-full">
                  Тести
                </h3>
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 shadow-md flex-grow">
            <div
              className={`p-4 ${
                items.favoriteArticles.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              title={
                items.favoriteArticles.length === 0 ? "МАТЕРІАЛИ ВІДСУТНІ" : ""
              }
            >
              <Link
                to={`/sections/favorite/materials/1`}
                state={{ theme: items.favoriteArticles }}
                style={{
                  alignSelf: "flex-start",
                  textDecoration: "none",
                }}
                className={`sm:ml-10 ${
                  items.favoriteArticles.length === 0
                    ? "pointer-events-none"
                    : ""
                }`}
              >
                <h3 className="text-lg font-semibold hover:text-primary w-full">
                  Матеріали
                </h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;

  const errorMessage = error ? <ErrorMessage message={error} /> : null;
  const spinner = loading ? <Spinner loading={loading} /> : null;

  return (
    <>
      <Helmet>
        <title>Обрані матеріали - Додаток для вивчення фізики</title>
        <meta
          name="description"
          content="Зберігайте обрані тести та матеріали для подальшого використання. Використовуйте наш додаток для ефективної підготовки до ЗНО та НМТ з фізики."
        />
      </Helmet>

      <div className="min-h-[91vh] flex flex-col justify-center items-center bg-secondary">
        {errorMessage}
        {spinner}
        {content}
      </div>
    </>
  );
};

export default FavoriteItems;
