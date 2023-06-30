import * as yup from 'yup';

export const hotelValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  image: yup.string(),
  owner_id: yup.string().nullable(),
});
