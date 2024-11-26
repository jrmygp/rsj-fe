/* eslint-disable react-hooks/exhaustive-deps */
import { useGetCost } from '@/services/cost-charges/hooks/useGetCost';
import Loading from '@/components/template/Loading';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import TableTemp from '@/components/template/TableTemp';
import PaginationTemp from '@/components/template/PaginationTemp';
import SearchAndCreate from '../_components/SearchAndCreate';
import { costSchema } from '@/services/cost-charges/schema';
import { useCreateCost } from '@/services/cost-charges/hooks/useCreateCost';
import { useFormik } from 'formik';
import { useDeleteCost } from '@/services/cost-charges/hooks/useDeleteCost';
import { useUpdateCost } from '@/services/cost-charges/hooks/useUpdateCost';

const tableColumns = [
  { label: 'No', accessor: 'index', className: 'w-1' },
  { label: 'Cost Name', accessor: 'Name', className: 'w-1/4' },
  { label: 'Status', accessor: 'Status', className: 'w-1/3' },
];

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

  const data = costData.data;
  const cost = costData.data.data;

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

  const handleDelete = (row) => deleteCostMutation({ costId: row.ID });

  return (
    <div className='flex h-full w-full flex-col justify-start gap-4 px-10 pb-5'>
      <div className='text-[48px] font-semibold'>Cost Chargest</div>
      <SearchAndCreate
        title={'Add Cost'}
        searchValue={searchValue}
        handleSearchChange={handleSearchChange}
        labels={costLabel}
        formik={costFormik}
        mutationStatus={createCostStatus}
      />
      <div className='flex flex-col items-center justify-between gap-[16px] rounded-xl border bg-white p-10 shadow-xl'>
        <TableTemp
          data={cost}
          columns={tableColumns}
          labels={costLabel}
          actions={{
            includes: ['delete', 'edit'],
            onEdit: handleEdit,
            onDelete: handleDelete,
            deleteStatus: deleteCostStatus,
          }}
          firstRow={data.firstRow}
          editFormik={editFormik}
          updateStatus={updateCostStatus}
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
