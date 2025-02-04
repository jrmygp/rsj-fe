import { useGetSuratTugasDetailQuery } from '../api/useGetSuratTugasDetailQuery';

export const useGetSuratTugasDetail = (id) => {
  const {
    data: suratTugasDetailData,
    status: suratTugasDetailStatus,
    refetch,
  } = useGetSuratTugasDetailQuery(id);
  return {
    suratTugasDetailData,
    suratTugasDetailStatus,
    refetch,
  };
};
