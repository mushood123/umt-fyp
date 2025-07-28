import * as Yup from 'yup';
import { CLAUSES } from '../constants';
import { emailRegex } from './regex';

export const signInSchema = Yup.object().shape({
   email: Yup.string()
      .test(email => emailRegex.test(email))
      .email(CLAUSES.INVALID_EMAIL)
      .required(CLAUSES.REQUIRED),
   password: Yup.string().min(6, CLAUSES.TOO_SHORT).max(20, CLAUSES.TOO_LARGE).required(CLAUSES.REQUIRED),
});

export const signUpSchema = Yup.object().shape({
   preferredUserID: Yup.string()
      .matches(/^[a-zA-Z0-9]+$/, 'UserID can only contain letters and numbers without spaces.')
      .matches(/^[a-zA-Z0-9]/, 'UserID cannot start with a special character.')
      .required('UserID is required.'),
   contactNumber: Yup.string().length(11, 'Number must be exactly 11 characters long.').required('Number is required.'),
   contactName: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces.')
      .required('Name is required.'),
   businessName: Yup.string().required('Business Name is required.'),
   businessAddress: Yup.string().required('Address is required.'),
   email: Yup.string()
      .test(email => emailRegex.test(email))
      .email(CLAUSES.INVALID_EMAIL)
      .required(CLAUSES.REQUIRED),
   password: Yup.string().min(6, CLAUSES.TOO_SHORT).max(20, CLAUSES.TOO_LARGE).required(CLAUSES.REQUIRED),
});

export const profileSchema = Yup.object().shape({
   businessName: Yup.string().required('Business Name is required.'),
   contactNumber: Yup.string().length(11, 'Number must be exactly 11 characters long.').required('Number is required.'),
   contactName: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces.')
      .required('Name is required.'),
   businessAddress: Yup.string().required('Address is required.'),
   email: Yup.string()
      .test(email => emailRegex.test(email))
      .email(CLAUSES.INVALID_EMAIL)
      .required(CLAUSES.REQUIRED),
});
