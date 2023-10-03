interface BotAttr{
    user_id:string;
    username: string;
    last_name:string;
    first_name:string;
    phone_number:string;
    status: boolean
}

import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName:'bot'})
export class Bot extends Model< Bot, BotAttr> {
    @ApiProperty({
        example:'123456',
        description:'id'
    })
    @Column({
        type:DataType.BIGINT,
        primaryKey:true,
        allowNull:false })
    user_id:BigInt;

    @ApiProperty({
        example:'user1',
        description:'username'
    })
    @Column({
        type:DataType.STRING})
    username: string;

    @ApiProperty({
        example:'ali',
        description:'last_name'
    })
    @Column({
        type:DataType.STRING})
    last_name:string;

    @ApiProperty({
        example:'alisher',
        description:'first name'
    })
    @Column({
        type:DataType.STRING})
    first_name:string;

    @ApiProperty({
        example:'+9989165215677',
        description:'phone number'
    })
    @Column({
        type:DataType.STRING})
    phone_number:string;

    @ApiProperty({
        example:false,
        description:'user status'
    })
    @Column({
        type:DataType.BOOLEAN, 
    defaultValue: false})
    status: boolean
}
