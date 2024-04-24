import img from "./error.gif";

const ErrorMassage = ({ message }) => {
  return (
    <>
      <img
        style={{
          display: "block",
          width: "250px",
          height: "250px",
          objectFit: "contain",
          margin: "0 auto",
        }}
        src={img}
        alt="Error Message"
        Error
      />
      <p className="text-red-500">{message}</p>
    </>
  );
};

export default ErrorMassage;
