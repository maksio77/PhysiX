import { createContext, useState, useEffect } from "react";
import usePhysixService from "../../services/PhysixService";
export const SectionContext = createContext();

const SectionProvider = (props) => {
  const [sections, setSections] = useState([]);
  const { getAllSections, loading, error } = usePhysixService();

  useEffect(() => {
    let storedSections = localStorage.getItem("sections");
    if (storedSections) {
      setSections(JSON.parse(storedSections));
    } else {
      getAllSections().then((res) => {
        if(res.length !== 0) {
          setSections(res);
          localStorage.setItem("sections", JSON.stringify(res));
        }
      });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <SectionContext.Provider value={{sections, error, loading}}>
      {props.children}
    </SectionContext.Provider>
  );
};

export default SectionProvider;
