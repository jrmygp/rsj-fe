/* eslint-disable no-unused-vars */
import { useToast } from '@/hooks/use-toast';
import { useGenerateSuratJalanPDFMutation } from '../api/useGenerateSuratJalanMutation';

export const useGenerateSuratJalanPDF = () => {
  const { toast } = useToast();

  const {
    mutate: generatePdfMutation,
    status: generatePdfStatus,
    data,
  } = useGenerateSuratJalanPDFMutation({
    onSuccess: async (res, variables) => {
      try {
        const blob = new Blob([res.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        const fileName = `${variables.documentNumber || 'Surat Jalan'}.pdf`;

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
        toast({
          title: 'Error',
          description: 'Gagal mengunduh file PDF.',
          variant: 'destructive',
        });
      }
    },
    onError: (err) => {
      toast({
        title: 'Error',
        description: 'Gagal menghasilkan file PDF.',
        variant: 'destructive',
      });
    },
  });

  return { generatePdfMutation, generatePdfStatus, data };
};
