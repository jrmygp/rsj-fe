import * as Yup from 'yup';

export const quotationSchema = Yup.object({
  quotationNumber: Yup.string().required('Quotation Number is required'),
  customerId: Yup.string().required('Customer is required'),
  commodity: Yup.string().required('Commodity is required'),
  rateValidity: Yup.string().required('Rate Validity is required'),
  shippingTerm: Yup.string().required('Shipping Term is required'),
  portOfLoadingId: Yup.string().required('Port of Loading is required'),
  portOfDischargeId: Yup.string().required('Port of Discharge is required'),
  service: Yup.string().required('Service is required'),
  weight: Yup.number().typeError('Mass/Weight must be a number').required(),
  volume: Yup.number().typeError('Volume must be a number').required(),
  salesId: Yup.string().required('Sales is required'),
  paymentTerm: Yup.string().required('Payment Term is required'),
  status: Yup.string().required('Status is required'),
  note: Yup.string().required('Note is required'),
});

export const itemSchema = Yup.object().shape({
  itemId: Yup.string().required('Item is required'),
  itemName: Yup.string().required('Item Name is required'),
  price: Yup.string().required('Price is required'),
  currency: Yup.string().required('Currency is required'),
  quantity: Yup.number().typeError('Quantity must be a number').required(),
  unit: Yup.string().required('Unit is required'),
});
