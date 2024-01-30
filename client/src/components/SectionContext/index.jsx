import { createContext, useState, useEffect } from "react";
import usePhysixService from "../../services/PhysixService";
export const SectionContext = createContext();

const SectionProvider = (props) => {
  const [sections, setSections] = useState([]);
  const { getAllSections } = usePhysixService();

  useEffect(() => {
    let storedSections = localStorage.getItem("sections");
    if (storedSections) {
      setSections(JSON.parse(storedSections));
    } else {
      getAllSections().then((res) => {
        setSections(res);
        localStorage.setItem("sections", JSON.stringify(res));
      });
    }
  }, []);

  return (
    <SectionContext.Provider value={sections}>
      {props.children}
    </SectionContext.Provider>
  );
};

export default SectionProvider;
