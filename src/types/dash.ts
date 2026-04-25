export interface Dash {
    id: string;
    name: string;
    updatedAt: string;
}

export interface Block {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface CreateDashDto {
    name: string;
}

export interface UpdateDashDto {
    name: string;
    blocks: Block[];
}