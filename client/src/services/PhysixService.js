import { useHttp } from "../hooks/http.hook";

const usePhysixService = () => {
  const { loading, request, error, clearError } = useHttp();

  const getAllSections = async () => {
    const res = await request('sections');
    return res;
  }

  const getAllTests = async () => {
    const res = await request('tests');
    return res;
  }

  return {
    loading,
    error,
    clearError,
    getAllSections,
    getAllTests
  };
}

export default usePhysixService;
