import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGetAllQuotation } from '@/services/quotation/hooks/useGetAllQuotation';
import { DefaultQuotationNumber } from '@/lib/DefaultQuoNumber';
import Loading from '@/components/template/Loading';
import { useGetUser } from '@/services/user/hooks/useGetUser';
import { useGetAllCustomer } from '@/services/customer/hooks/useGetAllCustomer';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { useGetAllPort } from '@/services/port/hooks/useGetAllPort';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useFormik } from 'formik';
import { quotationSchema } from '@/services/quotation/schema';

export default function Test() {
  const [date, setDate] = useState();

  const { quotationData, quotationStatus } = useGetAllQuotation();
  const { userData, userStatus } = useGetUser();
  const { customerData, customerStatus } = useGetAllCustomer();
  const { portData, portStatus } = useGetAllPort();

  const newQuotationNumber = DefaultQuotationNumber(quotationData?.data?.data);

  const quotationFormik = useFormik({
    initialValues: {
      quotationNumber: newQuotationNumber,
      customerId: '',
      customerName: '',
      commodity: '',
      rateValidity: '',
      shippingTerm: '',
      portOfLoadingId: '',
      portOfLoadingName: '',
      portOfDischargeId: '',
      portOfDischargeName: '',
      service: '',
      massWeight: '',
      volume: '',
      salesId: '',
      salesName: '',
      paymentTerm: '',
      status: '',
      note: '',
    },
    validationSchema: quotationSchema,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    quotationFormik.setFieldValue(
      'rateValidity',
      selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '',
    );
  };

  if (
    quotationStatus === 'pending' ||
    userStatus === 'pending' ||
    customerStatus === 'pending' ||
    portStatus === 'pending'
  ) {
    return <Loading />;
  }

  const customer = customerData.data.data;
  const port = portData.data.data;
  const user = userData.data.data;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className='w-[1000px]'>
        <VisuallyHidden>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </VisuallyHidden>
        <form onSubmit={quotationFormik.handleSubmit}>
          <div className='flex w-full items-center justify-center'>
            <Tabs defaultValue='data' className='w-[90%]'>
              <TabsList className='grid w-full grid-cols-2 justify-center'>
                <TabsTrigger value='data'>Data</TabsTrigger>
                <TabsTrigger value='item'>Item</TabsTrigger>
              </TabsList>
              <TabsContent value='data' className='h-[750px]'>
                <div className='grid gap-4 py-4'>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label className='text-right'>Quotation Number</Label>
                    <Input
                      className={cn(
                        'col-span-3',
                        quotationFormik.touched.quotationNumber &&
                          quotationFormik.errors.quotationNumber &&
                          'border-red-500',
                      )}
                      id='quotationNumber'
                      name='quotationNumber'
                      type='text'
                      onChange={quotationFormik.handleChange}
                      onBlur={quotationFormik.handleBlur}
                      value={quotationFormik.values.quotationNumber}
                    />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label className='text-right'>Customer</Label>
                    <Select
                      value={quotationFormik.values.customerId}
                      onValueChange={(value) => {
                        const selectedCustomer = customer.find(
                          (cust) => cust.id === value,
                        );
                        if (selectedCustomer) {
                          quotationFormik.setFieldValue(
                            'customerId',
                            selectedCustomer.id,
                          );
                          quotationFormik.setFieldValue(
                            'customerName',
                            selectedCustomer.name,
                          );
                        }
                      }}
                      onBlur={() =>
                        quotationFormik.setFieldTouched('customerId')
                      }
                    >
                      <SelectTrigger
                        className={cn(
                          'col-span-3 w-full',
                          quotationFormik.touched.customerId &&
                            quotationFormik.errors.customerId &&
                            'border-red-500',
                        )}
                      >
                        <SelectValue placeholder='Customer'>
                          {quotationFormik.values.customerName ||
                            'Select Customer'}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className='w-full'>
                        {customer.map((cust) => (
                          <SelectItem key={cust.id} value={cust.id}>
                            {cust.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label className='text-right'>Commodity</Label>
                    <Input
                      className={cn(
                        'col-span-3',
                        quotationFormik.touched.commodity &&
                          quotationFormik.errors.commodity &&
                          'border-red-500',
                      )}
                      id='commodity'
                      name='commodity'
                      type='text'
                      onChange={quotationFormik.handleChange}
                      onBlur={quotationFormik.handleBlur}
                      value={quotationFormik.values.commodity}
                    />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label className='text-right'>Rate Validity</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'col-span-3 w-full justify-start text-left font-normal',
                            !quotationFormik.values.rateValidity &&
                              'text-muted-foreground',
                            quotationFormik.touched.rateValidity &&
                              quotationFormik.errors.rateValidity &&
                              'border-red-500',
                          )}
                        >
                          <CalendarIcon className='mr-2 h-4 w-4' />
                          {quotationFormik.values.rateValidity ? (
                            format(
                              new Date(quotationFormik.values.rateValidity),
                              'dd/MM/yyyy',
                            )
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-full p-0'>
                        <Calendar
                          mode='single'
                          selected={
                            quotationFormik.values.rateValidity
                              ? new Date(quotationFormik.values.rateValidity)
                              : undefined
                          }
                          onSelect={(selectedDate) =>
                            handleDateChange(selectedDate)
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label className='text-right'>Shipping Term</Label>
                    <Select
                      value={quotationFormik.values.shippingTerm}
                      onValueChange={(value) => {
                        quotationFormik.setFieldValue('shippingTerm', value);
                      }}
                    >
                      <SelectTrigger
                        className={cn(
                          'col-span-3 w-full',
                          quotationFormik.touched.shippingTerm &&
                            quotationFormik.errors.shippingTerm &&
                            'border-red-500',
                        )}
                      >
                        <SelectValue placeholder='Shipping Term'>
                          {quotationFormik.values.shippingTerm ||
                            'Select Shipping Term'}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className='w-full'>
                        <SelectItem value='FOB'>FOB</SelectItem>
                        <SelectItem value='EXW'>EXW</SelectItem>
                        <SelectItem value='CIF'>CIF</SelectItem>
                        <SelectItem value='CFR'>CFR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {/** Port of Loading */}
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label className='text-right'>Port of Loading</Label>
                    <Select
                      value={quotationFormik.values.portOfLoadingId}
                      onValueChange={(value) => {
                        const selectedPort = port.find((p) => p.id === value);
                        if (selectedPort) {
                          quotationFormik.setFieldValue(
                            'portOfLoadingId',
                            selectedPort.id,
                          );
                          quotationFormik.setFieldValue(
                            'portOfLoadingName',
                            selectedPort.portName,
                          );
                        }
                      }}
                    >
                      <SelectTrigger
                        className={cn(
                          'col-span-3 w-full',
                          quotationFormik.touched.portOfLoadingId &&
                            quotationFormik.errors.portOfLoadingId &&
                            'border-red-500',
                        )}
                      >
                        <SelectValue placeholder='Port of Loading'>
                          {quotationFormik.values.portOfLoadingName ||
                            'Select Port'}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className='w-full'>
                        {port.map((port) => (
                          <SelectItem key={port.id} value={port.id}>
                            {port.portName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/** Port of Discharge */}
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label className='text-right'>Port of Discharge</Label>
                    <Select
                      value={quotationFormik.values.portOfDischargeId}
                      onValueChange={(value) => {
                        const selectedPort = port.find((p) => p.id === value);
                        if (selectedPort) {
                          quotationFormik.setFieldValue(
                            'portOfDischargeId',
                            selectedPort.id,
                          );
                          quotationFormik.setFieldValue(
                            'portOfDischargeName',
                            selectedPort.portName,
                          );
                        }
                      }}
                    >
                      <SelectTrigger
                        className={cn(
                          'col-span-3 w-full',
                          quotationFormik.touched.portOfDischargeId &&
                            quotationFormik.errors.portOfDischargeId &&
                            'border-red-500',
                        )}
                      >
                        <SelectValue placeholder='Port of Discharge'>
                          {quotationFormik.values.portOfDischargeName ||
                            'Select Port'}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className='w-full'>
                        {port.map((port) => (
                          <SelectItem key={port.id} value={port.id}>
                            {port.portName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/** Service */}
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label className='text-right'>Service</Label>
                    <Select
                      value={quotationFormik.values.service}
                      onValueChange={(value) => {
                        quotationFormik.setFieldValue('service', value);
                      }}
                    >
                      <SelectTrigger
                        className={cn(
                          'col-span-3 w-full',
                          quotationFormik.touched.service &&
                            quotationFormik.errors.service &&
                            'border-red-500',
                        )}
                      >
                        <SelectValue placeholder='Service'>
                          {quotationFormik.values.service || 'Select Service'}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className='w-full'>
                        <SelectItem value='Sea'>Sea</SelectItem>
                        <SelectItem value='Air'>Air</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/** Mass/Weight */}
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label className='text-right'>Mass/Weight</Label>
                    <Input
                      className={cn(
                        'col-span-3',
                        quotationFormik.touched.massWeight &&
                          quotationFormik.errors.massWeight &&
                          'border-red-500',
                      )}
                      placeholder='In Kilogram'
                      id='massWeight'
                      name='massWeight'
                      type='text'
                      onChange={quotationFormik.handleChange}
                      onBlur={quotationFormik.handleBlur}
                      value={quotationFormik.values.massWeight}
                    />
                  </div>

                  {/** Volume */}
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label className='text-right'>Volume</Label>
                    <Input
                      className={cn(
                        'col-span-3',
                        quotationFormik.touched.volume &&
                          quotationFormik.errors.volume &&
                          'border-red-500',
                      )}
                      placeholder='m3'
                      id='volume'
                      name='volume'
                      type='text'
                      onChange={quotationFormik.handleChange}
                      onBlur={quotationFormik.handleBlur}
                      value={quotationFormik.values.volume}
                    />
                  </div>

                  {/** Sales */}
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label className='text-right'>Sales</Label>
                    <Select
                      value={quotationFormik.values.salesId}
                      onValueChange={(value) => {
                        const selectedUser = user.find((u) => u.id === value);
                        if (selectedUser) {
                          quotationFormik.setFieldValue(
                            'salesId',
                            selectedUser.id,
                          );
                          quotationFormik.setFieldValue(
                            'salesName',
                            selectedUser.name,
                          );
                        }
                      }}
                    >
                      <SelectTrigger
                        className={cn(
                          'col-span-3 w-full',
                          quotationFormik.touched.salesId &&
                            quotationFormik.errors.salesId &&
                            'border-red-500',
                        )}
                      >
                        <SelectValue placeholder='Sales'>
                          {quotationFormik.values.salesName || 'Select Sales'}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className='w-full'>
                        {user.map((u) => (
                          <SelectItem key={u.id} value={u.id}>
                            {u.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/** Payment Term */}
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label className='text-right'>Payment Term</Label>
                    <Input
                      className={cn(
                        'col-span-3',
                        quotationFormik.touched.paymentTerm &&
                          quotationFormik.errors.paymentTerm &&
                          'border-red-500',
                      )}
                      id='paymentTerm'
                      name='paymentTerm'
                      type='text'
                      onChange={quotationFormik.handleChange}
                      onBlur={quotationFormik.handleBlur}
                      value={quotationFormik.values.paymentTerm}
                    />
                  </div>

                  {/** Status */}
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label className='text-right'>Status</Label>
                    <Select
                      value={quotationFormik.values.status}
                      onValueChange={(value) => {
                        quotationFormik.setFieldValue('status', value);
                      }}
                    >
                      <SelectTrigger
                        className={cn(
                          'col-span-3 w-full',
                          quotationFormik.touched.status &&
                            quotationFormik.errors.status &&
                            'border-red-500',
                        )}
                      >
                        <SelectValue placeholder='Status' />
                      </SelectTrigger>
                      <SelectContent className='w-full'>
                        <SelectItem value='Active'>Active</SelectItem>
                        <SelectItem value='Inactive'>Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value='item' className='h-[750px]'>
                <div className='flex flex-col gap-4 py-4'>
                  <div className='flex flex-col gap-4'>
                    <Label className='text-start'>Note</Label>
                    <Textarea
                      id='note'
                      name='note'
                      onChange={quotationFormik.handleChange}
                      onBlur={quotationFormik.handleBlur}
                      value={quotationFormik.values.note}
                      placeholder='Write your note here...'
                    />
                  </div>
                  <Button type='button'>Add Item</Button>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className='w-[200px]'>Item</TableHead>
                        <TableHead className='w-[100px]'>Currency</TableHead>
                        <TableHead className='w-[100px]'>Price</TableHead>
                        <TableHead className='text-right'>Quantity</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Note</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className='font-medium'>
                          DOOR TO DOOR SEA
                        </TableCell>
                        <TableCell>Rp</TableCell>
                        <TableCell>2000000</TableCell>
                        <TableCell className='text-right'>$250.00</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <div className='flex w-full items-center justify-center'>
            <DialogFooter>
              <Button type='submit'>Submit</Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
