import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from "axios";

export type RequestResponse<T = any> = Promise<AxiosResponse<T>["data"]>;

interface RequestConfig<T = any> extends AxiosRequestConfig<T> {
    mock?: boolean;
}

type State = "SUCCESS" | "FAILED";

interface AxiosResponseResult<T = any> {
    state: State;
    data: T;
    message?: string;
}

type AxiosResponseData<T = any> = AxiosResponseResult<T>["data"];

const STATE_SUCCESS = "SUCCESS";

const axiosRequest: AxiosInstance = axios.create({
    timeout: 30_000,
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest",
    },
});

axiosRequest.interceptors.request.use((config: RequestConfig) => {
    const { url, mock, ...restConfig } = config;
    if (!navigator.onLine) {
        throw new Error("Please check network configuration");
    }
    const enableMock = mock && process.env.NODE_ENV === "development";
    return {
        ...restConfig,
        url: enableMock ? `/mock${url}` : url,
    };
});

axiosRequest.interceptors.response.use((response: AxiosResponse<AxiosResponseResult>) => {
    const {
        data: { state, data, message },
    } = response;
    if (state === STATE_SUCCESS) {
        return data;
    }
    throw new Error(message);
});

const request = async <T = any>(url: string, options?: RequestConfig): RequestResponse<AxiosResponseData<T>> => {
    try {
        const { method = "post", data, ...restOptions } = options;
        return await axiosRequest.request<T, RequestResponse<AxiosResponseData<T>>>({
            url,
            method,
            ...restOptions,
            ...(method === "get" ? { params: data } : { data }),
        });
    } catch (error) {
        console.log(error.message || "Oh! The system is out of business, we will restore it as soon as possible");
        throw new Error(error);
    }
};

export default request;
