import { useToast } from '@/hooks/use-toast';
import { useDeleteSuratTugasMutation } from '../api/useDeleteSuratTugasMutation';

export const useDeleteSuratTugas = () => {
  const { toast } = useToast();

  const { mutate: deleteSuratTugasMutation, status: deleteSuratTugasStatus } =
    useDeleteSuratTugasMutation({
      onSuccess: async () => {
        toast({
          variant: 'destructive',
          title: 'Delete Surat Tugas Success',
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
  return { deleteSuratTugasMutation, deleteSuratTugasStatus };
};
