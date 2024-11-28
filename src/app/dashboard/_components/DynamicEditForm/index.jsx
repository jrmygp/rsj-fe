/* eslint-disable react/prop-types */
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function DynamicEditForm({ formik, labels }) {
  return (
    <form onSubmit={formik.handleSubmit} className='flex flex-col gap-6'>
      {labels.map((label) => (
        <div key={label.id} className='flex flex-col gap-3'>
          <Label htmlFor={label.id}>{label.name}</Label>
          {label.type === 'text' && (
            <Input
              id={label.id}
              placeholder={label.placeholder}
              name={label.id}
              value={formik.values[label.id]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='col-span-3'
            />
          )}
          {label.type === 'select' && (
            <Select
              onValueChange={(value) => formik.setFieldValue(label.id, value)}
              value={formik.values[label.id]}
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder={label.placeholder}>
                  {formik.values[label.id]
                    ? label.options.find(
                        (option) => option.value === formik.values[label.id],
                      )?.label
                    : label.placeholder}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {label.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {formik.touched[label.id] && formik.errors[label.id] && (
            <Label className='col-span-4 text-right text-sm text-red-500'>
              {formik.errors[label.id]}
            </Label>
          )}
        </div>
      ))}
      <DialogFooter>
        <Button type='submit'>Save changes</Button>
      </DialogFooter>
    </form>
  );
}
