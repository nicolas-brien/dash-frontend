export interface Dash {
    id: string;
    name: string;
    updatedAt: string;
}

export interface CreateDashDto {
    name: string;
}

export interface UpdateDashDto {
    name: string;
}