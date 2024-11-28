/* eslint-disable react-hooks/exhaustive-deps */
import { useGetQuotation } from '@/services/quotation/hooks/useGetQuotation';
import Loading from '@/components/template/Loading';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useDeleteQuotation } from '@/services/quotation/hooks/useDeleteQuotation';
import { useEffect, useState } from 'react';
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
import {
  MdAdd,
  MdOutlineSearch,
  MdEdit,
  MdDelete,
  MdDownload,
} from 'react-icons/md';
import { Input } from '@/components/ui/input';
import { useDebounce } from 'use-debounce';
import DataTable from '@/components/template/DataTable/DataTable';

export default function Quotation() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const search = searchParams.get('search') || '';
  const [searchValue, setSearchValue] = useState(search);
  const [debouncedSearch] = useDebounce(searchValue, 1000);

  const navigate = useNavigate();

  const { quotationData, quotationStatus, refetch } = useGetQuotation(
    debouncedSearch,
    page,
  );
  const { deleteQuotationMutation, deleteQuotationStatus } =
    useDeleteQuotation();

  const { generatePdfMutation } = useGeneratePdf();

  useEffect(() => {
    refetch();
  }, [deleteQuotationStatus, page, debouncedSearch]);

  if (quotationStatus === 'pending') {
    return <Loading />;
  }

  const quotation = quotationData?.data;

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString(), search: debouncedSearch });
  };

  const handleSearchChange = (newSearch) => {
    setSearchValue(newSearch);
    setSearchParams({ page: '1', search: newSearch });
  };

  const columns = [
    {
      header: 'Quotation Number',
      assessor: 'quotationNumber',
    },
    {
      header: 'Customer Name',
      assessor: 'customerName',
    },
    {
      header: 'Rate Validity',
      assessor: 'rateValidity',
    },
    {
      header: 'Shipping Term',
      assessor: 'shippingTerm',
    },
    {
      header: 'Loading',
      assessor: 'portOfLoadingName',
    },
    {
      header: 'Discharge',
      assessor: 'portOfDischargeName',
    },
    {
      header: 'Service',
      assessor: 'service',
    },
    {
      header: 'Status',
      assessor: 'status',
      Cell: (row) => {
        return (
          <div
            className={`rounded-xl px-2 py-1 text-white ${row.status === 'Pending' ? 'bg-yellow-500' : row.status === 'Accepted' ? 'bg-green-500' : 'bg-red-500'}`}
          >
            {row.status}
          </div>
        );
      },
    },
    {
      header: '',
      tdStyle: { width: '5%' },
      Cell: (row) => {
        return (
          <div className='flex items-center gap-2'>
            <Button
              size='icon'
              className='rounded-full bg-blue-500'
              onClick={() =>
                navigate(`/radix-logistics/quotation/edit/${row.id}`, {
                  state: { data: row },
                })
              }
            >
              <MdEdit />
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size='icon'
                  className='rounded-full'
                  variant='destructive'
                >
                  <MdDelete />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
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

            <Button
              size='icon'
              className='rounded-full'
              onClick={() => generatePdfMutation(row)}
            >
              <MdDownload />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className='flex h-full w-full flex-col justify-start gap-4 px-10 pb-5'>
      <div className='text-[48px] font-semibold'>Quotation List</div>
      <div className='flex items-center justify-between'>
        <Button
          onClick={() => {
            navigate('/radix-logistics/quotation/create-new');
          }}
          className='flex w-fit items-center justify-center gap-2'
        >
          <MdAdd />
          Add Quotation
        </Button>

        {searchValue !== undefined && handleSearchChange && (
          <Input
            type='text'
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder='Search...'
            className='w-96'
            leftIcon={<MdOutlineSearch size={24} />}
          />
        )}
      </div>
      <div className='flex flex-col items-center justify-between gap-[16px] rounded-xl border bg-white p-10 shadow-xl'>
        <DataTable
          data={quotation}
          columns={columns}
          options={{ pagination: true }}
          page={page}
          setPage={handlePageChange}
          onClickRow={() => {}}
        />
      </div>
    </div>
  );
}
