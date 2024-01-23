import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Section = () => {
    const [themes, setThemes] = useState([]);
    const param = useParams();

    useEffect(() => {
        const getSections = async () => {
        try {
            const url = `http://localhost:4000/api/sections/${param.section}`;
            const { data } = await axios.get(url);
            setThemes(data.themes);
        } catch (error) {   
            console.log(error);
            setThemes([]);
        }
        };
        getSections();
    },[param.section]);
    
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <div className="flex flex-wrap justify-center items-center gap-4 max-w-screen-xl mx-auto mt-20 mb-8">
                {themes.map((theme) => (
                    <div key={theme._id} className="bg-white rounded-lg overflow-hidden w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 shadow-md flex-grow">
                        {/* <img src="https://via.placeholder.com/300" alt="section" className="w-full h-48 object-cover" /> */}
                        <div className="p-4">
                            <h3 className="text-lg font-semibold">{theme.themeName}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Section;