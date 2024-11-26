import * as Yup from 'yup';

export const costSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters'),
  status: Yup.string()
    .oneOf(
      ['Active', 'Inactive'],
      'Status must be either "active" or "inactive"',
    )
    .required('Status is required'),
});
