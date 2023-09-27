import { ApiProperty } from "@nestjs/swagger";
import {  Column, DataType, Model, Table } from "sequelize-typescript";

interface CreateComfortAttr{
    name:string;

}

@Table({tableName:'confort'})
export class Confort extends Model<Confort, CreateComfortAttr> {

    @ApiProperty({example:1, description:'user id'})
    @Column({
        type:DataType.INTEGER,
        primaryKey:true,
        autoIncrement:true,})
    id:number;

    @Column({
        type:DataType.STRING,
        unique:true})
    name:string;
}
