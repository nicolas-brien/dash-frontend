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

export function getErrorMessage(e: any, context?: string): string {
    if (e instanceof ApiException) {
        if (e.status === 404) {
            return `${context || "Item"} not found.`;
        }
        else if (e.status === 500) {
            return "Unexpected error, please try again later." + context && `(${context})`
        }
        else if (e.status === 401) {
            return "You are not authorized to perform this action." + context && `(${context})`
        }
        else {
            return "Something went wrong." + context && `(${context})`
        }
    }
    else {
        return "Something went wrong." + context && `(${context})`
    }
}