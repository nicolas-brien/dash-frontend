export interface ApiError {
    status: number;
    message: string;
    fieldErrors?: Record<string, string>;
}

export class ApiException extends Error {
    status: number;
    fieldErrors?: Record<string, string>;

    constructor(error: ApiError) {
        super(error.message);
        this.status = error.status;
        this.fieldErrors = error.fieldErrors;
    }
}
