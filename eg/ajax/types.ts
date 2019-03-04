export type Data = string | number | boolean | null | { [key: string]: Data }

export type Param = {
    data: string,
    url: string,
    dataType: string,
    async: boolean,
}

const defParam :Param= {
    data: '',
    url: '',
    dataType: '',
    async: true,
}


export type Options = {
    data: Data,
    async: boolean,
    encrypt: boolean,
    path: string | null,
    origin: string,
    url: string,
    method: "get"|'post',
    token: string,
    type:'json'|null
}

const defOptions :Options= {
    data: '',
    async: true,
    encrypt: false,
    path: '',
    origin: '',
    url: '',
    method: 'get',
    token: '',
    type: null,
}

export type Response = {
    raw: string,
    code: number,
    message: string,
    data: Data,
    success: boolean
}

const defResponse:Response = {
    raw: '',
    code: 0,
    message: '',
    data: '',
    success: false
}
export type Ctx = [Options, Param, Response]

export function initCtx({
    options=defOptions,
    param=defParam,
    response= defResponse
}):Ctx{
    return [options,param,response]
}
