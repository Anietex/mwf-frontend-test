import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

export const baseUserSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().required().min(8, 'Minimum of 8 characters'),
    confirm_password: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
})

export const basicInfoSchema = yupResolver((baseUserSchema.pick(['name', 'email'])))

export const passwordInfoSchema = yupResolver((baseUserSchema.pick(['password', 'confirm_password'])))

