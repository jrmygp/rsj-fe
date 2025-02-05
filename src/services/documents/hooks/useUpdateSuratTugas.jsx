/* eslint-disable no-unused-vars */
import { useToast } from '@/hooks/use-toast';
import { useUpdateSuratTugasMutation } from '../api/useUpdateSuratTugasMutation';

export const useUpdateSuratTugas = () => {
  const { toast } = useToast();

  const { mutate: updateSuratTugasMutation, status: updateSuratTugasStatus } =
    useUpdateSuratTugasMutation({
      onSuccess: async (res) => {
        toast({
          title: 'Update Surat Tugas Success',
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

  return { updateSuratTugasMutation, updateSuratTugasStatus };
};
