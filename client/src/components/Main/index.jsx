import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RingLoader from "react-spinners/ClipLoader";
import usePhysixService from "../../services/PhysixService";
import ErrorMessage from "../ErrorMessage";

const Main = () => {
  const { loading, error, getAllSections } = usePhysixService();
  const [sections, setSections] = useState([]);

  useEffect(() => {
    let storedSections = localStorage.getItem('sections');
    if (storedSections) {
      setSections(JSON.parse(storedSections));
    } else {
      getAllSections().then((res) => {
        setSections(res);
        localStorage.setItem('sections', JSON.stringify(res));
      });
    } 
  }, []);

  const content = sections.length !== 0 ? (
    <div className="flex flex-wrap justify-center items-center gap-4 max-w-screen-xl mx-auto mt-28 mb-8">
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
  ) : null;

  const errorMessage = error ? <ErrorMessage message={error} /> : null;
  
  const spinner = loading ? (
    <RingLoader
      color={"black"}
      loading={loading}
      size={100}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  ) : null;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-secondary">
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

export default Main;
