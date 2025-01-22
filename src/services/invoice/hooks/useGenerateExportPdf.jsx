import { useToast } from '@/hooks/use-toast';
import { useGenerateExportPdfMutation } from '../api/useGenerateExportPdfMutation';

export const useGenerateExportPdf = () => {
  const { toast } = useToast();

  const {
    mutate: generatePdfMutation,
    status: generatePdfStatus,
    data,
  } = useGenerateExportPdfMutation({
    onSuccess: async (res, variables) => {
      try {
        const blob = new Blob([res.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        const fileName = `${variables.invoiceNumber || 'Invoice'}.pdf`;

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();

        link.parentNode.removeChild(link);

        toast({
          title: 'PDF Generated',
        });
      } catch (error) {
        console.error('Error downloading PDF:', error);
        toast({
          title: 'Error',
          description: 'Gagal mengunduh file PDF.',
          variant: 'destructive',
        });
      }
    },
    onError: (err) => {
      console.error(err);
      toast({
        title: 'Error',
        description: 'Gagal menghasilkan file PDF.',
        variant: 'destructive',
      });
    },
  });

  return { generatePdfMutation, generatePdfStatus, data };
};
