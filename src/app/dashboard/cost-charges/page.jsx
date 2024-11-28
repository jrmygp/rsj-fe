/* eslint-disable react-hooks/exhaustive-deps */
import { useGetCost } from '@/services/cost-charges/hooks/useGetCost';
import Loading from '@/components/template/Loading';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import SearchAndCreate from '../_components/SearchAndCreate';
import { costSchema } from '@/services/cost-charges/schema';
import { useCreateCost } from '@/services/cost-charges/hooks/useCreateCost';
import { useFormik } from 'formik';
import { useDeleteCost } from '@/services/cost-charges/hooks/useDeleteCost';
import { useUpdateCost } from '@/services/cost-charges/hooks/useUpdateCost';
import { Button } from '@/components/ui/button';
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

const costLabel = [
  { id: 'name', name: 'Cost Name', placeholder: 'Arnog', type: 'text' },
  {
    id: 'status',
    name: 'Status',
    placeholder: 'Select Status',
    type: 'select',
    options: [
      { value: 'Active', label: 'Active' },
      { value: 'Inactive', label: 'Inactive' },
    ],
  },
];

export default function CostCharges() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const search = searchParams.get('search') || '';
  const [searchValue, setSearchValue] = useState(search);
  const [debouncedSearch] = useDebounce(searchValue, 1000);
  const [editData, setEditData] = useState(null);

  const { createCostMutation, createCostStatus } = useCreateCost();
  const { deleteCostMutation, deleteCostStatus } = useDeleteCost();
  const { updateCostMutation, updateCostStatus } = useUpdateCost();

  const costFormik = useFormik({
    initialValues: { name: '', status: '' },
    validationSchema: costSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      createCostMutation({
        name: values.name,
        status: values.status,
      });
    },
  });

  const editFormik = useFormik({
    initialValues: { name: '', status: '' },
    validationSchema: costSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      updateCostMutation({
        name: values.name,
        status: values.status,
        costId: editData.ID,
      });
      setEditData(null);
    },
  });

  useEffect(() => {
    if (editData) {
      editFormik.setValues({
        name: editData.Name || '',
        status: editData.Status || '',
      });
    }
  }, [editData]);

  useEffect(() => {
    if (!searchParams.get('page')) {
      setSearchParams({ page: '1', search: debouncedSearch });
    }
  }, [searchParams, setSearchParams, debouncedSearch]);

  const { costData, costStatus, costRefetch } = useGetCost(
    debouncedSearch,
    page,
  );

  useEffect(() => {
    costRefetch();
  }, [
    page,
    debouncedSearch,
    createCostStatus,
    deleteCostStatus,
    updateCostStatus,
  ]);

  if (costStatus === 'pending') {
    return <Loading />;
  }

  const costCharges = costData.data;

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString(), search: debouncedSearch });
  };

  const handleSearchChange = (newSearch) => {
    setSearchValue(newSearch);
    setSearchParams({ page: '1', search: newSearch });
  };

  const columns = [
    {
      header: 'Cost Name',
      assessor: 'Name',
    },
    {
      header: 'Status',
      assessor: 'Status',
      Cell: (row) => {
        return (
          <div
            className={`rounded-xl px-2 py-1 text-white ${row.Status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}
          >
            {row.Status}
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
                <DynamicEditForm formik={editFormik} labels={costLabel} />
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
                    onClick={() => deleteCostMutation({ costId: row.ID })}
                    disabled={deleteCostStatus === 'pending'}
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
      <div className='text-[48px] font-semibold'>Cost Charge</div>
      <SearchAndCreate
        title={'Add Cost'}
        searchValue={searchValue}
        handleSearchChange={handleSearchChange}
        labels={costLabel}
        formik={costFormik}
        mutationStatus={createCostStatus}
      />
      <div className='flex flex-col items-center justify-between gap-[16px] rounded-xl border bg-white p-10 shadow-xl'>
        <DataTable
          data={costCharges}
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
