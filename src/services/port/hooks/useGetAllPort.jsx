import { useGetAllPortQuery } from '../api/useGetAllPortQuery';

export const useGetAllPort = () => {
  const {
    data: portData,
    status: portStatus,
    refetch: portRefetch,
  } = useGetAllPortQuery();

  return {
    portData,
    portStatus,
    portRefetch,
  };
};
