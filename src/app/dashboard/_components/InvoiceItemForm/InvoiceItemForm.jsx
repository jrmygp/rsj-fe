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
import * as Yup from 'yup';
import { NumericFormat } from 'react-number-format';

const InvoiceItemForm = ({ onSubmit, onClose, item }) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      itemName: item?.itemName || '',
      price: item?.price || '',
      currency: item?.currency || 'IDR',
      quantity: item?.quantity || 1,
      unit: item?.unit || '',
      kurs: item?.kurs || null,
    },
    validationSchema: Yup.object({
      itemName: Yup.string().required('Item name is required'),
      price: Yup.string().required('Price is required'),
      currency: Yup.string().required('Currency is required'),
      quantity: Yup.string().required('Quantity is required'),
      unit: Yup.string(),
      kurs: Yup.string().nullable(),
    }),
    onSubmit: (values) => {
      onSubmit({
        ...values,
        kurs: !values.kurs ? null : values.kurs,
      });
      formik.resetForm();
      onClose();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='grid gap-4 py-4'>
        {/* Item Name */}
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label className='text-right'>Item</Label>
          <Input
            id='itemName'
            name='itemName'
            className={`col-span-3 ${formik.touched.itemName && formik.errors.itemName ? 'border-red-500' : ''}`}
            value={formik.values.itemName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder='Enter Item Name'
          />
        </div>

        {/* Price */}
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='price' className='text-right'>
            Price
          </Label>

          <NumericFormat
            customInput={Input}
            id='price'
            name='price'
            className={`col-span-3 ${formik.touched.price && formik.errors.price ? 'border-red-500' : ''}`}
            value={formik.values.price}
            onValueChange={(values) => {
              const { floatValue } = values;
              formik.setFieldValue('price', floatValue);
            }}
            onBlur={formik.handleBlur}
            placeholder='Enter Price'
            thousandSeparator
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

        {/* Kurs */}
        {formik.values.currency !== 'IDR' && (
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label className='text-right'>Kurs</Label>

            <NumericFormat
              customInput={Input}
              id='kurs'
              name='kurs'
              className={`col-span-3 ${formik.touched.kurs && formik.errors.kurs ? 'border-red-500' : ''}`}
              value={formik.values.kurs}
              onValueChange={(values) => {
                const { floatValue } = values;
                formik.setFieldValue('kurs', floatValue);
              }}
              onBlur={formik.handleBlur}
              placeholder='Enter Kurs'
              thousandSeparator
            />
          </div>
        )}

        {/* Quantity */}
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='quantity' className='text-right'>
            Quantity
          </Label>

          <NumericFormat
            customInput={Input}
            id='quantity'
            name='quantity'
            className={`col-span-3 ${formik.touched.quantity && formik.errors.quantity ? 'border-red-500' : ''}`}
            value={formik.values.quantity}
            onValueChange={(values) => {
              const { floatValue } = values;
              formik.setFieldValue('quantity', floatValue);
            }}
            onBlur={formik.handleBlur}
            placeholder='Enter Quantity'
            thousandSeparator
          />
        </div>

        {/* Unit */}
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label className='text-right'>Unit</Label>

          <Select
            value={formik.values.unit}
            onValueChange={(value) => {
              formik.setFieldValue('unit', value === 'none' ? '' : value);
            }}
            onBlur={() => formik.setFieldTouched('unit')}
          >
            <SelectTrigger
              className={`col-span-3 ${formik.touched.unit && formik.errors.unit ? 'border-red-500' : ''}`}
            >
              <SelectValue placeholder='Select Unit' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='none'>None</SelectItem>
              <SelectItem value='Shipment'>Shipment</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DialogFooter>
        <Button type='submit'>Submit</Button>
        <Button type='button' variant='secondary' onClick={onClose}>
          Cancel
        </Button>
      </DialogFooter>
    </form>
  );
};

export default InvoiceItemForm;
