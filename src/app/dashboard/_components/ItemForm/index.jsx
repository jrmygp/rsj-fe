/* eslint-disable react/prop-types */
import { useFormik } from 'formik';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import * as Yup from 'yup';
import { useGetAllCost } from '@/services/cost-charges/hooks/useGetAllCost';
import Loading from '@/components/template/Loading';
import { cn } from '@/lib/utils';

const ItemForm = ({ onAddItem, onClose }) => {
  const formik = useFormik({
    initialValues: {
      itemId: '',
      itemName: '',
      price: '',
      currency: '',
      quantity: '',
      unit: '',
      note: '',
    },
    validationSchema: Yup.object({
      itemId: Yup.string().required('Item ID is required'),
      itemName: Yup.string().required('Item name is required'),
      price: Yup.number().required('Price is required').positive(),
      currency: Yup.string().required('Currency is required'),
      quantity: Yup.number().required('Quantity is required').positive(),
      unit: Yup.string(),
      note: Yup.string(),
    }),
    onSubmit: (values) => {
      onAddItem(values);
      formik.resetForm();
      onClose();
    },
  });

  const { costData, costStatus } = useGetAllCost();

  if (costStatus === 'pending') {
    return <Loading />;
  }

  const cost = costData.data.data;

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='grid gap-4 py-4'>
        {/* Item Name */}
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label className='text-right'>Item</Label>
          <Select
            value={formik.values.itemId}
            onValueChange={(value) => {
              const selectedPort = cost.find((p) => p.id === value);
              if (selectedPort) {
                formik.setFieldValue('itemId', selectedPort.id);
                formik.setFieldValue('itemName', selectedPort.name);
              }
            }}
          >
            <SelectTrigger
              className={cn(
                'col-span-3 w-full',
                formik.touched.itemId &&
                  formik.errors.itemId &&
                  'border-red-500',
              )}
            >
              <SelectValue placeholder='Item'>
                {formik.values.itemName || 'Select Port'}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className='w-full'>
              {cost.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Price */}
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='price' className='text-right'>
            Price
          </Label>
          <Input
            id='price'
            name='price'
            type='number'
            className={`col-span-3 ${formik.touched.price && formik.errors.price ? 'border-red-500' : ''}`}
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder='Enter Price'
          />
        </div>
        {/* Currency */}
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='currency' className='text-right'>
            Currency
          </Label>
          <Select
            value={formik.values.currency}
            onValueChange={(value) => formik.setFieldValue('currency', value)}
            onBlur={() => formik.setFieldTouched('currency')}
          >
            <SelectTrigger
              className={`col-span-3 ${formik.touched.currency && formik.errors.currency ? 'border-red-500' : ''}`}
            >
              <SelectValue placeholder='Select Currency' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='IDR'>IDR</SelectItem>
              <SelectItem value='USD'>USD</SelectItem>
              <SelectItem value='SGD'>SGD</SelectItem>
              <SelectItem value='MYR'>MYR</SelectItem>
              <SelectItem value='EUR'>EUR</SelectItem>
              <SelectItem value='THB'>THB</SelectItem>
              <SelectItem value='RMB'>RMB</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Quantity */}
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='quantity' className='text-right'>
            Quantity
          </Label>
          <Input
            id='quantity'
            name='quantity'
            type='number'
            className={`col-span-3 ${formik.touched.quantity && formik.errors.quantity ? 'border-red-500' : ''}`}
            value={formik.values.quantity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder='Enter Quantity'
          />
        </div>
        {/* Unit */}
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='unit' className='text-right'>
            Unit
          </Label>
          <Input
            id='unit'
            name='unit'
            className={`col-span-3 ${formik.touched.unit && formik.errors.unit ? 'border-red-500' : ''}`}
            value={formik.values.unit}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder='Enter Unit'
          />
        </div>
        {/* Note */}
        <div className='grid grid-cols-4 items-start gap-4'>
          <Label htmlFor='note' className='text-right'>
            Note
          </Label>
          <Textarea
            id='note'
            name='note'
            className={`col-span-3 ${formik.touched.note && formik.errors.note ? 'border-red-500' : ''}`}
            value={formik.values.note}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder='Enter Note'
          />
        </div>
      </div>

      <DialogFooter>
        <Button type='submit'>Add Item</Button>
        <Button type='button' variant='secondary' onClick={onClose}>
          Cancel
        </Button>
      </DialogFooter>
    </form>
  );
};

export default ItemForm;
