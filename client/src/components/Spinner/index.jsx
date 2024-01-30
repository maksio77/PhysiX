import RingLoader from "react-spinners/ClipLoader";

const Spinner = ({loading}) => {
  return <RingLoader
    color={"black"}
    loading={loading}
    size={100}
    aria-label="Loading Spinner"
    data-testid="loader"
  />;
};

export default Spinner;
