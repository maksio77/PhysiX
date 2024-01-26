import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import RingLoader from "react-spinners/ClipLoader";

const Main = () => {
  const [sections, setSections] = useState([]);
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSections = async () => {
      try {
        const url = `http://localhost:4000/api/sections`;
        const { data } = await axios.get(url);
        setSections(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setSections([]);
      }
    };
    getSections();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-secondary">
        <RingLoader
          color={"black"}
          loading={isLoading}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-secondary">
      <div className="flex flex-wrap justify-center items-center gap-4 max-w-screen-xl mx-auto mt-20 mb-8">
        {sections.map((section) => (
          <div
            key={section._id}
            className="bg-white rounded-lg overflow-hidden w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 shadow-md flex-grow"
          >
            <img
              src={section.img}
              alt={section.img_alt}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <Link
                to={`/sections/${section.routeName}`}
                state={{ section: section }}
                style={{
                  alignSelf: "flex-start",
                  textDecoration: "none",
                }}
                className="sm: ml-10"
              >
                <h3 className="text-lg font-semibold">{section.sectionName}</h3>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
