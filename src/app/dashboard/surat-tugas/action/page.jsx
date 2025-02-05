/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react';
import Loading from '@/components/template/Loading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGetSuratTugasDetail } from '@/services/documents/hooks/useGetSuratTugasDetail';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useCreateSuratTugas } from '@/services/documents/hooks/useCreateSuratTugas';
import { useUpdateSuratTugas } from '@/services/documents/hooks/useUpdateSuratTugas';
import { useGetSuratTugas } from '@/services/documents/hooks/useGetSuratTugas';
import { DefaultSuratTugasNumber } from '@/lib/DefaultSuratTugasNumber';

const SuratTugasAction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { suratTugasDetailData, suratTugasDetailStatus } = id
    ? useGetSuratTugasDetail(id)
    : { suratTugasDetailData: null, suratTugasDetailStatus: 'idle' };
  const suratTugasDetail = suratTugasDetailData?.data?.data;
  const { suratTugasData, suratTugasStatus } = useGetSuratTugas('', 1);
  const { createSuratTugas, createSuratTugasStatus } = useCreateSuratTugas();
  const { updateSuratTugasMutation, updateSuratTugasStatus } =
    useUpdateSuratTugas();

  useEffect(() => {
    if (
      createSuratTugasStatus === 'success' ||
      updateSuratTugasStatus === 'success'
    ) {
      navigate(`/radix-logistics/document/surat-tugas`);
    }
  }, [createSuratTugasStatus, updateSuratTugasStatus]);

  const newSuratTugasNumber = DefaultSuratTugasNumber(suratTugasData?.data);

  const formik = useFormik({
    enableReinitialize: id ? true : false,
    initialValues: {
      documentNumber: suratTugasDetail?.documentNumber || newSuratTugasNumber,
      assignor: suratTugasDetail?.assignor || '',
      assignee: suratTugasDetail?.assignee || '',
      liners: suratTugasDetail?.liners || '',
      type: suratTugasDetail?.type || '',
      blawb: suratTugasDetail?.blawb || '',
      date: moment(suratTugasDetail?.date).format('YYYY-MM-DD') || '',
    },
    validationSchema: yup.object().shape({
      documentNumber: yup.string().required('Document number is required'),
      assignor: yup.string().required('Assignor is required'),
      assignee: yup.string().required('Assignee is required'),
      liners: yup.string().required('Liners is required'),
      type: yup.string().required('Type is required'),
      blawb: yup.string().required('BL/AWB is required'),
      date: yup.string().required('Date is required'),
    }),
    validateOnChange: false,
    onSubmit: (values) => {
      if (id) {
        updateSuratTugasMutation({ id, ...values });
      } else {
        createSuratTugas(values);
      }
    },
  });

  if (suratTugasDetailStatus === 'pending' || suratTugasStatus === 'pending') {
    return <Loading />;
  }

  return (
    <form onSubmit={formik.handleSubmit} className='p-8'>
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
          <Label className='col-span-1 text-left'>Assignor</Label>
          <Input
            className={cn(
              'col-span-3',
              formik.touched.assignor &&
                formik.errors.assignor &&
                'border-red-500',
            )}
            placeholder='Input Assignor'
            id='assignor'
            name='assignor'
            type='text'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.assignor}
          />
        </div>

        <div className='grid grid-cols-10 items-center'>
          <Label className='col-span-1 text-left'>Assignee</Label>
          <Input
            className={cn(
              'col-span-3',
              formik.touched.assignee &&
                formik.errors.assignee &&
                'border-red-500',
            )}
            placeholder='Input Assignee'
            id='assignee'
            name='assignee'
            type='text'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.assignee}
          />
        </div>

        <div className='grid grid-cols-10 items-center'>
          <Label className='col-span-1 text-left'>Liners</Label>
          <Input
            className={cn(
              'col-span-3',
              formik.touched.liners && formik.errors.liners && 'border-red-500',
            )}
            placeholder='Input Liners'
            id='liners'
            name='liners'
            type='text'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.liners}
          />
        </div>

        <div className='grid grid-cols-10 items-center'>
          <Label className='col-span-1 text-left'>Type</Label>
          <Select
            value={formik.values.type}
            onValueChange={(value) => {
              formik.setFieldValue('type', value);
            }}
          >
            <SelectTrigger
              className={cn(
                'col-span-3',
                formik.touched.type && formik.errors.type && 'border-red-500',
              )}
            >
              <SelectValue placeholder='Type'>
                {formik.values.type || 'Select Type'}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className='w-full'>
              <SelectItem value='DO'>DO</SelectItem>
              <SelectItem value='AWB'>AWB</SelectItem>
              <SelectItem value='BL'>BL</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='grid grid-cols-10 items-center'>
          <Label className='col-span-1 text-left'>BL/AWB</Label>
          <Input
            className={cn(
              'col-span-3',
              formik.touched.blawb && formik.errors.blawb && 'border-red-500',
            )}
            placeholder='Input BL/AWB'
            id='blawb'
            name='blawb'
            type='text'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.blawb}
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
                  formik.touched.date && formik.errors.date && 'border-red-500',
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
                  formik.values.date ? new Date(formik.values.date) : undefined
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
          <div className='col-span-3' />

          <Button type='submit' className='col-span-1'>
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SuratTugasAction;
