import { createContext, useState, useEffect } from "react";
import usePhysixService from "../../services/PhysixService";
export const TestContext = createContext();

const TestProvider = (props) => {
  const [tests, setTests] = useState([]);
  const { getAllTests, loading, error } = usePhysixService();

  useEffect(() => {
    let storedTests = localStorage.getItem("tests");
    if (storedTests) {
      setTests(JSON.parse(storedTests));
    } else {
      getAllTests().then((res) => {
        if(res.length !== 0) {
          setTests(res);
          localStorage.setItem("tests", JSON.stringify(res));
        }
      });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <TestContext.Provider value={{tests, error, loading}}>
      {props.children}
    </TestContext.Provider>
  );
};

export default TestProvider;
