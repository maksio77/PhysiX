import RingLoader from "react-spinners/ClipLoader";

const Spinner = ({loading, size = 100}) => {
  return <RingLoader
    color={"black"}
    loading={loading}
    size={size}
    aria-label="Loading Spinner"
    data-testid="loader"
  />;
};

export default Spinner;
