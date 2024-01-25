import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { replaceUnderscores } from "../../utils/repleceUnderscores";

const Theme = () => {
  const [themeName, setThemeName] = useState("");
  const [article, setArticle] = useState([]);
  
  const param = useParams();
  // const {state} = useLocation();

  // console.log(state.themes);
  
  useEffect(() => {
    const getTheme = async () => {
      try {
        const url = `http://localhost:4000/api/sections/${param.section}/${param.theme}`;
        const { data } = await axios.get(url);
        setArticle(data[0].info);
        setThemeName(data[0].themeName);
      } catch (error) {
        console.log(error);
        setArticle([]);
      }
    };
    getTheme();
  }, [param]);

  return (
    <div className="flex flex-col justify-center bg-gray-100">
        <h2 className="text-4xl font-semibold mx-auto mt-28">{themeName}</h2>
        <div className="flex flex-col items-start max-w-screen-xl mx-auto">
            <Link
                to={`/sections/${param.section}`}
                className="mt-4 bg-white p-2 rounded-md text-left self-start"
            >
                Назад
            </Link>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 mb-8 w-full">
                {article.map((item) => (
                    <div
                        key={item._id}
                        className="bg-white rounded-lg overflow-hidden shadow-md"
                    >
                        <div className="p-8">
                            <h3 className="text-xl">
                                {replaceUnderscores(item.text, item.formulas)}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default Theme;
