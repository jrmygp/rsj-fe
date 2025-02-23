import { useGetSuratJalanDetailQuery } from '../api/useGetSuratJalanDetailQuery';

export const useGetSuratJalanDetail = (id) => {
  const {
    data: suratJalanDetailData,
    status: suratJalanDetailStatus,
    refetch,
  } = useGetSuratJalanDetailQuery(id);
  return {
    suratJalanDetailData,
    suratJalanDetailStatus,
    refetch,
  };
};
