/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useGetCustomer } from '@/services/customer/hooks/useGetCustomer';
import { useSearchParams } from 'react-router-dom';
import Loading from '@/components/template/Loading';
import SearchAndCreate from '../_components/SearchAndCreate';
import PaginationTemp from '@/components/template/PaginationTemp';
import { useDebounce } from 'use-debounce';
import { useFormik } from 'formik';
import { customerSchema } from '@/services/customer/schema';
import { useCreateCustomer } from '@/services/customer/hooks/useCreateCustomer';
import { useDeleteCustomer } from '@/services/customer/hooks/useDeleteCustomer';
import TableTemp from '@/components/template/TableTemp';
import { useUpdateCustomer } from '@/services/customer/hooks/useUpdateCustomer';

const customerLabel = [
  { id: 'name', name: 'Name', placeholder: 'John Doe', type: 'text' },
  { id: 'address', name: 'Address', placeholder: '123 Main St', type: 'text' },
];

const tableColumns = [
  { label: 'No', accessor: 'index', className: 'w-1' },
  { label: 'Name', accessor: 'Name', className: 'w-1/4' },
  { label: 'Address', accessor: 'Address', className: 'w-1/3' },
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

  const data = customerData?.data || {};
  const customer = data?.data || [];

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

  const handleDelete = (row) => deleteCustomerMutation({ customerId: row.ID });

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
        <TableTemp
          data={customer}
          columns={tableColumns}
          labels={customerLabel}
          actions={{
            includes: ['edit', 'delete'],
            onEdit: handleEdit,
            onDelete: handleDelete,
            deleteStatus: deleteCustomerStatus,
          }}
          firstRow={data.firstRow}
          editFormik={editFormik}
          updateStatus={updateCustomerStatus}
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
