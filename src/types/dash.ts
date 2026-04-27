export interface Dash {
    id: string;
    name: string;
    updatedAt: string;

    settings: DashSettings;
    
    blocks: Block[];
}

export interface DashSettings {
    columns: number;
    rowHeight: number;
    displayGrid: boolean;
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
    settings: DashSettings;
    blocks: Block[];
}