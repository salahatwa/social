export interface ProviderDto { 
    createdAt?: Date;
    description?: string;
    email?: string;
    geoEnabled?: boolean;
    handle?: string;
    id?: string;
    image?: string;
    name?: string;
    providerType?: ProviderDto.ProviderTypeEnum;
    secure?: boolean;
    updatedAt?: Date;
    url?: string;
}
export namespace ProviderDto {
    export type ProviderTypeEnum = 'SELF' | 'TWITTER' | 'LINKEDIN';
    export const ProviderTypeEnum = {
        SELF: 'SELF' as ProviderTypeEnum,
        TWITTER: 'TWITTER' as ProviderTypeEnum,
        LINKEDIN: 'LINKEDIN' as ProviderTypeEnum
    };
}
