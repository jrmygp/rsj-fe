import { useGetQuotation } from '@/services/quotation/hooks/useGetQuotation';
import Loading from '@/components/template/Loading';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import TableTemp from '@/components/template/TableTemp';
import { useDeleteQuotation } from '@/services/quotation/hooks/useDeleteQuotation';
import PaginationTemp from '@/components/template/PaginationTemp';
import { useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useGeneratePdf } from '@/services/quotation/hooks/useGeneratePdf';
import { MdAdd } from 'react-icons/md';

const tableColumns = [
  {
    label: 'Quotation Number',
    accessor: 'quotationNumber',
    className: 'w-1/4',
  },
  { label: 'Customer Name', accessor: 'customerName', className: 'w-1/4' },
  { label: 'Rate Validity', accessor: 'rateValidity', className: 'w-1/5' },
  { label: 'Shipping Term', accessor: 'shippingTerm', className: 'w-1/6' },
  {
    label: 'Port of Loading',
    accessor: 'portOfLoadingName',
    className: 'w-1/6',
  },
  {
    label: 'Port of Discharge',
    accessor: 'portOfDischargeName',
    className: 'w-1/6',
  },
  { label: 'Service', accessor: 'service', className: 'w-1/6' },
  { label: 'Sales Name', accessor: 'salesName', className: 'w-1/6' },
];

export default function Quotation() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const search = searchParams.get('search') || '';

  const navigate = useNavigate();

  const { quotationData, quotationStatus, refetch } = useGetQuotation(
    search,
    page,
  );
  const { deleteQuotationMutation, deleteQuotationStatus } =
    useDeleteQuotation();

  const { generatePdfMutation, generatePdfStatus, data } = useGeneratePdf();

  useEffect(() => {
    refetch();
  }, [deleteQuotationStatus, page, search]);

  if (quotationStatus === 'pending') {
    return <Loading />;
  }

  const quotation = quotationData.data.data;
  const totalPages = quotationData.data.totalPages;

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString(), search });
  };

  const handleSearchChange = (newSearch) => {
    setSearchParams({ page: '1', search: newSearch });
  };

  return (
    <div className='flex h-full w-full flex-col justify-start gap-4 px-10 pb-5'>
      <div className='text-[48px] font-semibold'>Quotation List</div>
      <Button
        onClick={() => {
          navigate('/dashboard/quotation/action');
        }}
        className='flex w-fit items-center justify-center gap-2'
      >
        <MdAdd />
        Add Quotation
      </Button>
      <div className='flex flex-col items-center justify-between gap-[16px] rounded-xl border bg-white p-10 shadow-xl'>
        <TableTemp
          data={quotation}
          columns={tableColumns}
          renderActions={(row) => (
            <>
              <Button
                onClick={() =>
                  navigate(`/dashboard/quotation/action/${row.id}`, {
                    state: { data: row },
                  })
                }
              >
                Edit
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button>Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      this quotation.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteQuotationMutation(row)}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button onClick={() => generatePdfMutation(row)}>PDF</Button>
            </>
          )}
        />
        <PaginationTemp
          handlePageChange={handlePageChange}
          page={page}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}