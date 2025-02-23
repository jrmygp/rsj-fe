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
import { NumericFormat } from 'react-number-format';

const SuratJalanItemForm = ({ onSubmit, onClose, item }) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      itemName: item?.itemName || '',
      type: item?.type || 'LCL',
      quantity: item?.quantity || 1,
      colly: item?.colly || 0,
      volume: item?.volume || 0,
      unit: item?.unit || 'kgs',
      note: item?.note || '',
    },
    validationSchema: Yup.object({
      itemName: Yup.string().required('Item name is required'),
      type: Yup.string().required('Type is required'),
      quantity: Yup.string().required('Quantity is required'),
      colly: Yup.string().required('Colly is required'),
      volume: Yup.string().required('Volume is required'),
      unit: Yup.string(),
      note: Yup.string(),
    }),
    onSubmit: (values) => {
      onSubmit({ ...values, quantity: Number(values.quantity) });
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

        {/* Type */}
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='type' className='text-right'>
            Type
          </Label>
          <Select
            value={formik.values.type}
            onValueChange={(value) => formik.setFieldValue('type', value)}
            onBlur={() => formik.setFieldTouched('type')}
          >
            <SelectTrigger
              className={`col-span-3 ${formik.touched.type && formik.errors.type ? 'border-red-500' : ''}`}
            >
              <SelectValue placeholder='Select Type' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='LCL'>LCL</SelectItem>
              <SelectItem value='20FT'>20FT</SelectItem>
              <SelectItem value='40FT'>40FT</SelectItem>
              <SelectItem value='40HC'>40HC</SelectItem>
              <SelectItem value='45FT'>45FT</SelectItem>
              <SelectItem value='20FR'>20FR</SelectItem>
              <SelectItem value='40FR'>40FR</SelectItem>
            </SelectContent>
          </Select>
        </div>

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

        {/* Colly */}
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='colly' className='text-right'>
            Colly / Pkgs
          </Label>
          <NumericFormat
            customInput={Input}
            id='colly'
            name='colly'
            className={`col-span-3 ${formik.touched.colly && formik.errors.colly ? 'border-red-500' : ''}`}
            value={formik.values.colly}
            onValueChange={(values) => {
              const { floatValue } = values;
              formik.setFieldValue('colly', floatValue);
            }}
            onBlur={formik.handleBlur}
            placeholder='Enter Colly / Pkgs'
            thousandSeparator
          />
        </div>

        {/* Volume */}
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='volume' className='text-right'>
            Kgs / Volume
          </Label>
          <NumericFormat
            customInput={Input}
            id='volume'
            name='volume'
            className={`col-span-3 ${formik.touched.volume && formik.errors.volume ? 'border-red-500' : ''}`}
            value={formik.values.volume}
            onValueChange={(values) => {
              const { floatValue } = values;
              formik.setFieldValue('volume', floatValue);
            }}
            onBlur={formik.handleBlur}
            placeholder='Enter Kgs / Volume'
            thousandSeparator
          />
        </div>

        {/* Unit */}
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='unit' className='text-right'>
            Unit
          </Label>
          <Select
            value={formik.values.unit}
            onValueChange={(value) => {
              formik.setFieldValue('unit', value);
            }}
            onBlur={() => formik.setFieldTouched('unit')}
          >
            <SelectTrigger
              className={`col-span-3 ${formik.touched.unit && formik.errors.unit ? 'border-red-500' : ''}`}
            >
              <SelectValue placeholder='Select Unit' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='kgs'>kgs</SelectItem>
              <SelectItem value='volume'>volume</SelectItem>
            </SelectContent>
          </Select>
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
        <Button type='submit'>Submit</Button>
        <Button type='button' variant='secondary' onClick={onClose}>
          Cancel
        </Button>
      </DialogFooter>
    </form>
  );
};

export default SuratJalanItemForm;
