import { useToast } from '@/hooks/use-toast';
import { useCreateSuratJalanMutation } from '../api/useCreateSuratJalanMutation';

export const useCreateSuratJalan = () => {
  const { toast } = useToast();

  const { mutate: createSuratJalan, status: createSuratJalanStatus } =
    useCreateSuratJalanMutation({
      onSuccess: async () => {
        toast({
          title: 'Create Surat Jalan Success',
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

  return { createSuratJalan, createSuratJalanStatus };
};
