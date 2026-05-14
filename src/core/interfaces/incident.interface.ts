import { IncidentType } from "../enums/incident-type.enum";

export interface IncidentCDto{
    title: string;
    description: string;
    lat: number;
    lon: number;
    type: IncidentType
}