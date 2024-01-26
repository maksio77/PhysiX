import { Link } from "react-router-dom";

const Header = () => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    return (
        <>
            <nav className="bg-primary p-4 w-full fixed top-0 z-10 flex justify-between shadow-md">
                <Link
                    to={'/'}
                >
                    <h1 className="text-4xl text-white">PhysiX</h1>
                </Link>
                <button className="bg-white text-primary px-4 py-2 rounded" onClick={handleLogout}>
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