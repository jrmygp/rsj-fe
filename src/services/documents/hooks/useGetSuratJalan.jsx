import { useGetSuratJalanQuery } from '../api/useGetSuratJalanQuery';

export const useGetSuratJalan = (search, page = 1) => {
  const {
    data: suratJalanData,
    status: suratJalanStatus,
    refetch,
  } = useGetSuratJalanQuery(search, page);

  return {
    suratJalanData,
    suratJalanStatus,
    refetch,
  };
};
