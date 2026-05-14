import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { IncidentsModule } from './incidents/incidents.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from './config/envs';
import { Incident } from './core/db/entities/incident.entity';
import { dataSourceOptions } from './core/db/data-source';
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [
    EmailModule, 
    IncidentsModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    CacheModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
