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
import Loading from '@/components/template/Loading';
import { useGetAllCustomer } from '@/services/customer/hooks/useGetAllCustomer';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { useGetAllPort } from '@/services/port/hooks/useGetAllPort';
import { useEffect, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { useFormik } from 'formik';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { MdEdit, MdDelete } from 'react-icons/md';
import DataTable from '@/components/template/DataTable/DataTable';
import moment from 'moment';
import { DefaultInvNumber } from '@/lib/DefaultInvNumber';
import { useGetAllShipper } from '@/services/shipper/hooks/useGetAllShipper';
import * as yup from 'yup';
import { useGetD2DInvoice } from '@/services/invoice/hooks/useGetD2DInvoice';
import { useGetD2DInvoiceDetail } from '@/services/invoice/hooks/useGetD2DInvoiceDetail';
import { useUpdateD2DInvoice } from '@/services/invoice/hooks/useUpdateD2DInvoice';
import { useCreateD2DInvoice } from '@/services/invoice/hooks/useCreateD2DInvoice';
import { NumericFormat } from 'react-number-format';
import D2DInvoiceItemForm from '@/app/dashboard/_components/D2DInvoiceItemForm/D2DInvoiceItemForm';

export default function InvoiceAction() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const { createInvoiceMutation, createInvoiceStatus } = useCreateD2DInvoice();

  const { updateInvoiceMutation, updateInvoiceStatus } = useUpdateD2DInvoice();

  useEffect(() => {
    if (updateInvoiceStatus == 'success' || createInvoiceStatus === 'success') {
      navigate(`/radix-logistics/invoice/${location.pathname.split('/')[3]}`);
    }
  }, [createInvoiceStatus, updateInvoiceStatus]);

  const { id } = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { invoiceDetailData, invoiceDetailStatus } = id
    ? useGetD2DInvoiceDetail(id)
    : { invoiceDetailData: null, invoiceDetailStatus: 'idle' };

  const { invoiceData, invoiceStatus, refetch } = useGetD2DInvoice('', 1, {
    customerId: selectedCustomer?.id,
    category: location.pathname.split('/')[3],
  });
  const { customerData, customerStatus } = useGetAllCustomer();
  const { shipperData, shipperStatus } = useGetAllShipper();
  const { portData, portStatus } = useGetAllPort();
  const customer = customerData?.data?.data;
  const port = portData?.data?.data;
  const shipper = shipperData?.data?.data;

  const invoiceDetail = invoiceDetailData?.data?.data;

  const newInvoiceNumber = DefaultInvNumber(
    invoiceData?.data,
    selectedCustomer?.companyCode || '???',
    location.pathname.split('/')[3],
  );

  const invoiceFormik = useFormik({
    enableReinitialize: invoiceDetail ? true : false,
    initialValues: {
      invoiceNumber: invoiceDetail?.invoiceNumber || newInvoiceNumber,
      type: invoiceDetail?.type || 'Door to Door Charges',
      customerId: invoiceDetail?.customerId || '',
      consigneeId: invoiceDetail?.consigneeId || '',
      shipperId: invoiceDetail?.shipperId || '',
      service: invoiceDetail?.service || '',
      portOfLoadingId: invoiceDetail?.portOfLoadingId || '',
      portOfDischargeId: invoiceDetail?.portOfDischargeId || '',
      shippingMarks: invoiceDetail?.shippingMarks || '',
      invoiceDate:
        moment(invoiceDetail?.invoiceDate).format('YYYY-MM-DD') || '',
      status: invoiceDetail?.status || 'Unpaid',
      quantity: invoiceDetail?.quantity || '',
      weight: invoiceDetail?.weight || '',
      volume: invoiceDetail?.volume || '',
      invoiceItems: [],
    },
    validationSchema: yup.object().shape({
      invoiceNumber: yup.string().required('Invoice Number is required'),
      type: yup.string().required('Type is required'),
      customerId: yup.string().required('Customer is required'),
      consigneeId: yup.string().required('Consignee is required'),
      shipperId: yup.string().required('Shipper is required'),
      service: yup.string().required('Service is required'),
      portOfLoadingId: yup.string().required('Port Of Loading is required'),
      portOfDischargeId: yup.string().required('Port Of Discharge is required'),
      shippingMarks: yup.string().required('Shipping Marks is required'),
      invoiceDate: yup.string().required('Invoice Date is required'),
      status: yup.string().required('Status is required'),
      quantity: yup.string().required('quantity is required'),
      weight: yup.string().required('Weight is required'),
      volume: yup.string().required('Volume is required'),
    }),
    validateOnChange: false,
    onSubmit: (values) => {
      if (id) {
        updateInvoiceMutation({ id, ...values });
      } else {
        createInvoiceMutation(values);
      }
    },
  });

  useEffect(() => {
    if (!id) {
      invoiceFormik.setFieldValue('invoiceNumber', newInvoiceNumber);
    }
  }, [newInvoiceNumber]);

  useEffect(() => {
    refetch();
  }, [invoiceFormik.values.customerId]);

  useEffect(() => {
    if (invoiceDetail) {
      invoiceFormik.setFieldValue('invoiceItems', invoiceDetail.invoiceItems);
    }
  }, [invoiceDetail]);

  if (
    invoiceDetailStatus === 'pending' ||
    invoiceStatus === 'pending' ||
    customerStatus === 'pending' ||
    shipperStatus === 'pending' ||
    portStatus === 'pending'
  ) {
    return <Loading />;
  }

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
      header: 'Kurs',
      assessor: 'kurs',
      Cell: (row) => {
        return <p>{row.kurs?.toLocaleString()}</p>;
      },
    },
    {
      header: 'Quantity',
      assessor: 'quantity',
      Cell: (row) => {
        return <p>{row.quantity.toLocaleString()}</p>;
      },
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
                <D2DInvoiceItemForm
                  item={row}
                  onSubmit={(newItem) => {
                    const updatedList = [...invoiceFormik.values.invoiceItems];
                    updatedList[index] = newItem;
                    invoiceFormik.setFieldValue('invoiceItems', updatedList);
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
                const updatedItems = invoiceFormik.values.invoiceItems.filter(
                  (_, i) => i !== index,
                );
                invoiceFormik.setFieldValue('invoiceItems', updatedItems);
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
    <form onSubmit={invoiceFormik.handleSubmit} className='py-4'>
      <div className='flex w-full items-center justify-center'>
        <Tabs defaultValue='data' className='w-full px-8'>
          <TabsList className='grid w-full grid-cols-2 justify-center'>
            <TabsTrigger value='data'>Data</TabsTrigger>
            <TabsTrigger value='item'>Item</TabsTrigger>
          </TabsList>
          <TabsContent value='data'>
            <div className='flex gap-4 py-4'>
              <div className='flex flex-1 flex-col gap-4'>
                {/* Invoice Number */}
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label className='text-left'>Invoice Number</Label>
                  <Input
                    className={cn(
                      'col-span-3 w-full',
                      invoiceFormik.touched.invoiceNumber &&
                        invoiceFormik.errors.invoiceNumber &&
                        'border-red-500',
                    )}
                    id='invoiceNumber'
                    name='invoiceNumber'
                    type='text'
                    onChange={invoiceFormik.handleChange}
                    onBlur={invoiceFormik.handleBlur}
                    value={invoiceFormik.values.invoiceNumber}
                  />
                </div>

                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label className='text-left'>Type</Label>
                  <Input
                    placeholder='Input Type'
                    className={cn(
                      'col-span-3',
                      invoiceFormik.touched.type &&
                        invoiceFormik.errors.type &&
                        'border-red-500',
                    )}
                    id='type'
                    name='type'
                    type='text'
                    onChange={invoiceFormik.handleChange}
                    onBlur={invoiceFormik.handleBlur}
                    value={invoiceFormik.values.type}
                  />
                </div>

                {/* Customer */}
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label className='text-left'>Customer</Label>
                  <Select
                    value={invoiceFormik.values.customerId}
                    onValueChange={(value) => {
                      const selectedCustomer = customer.find(
                        (cust) => cust.id == value,
                      );
                      if (selectedCustomer) {
                        invoiceFormik.setFieldValue(
                          'customerId',
                          selectedCustomer.id,
                        );
                        setSelectedCustomer(selectedCustomer);
                      }
                    }}
                    onBlur={() => invoiceFormik.setFieldTouched('customerId')}
                  >
                    <SelectTrigger
                      className={cn(
                        'col-span-3 w-full',
                        invoiceFormik.touched.customerId &&
                          invoiceFormik.errors.customerId &&
                          'border-red-500',
                      )}
                    >
                      <SelectValue placeholder='Customer'>
                        {customer.filter(
                          (cust) => cust.id == invoiceFormik.values.customerId,
                        )[0]?.name || 'Select Customer'}
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

                {/* Consginee */}
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label className='text-left'>Consignee</Label>
                  <Select
                    value={invoiceFormik.values.consigneeId}
                    onValueChange={(value) => {
                      const selectedCustomer = customer.find(
                        (cust) => cust.id == value,
                      );
                      if (selectedCustomer) {
                        invoiceFormik.setFieldValue(
                          'consigneeId',
                          selectedCustomer.id,
                        );
                      }
                    }}
                    onBlur={() => invoiceFormik.setFieldTouched('consigneeId')}
                  >
                    <SelectTrigger
                      className={cn(
                        'col-span-3 w-full',
                        invoiceFormik.touched.consigneeId &&
                          invoiceFormik.errors.consigneeId &&
                          'border-red-500',
                      )}
                    >
                      <SelectValue placeholder='Consignee'>
                        {customer.filter(
                          (item) => item.id == invoiceFormik.values.consigneeId,
                        )[0]?.name || 'Select Consignee'}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className='w-full'>
                      {customer.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Shipper */}
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label className='text-left'>Shipper</Label>
                  <Select
                    value={invoiceFormik.values.shipperId}
                    onValueChange={(value) => {
                      const selectedShipper = shipper.find(
                        (cust) => cust.id == value,
                      );
                      if (selectedShipper) {
                        invoiceFormik.setFieldValue(
                          'shipperId',
                          selectedShipper.id,
                        );
                      }
                    }}
                    onBlur={() => invoiceFormik.setFieldTouched('shipperId')}
                  >
                    <SelectTrigger
                      className={cn(
                        'col-span-3 w-full',
                        invoiceFormik.touched.shipperId &&
                          invoiceFormik.errors.shipperId &&
                          'border-red-500',
                      )}
                    >
                      <SelectValue placeholder='Shipper'>
                        {shipper.filter(
                          (cust) => cust.id == invoiceFormik.values.shipperId,
                        )[0]?.name || 'Select Shipper'}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className='w-full'>
                      {shipper.map((cust) => (
                        <SelectItem key={cust.id} value={cust.id}>
                          {cust.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Service */}
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label className='text-left'>Service</Label>
                  <Select
                    value={invoiceFormik.values.service}
                    onValueChange={(value) => {
                      invoiceFormik.setFieldValue('service', value);
                    }}
                  >
                    <SelectTrigger
                      className={cn(
                        'col-span-3 w-full',
                        invoiceFormik.touched.service &&
                          invoiceFormik.errors.service &&
                          'border-red-500',
                      )}
                    >
                      <SelectValue placeholder='Service'>
                        {invoiceFormik.values.service || 'Select Service'}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className='w-full'>
                      <SelectItem value='Sea'>Sea</SelectItem>
                      <SelectItem value='Air'>Air</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Quantity */}
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label className='text-left'>Quantity</Label>
                  <Input
                    className={cn(
                      'col-span-3 w-full',
                      invoiceFormik.touched.quantity &&
                        invoiceFormik.errors.quantity &&
                        'border-red-500',
                    )}
                    id='quantity'
                    name='quantity'
                    type='text'
                    placeholder='Enter Quantity'
                    onChange={invoiceFormik.handleChange}
                    onBlur={invoiceFormik.handleBlur}
                    value={invoiceFormik.values.quantity}
                  />
                </div>

                {/* Weight */}
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label className='text-left'>Weight</Label>
                  <NumericFormat
                    customInput={Input}
                    id='weight'
                    name='weight'
                    className={`col-span-3 ${invoiceFormik.touched.weight && invoiceFormik.errors.weight ? 'border-red-500' : ''}`}
                    value={invoiceFormik.values.weight}
                    onValueChange={(values) => {
                      const { floatValue } = values;
                      invoiceFormik.setFieldValue('weight', floatValue);
                    }}
                    onBlur={invoiceFormik.handleBlur}
                    placeholder='Enter Weight'
                    thousandSeparator
                    rightIcon={<p>Kg</p>}
                  />
                </div>

                {/* Volume */}
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label className='text-left'>Volume</Label>
                  <NumericFormat
                    customInput={Input}
                    id='volume'
                    name='volume'
                    className={`col-span-3 ${invoiceFormik.touched.volume && invoiceFormik.errors.volume ? 'border-red-500' : ''}`}
                    value={invoiceFormik.values.volume}
                    onValueChange={(values) => {
                      const { floatValue } = values;
                      invoiceFormik.setFieldValue('volume', floatValue);
                    }}
                    onBlur={invoiceFormik.handleBlur}
                    placeholder='Enter Volume'
                    thousandSeparator
                    rightIcon={<p>Cbm</p>}
                  />
                </div>
              </div>

              <div className='flex flex-1 flex-col gap-4'>
                {/* Port of Loading */}
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label className='text-left'>Port of Loading</Label>
                  <Select
                    value={invoiceFormik.values.portOfLoadingId}
                    onValueChange={(value) => {
                      const selectedPort = port.find((p) => p.id === value);
                      if (selectedPort) {
                        invoiceFormik.setFieldValue(
                          'portOfLoadingId',
                          selectedPort.id,
                        );
                      }
                    }}
                  >
                    <SelectTrigger
                      className={cn(
                        'col-span-3 w-full',
                        invoiceFormik.touched.portOfLoadingId &&
                          invoiceFormik.errors.portOfLoadingId &&
                          'border-red-500',
                      )}
                    >
                      <SelectValue placeholder='Port of Loading'>
                        {port.filter(
                          (item) =>
                            item.id == invoiceFormik.values.portOfLoadingId,
                        )[0]?.portName || 'Select Port'}
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
                    value={invoiceFormik.values.portOfDischargeId}
                    onValueChange={(value) => {
                      const selectedPort = port.find((p) => p.id === value);
                      if (selectedPort) {
                        invoiceFormik.setFieldValue(
                          'portOfDischargeId',
                          selectedPort.id,
                        );
                      }
                    }}
                  >
                    <SelectTrigger
                      className={cn(
                        'col-span-3 w-full',
                        invoiceFormik.touched.portOfDischargeId &&
                          invoiceFormik.errors.portOfDischargeId &&
                          'border-red-500',
                      )}
                    >
                      <SelectValue placeholder='Port of Discharge'>
                        {port.filter(
                          (item) =>
                            item.id == invoiceFormik.values.portOfDischargeId,
                        )[0]?.portName || 'Select Port'}
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

                {/* Rate validity */}
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label className='text-left'>Invoice Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'col-span-3 w-full justify-start text-left font-normal',
                          !invoiceFormik.values.invoiceDate &&
                            'text-muted-foreground',
                          invoiceFormik.touched.invoiceDate &&
                            invoiceFormik.errors.invoiceDate &&
                            'border-red-500',
                        )}
                      >
                        <CalendarIcon className='mr-2 h-4 w-4' />
                        {invoiceFormik.values.invoiceDate ? (
                          moment(invoiceFormik.values.invoiceDate).format(
                            'YYYY-MM-DD',
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
                          invoiceFormik.values.invoiceDate
                            ? new Date(invoiceFormik.values.invoiceDate)
                            : undefined
                        }
                        onSelect={(selectedDate) =>
                          invoiceFormik.setFieldValue(
                            'invoiceDate',
                            moment(selectedDate).format('YYYY-MM-DD'),
                          )
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Shipping Marks */}
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label className='text-start'>Shipping Marks</Label>
                  <Textarea
                    id='shippingMarks'
                    name='shippingMarks'
                    className={cn(
                      'col-span-3',
                      invoiceFormik.touched.shippingMarks &&
                        invoiceFormik.errors.shippingMarks &&
                        'border-red-500',
                    )}
                    onChange={invoiceFormik.handleChange}
                    onBlur={invoiceFormik.handleBlur}
                    value={invoiceFormik.values.shippingMarks}
                    placeholder='Write your shipping marks here...'
                  />
                </div>

                {/* Status */}
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label className='text-left'>Status</Label>
                  <Select
                    value={invoiceFormik.values.status}
                    onValueChange={(value) => {
                      invoiceFormik.setFieldValue('status', value);
                    }}
                  >
                    <SelectTrigger
                      className={cn(
                        'col-span-3 w-full',
                        invoiceFormik.touched.status &&
                          invoiceFormik.errors.status &&
                          'border-red-500',
                      )}
                    >
                      <SelectValue placeholder='Status' />
                    </SelectTrigger>
                    <SelectContent className='w-full'>
                      <SelectItem value='Paid'>Paid</SelectItem>
                      <SelectItem value='Unpaid'>Unpaid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value='item'>
            <div className='flex flex-col gap-4 py-4'>
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
                    <D2DInvoiceItemForm
                      onSubmit={(newItem) => {
                        const updatedItems = [
                          ...invoiceFormik.values.invoiceItems,
                          newItem,
                        ];
                        invoiceFormik.setFieldValue(
                          'invoiceItems',
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
                staticData={invoiceFormik?.values?.invoiceItems}
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
            disabled={invoiceFormik.values.invoiceItems.length === 0}
          >
            Submit
          </Button>
        </DialogFooter>
      </div>
    </form>
  );
}
