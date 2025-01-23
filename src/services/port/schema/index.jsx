import * as Yup from 'yup';

export const portSchema = Yup.object().shape({
  portName: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must be 50 characters or less'),
  note: Yup.string().max(200, 'Note must be 200 characters or less'),
  status: Yup.string()
    .required('Status is required')
    .oneOf(
      ['Active', 'Inactive'],
      'Status must be either "active" or "inactive"',
    ),
});
