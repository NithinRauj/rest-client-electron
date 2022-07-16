export type Header = {
    headerId: string,
    key: string,
    value: string
}

export type Param = {
    paramId: string,
    key: string,
    value: string
}

export type APIResponse = { data?: string, statusCode?: number, statusText?: string, responseTime?: string, size?: string }

export type Request = {
    loading: boolean,
    id: string,
    title: string,
    type: RequestType,
    url: string,
    params: Param[],
    headers: Header[],
    body: string,
    response: APIResponse
}

export enum RequestType {
    get = 'get',
    post = 'post',
    put = 'put',
    patch = 'patch',
    delete = 'delete'
}