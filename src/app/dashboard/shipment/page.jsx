/* eslint-disable react-hooks/exhaustive-deps */
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
import { useGetShipment } from '@/services/shipment/hooks/useGetShipment';

export default function Shipment() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const search = searchParams.get('search') || '';
  const [searchValue, setSearchValue] = useState(search);
  const [debouncedSearch] = useDebounce(searchValue, 1000);

  const navigate = useNavigate();

  const { shipmentData, shipmentStatus, refetch } = useGetShipment(
    debouncedSearch,
    page,
  );
  const { deleteQuotationMutation, deleteQuotationStatus } =
    useDeleteQuotation();

  const { generatePdfMutation } = useGeneratePdf();

  useEffect(() => {
    refetch();
  }, [deleteQuotationStatus, page, debouncedSearch]);

  if (shipmentStatus === 'pending') {
    return <Loading />;
  }

  const shipment = shipmentData?.data || [];

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString(), search: debouncedSearch });
  };

  const handleSearchChange = (newSearch) => {
    setSearchValue(newSearch);
    setSearchParams({ page: '1', search: newSearch });
  };

  const columns = [
    {
      header: 'Shipment Number',
      assessor: 'shipmentNumber',
    },
    {
      header: 'Warehouse',
      assessor: 'warehouseName',
    },
    {
      header: 'Quotation',
      assessor: 'quotations',
      Cell: (row) => {
        return row.quotations?.length
          ? row.quotations.map((item) => (
              <a
                key={item.id}
                href={`/radix-logistics/quotation/edit/${item.id}`}
                className='cursor-pointer hover:text-blue-500 hover:underline'
              >
                {item.docNumber}
              </a>
            ))
          : '-';
      },
    },
    {
      header: 'Invoice Export',
      assessor: 'invoiceExports',
      Cell: (row) => {
        return row.invoiceExports?.length
          ? row.invoiceExports.map((item) => (
              <a
                key={item.id}
                href={`/radix-logistics/invoice/export/edit/${item.id}`}
                className='cursor-pointer hover:text-blue-500 hover:underline'
              >
                {item.docNumber}
              </a>
            ))
          : '-';
      },
    },
    {
      header: 'Invoice Import',
      assessor: 'invoiceImports',
      Cell: (row) => {
        return row.invoiceImports?.length
          ? row.invoiceImports.map((item) => (
              <a
                key={item.id}
                href={`/radix-logistics/invoice/import/edit/${item.id}`}
                className='cursor-pointer hover:text-blue-500 hover:underline'
              >
                {item.docNumber}
              </a>
            ))
          : '-';
      },
    },
    {
      header: 'Invoice Door to Door',
      assessor: 'invoiceDoorToDoors',
      Cell: (row) => {
        return row.invoiceDoorToDoors?.length
          ? row.invoiceDoorToDoors.map((item) => (
              <a
                key={item.id}
                href={`/radix-logistics/invoice/door-to-door/edit/${item.id}`}
                className='cursor-pointer hover:text-blue-500 hover:underline'
              >
                {item.docNumber}
              </a>
            ))
          : '-';
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
                navigate(`/radix-logistics/shipment/edit/${row.id}`, {
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
                    this shipment.
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
      <div className='text-[48px] font-semibold'>Shipment List</div>
      <div className='flex items-center justify-between'>
        <Button
          onClick={() => {
            navigate('/radix-logistics/shipment/create-new');
          }}
          className='flex w-fit items-center justify-center gap-2'
        >
          <MdAdd />
          Add Shipment
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
          data={shipment}
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
