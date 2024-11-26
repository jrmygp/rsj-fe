/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Button } from '@/components/ui/button';
import { MdAdd, MdOutlineSearch } from 'react-icons/md';
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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';

export default function SearchAndCreate({
  title,
  searchValue,
  handleSearchChange,
  labels,
  formik,
  mutationStatus,
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (mutationStatus === 'success') {
      setIsDialogOpen(false);
      formik.resetForm();
      setTimeout(() => {
        mutationStatus = 'idle';
      }, 300);
    }
  }, [mutationStatus]);

  return (
    <div className='flex justify-between'>
      <div className='flex justify-between'>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className='flex items-center justify-center gap-2'>
              <MdAdd />
              <span>{title}</span>
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>{`${title}`}</DialogTitle>
              <DialogDescription>
                {`Input ${title} information to create new ${title}.`}
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={formik.handleSubmit}
              className='flex flex-col gap-6'
            >
              {labels.map((labelItem) => (
                <div key={labelItem.id} className='flex flex-col gap-3'>
                  <Label htmlFor={labelItem.id}>{labelItem.name}</Label>

                  {labelItem.type === 'text' && (
                    <Input
                      id={labelItem.id}
                      placeholder={labelItem.placeholder}
                      name={labelItem.id}
                      value={formik.values[labelItem.id]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className='col-span-3'
                    />
                  )}

                  {labelItem.type === 'select' && (
                    <Select
                      onValueChange={(value) =>
                        formik.setFieldValue(labelItem.id, value)
                      }
                    >
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder={labelItem.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {labelItem.options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}

                  {formik.touched[labelItem.id] &&
                    formik.errors[labelItem.id] && (
                      <Label className='col-span-4 text-right text-sm text-red-500'>
                        {formik.errors[labelItem.id]}
                      </Label>
                    )}
                </div>
              ))}
              <DialogFooter>
                <Button type='submit' disabled={mutationStatus === 'pending'}>
                  {mutationStatus === 'pending' ? 'Saving... ' : 'Save changes'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {searchValue !== undefined && handleSearchChange && (
        <Input
          type='text'
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder='Search...'
          className='w-96'
          leftIcon={<MdOutlineSearch size={24} />}
        />
      )}
    </div>
  );
}
