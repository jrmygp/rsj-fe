/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
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
import { Button } from '@/components/ui/button';
import DataTable from '@/components/template/DataTable/DataTable';
import {
  MdAdd,
  MdOutlineSearch,
  MdEdit,
  MdDelete,
  MdDownload,
} from 'react-icons/md';
import { Input } from '@/components/ui/input';
import Loading from '@/components/template/Loading';
import { useGetSuratJalan } from '@/services/documents/hooks/useGetSuratJalan';
import { useGenerateSuratJalanPDF } from '@/services/documents/hooks/useGenerateSuratJalanPDF';
import { useDeleteSuratJalan } from '@/services/documents/hooks/useDeleteSuratJalan';

export default function SuratJalan() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const search = searchParams.get('search') || '';
  const [searchValue, setSearchValue] = useState(search);
  const [debouncedSearch] = useDebounce(searchValue, 1000);

  const navigate = useNavigate();

  const { suratJalanData, suratJalanStatus, refetch } = useGetSuratJalan(
    debouncedSearch,
    page,
  );
  const { deleteSuratJalanMutation, deleteSuratJalanStatus } =
    useDeleteSuratJalan();

  const { generatePdfMutation } = useGenerateSuratJalanPDF();

  useEffect(() => {
    refetch();
  }, [page, debouncedSearch, deleteSuratJalanStatus]);

  if (suratJalanStatus === 'pending') {
    return <Loading />;
  }

  const suratJalan = suratJalanData?.data || [];

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString(), search: debouncedSearch });
  };

  const handleSearchChange = (newSearch) => {
    setSearchValue(newSearch);
    setSearchParams({ page: '1', search: newSearch });
  };

  const columns = [
    {
      header: 'No Surat',
      assessor: 'documentNumber',
    },
    {
      header: 'Recipient',
      assessor: 'recipient',
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
                navigate(
                  `/radix-logistics/document/surat-jalan/edit/${row.id}`,
                  {
                    state: { data: row },
                  },
                )
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
                    this document.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => deleteSuratJalanMutation(row)}
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
      <div className='text-[48px] font-semibold'>Surat Jalan</div>
      <div className='flex items-center justify-between'>
        <Button
          onClick={() => {
            navigate('/radix-logistics/document/surat-jalan/create-new');
          }}
          className='flex w-fit items-center justify-center gap-2'
        >
          <MdAdd />
          Add Surat Jalan
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
          data={suratJalan}
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
