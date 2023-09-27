import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface createCategoryAttr{
    name:string;
    parent_id: number
}

@Table({tableName:'categories'})
export class Category extends Model<Category,createCategoryAttr> {
    @ApiProperty({example:'id', description:'for id'})
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true

    })
    id:number;

    @ApiProperty({example:'sport', description:'category name'})
    @Column({
        type:DataType.STRING
    })
    name:string;

    @ApiProperty({example:1, description:'parent id'})
    @Column({
        type:DataType.INTEGER
    })
    parent_id: number

}
