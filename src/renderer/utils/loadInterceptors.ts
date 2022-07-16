import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

export default () => {
    axios.interceptors.request.use((config: AxiosRequestConfig) => {
        config.headers['request-startTime'] = new Date().getTime();
        return config;
    });

    axios.interceptors.response.use((response: AxiosResponse) => {
        const startTime = response.config.headers['request-startTime'] as number;
        const endTime = new Date().getTime();
        response.headers['response-time'] = `${endTime - startTime}ms`;
        return response;
    });

}