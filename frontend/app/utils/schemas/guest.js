import * as Yup from 'yup'

export const guestSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First Name is required'),
  lastName: Yup.string()
    .required('Last Name is required'),
  email: Yup.string()
    .email('Email is invalid')
    .required('Email is required'),
  birthDate: Yup.date()
    .required('Date of birth is required'),
  gender: Yup.string()
    .required('Gender is required'),
  hobbies: Yup.array(),
  eventId: Yup.string()
    .required('Please select an event')
})
