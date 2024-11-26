import { useGetUser } from '@/services/user/hooks/useGetUser';
import Loading from '@/components/template/Loading';
import { useEffect } from 'react';
import TableTemp from '@/components/template/TableTemp';
import SearchAndCreate from '../_components/SearchAndCreate';

const tableColumns = [
  { label: 'No', accessor: 'index', className: 'w-1' },
  { label: 'Name', accessor: 'name', className: 'w-1/4' },
  { label: 'Username', accessor: 'username', className: 'w-1/4' },
  { label: 'Email', accessor: 'email', className: 'w-1/3' },
  { label: 'Phone Number', accessor: 'phoneNumber', className: 'w-1/3' },
  { label: 'Address', accessor: 'address', className: 'w-1/3' },
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

export default function UserPage() {
  const { userData, userStatus, userRefetch } = useGetUser();

  useEffect(() => {
    userRefetch();
  }, [userStatus]);

  if (userStatus === 'pending') {
    return <Loading />;
  }

  const data = userData.data;
  const user = userData.data.data;

  const handleEdit = (row) => {
    setEditData(row);
  };

  const handleDelete = (row) => {
    deletePortMutation({ portId: row.ID });
  };

  return (
    <div className='flex h-full w-full flex-col justify-start gap-4 px-10 pb-5'>
      <div className='text-[48px] font-semibold'>User Data</div>
      <div className='flex h-[720px] flex-col items-center justify-between gap-4 rounded-xl border bg-white p-10 shadow-xl'>
        <TableTemp
          data={user}
          columns={tableColumns}
          labels={portLabel}
          firstRow={data.firstRow}
        />
      </div>
    </div>
  );
}
