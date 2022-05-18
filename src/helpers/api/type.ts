export interface IApiResponse {
    message?: string;
    status: 'success' | 'error';
    data?: any;
}