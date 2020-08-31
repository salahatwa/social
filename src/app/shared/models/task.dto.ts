
export interface PageTaskDto {
    tasks?: TaskDto[];
    totalElements?: number;
}

export interface TaskDto {
    content?: string;
    date?: string;
    enabled?: boolean;
    error?: boolean;
    executed?: boolean;
    id?: number;
    img?: string;
    latitude?: number;
    longitude?: number;
    providersId?: Array<string>;
    scheduled?: boolean;
    time?: string;
    timezoneOffset?: number;
}
