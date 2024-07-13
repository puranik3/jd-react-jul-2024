export interface IApiResponse<Message> {
    status: "success" | "error";
    message: Message;
}

export type IErrorMessage = IApiResponse<string>;