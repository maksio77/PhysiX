import ErrorMessage from "../ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center">
      <ErrorMessage />
      <p style={{ textAlign: "center", fontWeight: "bold", fontSize: "24px" }}>
        Page doesn't exist
      </p>
      <Link
        style={{
          display: "block",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "24px",
          marginTop: "10px",
        }}
        to="/"
      >
        Back to main page
      </Link>
    </div>
  );
};

export default Page404;
