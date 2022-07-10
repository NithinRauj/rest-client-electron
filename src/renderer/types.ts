export type Request = {
    id: string,
    title: string,
    type: RequestType,
    url: string,
    params: { paramId: string, key: string, value: string }[],
    headers: { headerId: string, key: string, value: string }[],
    body: string
}

export enum RequestType {
    get = 'get',
    post = 'post',
    put = 'put',
    patch = 'patch',
    delete = 'delete'
}