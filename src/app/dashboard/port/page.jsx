/* eslint-disable react-hooks/exhaustive-deps */
import { useGetPort } from '@/services/port/hooks/useGetPort';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import Loading from '@/components/template/Loading';
import { useState, useEffect } from 'react';
import SearchAndCreate from '../_components/SearchAndCreate';
import { useFormik } from 'formik';
import { useCreatePort } from '@/services/port/hooks/useCreatePort';
import { portSchema } from '@/services/port/schema';
import { useDeletePort } from '@/services/port/hooks/useDeletePort';
import { useUpdatePort } from '@/services/port/hooks/useUpdatePort';
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

const portLabel = [
  { id: 'portName', name: 'Port Name', placeholder: 'John Doe', type: 'text' },
  { id: 'note', name: 'Note', placeholder: '123 Main St', type: 'text' },
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

export default function Port() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const search = searchParams.get('search') || '';
  const [searchValue, setSearchValue] = useState(search);
  const [debouncedSearch] = useDebounce(searchValue, 1000);
  const [editData, setEditData] = useState(null);

  const { createPortMutation, createPortStatus } = useCreatePort();
  const { deletePortMutation, deletePortStatus } = useDeletePort();
  const { updatePortMutation, updatePortStatus } = useUpdatePort();

  const portFormik = useFormik({
    initialValues: { portName: '', note: '', status: '' },
    validationSchema: portSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      createPortMutation({
        portName: values.portName,
        note: values.note,
        status: values.status,
      });
    },
  });

  const editFormik = useFormik({
    initialValues: { portName: '', note: '', status: '' },
    validationSchema: portSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      updatePortMutation({
        portName: values.portName,
        note: values.note,
        status: values.status,
        portId: editData?.ID,
      });
    },
  });

  useEffect(() => {
    if (editData) {
      editFormik.setValues({
        portName: editData.PortName || '',
        note: editData.Note || '',
        status: editData.Status || '',
      });
    }
  }, [editData]);

  const { portData, portStatus, portRefetch } = useGetPort(
    debouncedSearch,
    page,
  );

  useEffect(() => {
    portRefetch();
    if (updatePortStatus === 'success') {
      setEditData(null);
    }
  }, [
    page,
    debouncedSearch,
    createPortStatus,
    deletePortStatus,
    updatePortStatus,
  ]);

  if (portStatus === 'pending') {
    return <Loading />;
  }

  const ports = portData.data;

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString(), search: debouncedSearch });
  };

  const handleSearchChange = (newSearch) => {
    setSearchValue(newSearch);
    setSearchParams({ page: '1', search: newSearch });
  };

  const columns = [
    {
      header: 'Port Name',
      assessor: 'PortName',
    },
    {
      header: 'Note',
      assessor: 'Note',
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
                <DynamicEditForm formik={editFormik} labels={portLabel} />
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
                    onClick={() => deletePortMutation({ costId: row.ID })}
                    disabled={deletePortStatus === 'pending'}
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
      <div className='text-[48px] font-semibold'>Port</div>
      <SearchAndCreate
        title={'Add Port'}
        handleSearchChange={handleSearchChange}
        searchValue={searchValue}
        labels={portLabel}
        formik={portFormik}
        mutationStatus={createPortStatus}
      />
      <div className='flex flex-col items-center justify-between gap-4 rounded-xl border bg-white p-10 shadow-xl'>
        <DataTable
          data={ports}
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
