/* eslint-disable react-hooks/exhaustive-deps */
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import Loading from '@/components/template/Loading';
import { useState, useEffect } from 'react';
import SearchAndCreate from '../_components/SearchAndCreate';
import { useFormik } from 'formik';
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
import { useCreateWarehouse } from '@/services/warehouse/hooks/useCreateWarehouse';
import { useDeleteWarehouse } from '@/services/warehouse/hooks/useDeleteWarehouse';
import { useUpdateWarehouse } from '@/services/warehouse/hooks/useUpdateWarehouse';
import * as yup from 'yup';
import { useGetWarehouse } from '@/services/warehouse/hooks/useGetWarehouse';

export default function Warehouse() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const search = searchParams.get('search') || '';
  const [searchValue, setSearchValue] = useState(search);
  const [debouncedSearch] = useDebounce(searchValue, 1000);
  const [editData, setEditData] = useState(null);

  const { createWarehouseMutation, createWarehouseStatus } =
    useCreateWarehouse();
  const { deleteWarehouseMutation, deleteWarehouseStatus } =
    useDeleteWarehouse();
  const { updateWarehouseMutation, updateWarehouseStatus } =
    useUpdateWarehouse();

  const formik = useFormik({
    enableReinitialize: editData ? true : false,
    initialValues: {
      category: editData?.Category || '',
      name: editData?.Name || '',
      code: editData?.Code || '',
      flightName: editData?.FlightName || '',
      flightCode: editData?.FlightCode || '',
    },
    validationSchema: yup.object().shape({
      category: yup.string().required('Category is required'),
      name: yup.string().required('Warehouse name is required'),
      code: yup.string().required('Warehouse code is required'),
      flightName: yup.string().when('category', {
        is: (value) => value === 'Air',
        then: () => yup.string().required('Flight name is required'),
        otherwise: () => yup.string().nullable(),
      }),
      flightCode: yup.string().when('category', {
        is: (value) => value === 'Air',
        then: () => yup.string().required('Flight code is required'),
        otherwise: () => yup.string().nullable(),
      }),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      editData
        ? updateWarehouseMutation({
            data:
              values.category === 'Sea'
                ? {
                    category: values.category,
                    name: values.name,
                    code: values.code,
                  }
                : {
                    ...values,
                    flightCode: Number(values.flightCode),
                  },
            warehouseId: editData.ID,
          })
        : createWarehouseMutation(
            values.category === 'Sea'
              ? {
                  category: values.category,
                  name: values.name,
                  code: values.code,
                }
              : {
                  ...values,
                  flightCode: Number(values.flightCode),
                },
          );
    },
  });

  const warehouseLabel = [
    {
      id: 'category',
      name: 'Category',
      placeholder: 'Select Category',
      type: 'select',
      options: [
        { value: 'Air', label: 'Air' },
        { value: 'Sea', label: 'Sea' },
      ],
    },
    {
      id: 'name',
      name: 'Name',
      placeholder: 'Input warehouse name',
      type: 'text',
    },
    {
      id: 'code',
      name: 'Code',
      placeholder: 'Input warehouse code',
      type: 'text',
    },
    formik.values.category === 'Air' && {
      id: 'flightName',
      name: 'Flight Name',
      placeholder: 'Input flight name',
      type: 'text',
    },
    formik.values.category === 'Air' && {
      id: 'flightCode',
      name: 'Flight Code',
      placeholder: 'Input flight code',
      type: 'text',
    },
  ];

  const { warehouseData, warehouseStatus, warehouseRefetch } = useGetWarehouse(
    debouncedSearch,
    page,
  );

  useEffect(() => {
    warehouseRefetch();
    if (updateWarehouseStatus === 'success') {
      setEditData(null);
    }
  }, [
    page,
    debouncedSearch,
    createWarehouseStatus,
    deleteWarehouseStatus,
    updateWarehouseStatus,
  ]);

  if (warehouseStatus === 'pending') {
    return <Loading />;
  }

  const warehouses = warehouseData.data;

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString(), search: debouncedSearch });
  };

  const handleSearchChange = (newSearch) => {
    setSearchValue(newSearch);
    setSearchParams({ page: '1', search: newSearch });
  };

  const columns = [
    {
      header: 'Warehouse Name',
      assessor: 'Name',
    },
    {
      header: 'Warehouse Code',
      assessor: 'Code',
    },
    {
      header: 'Flight Name',
      assessor: 'FlightName',
      Cell: (row) => {
        return <p>{row.FlightName || '-'}</p>;
      },
    },
    {
      header: 'Flight Code',
      assessor: 'FlightCode',
      Cell: (row) => {
        return <p>{row.FlightCode || '-'}</p>;
      },
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
                <DynamicEditForm formik={formik} labels={warehouseLabel} />
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
                    this warehouse.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() =>
                      deleteWarehouseMutation({ warehouseId: row.ID })
                    }
                    disabled={deleteWarehouseStatus === 'pending'}
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
      <div className='text-[48px] font-semibold'>Warehouse</div>
      <SearchAndCreate
        title={'Add Warehouse'}
        handleSearchChange={handleSearchChange}
        searchValue={searchValue}
        labels={warehouseLabel}
        formik={formik}
        mutationStatus={createWarehouseStatus}
      />
      <div className='flex flex-col items-center justify-between gap-4 rounded-xl border bg-white p-10 shadow-xl'>
        <DataTable
          data={warehouses}
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
