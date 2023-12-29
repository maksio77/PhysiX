import React from 'react';
import styles from './styles.module.css';
import MathJax from 'react-mathjax';


const Main = () => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    const formula = ``;

    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>fakebook</h1>
                <button className={styles.white_btn} onClick={handleLogout}>
                    Logout
                </button>
            </nav>
            <p className='text-3xl'>

            </p>
            <div className='text-3xl'>
                <MathJax.Provider>
                    <MathJax.Node inline formula={formula} />
                </MathJax.Provider>
            </div>
        </div>
    );
}

export default Main;