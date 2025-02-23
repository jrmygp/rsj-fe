/* eslint-disable no-unused-vars */
import { useToast } from '@/hooks/use-toast';
import { useUpdateSuratJalanMutation } from '../api/useUpdateSuratJalanMutation';

export const useUpdateSuratJalan = () => {
  const { toast } = useToast();

  const { mutate: updateSuratJalanMutation, status: updateSuratJalanStatus } =
    useUpdateSuratJalanMutation({
      onSuccess: async (res) => {
        toast({
          title: 'Update Surat Jalan Success',
        });
      },
      onError: (err) => {
        toast({
          title: 'Error',
          description: err.response.data.error,
          variant: 'destructive',
        });
      },
    });

  return { updateSuratJalanMutation, updateSuratJalanStatus };
};
