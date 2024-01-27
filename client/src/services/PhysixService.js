import { useHttp } from "../hooks/http.hook";

const usePhysixService = () => {
  const { loading, request, error, clearError } = useHttp();

  const getAllSections = async () => {
    const res = await request();
    return res;
  }

  return {
    loading,
    error,
    clearError,
    getAllSections,
  };
}

export default usePhysixService;
