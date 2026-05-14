import { IncidentType } from "src/core/enums/incident-type.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import type { Point } from "typeorm";

@Entity("incident")
export class Incident{
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title!:string;

    @Column()
    description!:string;

    @Column({
        type: 'geometry',
        spatialFeatureType: 'Point',
        srid: 4326
    })
    location:Point;

    @Column({ type:'int' })
    type!:IncidentType;
}