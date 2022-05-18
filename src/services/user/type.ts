import {IApiResponse} from "../../helpers/api/type";

export interface basicInfoInput {
    name: string;
    email: string
}

export interface passwordInputs {
    password: string;
    confirm_password: string;
}

export interface emailValidationApiResponse extends IApiResponse{
    data: {
        data: {
            users: number;
        }
    }
}

export interface IUserApiResponse extends IApiResponse {
    data: {
        data: {
            user: IUser
        }
    }
}

export interface IUser {
    name: string;
    email: string;
}