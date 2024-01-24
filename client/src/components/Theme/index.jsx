import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { replaceUnderscores } from "../../utils/repleceUnderscores";

const Theme = () => {
    const [theme, setTheme] = useState([]);
    const param = useParams();

    useEffect(() => {
        const getTheme = async () => {
        try {
            const url = `http://localhost:4000/api/sections/${param.section}/${param.theme}`;
            const { data } = await axios.get(url);
            setTheme(data[0].info);
        } catch (error) {   
            console.log(error);
            setTheme([]);
        }
        };
        getTheme();
    },[param]);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-screen-xl mx-auto mt-28 mb-8">
            {theme.map((item) => (
              <div key={item._id} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="p-8">
                  <h3 className="text-xl">{replaceUnderscores(item.text, item.formulas)}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
    );

    // return (
    //     <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
    //         <div className="flex flex-wrap justify-center items-center gap-4 max-w-screen-xl mx-auto mt-28 mb-8">
    //             {theme.map((item) => (
    //                 <div key={item._id} className="bg-white rounded-lg overflow-hidden w-full sm:w-1/2 md:w-1/3 lg:w-1/4 shadow-md flex-grow">
    //                     <div className="p-4">
    //                         <h3 className="text-xl">{replaceUnderscores(item.text, item.formulas)}</h3>
    //                     </div>
    //                 </div>
    //             ))}
    //         </div>
    //     </div>
    // );
}

export default Theme;