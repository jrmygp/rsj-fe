/* eslint-disable react-hooks/exhaustive-deps */
import Loading from '@/components/template/Loading';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
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
import moment from 'moment';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetAllCustomer } from '@/services/customer/hooks/useGetAllCustomer';
import { useGenerateExportPdf } from '@/services/invoice/hooks/useGenerateExportPdf';
import { useGetExportInvoice } from '@/services/invoice/hooks/useGetExportInvoice';
import { useDeleteExportInvoice } from '@/services/invoice/hooks/useDeleteExportInvoice';

export default function InvoiceExport() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const search = searchParams.get('search') || '';
  const [searchValue, setSearchValue] = useState(search);
  const [debouncedSearch] = useDebounce(searchValue, 1000);
  const [filter, setFilter] = useState({
    customerId: 0,
  });

  const navigate = useNavigate();

  const { invoiceData, invoiceStatus, refetch } = useGetExportInvoice(
    debouncedSearch,
    page,
    filter,
  );
  const { customerData, customerStatus } = useGetAllCustomer();

  const { deleteInvoiceMutation, deleteInvoiceStatus } =
    useDeleteExportInvoice();

  const { generatePdfMutation } = useGenerateExportPdf();

  useEffect(() => {
    refetch();
  }, [deleteInvoiceStatus, page, debouncedSearch, filter]);

  if (invoiceStatus === 'pending' || customerStatus === 'pending') {
    return <Loading />;
  }

  const invoice = invoiceData?.data || [];
  const customer = customerData?.data?.data || [];

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString(), search: debouncedSearch });
  };

  const handleSearchChange = (newSearch) => {
    setSearchValue(newSearch);
    setSearchParams({ page: '1', search: newSearch });
  };

  const columns = [
    {
      header: 'No',
      assessor: 'No',
      Cell: (row, idx) => {
        return <p>{idx + 1}</p>;
      },
    },
    {
      header: 'Invoice Date',
      assessor: 'invoiceDate',
      Cell: (row) => {
        return <p>{moment(row.invoiceDate).format('DD-MMM-YYYY')}</p>;
      },
    },
    {
      header: 'Invoice Number',
      assessor: 'invoiceNumber',
    },
    {
      header: 'Customer Name',
      assessor: 'customerName',
    },
    {
      header: 'Service',
      assessor: 'service',
    },
    {
      header: 'BL/AWB',
      assessor: 'blawb',
    },
    {
      header: 'AJU',
      assessor: 'aju',
    },
    {
      header: 'Nominal Invoice',
      assessor: 'nominal',
      Cell: (row) => {
        return <p>Rp {row.nominal.toLocaleString()}</p>;
      },
    },
    {
      header: 'Status',
      assessor: 'status',
      Cell: (row) => {
        return (
          <div
            className={`rounded-xl px-2 py-1 text-white ${row.status === 'Paid' ? 'bg-green-500' : 'bg-red-500'}`}
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
                navigate(`/radix-logistics/invoice/export/edit/${row.id}`, {
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
                    this invoice.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => deleteInvoiceMutation(row)}>
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
      <div className='text-[48px] font-semibold'>Invoice List</div>
      <div className='flex items-center justify-between'>
        <Button
          onClick={() => {
            navigate(`/radix-logistics/invoice/export/create-new`);
          }}
          className='flex w-fit items-center justify-center gap-2'
        >
          <MdAdd />
          Add Invoice
        </Button>

        <div className='flex items-center gap-2'>
          <Select
            value={filter?.customerId}
            onValueChange={(value) => {
              setFilter({
                category: location.pathname.split('/')[3],
                customerId: value,
              });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder='Customer'>
                {customer?.filter((item) => item.id === filter.customerId)[0]
                  ?.name || 'Select Customer'}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className='w-full'>
              <SelectItem value={0}>All Customer</SelectItem>

              {customer?.map((cust) => (
                <SelectItem key={cust.id} value={cust.id}>
                  {cust.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

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
      </div>
      <div className='flex flex-col items-center justify-between gap-[16px] rounded-xl border bg-white p-10 shadow-xl'>
        <DataTable
          data={invoice}
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
