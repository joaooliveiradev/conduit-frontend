import { object, string } from 'yup'

export const signInSchema = object({
  email: string().email('E-mail is not valid').required('Email field is required').lowercase(),
  password: string().required('Password field is required').min(8, 'Minimum 8 characters required!').max(64, 'Maximum 64 characters required!')
})

