/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useGetCustomer } from '@/services/customer/hooks/useGetCustomer';
import { useSearchParams } from 'react-router-dom';
import Loading from '@/components/template/Loading';
import SearchAndCreate from '../_components/SearchAndCreate';
import { useDebounce } from 'use-debounce';
import { useFormik } from 'formik';
import { customerSchema } from '@/services/customer/schema';
import { useCreateCustomer } from '@/services/customer/hooks/useCreateCustomer';
import { useDeleteCustomer } from '@/services/customer/hooks/useDeleteCustomer';
import { useUpdateCustomer } from '@/services/customer/hooks/useUpdateCustomer';
import { MdEdit, MdDelete } from 'react-icons/md';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import DynamicEditForm from '../_components/DynamicEditForm';
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
import DataTable from '@/components/template/DataTable/DataTable';
import { Button } from '@/components/ui/button';

const customerLabel = [
  { id: 'name', name: 'Name', placeholder: 'John Doe', type: 'text' },
  { id: 'address', name: 'Address', placeholder: '123 Main St', type: 'text' },
];

export default function Customer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const search = searchParams.get('search') || '';
  const [searchValue, setSearchValue] = useState(search);
  const [debouncedSearch] = useDebounce(searchValue, 1000);
  const [editData, setEditData] = useState(null);

  const { createCustomerMutation, createCustomerStatus } = useCreateCustomer();
  const { deleteCustomerMutation, deleteCustomerStatus } = useDeleteCustomer();
  const { updateCustomerStatus, updateCustomerMutation } = useUpdateCustomer();

  const customerFormik = useFormik({
    initialValues: { name: '', address: '' },
    validationSchema: customerSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      createCustomerMutation({
        name: values.name,
        address: values.address,
      });
    },
  });

  const editFormik = useFormik({
    initialValues: { name: '', address: '' },
    validationSchema: customerSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      updateCustomerMutation({
        name: values.name,
        address: values.address,
        customerId: editData.ID,
      });
      setEditData(null);
    },
  });

  useEffect(() => {
    if (editData) {
      editFormik.setValues({
        name: editData.Name || '',
        address: editData.Address || '',
      });
    }
  }, [editData]);

  useEffect(() => {
    if (!searchParams.get('page')) {
      setSearchParams({ page: '1', search });
    }
  }, [searchParams, setSearchParams, search]);

  const { customerData, customerStatus, customerRefetch } = useGetCustomer(
    debouncedSearch,
    page,
  );

  useEffect(() => {
    customerRefetch();
  }, [page, debouncedSearch, deleteCustomerStatus, updateCustomerStatus]);

  useEffect(() => {
    if (!searchParams.get('page')) {
      setSearchParams({ page: '1', search: debouncedSearch });
    }
  }, [searchParams, setSearchParams, debouncedSearch]);

  if (customerStatus === 'pending') {
    return <Loading />;
  }

  const customers = customerData?.data || [];

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString(), search: debouncedSearch });
  };

  const handleSearchChange = (newSearch) => {
    setSearchValue(newSearch);
    setSearchParams({ page: '1', search: newSearch });
  };

  const columns = [
    {
      header: 'Customer Name',
      assessor: 'Name',
    },
    {
      header: 'Address',
      assessor: 'Address',
    },
    {
      header: '',
      tdStyle: { width: '5%' },
      Cell: (row) => {
        return (
          <div className='flex items-center gap-2'>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size='icon'
                  className='rounded-full bg-blue-500'
                  onClick={() => {
                    setEditData(row);
                  }}
                >
                  <MdEdit />
                </Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                  <DialogTitle>Edit Entry</DialogTitle>
                  <DialogDescription>
                    Make changes here and click save when done.
                  </DialogDescription>
                </DialogHeader>
                <DynamicEditForm formik={editFormik} labels={customerLabel} />
              </DialogContent>
            </Dialog>

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
                    onClick={() => deleteCustomerMutation({ costId: row.ID })}
                    disabled={deleteCustomerStatus === 'pending'}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
    },
  ];

  return (
    <div className='flex h-full w-full flex-col justify-start gap-4 px-10 pb-5'>
      <div className='text-[48px] font-semibold'>Customer</div>
      <SearchAndCreate
        title={'Add Customer'}
        searchValue={searchValue}
        handleSearchChange={handleSearchChange}
        labels={customerLabel}
        formik={customerFormik}
        mutationStatus={createCustomerStatus}
      />
      <div className='flex flex-col items-center justify-between gap-[16px] rounded-xl border bg-white p-10 shadow-xl'>
        <DataTable
          data={customers}
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
