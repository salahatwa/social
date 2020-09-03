
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
    scheduleType?: TaskDto.ScheduleTypeEnum;
    time?: string;
    timezoneOffset?: number;
}

export namespace TaskDto {
    export type ScheduleTypeEnum = 'POST' | 'DATETIME' | 'DATERANGE' | 'MULTIPLE';
    export const ScheduleTypeEnum = {
        POST: 'SELF' as ScheduleTypeEnum,
        DATETIME: 'DATETIME' as ScheduleTypeEnum,
        DATERANGE: 'DATERANGE' as ScheduleTypeEnum,
        MULTIPLE: 'MULTIPLE' as ScheduleTypeEnum,
    };
}
