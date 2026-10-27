export type ApiMessageResponse = {
<<<<<<< HEAD
  message: string;
};

export type ApiDataResponse<TData> = {
  data: TData;
};

export type ApiDataMessageResponse<TData> = {
  data: TData;
  message: string;
};

export type ApiErrorBody = {
  message?: string;
  errors?: unknown;
};
=======
    message: string;
};

export type ApiDataResponse<TData> = {
    data: TData;
};

export type ApiDataMessageResponse<TData> ={
    data: TData;
    message: string;
};

export type ApiErrorBody ={
    message?: string;
    errors?: unknown;
}
>>>>>>> e4f227b43c8970ad4d660ca8509975c17f2299b7
