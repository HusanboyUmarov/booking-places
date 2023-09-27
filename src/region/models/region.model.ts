import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface CreateRegionAttr{
    name:string;
}

@Table({tableName:'region'})
export class Region extends Model<Region, CreateRegionAttr> {
    @Column({
        type:DataType.INTEGER,
        primaryKey:true,
        autoIncrement:true})
    id:number;


    @ApiProperty({example:'Fergana', description:'region name'})
    @Column({
        type:DataType.STRING})
    name:string;

    
}
