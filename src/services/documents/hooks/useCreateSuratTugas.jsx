import { useToast } from '@/hooks/use-toast';
import { useCreateSuratTugasMutation } from '../api/useCreateSuratTugasMutation';

export const useCreateSuratTugas = () => {
  const { toast } = useToast();

  const { mutate: createSuratTugas, status: createSuratTugasStatus } =
    useCreateSuratTugasMutation({
      onSuccess: async () => {
        toast({
          title: 'Create Surat Tugas Success',
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

  return { createSuratTugas, createSuratTugasStatus };
};
