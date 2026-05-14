import { Module } from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import { IncidentsController } from './incidents.controller';
import { EmailModule } from 'src/email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incident } from 'src/core/db/entities/incident.entity';
import { CacheModule } from 'src/cache/cache.module';

@Module({
  imports:[
    EmailModule,
    TypeOrmModule.forFeature([Incident]),
    CacheModule
  ],
  providers: [IncidentsService],
  controllers: [IncidentsController]
})
export class IncidentsModule {}
