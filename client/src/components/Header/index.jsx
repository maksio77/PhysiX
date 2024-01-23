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
                    Logout
                </button>
            </nav>
      </>
    )
}

export default Header;