import {basicInfoInput, emailValidationApiResponse, IUserApiResponse} from "./type";
import {Api} from "../../helpers/api";
import {User} from "../../features/sign-up/signUpSlice";



export const checkEmail = async (email: basicInfoInput["email"]) => {
    return await Api.get(`/user/get?email=${email}`) as emailValidationApiResponse
}

export const signup = async (data: Pick<User, 'email' | 'password' | 'name'>) => {
    return await Api.post('/user/create', data) as IUserApiResponse
}