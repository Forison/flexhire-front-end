import * as yup from "yup"

export const signUpSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  passwordConfirmation: yup.string().oneOf([yup.ref('password')]),
})

export const signInSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
})

export const jobSchema = yup.object().shape({
  name: yup.string().required(),
  location: yup.string().required(),
  description: yup.string().min(40).required(),
  poster: yup.mixed(),
})
                        