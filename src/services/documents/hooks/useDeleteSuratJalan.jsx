import { useToast } from '@/hooks/use-toast';
import { useDeleteSuratJalanMutation } from '../api/useDeleteSuratJalanMutation';

export const useDeleteSuratJalan = () => {
  const { toast } = useToast();

  const { mutate: deleteSuratJalanMutation, status: deleteSuratJalanStatus } =
    useDeleteSuratJalanMutation({
      onSuccess: async () => {
        toast({
          variant: 'destructive',
          title: 'Delete Surat Jalan Success',
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
  return { deleteSuratJalanMutation, deleteSuratJalanStatus };
};
