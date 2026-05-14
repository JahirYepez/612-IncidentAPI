import { Body, Controller, Get, ParseFloatPipe, Post, Query } from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import type { IncidentCDto } from 'src/core/interfaces/incident.interface';

@Controller('incidents')
export class IncidentsController {
    
    constructor(private readonly incidentService:IncidentsService){}

    @Get()
    async getIncidents(){
        const result = await this.incidentService.getIncidents();
        return result;
    }

    @Get('radius')
    async getIncidentByRadius(
        @Query('lat',ParseFloatPipe) lat : number,
        @Query('lon',ParseFloatPipe) lon : number,
        @Query('radiusInMeters',ParseFloatPipe) radiusInMeters : number
    ){
        const result = await this.incidentService.getIncidentByRadius(lat,lon,radiusInMeters);
        return result;    
    }

    @Post()
    async createIncident(@Body() incident: IncidentCDto){
        const result = await this.incidentService.createIncident(incident);
        return result;
    }
}
