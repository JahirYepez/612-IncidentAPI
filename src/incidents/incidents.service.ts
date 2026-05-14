import { Injectable } from '@nestjs/common';
import { IncidentCDto } from 'src/core/interfaces/incident.interface';
import { EmailOptions } from 'src/core/interfaces/email-options.interface';
import { EmailService } from 'src/email/email.service';
import { generateIncidentEmailTemplate } from './templates/incident-email.template';
import { Repository } from 'typeorm';
import { Incident } from 'src/core/db/entities/incident.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { logger } from 'src/config/logger';
import Redis from 'ioredis';
import { envs } from 'src/config/envs';
import { CacheService } from 'src/cache/cache.service';

const CACHE_KEY_ALL_INCIDENTS = 'incidents:all';

@Injectable()
export class IncidentsService {
    constructor(
        @InjectRepository(Incident)
        private readonly incidentRepository : Repository<Incident>,
        private readonly emailService : EmailService,
        private readonly cacheService : CacheService
    ){}

    private readonly redis = new Redis({
        host:envs.REDIS_HOST,
        port:envs.REDIS_PORT
    });

    async getIncidentByRadius(lat:number,lon:number,radius:number) : Promise<Incident[]>{
        try{
            console.log(`Buscando incidentes en ${lat},${lon} en un radio de ${radius} metros`);
            const incidents = await this.incidentRepository
                .createQueryBuilder('incident')
                .where(`
                ST_DWithin(
                incident.location::geography,
                ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)::geography,
                :radius
                )    
                `,{ lon,lat,radius })
                .getMany();
            console.log(`${incidents} incidentes encontrados en un radio de ${radius} metros`);
            return incidents;
        }catch(error){
            console.error(error);
            return [];
        }
    }

    async getIncidents() : Promise<Incident[]>{
        try{
            logger.info("[IncidentService] Consultando incidentes en cache...")
            const data = await this.cacheService.get<Incident[]>(CACHE_KEY_ALL_INCIDENTS) ?? "";
            if(data && data.length > 0){
                logger.info("[IncidentService] Incidentes en cache...")
                return data;
            }
            logger.info("[IncidentService] Trayendo todos los incidentes...")
            const incidents = await this.incidentRepository.find();
            logger.info("[IncidentService] Guardando incidentes en cache");
            const incidentsString = JSON.stringify(incidents);
            this.redis.set(CACHE_KEY_ALL_INCIDENTS,incidentsString);
            logger.info(`[IncidentService] Se obtuvieron ${incidents.length} incidentes`);
            return incidents;
        }catch(error){
            console.error("[IncidentService] Error al traer los incidentes");
            console.error(error);
            return [];
        }
    }

    async createIncident(incident:IncidentCDto) : Promise<Boolean>{
        const newIncident = this.incidentRepository.create({
            title: incident.title,
            description: incident.description,
            type: incident.type,
            location:{
                type: 'Point',
                coordinates:[incident.lon, incident.lat]
            }
        });
        logger.info("Creando Incidente");
        await this.incidentRepository.save(newIncident);
        await this.cacheService.delete(CACHE_KEY_ALL_INCIDENTS);
        logger.info("Mandando correo");
        const template = generateIncidentEmailTemplate(incident);
        const options : EmailOptions = {
            to: "yepezjahir@gmail.com",
            subject: incident.title,
            html: template
        }
        const result = await this.emailService.sendEmail(options);
        return result;
    }
}
