/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGetAllQuotation } from '@/services/quotation/hooks/useGetAllQuotation';
import { DefaultQuotationNumber } from '@/lib/DefaultQuoNumber';
import Loading from '@/components/template/Loading';
import { useGetUser } from '@/services/user/hooks/useGetUser';
import { useGetAllCustomer } from '@/services/customer/hooks/useGetAllCustomer';
import { format, parseISO } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { useGetAllPort } from '@/services/port/hooks/useGetAllPort';
import { useEffect, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { useFormik } from 'formik';
import { quotationSchema } from '@/services/quotation/schema';
import ItemForm from '../../_components/ItemForm';
import { useCreateQuotation } from '@/services/quotation/hooks/useCreateQuotation';
import { useParams, useNavigate } from 'react-router-dom';
import { useUpdateQuotation } from '@/services/quotation/hooks/useUpdateQuotation';
import { useGetQuotationDetail } from '@/services/quotation/hooks/useGetQuotationDetail';
import { NumericFormat } from 'react-number-format';
import { MdEdit, MdDelete } from 'react-icons/md';
import DataTable from '@/components/template/DataTable/DataTable';

export default function QuotationAction() {
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState(null);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const { createQuotationMutation, createQuotationStatus } =
    useCreateQuotation();

  const { updateQuotationMutation, updateQuotationStatus } =
    useUpdateQuotation();

  useEffect(() => {
    if (
      updateQuotationStatus == 'success' ||
      createQuotationStatus === 'success'
    ) {
      navigate('/radix-logistics/quotation');
    }
  }, [createQuotationStatus, updateQuotationStatus]);

  const { id } = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { quotationDetailData, quotationDetailStatus } = id
    ? useGetQuotationDetail(id)
    : { quotationDetailData: null, quotationDetailStatus: 'idle' };
  const { quotationData, quotationStatus } = useGetAllQuotation();
  const { userData, userStatus } = useGetUser();
  const { customerData, customerStatus } = useGetAllCustomer();
  const { portData, portStatus } = useGetAllPort();

  const quotationDetail = quotationDetailData?.data?.data;

  const newQuotationNumber = DefaultQuotationNumber(quotationData?.data?.data);

  const initialValues = quotationDetail
    ? {
        ...quotationDetail,
        rateValidity: quotationDetail.rateValidity
          ? format(new Date(quotationDetail.rateValidity), 'yyyy-MM-dd')
          : '',
      }
    : {
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
        weight: 0,
        volume: 0,
        salesId: '',
        salesName: '',
        paymentTerm: '',
        status: '',
        note: '',
        listCharges: [],
      };

  const quotationFormik = useFormik({
    initialValues,
    validationSchema: quotationSchema,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (id) {
        const formattedRateValidity = values.rateValidity
          ? format(parseISO(values.rateValidity), "yyyy-MM-dd'T'HH:mm:ss'Z'")
          : null;

        const payload = {
          ...values,
          weight: parseFloat(values.weight),
          volume: parseFloat(values.volume),
          rateValidity: formattedRateValidity,
        };

        updateQuotationMutation(payload);
      } else {
        createQuotationMutation(values);
      }
    },
  });

  const handleDateChange = (selectedDate) => {
    const formattedDate = selectedDate
      ? format(selectedDate, 'yyyy-MM-dd')
      : '';

    quotationFormik.setFieldValue('rateValidity', formattedDate);
  };

  if (
    quotationDetailStatus === 'pending' ||
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

  const columns = [
    {
      header: 'Item Name',
      assessor: 'itemName',
    },
    {
      header: 'Price',
      assessor: 'price',
      Cell: (row) => {
        return <p>{row.price.toLocaleString()}</p>;
      },
    },
    {
      header: 'Currency',
      assessor: 'currency',
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
      header: 'Note',
      assessor: 'note',
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
              <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                  <DialogTitle>Edit Item</DialogTitle>
                  <DialogDescription>
                    Fill the form below to edit an item.
                  </DialogDescription>
                </DialogHeader>
                <ItemForm
                  item={row}
                  onSubmit={(newItem) => {
                    const updatedList = [...quotationFormik.values.listCharges];
                    updatedList[index] = newItem;
                    quotationFormik.setFieldValue('listCharges', updatedList);
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
                const updatedItems = quotationFormik.values.listCharges.filter(
                  (_, i) => i !== index,
                );
                quotationFormik.setFieldValue('listCharges', updatedItems);
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
    <form onSubmit={quotationFormik.handleSubmit} className='py-4'>
      <div className='flex w-full items-center justify-center'>
        <Tabs defaultValue='data' className='w-full px-8'>
          <TabsList className='grid w-full grid-cols-2 justify-center'>
            <TabsTrigger value='data'>Data</TabsTrigger>
            <TabsTrigger value='item'>Item</TabsTrigger>
          </TabsList>
          <TabsContent value='data'>
            <div className='flex gap-4 py-4'>
              <div className='flex flex-1 flex-col gap-4'>
                {/* Quotation Number */}
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label className='text-left'>Quotation Number</Label>
                  <Input
                    className={cn(
                      'col-span-3 w-full',
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
                    disabled={id}
                  />
                </div>

                {/* Customer */}
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label className='text-left'>Customer</Label>
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
                    onBlur={() => quotationFormik.setFieldTouched('customerId')}
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

                {/* Commodity */}
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label className='text-left'>Commodity</Label>
                  <Input
                    placeholder='Input Commodity'
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

                {/* Rate validity */}
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label className='text-left'>Rate Validity</Label>
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

                {/* Shipping Term */}
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label className='text-left'>Shipping Term</Label>
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
                  <Label className='text-left'>Port of Loading</Label>
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

                {/* Port of Discharge */}
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label className='text-left'>Port of Discharge</Label>
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
              </div>

              <div className='flex flex-1 flex-col gap-4'>
                {/* Service */}
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label className='text-left'>Service</Label>
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

                {/* Mass/Weight */}
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label className='text-left'>Mass/Weight</Label>
                  <NumericFormat
                    customInput={Input}
                    className={cn(
                      'col-span-3',
                      quotationFormik.touched.weight &&
                        quotationFormik.errors.weight &&
                        'border-red-500',
                    )}
                    placeholder='In Kilogram'
                    id='weight'
                    name='weight'
                    onValueChange={(values) => {
                      const { floatValue } = values;
                      quotationFormik.setFieldValue('weight', floatValue);
                    }}
                    onBlur={quotationFormik.handleBlur}
                    value={quotationFormik.values.weight}
                    rightIcon={<p>Kg</p>}
                    thousandSeparator
                  />
                </div>

                {/* Volume */}
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label className='text-left'>Volume</Label>
                  <NumericFormat
                    customInput={Input}
                    className={cn(
                      'col-span-3',
                      quotationFormik.touched.volume &&
                        quotationFormik.errors.volume &&
                        'border-red-500',
                    )}
                    placeholder='m3'
                    id='volume'
                    name='volume'
                    onValueChange={(values) => {
                      const { floatValue } = values;
                      quotationFormik.setFieldValue('volume', floatValue);
                    }}
                    onBlur={quotationFormik.handleBlur}
                    value={quotationFormik.values.volume}
                    rightIcon={<p>Cbm</p>}
                    thousandSeparator
                  />
                </div>

                {/* Sales */}
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label className='text-left'>Sales</Label>
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

                {/* Payment Term */}
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label className='text-left'>Payment Term</Label>
                  <Input
                    placeholder='Input Payment Term'
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

                {/* Status */}
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label className='text-left'>Status</Label>
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
                      <SelectItem value='Accepted'>Accepted</SelectItem>
                      <SelectItem value='Declined'>Declined</SelectItem>
                      <SelectItem value='Pending'>Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value='item'>
            <div className='flex flex-col gap-4 py-4'>
              {/* Note */}
              <div className='flex flex-col gap-4'>
                <Label className='text-start'>Note</Label>
                <Textarea
                  id='note'
                  name='note'
                  className={cn(
                    'col-span-3',
                    quotationFormik.touched.note &&
                      quotationFormik.errors.note &&
                      'border-red-500',
                  )}
                  onChange={quotationFormik.handleChange}
                  onBlur={quotationFormik.handleBlur}
                  value={quotationFormik.values.note}
                  placeholder='Write your note here...'
                />
              </div>

              {/* Add Item */}
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
                  <DialogContent className='sm:max-w-[425px]'>
                    <DialogHeader>
                      <DialogTitle>Add New Item</DialogTitle>
                      <DialogDescription>
                        Fill the form below to add a new item.
                      </DialogDescription>
                    </DialogHeader>
                    <ItemForm
                      onSubmit={(newItem) => {
                        const updatedItems = [
                          ...quotationFormik.values.listCharges,
                          newItem,
                        ];
                        quotationFormik.setFieldValue(
                          'listCharges',
                          updatedItems,
                        );
                      }}
                      onClose={handleDialogClose}
                    />
                  </DialogContent>
                </Dialog>
              </div>

              {/* Table Item */}
              <DataTable
                staticData={quotationFormik?.values?.listCharges}
                columns={columns}
                options={{ pagination: false }}
                onClickRow={() => {}}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <div className='flex w-full items-center justify-center'>
        <DialogFooter>
          <Button
            type='submit'
            disabled={quotationFormik.values.listCharges.length === 0}
          >
            Submit
          </Button>
        </DialogFooter>
      </div>
    </form>
  );
}
