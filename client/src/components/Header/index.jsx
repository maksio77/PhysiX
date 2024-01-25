import { Link } from "react-router-dom";

const Header = () => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    return (
        <>
            <nav className="bg-teal-500 p-4 w-full fixed top-0 z-10 flex justify-between shadow-md">
                <h1 className="text-4xl text-white">PhysiX</h1>
                <button className="bg-white text-teal-500 px-4 py-2 rounded" onClick={handleLogout}>
                    <Link
                        to={'/login'}
                        style={{
                        alignSelf: "flex-start",
                        textDecoration: "none",
                        }}
                    >
                    Logout
                    </Link>
                </button>
            </nav>
        </>
    )
}

export default Header;