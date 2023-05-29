export interface IJsonSuccess<T> {
    success: boolean,
    data: T
}

export interface IJsonFailure {
    success: boolean,
    message: string,
    errorCode: number
}