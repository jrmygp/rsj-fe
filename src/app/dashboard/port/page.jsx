import { useGetPort } from '@/services/port/hooks/useGetPort';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import Loading from '@/components/template/Loading';
import { useState, useEffect } from 'react';
import SearchAndCreate from '../_components/SearchAndCreate';
import TableTemp from '@/components/template/TableTemp';
import PaginationTemp from '@/components/template/PaginationTemp';
import { useFormik } from 'formik';
import { useCreatePort } from '@/services/port/hooks/useCreatePort';
import { portSchema } from '@/services/port/schema';
import { useDeletePort } from '@/services/port/hooks/useDeletePort';
import { useUpdatePort } from '@/services/port/hooks/useUpdatePort';

const tableColumns = [
  { label: 'No', accessor: 'index', className: 'w-1' },
  { label: 'Port Name', accessor: 'PortName', className: 'w-1/4' },
  { label: 'Note', accessor: 'Note', className: 'w-1/4' },
  { label: 'Status', accessor: 'Status', className: 'w-1/3' },
];

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
      console.log('Submitted Values:', values);
      console.log('Edit Data:', editData);

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

  const data = portData.data;
  const port = portData.data.data;

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString(), search: debouncedSearch });
  };

  const handleSearchChange = (newSearch) => {
    setSearchValue(newSearch);
    setSearchParams({ page: '1', search: newSearch });
  };

  const handleEdit = (row) => {
    setEditData(row);
  };

  const handleDelete = (row) => {
    deletePortMutation({ portId: row.ID });
  };

  return (
    <div className='flex h-full w-full flex-col justify-start gap-4 px-10 pb-5'>
      <div className='text-[48px] font-semibold'>Port</div>
      <SearchAndCreate
        title={'Add Port'}
        labels={portLabel}
        formik={portFormik}
        mutationStatus={createPortStatus}
      />
      <div className='flex flex-col items-center justify-between gap-4 rounded-xl border bg-white p-10 shadow-xl'>
        <TableTemp
          data={port}
          columns={tableColumns}
          labels={portLabel}
          actions={{
            includes: ['edit', 'delete'],
            onEdit: handleEdit,
            onDelete: handleDelete,
            deleteStatus: deletePortStatus,
          }}
          firstRow={data.firstRow}
          editFormik={editFormik}
          updateStatus={updatePortStatus}
        />
        <PaginationTemp
          handlePageChange={handlePageChange}
          page={page}
          totalPages={data.totalPages}
        />
      </div>
    </div>
  );
}
