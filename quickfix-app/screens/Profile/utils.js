// @ts-nocheck
import { profileSchema } from '../../utils/schema';

export const formInit = ({ businessName, contactName, contactNumber, email, businessAddress }) => (
   {
      initialValues: {
         businessName,
         contactNumber,
         contactName,
         businessAddress,
         email,
      },
      validationSchema: profileSchema,
      validateOnMount: false,
   });

export const hasErrors = errors => Boolean(
   errors?.businessAddress ||
   errors?.contactName ||
   errors?.contactNumber
);
