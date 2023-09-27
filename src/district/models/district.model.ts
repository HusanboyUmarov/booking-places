import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";
interface CreateDistrictAttr{
    name:string;
    region_id:number;
}
@Table({tableName:"district"})
export class District extends Model<District , CreateDistrictAttr>{
    @ApiProperty({example:1, description:'id number'})
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true})
    id:number;

    @ApiProperty({example:'Rishton', description:"tuman"})
    @Column({
        type:DataType.STRING})
    name:string;

    @ApiProperty({example:1, description:'region id'})
    @Column({
        type:DataType.INTEGER})
    region_id:number;

}
