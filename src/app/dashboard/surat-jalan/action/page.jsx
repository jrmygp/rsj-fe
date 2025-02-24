/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import Loading from '@/components/template/Loading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useGetSuratJalanDetail } from '@/services/documents/hooks/useGetSuratJalanDetail';
import { useGetSuratJalan } from '@/services/documents/hooks/useGetSuratJalan';
import { useCreateSuratJalan } from '@/services/documents/hooks/useCreateSuratJalan';
import { useUpdateSuratJalan } from '@/services/documents/hooks/useUpdateSuratJalan';
import { DefaultSuratJalanNumber } from '@/lib/DefaultSuratJalanNumber';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import SuratJalanItemForm from '../../_components/SuratJalanItemForm';
import DataTable from '@/components/template/DataTable/DataTable';
import { MdDelete, MdEdit } from 'react-icons/md';

const SuratJalanAction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const { suratJalanDetailData, suratJalanDetailStatus } = id
    ? useGetSuratJalanDetail(id)
    : { suratJalanDetailData: null, suratJalanDetailStatus: 'idle' };
  const suratJalanDetail = suratJalanDetailData?.data?.data;
  const { suratJalanData, suratJalanStatus } = useGetSuratJalan('', 1);
  const { createSuratJalan, createSuratJalanStatus } = useCreateSuratJalan();
  const { updateSuratJalanMutation, updateSuratJalanStatus } =
    useUpdateSuratJalan();

  useEffect(() => {
    if (
      createSuratJalanStatus === 'success' ||
      updateSuratJalanStatus === 'success'
    ) {
      navigate(`/radix-logistics/document/surat-jalan`);
    }
  }, [createSuratJalanStatus, updateSuratJalanStatus]);

  const newSuratJalanNumber = DefaultSuratJalanNumber(suratJalanData?.data);

  const formik = useFormik({
    enableReinitialize: id ? true : false,
    initialValues: {
      documentNumber: suratJalanDetail?.documentNumber || newSuratJalanNumber,
      recipient: suratJalanDetail?.recipient || '',
      date: moment(suratJalanDetail?.date).format('YYYY-MM-DD') || '',
      address: suratJalanDetail?.address || '',
      items: suratJalanDetail?.items || [],
    },
    validationSchema: yup.object().shape({
      documentNumber: yup.string().required('Document number is required'),
      recipient: yup.string().required('Recipient is required'),
      date: yup.string().required('Date is required'),
      address: yup.string().required('Address is required'),
    }),
    validateOnChange: false,
    onSubmit: (values) => {
      if (id) {
        updateSuratJalanMutation({ id, ...values });
      } else {
        createSuratJalan(values);
      }
    },
  });

  if (suratJalanDetailStatus === 'pending' || suratJalanStatus === 'pending') {
    return <Loading />;
  }

  const columns = [
    {
      header: 'Item Name',
      assessor: 'itemName',
    },
    {
      header: 'Type',
      assessor: 'type',
    },
    {
      header: 'Quantity',
      assessor: 'quantity',
      Cell: (row) => {
        return <p>{row.quantity.toLocaleString()}</p>;
      },
    },
    {
      header: 'Unit',
      assessor: 'unit',
    },
    {
      header: 'Colly',
      assessor: 'colly',
    },
    {
      header: 'Volume',
      assessor: 'volume',
    },
    {
      header: '',
      Cell: (row, index) => {
        return (
          <div className='flex items-center gap-2'>
            <Dialog
              open={selectedRow === index}
              onOpenChange={(isOpen) => setSelectedRow(isOpen ? index : null)}
            >
              <DialogTrigger asChild>
                <Button
                  size='icon'
                  className='rounded-full'
                  onClick={() => setSelectedRow(index)}
                >
                  <MdEdit />
                </Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[600px]'>
                <DialogHeader>
                  <DialogTitle>Edit Item</DialogTitle>
                  <DialogDescription>
                    Fill the form below to edit an item.
                  </DialogDescription>
                </DialogHeader>
                <SuratJalanItemForm
                  item={row}
                  onSubmit={(newItem) => {
                    const updatedList = [...formik.values.items];
                    updatedList[index] = newItem;
                    formik.setFieldValue('items', updatedList);
                  }}
                  onClose={() => setSelectedRow(null)}
                />
              </DialogContent>
            </Dialog>

            <Button
              variant='destructive'
              size='icon'
              onClick={(e) => {
                e.preventDefault();
                const updatedItems = formik.values.items.filter(
                  (_, i) => i !== index,
                );
                formik.setFieldValue('items', updatedItems);
              }}
              className='rounded-full'
            >
              <MdDelete />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <form onSubmit={formik.handleSubmit} className='p-8'>
      <Tabs defaultValue='data' className='w-full px-8'>
        <TabsList className='grid w-full grid-cols-2 justify-center'>
          <TabsTrigger value='data'>Data</TabsTrigger>
          <TabsTrigger value='item'>Item</TabsTrigger>
        </TabsList>

        <TabsContent value='data'>
          <div className='flex flex-col gap-4'>
            <div className='grid grid-cols-10 items-center'>
              <Label className='col-span-1 text-left'>Document Number</Label>
              <Input
                className={cn(
                  'col-span-3',
                  formik.touched.documentNumber &&
                    formik.errors.documentNumber &&
                    'border-red-500',
                )}
                placeholder='Input Document Number'
                id='documentNumber'
                name='documentNumber'
                type='text'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.documentNumber}
                disabled={id}
              />
            </div>

            <div className='grid grid-cols-10 items-center'>
              <Label className='col-span-1 text-left'>Recipient</Label>
              <Input
                className={cn(
                  'col-span-3',
                  formik.touched.recipient &&
                    formik.errors.recipient &&
                    'border-red-500',
                )}
                placeholder='Input Recipient'
                id='recipient'
                name='recipient'
                type='text'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.recipient}
              />
            </div>

            <div className='grid grid-cols-10 items-center'>
              <Label className='col-span-1 text-left'>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'col-span-3',
                      !formik.values.date && 'text-muted-foreground',
                      formik.touched.date &&
                        formik.errors.date &&
                        'border-red-500',
                    )}
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {formik.values.date ? (
                      moment(formik.values.date).format('YYYY-MM-DD')
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-full p-0'>
                  <Calendar
                    mode='single'
                    selected={
                      formik.values.date
                        ? new Date(formik.values.date)
                        : undefined
                    }
                    onSelect={(selectedDate) =>
                      formik.setFieldValue(
                        'date',
                        moment(selectedDate).format('YYYY-MM-DD'),
                      )
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className='grid grid-cols-10 items-center'>
              <Label className='col-span-1 text-left'>Address</Label>
              <Textarea
                id='address'
                name='address'
                className={`col-span-3 ${formik.touched.address && formik.errors.address ? 'border-red-500' : ''}`}
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='Enter Address'
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value='item'>
          <div className='flex flex-col items-center justify-center gap-4 py-4'>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className='w-[50%]'
                  onClick={() => setIsDialogOpen(true)}
                >
                  Add Item
                </Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[600px]'>
                <DialogHeader>
                  <DialogTitle>Add New Item</DialogTitle>
                  <DialogDescription>
                    Fill the form below to add a new item.
                  </DialogDescription>
                </DialogHeader>
                <SuratJalanItemForm
                  onSubmit={(newItem) => {
                    const updatedItems = [...formik.values.items, newItem];
                    formik.setFieldValue('items', updatedItems);
                  }}
                  onClose={() => setIsDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>

          {/* Table Item */}
          <DataTable
            staticData={formik?.values?.items}
            columns={columns}
            options={{ pagination: false }}
            onClickRow={() => {}}
          />
        </TabsContent>
      </Tabs>

      <div className='flex w-full items-center justify-center'>
        <Button type='submit'>Submit</Button>
      </div>
    </form>
  );
};

export default SuratJalanAction;
