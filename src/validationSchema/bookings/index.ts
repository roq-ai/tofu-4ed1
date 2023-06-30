import * as yup from 'yup';

export const bookingValidationSchema = yup.object().shape({
  start_date: yup.date().required(),
  end_date: yup.date().required(),
  guest_id: yup.string().nullable(),
  hotel_id: yup.string().nullable(),
});
