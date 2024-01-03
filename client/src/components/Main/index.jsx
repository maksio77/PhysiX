import React from 'react';
import styles from './styles.module.css';
import MathJax from 'react-mathjax';
import {replaceUnderscores} from "../../utils/repleceUnderscores";


const Main = () => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    const formula = [""];
    const text = `
    `

    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1 className='text-9xl'>PhysiX</h1>
                <button className={styles.white_btn} onClick={handleLogout}>
                    Logout
                </button>
            </nav>
            <p className='text-3xl p-2'>

                <MathJax.Provider>

                    {replaceUnderscores(text, formula)}
                </MathJax.Provider>
            </p>
        </div>
    );
}

export default Main;