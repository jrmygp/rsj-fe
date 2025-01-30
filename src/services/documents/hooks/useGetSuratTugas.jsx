import { useGetSuratTugasQuery } from '../api/useGetSuratTugasQuery';

export const useGetSuratTugas = (search, page = 1) => {
  const {
    data: suratTugasData,
    status: suratTugasStatus,
    refetch,
  } = useGetSuratTugasQuery(search, page);

  return {
    suratTugasData,
    suratTugasStatus,
    refetch,
  };
};
