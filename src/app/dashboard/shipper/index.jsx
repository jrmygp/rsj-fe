/* eslint-disable react-hooks/exhaustive-deps */
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import Loading from '@/components/template/Loading';
import { useState, useEffect } from 'react';
import SearchAndCreate from '../_components/SearchAndCreate';
import { useFormik } from 'formik';
import * as yup from 'yup';
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
import { Button } from '@/components/ui/button';
import DataTable from '@/components/template/DataTable/DataTable';
import { useGetShipper } from '@/services/shipper/hooks/useGetShipper';
import { useCreateShipper } from '@/services/shipper/hooks/useCreateShipper';
import { useDeleteShipper } from '@/services/shipper/hooks/useDeleteShipper';
import { useUpdateShipper } from '@/services/shipper/hooks/useUpdatePort';

const shipperLabel = [
  {
    id: 'name',
    name: 'Name',
    placeholder: 'John Doe',
    type: 'text',
  },
  { id: 'address', name: 'Address', placeholder: '123 Main St', type: 'text' },
];

export default function Shipper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const search = searchParams.get('search') || '';
  const [searchValue, setSearchValue] = useState(search);
  const [debouncedSearch] = useDebounce(searchValue, 1000);
  const [editData, setEditData] = useState(null);

  const { createShipperMutation, createShipperStatus } = useCreateShipper();
  const { deleteShipperMutation, deleteShipperStatus } = useDeleteShipper();
  const { updateShipperMutation, updateShipperStatus } = useUpdateShipper();

  const shipperFormik = useFormik({
    initialValues: { name: '', address: '' },
    validationSchema: yup.object().shape({
      name: yup.string().required('Shipper name is required'),
      address: yup.string().required('Address is required'),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      createShipperMutation({
        name: values.name,
        address: values.address,
      });
    },
  });

  const editFormik = useFormik({
    initialValues: { name: '', address: '' },
    validationSchema: yup.object().shape({
      name: yup.string().required('Shipper name is required'),
      address: yup.string().required('Address is required'),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      updateShipperMutation({
        name: values.name,
        address: values.address,
        shipperId: editData?.ID,
      });
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

  const { shipperData, shipperStatus, shipperRefetch } = useGetShipper(
    debouncedSearch,
    page,
  );

  useEffect(() => {
    shipperRefetch();
    if (updateShipperStatus === 'success') {
      setEditData(null);
    }
  }, [
    page,
    debouncedSearch,
    createShipperStatus,
    deleteShipperStatus,
    updateShipperStatus,
  ]);

  if (shipperStatus === 'pending') {
    return <Loading />;
  }

  const shippers = shipperData.data;

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString(), search: debouncedSearch });
  };

  const handleSearchChange = (newSearch) => {
    setSearchValue(newSearch);
    setSearchParams({ page: '1', search: newSearch });
  };

  const columns = [
    {
      header: 'Shipper Name',
      assessor: 'Name',
    },
    {
      header: 'Adress',
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
                <DynamicEditForm formik={editFormik} labels={shipperLabel} />
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
                    this shipper.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => deleteShipperMutation({ shipperId: row.ID })}
                    disabled={deleteShipperStatus === 'pending'}
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
      <div className='text-[48px] font-semibold'>Shipper</div>
      <SearchAndCreate
        title={'Add Shipper'}
        handleSearchChange={handleSearchChange}
        searchValue={searchValue}
        labels={shipperLabel}
        formik={shipperFormik}
        mutationStatus={createShipperStatus}
      />
      <div className='flex flex-col items-center justify-between gap-4 rounded-xl border bg-white p-10 shadow-xl'>
        <DataTable
          data={shippers}
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
