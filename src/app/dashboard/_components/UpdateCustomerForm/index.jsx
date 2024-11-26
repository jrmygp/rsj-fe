import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MdEdit } from 'react-icons/md';
import { useFormik } from 'formik';
import { useUpdateCustomer } from '@/services/customer/hooks/useUpdateCustomer';

export default function UpdateCustomerForm({ userData }) {
  const { ID, Name, Address } = userData;

  const { updateCustomerMutation, updateCustomerStatus } = useUpdateCustomer();

  const formik = useFormik({
    initialValues: {
      name: Name || '',
      address: Address || '',
    },
    onSubmit: (values) => {
      updateCustomerMutation({
        name: values.name,
        address: values.address,
        customerId: ID,
      });
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <MdEdit />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit Customer</DialogTitle>
          <DialogDescription>
            Make changes customer here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className='flex flex-col gap-6'>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-3'>
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                name='name'
                onChange={formik.handleChange}
                value={formik.values.name}
                className='col-span-3'
              />
            </div>
            <div className='flex flex-col gap-3'>
              <Label htmlFor='name'>Address</Label>
              <Input
                id='address'
                name='address'
                onChange={formik.handleChange}
                value={formik.values.address}
                className='col-span-3'
              />
            </div>
          </div>
          <DialogFooter>
            <Button type='submit' disabled={updateCustomerStatus === 'pending'}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
